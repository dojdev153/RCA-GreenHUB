$ErrorActionPreference = 'Continue'

$backup = 'C:\Users\Public\StartupOptimizationBackup'
New-Item -ItemType Directory -Path $backup -Force | Out-Null
$now = Get-Date

function Save-Json {
    param([Parameter(Mandatory)]$InputObject, [Parameter(Mandatory)][string]$Path, [int]$Depth = 8)
    $InputObject | ConvertTo-Json -Depth $Depth | Set-Content -LiteralPath $Path -Encoding UTF8
}

function Get-ExecutablePath {
    param([AllowNull()][string]$Command)
    if ([string]::IsNullOrWhiteSpace($Command)) { return $null }
    $expanded = [Environment]::ExpandEnvironmentVariables($Command.Trim())
    if ($expanded -match '^"([^"]+)"') { return $matches[1] }
    if ($expanded -match '^"?(.+?\.exe)(?:"?\s|$)') { return $matches[1] }
    try {
        if (Test-Path -LiteralPath $expanded -PathType Leaf -ErrorAction Stop) { return $expanded }
    } catch {}
    return $null
}

function Get-FilePublisher {
    param([AllowNull()][string]$Path)
    if (-not $Path -or -not (Test-Path -LiteralPath $Path -PathType Leaf)) { return $null }
    try {
        $company = (Get-Item -LiteralPath $Path -ErrorAction Stop).VersionInfo.CompanyName
        if ($company) { return $company.Trim('"') }
        $signature = Get-AuthenticodeSignature -LiteralPath $Path -ErrorAction Stop
        if ($signature.SignerCertificate) {
            return $signature.SignerCertificate.GetNameInfo([System.Security.Cryptography.X509Certificates.X509NameType]::SimpleName, $false)
        }
    } catch {}
    return $null
}

function Get-StartupApprovalState {
    param([string]$Name, [string]$SourceKind)
    $candidateKeys = switch ($SourceKind) {
        'HKCU Run' {
            'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'
        }
        'HKLM Run' {
            'HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'
        }
        'HKLM Run (32-bit)' {
            'HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run32'
        }
        'User Startup Folder' {
            'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder'
        }
        'Common Startup Folder' {
            'HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder'
        }
        default { @() }
    }
    foreach ($key in @($candidateKeys)) {
        if (-not (Test-Path -LiteralPath $key)) { continue }
        try {
            $value = (Get-ItemProperty -LiteralPath $key -Name $Name -ErrorAction Stop).$Name
            if ($value -is [byte[]] -and $value.Count -gt 0) {
                switch ($value[0]) {
                    2 { return 'Enabled' }
                    3 { return 'Disabled' }
                    6 { return 'Enabled' }
                    7 { return 'Disabled' }
                    default { return "Unknown (approval byte $($value[0]))" }
                }
            }
        } catch {}
    }
    return 'Enabled (no disabled approval record)'
}

$restoreStatus = [ordered]@{
    CheckedAt = $now.ToString('o')
    ShellElevated = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    SystemProtectionStatus = 'Could not determine: access denied because the Codex shell is not elevated.'
    RestorePointName = 'Before Startup Optimization'
    RestorePointCreated = $false
    Error = 'Get-ComputerRestorePoint and vssadmin both returned access denied. No restore point was attempted because System Protection could not first be confirmed as enabled.'
}
Save-Json $restoreStatus (Join-Path $backup 'RestorePointStatus.json')

$cv = Get-ItemProperty -LiteralPath 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion'
$cs = Get-CimInstance Win32_ComputerSystem
$cpu = @(Get-CimInstance Win32_Processor | Select-Object Name, Manufacturer, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed)
$gpu = @(Get-CimInstance Win32_VideoController | Select-Object Name, DriverVersion, DriverDate, AdapterRAM, PNPDeviceID)
$powerPlan = (& powercfg /getactivescheme 2>&1 | Out-String).Trim()
$systemInfo = [ordered]@{
    CollectedAt = $now.ToString('o')
    WindowsProductName = $cv.ProductName
    WindowsDisplayVersion = $cv.DisplayVersion
    WindowsEditionID = $cv.EditionID
    WindowsBuild = "$($cv.CurrentBuild).$($cv.UBR)"
    ComputerManufacturer = $cs.Manufacturer
    ComputerModel = $cs.Model
    InstalledRAMBytes = [uint64]$cs.TotalPhysicalMemory
    InstalledRAMGiB = [math]::Round($cs.TotalPhysicalMemory / 1GB, 2)
    CPU = $cpu
    GPU = $gpu
    CurrentPowerPlan = $powerPlan
}
Save-Json $systemInfo (Join-Path $backup 'SystemInformation.json')

