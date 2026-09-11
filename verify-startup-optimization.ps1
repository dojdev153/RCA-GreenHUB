$ErrorActionPreference = 'Continue'
$backup = 'C:\Users\Public\StartupOptimizationBackup'

function Get-ApprovalState([string]$Name, [string]$Source) {
    $key = switch ($Source) {
        'HKCU Run' { 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run' }
        'HKLM Run' { 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run' }
        'HKLM Run (32-bit)' { 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run32' }
        'User Startup Folder' { 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder' }
        'Common Startup Folder' { 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder' }
        default { $null }
    }
    if ($key -and (Test-Path -LiteralPath $key)) {
        try {
            $data = (Get-ItemProperty -LiteralPath $key -Name $Name -ErrorAction Stop).$Name
            if ($data -is [byte[]] -and $data.Count) {
                if ($data[0] -in 3,7) { return 'Disabled' }
                if ($data[0] -in 2,6) { return 'Enabled' }
                return "Unknown (approval byte $($data[0]))"
            }
        } catch {}
    }
    return 'Enabled (no disabled approval record)'
}

$beforeStartup = Get-Content -Raw -LiteralPath (Join-Path $backup 'StartupItemsCombined.json') | ConvertFrom-Json
$afterStartup = foreach ($item in $beforeStartup) {
    [pscustomobject]@{
        Name=$item.Name; Publisher=$item.Publisher; ExecutablePath=$item.ExecutablePath; Command=$item.Command
        Source=$item.Source; SourcePath=$item.SourcePath; BeforeStatus=$item.Status
        AfterStatus=Get-ApprovalState $item.Name $item.Source
    }
}
$afterStartup | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $backup 'AfterStartupItemsCombined.json') -Encoding UTF8

$beforeTasks = Get-Content -Raw -LiteralPath (Join-Path $backup 'LogonScheduledTasks.json') | ConvertFrom-Json
$afterTasks = foreach ($old in $beforeTasks) {
    try {
        $task = Get-ScheduledTask -TaskName $old.TaskName -TaskPath $old.TaskPath -ErrorAction Stop
        [pscustomobject]@{TaskName=$old.TaskName; TaskPath=$old.TaskPath; BeforeEnabled=[bool]$old.Enabled; AfterEnabled=[bool]$task.Settings.Enabled; State=[string]$task.State; Error=$null}
    } catch {
        [pscustomobject]@{TaskName=$old.TaskName; TaskPath=$old.TaskPath; BeforeEnabled=[bool]$old.Enabled; AfterEnabled=$null; State=$null; Error=$_.Exception.Message}
    }
}
$afterTasks | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $backup 'AfterLogonScheduledTasks.json') -Encoding UTF8

$approvedNames = @('Medal','MuMuPlayerGlobal','com.squirrel.medal.medal','NeatDM','IDMan','com.squirrel.slack.slack','OneDrive','Microsoft.Lists','Ollama.lnk')
$approvedTasks = @('\Adobe Creative Cloud','\OneDrive Startup Task-S-1-5-21-4195380835-319858697-2364398054-1001','\PowerToys\Autorun for HP','\Seelen\Seelen UI Service')
$approvedVerification = @(
    $afterStartup | Where-Object Name -in $approvedNames | ForEach-Object { [pscustomobject]@{Item=$_.Name; Source=$_.Source; Status=$_.AfterStatus; Verified=($_.AfterStatus -eq 'Disabled')} }
    $afterTasks | Where-Object { ($_.TaskPath+$_.TaskName) -in $approvedTasks } | ForEach-Object { [pscustomobject]@{Item=($_.TaskPath+$_.TaskName); Source='Task Scheduler'; Status=if ($_.AfterEnabled) {'Enabled'} else {'Disabled'}; Verified=($_.AfterEnabled -eq $false)} }
)

$protectedNames = @('SecurityHealth','PenTablet','RtkAudUService','CheckNDISPortFFacFF','CancelAutoPlay_df')
$protectedVerification = @($afterStartup | Where-Object Name -in $protectedNames | Select-Object Name,Source,BeforeStatus,AfterStatus)

$pnpIssues = @()
$pnpRelevant = @()
if (Get-Command Get-PnpDevice -ErrorAction SilentlyContinue) {
    $allPnp = @(Get-PnpDevice -PresentOnly -ErrorAction SilentlyContinue)
    $pnpIssues = @($allPnp | Where-Object { $_.Status -notin @('OK','Unknown') } | Select-Object Status,Class,FriendlyName,InstanceId,Problem)
    $pnpRelevant = @($allPnp | Where-Object {
        $_.Class -in @('Display','Net','Bluetooth','AudioEndpoint','MEDIA','Keyboard','Mouse','HIDClass','System') -and
        ($_.FriendlyName -match 'Intel|Realtek|Bluetooth|Wi-Fi|Wireless|Touchpad|Synaptics|ELAN|Keyboard|Audio|Speaker|Microphone|Display|Hotkey|HP')
    } | Select-Object Status,Class,FriendlyName,InstanceId,Problem)
}
$pnpIssues | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $backup 'DeviceManagerIssues.json') -Encoding UTF8
$pnpRelevant | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $backup 'ProtectedHardwareDeviceStatus.json') -Encoding UTF8

$cpuSamples = [System.Collections.Generic.List[double]]::new()
for ($i=0; $i -lt 8; $i++) {
    $sample = Get-CimInstance Win32_Processor | Measure-Object -Property LoadPercentage -Average
    $cpuSamples.Add([double]$sample.Average)
    Start-Sleep -Seconds 1
}
$os = Get-CimInstance Win32_OperatingSystem
$usedKiB = [double]$os.TotalVisibleMemorySize - [double]$os.FreePhysicalMemory
$currentResources = [ordered]@{
    CollectedAt=(Get-Date).ToString('o')
    IsTruePostRestartBaseline=$false
    Note='Approved startup items were not stopped; no sign-out or restart has occurred. These readings are informational, not the final after-startup comparison.'
    CPUPercentSamples=@($cpuSamples)
    CPUPercentAverage=[math]::Round((($cpuSamples | Measure-Object -Average).Average),1)
    RAMUsedGiB=[math]::Round($usedKiB/1MB,2)
    RAMTotalGiB=[math]::Round(([double]$os.TotalVisibleMemorySize)/1MB,2)
    RAMUsedPercent=[math]::Round(($usedKiB/[double]$os.TotalVisibleMemorySize)*100,1)
}
$currentResources | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $backup 'CurrentResourcesBeforeRestart.json') -Encoding UTF8

