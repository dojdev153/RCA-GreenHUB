$ErrorActionPreference = 'Continue'

$backup = 'C:\Users\Public\StartupOptimizationBackup'
$itemBackup = Join-Path $backup 'ApprovedItemBackups'
New-Item -ItemType Directory -Path $itemBackup -Force | Out-Null
$timestamp = Get-Date

$startupTargets = @(
    @{ Name='Medal'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='MuMuPlayerGlobal'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='com.squirrel.medal.medal'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='NeatDM'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='IDMan'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='com.squirrel.slack.slack'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='OneDrive'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='Microsoft.Lists'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; Source='HKCU Run' },
    @{ Name='Ollama.lnk'; Key='HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder'; Source='User Startup Folder' }
)

$taskTargets = @(
    @{ Name='Adobe Creative Cloud'; Path='\'; Source='Task Scheduler logon trigger' },
    @{ Name='OneDrive Startup Task-S-1-5-21-4195380835-319858697-2364398054-1001'; Path='\'; Source='Task Scheduler logon trigger' },
    @{ Name='Autorun for HP'; Path='\PowerToys\'; Source='Task Scheduler logon trigger' },
    @{ Name='Seelen UI Service'; Path='\Seelen\'; Source='Task Scheduler logon trigger' }
)

# Back up the precise Windows StartupApproved keys that will be modified.
$registryExports = @(
    @{ Key='HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'; File='StartupApproved_Run_before.reg' },
    @{ Key='HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder'; File='StartupApproved_StartupFolder_before.reg' }
)
$exportResults = foreach ($entry in $registryExports) {
    $out = & reg.exe export $entry.Key (Join-Path $itemBackup $entry.File) /y 2>&1
    [pscustomobject]@{ Key=$entry.Key; File=$entry.File; ExitCode=$LASTEXITCODE; Output=($out -join ' ') }
}

$originalStartupStates = [System.Collections.Generic.List[object]]::new()
foreach ($target in $startupTargets) {
    $exists = $false
    $bytes = $null
    if (Test-Path -LiteralPath $target.Key) {
        try {
            $bytes = (Get-ItemProperty -LiteralPath $target.Key -Name $target.Name -ErrorAction Stop).($target.Name)
            $exists = $true
        } catch {}
    }
    $originalStartupStates.Add([pscustomobject]@{
        Name=$target.Name
        RegistryKey=$target.Key
        Source=$target.Source
        OriginalValueExisted=$exists
        OriginalDataBase64=if ($bytes -is [byte[]]) {[Convert]::ToBase64String($bytes)} else {$null}
        OriginalFirstByte=if ($bytes -is [byte[]] -and $bytes.Count) {$bytes[0]} else {$null}
    })
}

$originalTaskStates = [System.Collections.Generic.List[object]]::new()
foreach ($target in $taskTargets) {
    try {
        $task = Get-ScheduledTask -TaskName $target.Name -TaskPath $target.Path -ErrorAction Stop
        $safeName = (($target.Path + $target.Name) -replace '[^A-Za-z0-9._-]', '_').Trim('_')
        $xmlPath = Join-Path $itemBackup ($safeName + '_before.xml')
        Export-ScheduledTask -TaskName $target.Name -TaskPath $target.Path -ErrorAction Stop | Set-Content -LiteralPath $xmlPath -Encoding Unicode
        $originalTaskStates.Add([pscustomobject]@{
            Name=$target.Name
            TaskPath=$target.Path
            Source=$target.Source
            Found=$true
            OriginalEnabled=[bool]$task.Settings.Enabled
            OriginalState=[string]$task.State
            XmlBackup=$xmlPath
        })
    } catch {
        $originalTaskStates.Add([pscustomobject]@{
            Name=$target.Name; TaskPath=$target.Path; Source=$target.Source; Found=$false
            OriginalEnabled=$null; OriginalState=$null; XmlBackup=$null; BackupError=$_.Exception.Message
        })
    }
}

$originals = [ordered]@{
    CapturedAt=$timestamp.ToString('o')
    RegistryExportResults=$exportResults
    StartupApprovedValues=@($originalStartupStates)
    ScheduledTasks=@($originalTaskStates)
}
$originals | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $itemBackup 'ApprovedStartupOriginalStates.json') -Encoding UTF8

$results = [System.Collections.Generic.List[object]]::new()
$changeLines = [System.Collections.Generic.List[string]]::new()

foreach ($target in $startupTargets) {
    $original = $originalStartupStates | Where-Object { $_.Name -eq $target.Name -and $_.RegistryKey -eq $target.Key }
    try {
        if (-not (Test-Path -LiteralPath $target.Key)) { New-Item -Path $target.Key -Force | Out-Null }
        $disabledData = [byte[]](0x03,0x00,0x00,0x00) + [BitConverter]::GetBytes([DateTime]::Now.ToFileTime())
        New-ItemProperty -LiteralPath $target.Key -Name $target.Name -PropertyType Binary -Value $disabledData -Force -ErrorAction Stop | Out-Null
        $verify = (Get-ItemProperty -LiteralPath $target.Key -Name $target.Name -ErrorAction Stop).($target.Name)
        if (-not ($verify -is [byte[]] -and $verify.Count -gt 0 -and $verify[0] -eq 3)) { throw 'Verification did not return the Windows disabled-state marker.' }
        $result = [pscustomobject]@{
            Item=$target.Name; Source=$target.Source; OriginalState=if ($original.OriginalFirstByte -eq 3) {'Disabled'} elseif ($original.OriginalFirstByte -eq 2) {'Enabled'} elseif ($original.OriginalValueExisted) {"Approval byte $($original.OriginalFirstByte)"} else {'Enabled (no prior approval record)'}
            NewState='Disabled'; Success=$true; Method="StartupApproved binary value at $($target.Key)"; Error=$null
        }
        $results.Add($result)
        $changeLines.Add('')
        $changeLines.Add("Item name: $($target.Name)")
        $changeLines.Add("Original state: $($result.OriginalState)")
        $changeLines.Add('New state: Disabled')
        $changeLines.Add("Startup source: $($target.Source)")
        $changeLines.Add("Command or method used: Set Windows StartupApproved value '$($target.Name)' to disabled (03) at $($target.Key); original Run value/shortcut retained")
        $changeLines.Add("Date and time: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))")
        $changeLines.Add('How to restore it: Run C:\Users\Public\StartupOptimizationBackup\RestoreApprovedStartupChanges.ps1 or enable the item in Task Manager > Startup apps.')
    } catch {
        $results.Add([pscustomobject]@{ Item=$target.Name; Source=$target.Source; OriginalState='See backup'; NewState='Unchanged / failed'; Success=$false; Method="StartupApproved at $($target.Key)"; Error=$_.Exception.Message })
    }
}

foreach ($target in $taskTargets) {
    $original = $originalTaskStates | Where-Object { $_.Name -eq $target.Name -and $_.TaskPath -eq $target.Path }
    try {
        if (-not $original.Found) { throw "Task was not backed up: $($original.BackupError)" }
        Disable-ScheduledTask -TaskName $target.Name -TaskPath $target.Path -ErrorAction Stop | Out-Null
        $verify = Get-ScheduledTask -TaskName $target.Name -TaskPath $target.Path -ErrorAction Stop
        if ($verify.Settings.Enabled) { throw 'Task still reports Enabled after the disable request.' }
        $result = [pscustomobject]@{
            Item=($target.Path + $target.Name); Source=$target.Source
            OriginalState=if ($original.OriginalEnabled) {"Enabled ($($original.OriginalState))"} else {'Disabled'}
            NewState='Disabled'; Success=$true; Method='Disable-ScheduledTask'; Error=$null
        }
        $results.Add($result)
        $changeLines.Add('')
        $changeLines.Add("Item name: $($target.Path)$($target.Name)")
        $changeLines.Add("Original state: $($result.OriginalState)")
        $changeLines.Add('New state: Disabled')
        $changeLines.Add("Startup source: $($target.Source)")
        $changeLines.Add("Command or method used: Disable-ScheduledTask -TaskName '$($target.Name)' -TaskPath '$($target.Path)'; task retained")
        $changeLines.Add("Date and time: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))")
        $changeLines.Add('How to restore it: Run C:\Users\Public\StartupOptimizationBackup\RestoreApprovedStartupChanges.ps1 or enable the task in Task Scheduler.')
    } catch {
        $results.Add([pscustomobject]@{ Item=($target.Path+$target.Name); Source=$target.Source; OriginalState=if ($original.OriginalEnabled) {'Enabled'} else {'Unknown'}; NewState='Unchanged / failed'; Success=$false; Method='Disable-ScheduledTask'; Error=$_.Exception.Message })
    }
}

$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $backup 'ApplyApprovedStartupChangesResults.json') -Encoding UTF8
if ($changeLines.Count) {
    Add-Content -LiteralPath (Join-Path $backup 'ChangesMade.txt') -Value $changeLines -Encoding UTF8
}

[pscustomobject]@{
    Successful=(@($results | Where-Object Success)).Count
    Failed=(@($results | Where-Object { -not $_.Success })).Count
    Results=@($results)
} | ConvertTo-Json -Depth 6