$runSources = @(
    @{ Source = 'HKCU Run'; Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' },
    @{ Source = 'HKLM Run'; Path = 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Run' },
    @{ Source = 'HKLM Run (32-bit)'; Path = 'HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Run' }
)
$startupItems = [System.Collections.Generic.List[object]]::new()
$registryEntries = [System.Collections.Generic.List[object]]::new()
foreach ($source in $runSources) {
    if (-not (Test-Path -LiteralPath $source.Path)) { continue }
    $key = Get-Item -LiteralPath $source.Path
    foreach ($name in $key.GetValueNames()) {
        $command = [string]$key.GetValue($name, $null, [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames)
        $exe = Get-ExecutablePath $command
        $entry = [pscustomobject]@{
            Name = $name
            Publisher = Get-FilePublisher $exe
            Command = $command
            ExecutablePath = $exe
            Source = $source.Source
            SourcePath = $source.Path
            Status = Get-StartupApprovalState $name $source.Source
        }
        $startupItems.Add($entry)
        $registryEntries.Add($entry)
    }
}
Save-Json @($registryEntries) (Join-Path $backup 'RegistryRunEntries.json')

$folderSources = @(
    @{ Source = 'User Startup Folder'; Path = [Environment]::GetFolderPath('Startup') },
    @{ Source = 'Common Startup Folder'; Path = [Environment]::GetFolderPath('CommonStartup') }
)
$folderEntries = [System.Collections.Generic.List[object]]::new()
$shell = New-Object -ComObject WScript.Shell
foreach ($source in $folderSources) {
    $files = if (Test-Path -LiteralPath $source.Path) { @(Get-ChildItem -LiteralPath $source.Path -Force -ErrorAction SilentlyContinue) } else { @() }
    if ($files.Count -eq 0) {
        $folderEntries.Add([pscustomobject]@{ Name = $null; FullName = $null; TargetPath = $null; Arguments = $null; Publisher = $null; Source = $source.Source; Folder = $source.Path; Status = 'Folder empty' })
        continue
    }
    foreach ($file in $files) {
        $target = $file.FullName
        $arguments = $null
        if ($file.Extension -ieq '.lnk') {
            try {
                $shortcut = $shell.CreateShortcut($file.FullName)
                $target = $shortcut.TargetPath
                $arguments = $shortcut.Arguments
            } catch {}
        }
        $entry = [pscustomobject]@{
            Name = $file.Name
            FullName = $file.FullName
            TargetPath = $target
            Arguments = $arguments
            Publisher = Get-FilePublisher $target
            Source = $source.Source
            Folder = $source.Path
            Status = Get-StartupApprovalState $file.Name $source.Source
        }
        $folderEntries.Add($entry)
        $startupItems.Add([pscustomobject]@{
            Name = $file.Name
            Publisher = $entry.Publisher
            Command = if ($arguments) { '"' + $target + '" ' + $arguments } else { $target }
            ExecutablePath = $target
            Source = $source.Source
            SourcePath = $source.Path
            Status = $entry.Status
        })
    }
}
Save-Json @($folderEntries) (Join-Path $backup 'StartupFolderContents.json')

$wmiStartup = @(Get-CimInstance Win32_StartupCommand -ErrorAction SilentlyContinue | Select-Object Name, Command, Location, User)
Save-Json $wmiStartup (Join-Path $backup 'Win32StartupCommands.json')

$logonTasks = [System.Collections.Generic.List[object]]::new()
try {
    foreach ($task in @(Get-ScheduledTask -ErrorAction Stop)) {
        $triggers = @($task.Triggers)
        $hasLogon = $false
        $triggerDescriptions = [System.Collections.Generic.List[string]]::new()
        foreach ($trigger in $triggers) {
            $className = $trigger.CimClass.CimClassName
            if ($className -match 'LogonTrigger') { $hasLogon = $true }
            if ($className -match 'LogonTrigger') {
                $triggerDescriptions.Add("Logon(UserId=$($trigger.UserId), Enabled=$($trigger.Enabled))")
            }
        }
        if (-not $hasLogon) { continue }
        $actions = @($task.Actions | ForEach-Object {
            [pscustomobject]@{ Execute = $_.Execute; Arguments = $_.Arguments; WorkingDirectory = $_.WorkingDirectory }
        })
        $logonTasks.Add([pscustomobject]@{
            TaskName = $task.TaskName
            TaskPath = $task.TaskPath
            State = [string]$task.State
            Enabled = [bool]$task.Settings.Enabled
            Author = $task.Author
            Description = $task.Description
            Triggers = @($triggerDescriptions)
            Actions = $actions
        })
    }
} catch {
    $logonTasks.Add([pscustomobject]@{ Error = $_.Exception.Message })
}
Save-Json @($logonTasks) (Join-Path $backup 'LogonScheduledTasks.json') 12

$automaticServices = [System.Collections.Generic.List[object]]::new()
foreach ($service in @(Get-CimInstance Win32_Service -Filter "StartMode='Auto'")) {
    $exe = Get-ExecutablePath $service.PathName
    $publisher = Get-FilePublisher $exe
    if ($publisher -match 'Microsoft') { continue }
    if ($exe -and $exe.StartsWith($env:WINDIR, [System.StringComparison]::OrdinalIgnoreCase) -and -not $publisher) { continue }
    $automaticServices.Add([pscustomobject]@{
        Name = $service.Name
        DisplayName = $service.DisplayName
        State = $service.State
        StartMode = $service.StartMode
        StartName = $service.StartName
        PathName = $service.PathName
        ExecutablePath = $exe
        Publisher = $publisher
    })
}
Save-Json @($automaticServices) (Join-Path $backup 'ThirdPartyAutomaticServices.json')

$processes = @(Get-CimInstance Win32_Process | ForEach-Object {
    [pscustomobject]@{
        Name = $_.Name
        ProcessId = $_.ProcessId
        ParentProcessId = $_.ParentProcessId
        ExecutablePath = $_.ExecutablePath
        CommandLine = $_.CommandLine
        WorkingSetMiB = [math]::Round($_.WorkingSetSize / 1MB, 1)
    }
} | Sort-Object Name, ProcessId)
Save-Json $processes (Join-Path $backup 'RunningProcesses.json') 6

Save-Json @($startupItems) (Join-Path $backup 'StartupItemsCombined.json') 8

$baseline = @(
    "Startup Optimization Baseline",
    "Collected: $($now.ToString('yyyy-MM-dd HH:mm:ss zzz'))",
    "Windows: $($cv.ProductName) $($cv.DisplayVersion), build $($cv.CurrentBuild).$($cv.UBR)",
    "Computer: $($cs.Manufacturer) $($cs.Model)",
    "RAM: $([math]::Round($cs.TotalPhysicalMemory / 1GB, 2)) GiB",
    "CPU: $((@($cpu.Name) -join '; '))",
    "GPU: $((@($gpu | ForEach-Object { $_.Name + ' (driver ' + $_.DriverVersion + ')' })) -join '; ')",
    "Power plan: $powerPlan",
    "Restore point: NOT CREATED - Codex shell is not elevated; System Protection status could not be safely confirmed.",
    "Startup configuration changes made: None."
)
$baseline | Set-Content -LiteralPath (Join-Path $backup 'BaselineSummary.txt') -Encoding UTF8

if (-not (Test-Path -LiteralPath (Join-Path $backup 'ChangesMade.txt'))) {
    @(
        'Startup Optimization Change Log',
        "Created: $($now.ToString('yyyy-MM-dd HH:mm:ss zzz'))",
        '',
        'No startup configuration changes have been made. Awaiting user approval.'
    ) | Set-Content -LiteralPath (Join-Path $backup 'ChangesMade.txt') -Encoding UTF8
}

[pscustomobject]@{
    BackupFolder = $backup
    StartupItemCount = $startupItems.Count
    LogonTaskCount = $logonTasks.Count
    ThirdPartyAutomaticServiceCount = $automaticServices.Count
    RunningProcessCount = $processes.Count
    RestorePointCreated = $false
} | ConvertTo-Json