$gameBar = Get-ItemProperty -LiteralPath 'HKCU:\Software\Microsoft\GameBar' -ErrorAction SilentlyContinue
$gameDvr = Get-ItemProperty -LiteralPath 'HKCU:\Software\Microsoft\Windows\CurrentVersion\GameDVR' -ErrorAction SilentlyContinue
$gameConfig = Get-ItemProperty -LiteralPath 'HKCU:\System\GameConfigStore' -ErrorAction SilentlyContinue
$processes = @(Get-Process -ErrorAction SilentlyContinue)
$browserProcesses = @($processes | Where-Object ProcessName -match '^(msedge|chrome|brave|opera|firefox)$' | Select-Object ProcessName,Id,@{n='WorkingSetMiB';e={[math]::Round($_.WorkingSet64/1MB,1)}})
$overlayProcesses = @($processes | Where-Object ProcessName -match 'discord|medal|screenrec|gamebar|xbox|obs|steam|overwolf|powertoys|seelen|ollama' | Select-Object ProcessName,Id,@{n='WorkingSetMiB';e={[math]::Round($_.WorkingSet64/1MB,1)}})
$disk = @(Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' | Select-Object DeviceID,VolumeName,@{n='SizeGiB';e={[math]::Round($_.Size/1GB,1)}},@{n='FreeGiB';e={[math]::Round($_.FreeSpace/1GB,1)}},@{n='FreePercent';e={if ($_.Size) {[math]::Round(($_.FreeSpace/$_.Size)*100,1)}}})
$gpu = @(Get-CimInstance Win32_VideoController | Select-Object Name,Status,DriverVersion,DriverDate,PNPDeviceID)
$updateHistory = @()
try {
    $session = New-Object -ComObject Microsoft.Update.Session
    $searcher = $session.CreateUpdateSearcher()
    $count = $searcher.GetTotalHistoryCount()
    if ($count -gt 0) {
        $updateHistory = @($searcher.QueryHistory(0,[math]::Min(10,$count)) | Select-Object Date,Title,ResultCode,HResult)
    }
} catch {
    $updateHistory = @([pscustomobject]@{Error=$_.Exception.Message})
}
$uninstallRoots = @('HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*','HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*','HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*')
$tacInstalled = @(Get-ItemProperty $uninstallRoots -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName -match 'TAC|GameLoop|Tencent|Android Emulator' } | Select-Object DisplayName,DisplayVersion,Publisher,InstallLocation)
$tacServices = @(Get-CimInstance Win32_Service | Where-Object { $_.Name -match 'TAC|GameLoop|Tencent|AOW' -or $_.DisplayName -match 'TAC|GameLoop|Tencent' } | Select-Object Name,DisplayName,State,StartMode,PathName)
$tacProcesses = @(Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'TAC|GameLoop|Tencent|AndroidEmulator|aow|AppMarket|QMEmulator' -or $_.ExecutablePath -match 'TAC|GameLoop|Tencent' } | Select-Object Name,ProcessId,ExecutablePath,CommandLine)
$gaming = [ordered]@{
    CollectedAt=(Get-Date).ToString('o')
    PowerPlan=((& powercfg /getactivescheme 2>&1 | Out-String).Trim())
    GameMode=[ordered]@{AutoGameModeEnabled=$gameBar.AutoGameModeEnabled; AllowAutoGameMode=$gameBar.AllowAutoGameMode}
    XboxBackgroundRecording=[ordered]@{AppCaptureEnabled=$gameDvr.AppCaptureEnabled; GameDVR_Enabled=$gameConfig.GameDVR_Enabled; HistoricalCaptureEnabled=$gameDvr.HistoricalCaptureEnabled}
    BrowserProcesses=$browserProcesses
    OverlayAndRecorderProcesses=$overlayProcesses
    DiskSpace=$disk
    GPU=$gpu
    RecentWindowsUpdateHistory=$updateHistory
    TACOrGameLoopInstalledPrograms=$tacInstalled
    TACOrGameLoopServices=$tacServices
    TACOrGameLoopProcesses=$tacProcesses
}
$gaming | ConvertTo-Json -Depth 9 | Set-Content -LiteralPath (Join-Path $backup 'GamingRelatedChecks.json') -Encoding UTF8

$summary = [ordered]@{
    VerifiedApprovedDisabled=(@($approvedVerification | Where-Object Verified)).Count
    ApprovedVerificationTotal=$approvedVerification.Count
    ApprovedVerification=$approvedVerification
    ProtectedStartupEntries=$protectedVerification
    DeviceManagerIssueCount=$pnpIssues.Count
    RelevantProtectedDeviceCount=$pnpRelevant.Count
    CurrentCPUPercentAverage=$currentResources.CPUPercentAverage
    CurrentRAMUsedGiB=$currentResources.RAMUsedGiB
    CurrentRAMUsedPercent=$currentResources.RAMUsedPercent
    BrowserProcessCount=$browserProcesses.Count
    OverlayProcessCount=$overlayProcesses.Count
    TACInstalledCount=$tacInstalled.Count
    TACServiceCount=$tacServices.Count
    TACProcessCount=$tacProcesses.Count
}
$summary | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $backup 'VerificationSummary.json') -Encoding UTF8
$summary | ConvertTo-Json -Depth 8
