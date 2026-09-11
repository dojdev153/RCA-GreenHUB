$ErrorActionPreference = 'Stop'
$backup = 'C:\Users\Public\StartupOptimizationBackup'

function Meta([string]$Group, [string]$Impact, [string]$Purpose, [string]$Recommendation, [string]$Risk, [string]$Reason) {
    [pscustomobject]@{ Group=$Group; Impact=$Impact; Purpose=$Purpose; Recommendation=$Recommendation; Risk=$Risk; Reason=$Reason }
}

$m = @{}
$m['Spotify'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Music streaming client.' 'Leave disabled.' 'Low' 'No need to load the client at every sign-in.'
$m['Figma Agent'] = Meta 'B. SAFE TO DISABLE' 'Low' 'Figma local-font and desktop integration agent.' 'Leave disabled.' 'Low' 'Starts on demand when Figma integration is needed.'
$m['ScreenRec'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Screen recorder and sharing utility.' 'Leave disabled.' 'Low' 'Recording hooks can consume resources and are unnecessary for gaming unless actively used.'
$m['KRLauncher_G143_4'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Punishing Gray Raven game launcher.' 'Leave disabled.' 'Low' 'A game launcher can be opened manually.'
$m['Discord'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Messaging, voice chat, and optional game overlay.' 'Leave disabled.' 'Low' 'Can be opened manually when voice chat is needed.'
$m['IDM trial reset'] = Meta 'D. DO NOT TOUCH' 'Unknown' 'Unsigned trial-reset executable launched from Downloads.' 'Do not enable or run; inspect separately with Windows Security.' 'High' 'Persistence from Downloads and unclear provenance are suspicious; it is already disabled.'
$m['electron.app.BlueStacks Services'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'BlueStacks companion services application.' 'Leave disabled.' 'Low' 'Not required unless using BlueStacks features.'
$m['Docker Desktop'] = Meta 'C. ASK BEFORE DISABLING' 'High' 'Container-development environment.' 'Leave disabled unless automatic container startup is required.' 'Medium' 'Developer workflows may depend on containers at sign-in.'
$m['CCXProcess'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Adobe Creative Cloud experience helper.' 'Leave disabled.' 'Low' 'Adobe apps remain launchable manually.'
$m['electron.app.LM Studio'] = Meta 'C. ASK BEFORE DISABLING' 'High' 'Local AI model server/client.' 'Leave disabled unless its local API must start automatically.' 'Medium' 'Developer or AI workflows may depend on an always-running local endpoint.'
$m['OneDrive'] = Meta 'C. ASK BEFORE DISABLING' 'Medium' 'Microsoft cloud file synchronization.' 'Decision required: keep for continuous sync or disable startup as a bundle.' 'Medium' 'Disabling startup pauses automatic sync until OneDrive is opened.'
$m['Microsoft.Lists'] = Meta 'C. ASK BEFORE DISABLING' 'Medium' 'Microsoft OneDrive synchronization component registered under a Lists label.' 'Decision required together with OneDrive.' 'Medium' 'It is Microsoft-signed and may participate in file/list synchronization.'
$m['Adobe Acrobat Synchronizer'] = Meta 'B. SAFE TO DISABLE' 'Low' 'Adobe document collaboration synchronizer.' 'Leave disabled.' 'Low' 'Core PDF viewing works without sign-in startup.'
$m['Proton VPN'] = Meta 'C. ASK BEFORE DISABLING' 'Medium' 'VPN client launcher.' 'Leave disabled unless VPN must connect automatically.' 'Medium' 'Network privacy or work access may depend on automatic VPN startup.'
$m['RiotClient'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Riot game launcher background mode.' 'Leave disabled.' 'Low' 'Can start with a Riot game when needed.'
$m['Teams'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Microsoft Teams client.' 'Leave disabled.' 'Low' 'Can be opened manually for calls or chat.'
$m['Medal'] = Meta 'B. SAFE TO DISABLE' 'High' 'Game clipping, recording, and overlay application.' 'Disable this enabled startup entry.' 'Low' 'Recording and overlay processes are avoidable gaming overhead; manual launch remains available.'
$m['LoadingBayInstaller'] = Meta 'D. DO NOT TOUCH' 'Unknown' 'LoadingBay auto-installer/launcher entry; related service is signed by NetEase.' 'Leave disabled; no automatic change.' 'Medium' 'The target has an unusual extensionless path and its exact role is unclear.'
$m['MuMuPlayerGlobal'] = Meta 'B. SAFE TO DISABLE' 'High' 'NetEase MuMu Android emulator launcher.' 'Disable automatic startup.' 'Low' 'An alternate emulator does not need to run when gaming through TAC and remains manually launchable.'
$m['utweb'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'uTorrent Web client.' 'Leave disabled.' 'Low' 'Background downloading can contend for disk, network, and CPU.'
$m['MicrosoftEdgeAutoLaunch_AC3B7AF181558E407F159DB8A5D4AA84'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Microsoft Edge session auto-launch.' 'Leave disabled.' 'Low' 'Edge launches normally when requested.'
$m['com.squirrel.medal.medal'] = Meta 'B. SAFE TO DISABLE' 'High' 'Second Medal game recording/overlay startup registration.' 'Disable this enabled startup entry together with Medal.' 'Low' 'Both Medal registrations should be disabled to prevent recorder startup.'
$m['NeatDM'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Neat Download Manager integration.' 'Disable automatic startup.' 'Low' 'The download manager can be started manually.'
$m['IDMan'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Internet Download Manager startup client.' 'Disable automatic startup.' 'Low' 'The application and browser integration can start on demand.'
$m['com.squirrel.slack.slack'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Slack messaging client.' 'Disable automatic startup.' 'Low' 'Slack remains manually launchable; notifications will wait until it is opened.'
$m['SecurityHealth'] = Meta 'A. KEEP ENABLED' 'Low' 'Windows Security notification icon and health alerts.' 'Keep enabled.' 'High if disabled' 'Security notifications are protected by the user safety rules.'
$m['RtkAudUService'] = Meta 'D. DO NOT TOUCH' 'Low' 'Realtek audio background component in the Windows driver store.' 'Do not change automatically; note that it was already disabled before this audit.' 'High' 'Changing it can affect audio features and violates the hardware safety boundary.'
$m['AdobeAAMUpdater-1.0'] = Meta 'B. SAFE TO DISABLE' 'Low' 'Legacy Adobe application updater launcher.' 'Leave disabled.' 'Low' 'Adobe applications can check for updates when opened; no change is proposed.'
$m['AdobeGCInvoker-1.0'] = Meta 'D. DO NOT TOUCH' 'Low' 'Adobe Genuine licensing/integrity helper.' 'Leave in its existing disabled state; no automatic change.' 'Medium' 'Licensing/integrity behavior should not be altered without a specific reason.'
$m['Everything'] = Meta 'B. SAFE TO DISABLE' 'Low' 'Everything file-search user interface.' 'Leave this UI startup entry disabled; do not change its service.' 'Low' 'Search UI can open manually; service changes are out of scope.'
$m['PenTablet'] = Meta 'A. KEEP ENABLED' 'Low' 'XPPen tablet controls, mappings, and pressure features.' 'Keep enabled.' 'High if disabled' 'It is a device-support utility and may be required for tablet input.'
$m['CheckNDISPortFFacFF'] = Meta 'D. DO NOT TOUCH' 'Low' 'ZTE 4G mobile-hotspot/network adapter helper.' 'Leave in its existing disabled state; do not change automatically.' 'High' 'Networking hardware support is protected by the safety rules.'
$m['CancelAutoPlay_df'] = Meta 'D. DO NOT TOUCH' 'Low' 'ZTE 4G modem AutoPlay helper.' 'Leave in its existing disabled state; do not change automatically.' 'High' 'It is associated with networking hardware.'
$m['Adobe CCXProcess'] = Meta 'B. SAFE TO DISABLE' 'Medium' '32-bit Adobe Creative Cloud experience helper.' 'Leave disabled.' 'Low' 'Adobe applications remain available manually.'
$m['Comet.lnk'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Perplexity Comet browser shortcut.' 'Leave disabled.' 'Low' 'The browser can be opened manually.'
$m['Ollama.lnk'] = Meta 'C. ASK BEFORE DISABLING' 'High' 'Local AI model runtime/application.' 'Decision required: keep if local models/API should be available immediately.' 'Medium' 'Development or AI tools may depend on Ollama running.'
$m['Send to OneNote.lnk'] = Meta 'B. SAFE TO DISABLE' 'Low' 'OneNote quick-send tray helper.' 'Leave disabled.' 'Low' 'OneNote itself remains available.'
$m['desktop.ini'] = Meta 'D. DO NOT TOUCH' 'None' 'Windows folder metadata; not an executable startup application.' 'Do nothing.' 'Low' 'It does not launch a process and should not be deleted.'

$tm = @{}
$tm['\Adobe Acrobat Update Task'] = Meta 'A. KEEP ENABLED' 'Low' 'Adobe Acrobat security and feature updater.' 'Keep enabled.' 'Medium if disabled' 'The task description explicitly includes security fixes.'
$tm['\Adobe Creative Cloud'] = Meta 'B. SAFE TO DISABLE' 'Medium' 'Adobe Creative Cloud desktop client at logon.' 'Disable this logon task.' 'Low' 'Creative Cloud applications remain manually launchable.'
$tm['\OneDrive Startup Task-S-1-5-21-4195380835-319858697-2364398054-1001'] = Meta 'C. ASK BEFORE DISABLING' 'Medium' 'OneDrive per-user startup task.' 'Decision required together with the two OneDrive Run entries.' 'Medium' 'Automatic cloud synchronization may be required.'
$tm['\Opera scheduled assistant Autoupdate 1729705274'] = Meta 'A. KEEP ENABLED' 'Low' 'Opera assistant updater.' 'Keep enabled.' 'Medium if disabled' 'Browser-related security updates should remain available.'
$tm['\Opera scheduled Autoupdate 1729705272'] = Meta 'A. KEEP ENABLED' 'Low' 'Opera browser updater.' 'Keep enabled.' 'Medium if disabled' 'Browser security updates should remain available.'
$tm['\PowerToys\Autorun for HP'] = Meta 'C. ASK BEFORE DISABLING' 'Medium' 'Microsoft PowerToys utilities, remapping, and shortcuts.' 'Decision required; keep if any PowerToys shortcuts or tools are used.' 'Medium' 'Disabling startup can remove user-configured keyboard and productivity behavior.'
$tm['\Seelen\Seelen UI Service'] = Meta 'C. ASK BEFORE DISABLING' 'Medium' 'Seelen custom Windows desktop/UI service.' 'Decision required; keep if the custom desktop interface is used.' 'Medium' 'Disabling may visibly change desktop, taskbar, or window behavior.'

$rows = [System.Collections.Generic.List[object]]::new()
$startup = Get-Content -Raw (Join-Path $backup 'StartupItemsCombined.json') | ConvertFrom-Json
foreach ($item in $startup) {
    $mdata = $m[$item.Name]
    if (-not $mdata) { $mdata = Meta 'D. DO NOT TOUCH' 'Unknown' 'Purpose not confidently established.' 'No automatic change.' 'High' 'Uncertainty requires leaving it unchanged.' }
    $rows.Add([pscustomobject][ordered]@{
        'Startup item name'=$item.Name
        'Publisher'=if ($item.Publisher) {$item.Publisher} else {'Unknown / not resolved'}
        'Executable path'=if ($item.ExecutablePath) {$item.ExecutablePath} else {$item.Command}
        'Startup source'=$item.Source
        'Current enabled/disabled status'=$item.Status
        'Impact estimate'=$mdata.Impact
        'Purpose'=$mdata.Purpose
        'Classification'=$mdata.Group
        'Recommendation'=$mdata.Recommendation
        'Risk level'=$mdata.Risk
        'Reason for recommendation'=$mdata.Reason
    })
}

$tasks = Get-Content -Raw (Join-Path $backup 'LogonScheduledTasks.json') | ConvertFrom-Json
foreach ($task in $tasks) {
    $full = "$($task.TaskPath)$($task.TaskName)"
    $mdata = $tm[$full]
    if (-not $mdata) {
        if ($full.StartsWith('\Microsoft\')) {
            $mdata = Meta 'D. DO NOT TOUCH' 'Low' 'Microsoft Windows or Office logon task.' 'Keep its existing state; no change.' 'High' 'The safety rules exclude Microsoft and system-maintenance scheduled tasks.'
        } else {
            $mdata = Meta 'D. DO NOT TOUCH' 'Unknown' 'Logon task with insufficiently clear purpose.' 'No automatic change.' 'High' 'Uncertain tasks must remain unchanged.'
        }
    }
    $actions = @($task.Actions | ForEach-Object { ("$($_.Execute) $($_.Arguments)").Trim() }) -join ' | '
    $rows.Add([pscustomobject][ordered]@{
        'Startup item name'=$full
        'Publisher'=if ($task.Author) {$task.Author} else {'Microsoft/system task (author field blank)'}
        'Executable path'=if ($actions) {$actions} else {'COM/system handler (no executable path exposed)'}
        'Startup source'='Task Scheduler logon trigger'
        'Current enabled/disabled status'=if ($task.Enabled) {"Enabled ($($task.State))"} else {'Disabled'}
        'Impact estimate'=$mdata.Impact
        'Purpose'=$mdata.Purpose
        'Classification'=$mdata.Group
        'Recommendation'=$mdata.Recommendation
        'Risk level'=$mdata.Risk
        'Reason for recommendation'=$mdata.Reason
    })
}

$csvPath = Join-Path $backup 'StartupAuditReport.csv'
$rows | Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding UTF8

function Escape-Md([AllowNull()][string]$s) {
    if ($null -eq $s) { return '' }
    return ($s -replace '\|','\|' -replace "`r?`n", ' ')
}
$md = [System.Collections.Generic.List[string]]::new()
$md.Add('# Startup Optimization Audit')
$md.Add('')
$md.Add("Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')")
$md.Add('')
$md.Add('No startup configuration changes were made. Current disabled states shown here predate this audit.')
$md.Add('')
$md.Add('| Startup item name | Publisher | Executable path | Startup source | Current status | Impact | Purpose | Classification | Recommendation | Risk | Reason |')
$md.Add('|---|---|---|---|---|---|---|---|---|---|---|')
foreach ($row in $rows) {
    $md.Add('| ' + (@(
        (Escape-Md $row.'Startup item name'), (Escape-Md $row.Publisher), (Escape-Md $row.'Executable path'),
        (Escape-Md $row.'Startup source'), (Escape-Md $row.'Current enabled/disabled status'), (Escape-Md $row.'Impact estimate'),
        (Escape-Md $row.Purpose), (Escape-Md $row.Classification), (Escape-Md $row.Recommendation),
        (Escape-Md $row.'Risk level'), (Escape-Md $row.'Reason for recommendation')
    ) -join ' | ') + ' |')
}
$md | Set-Content -LiteralPath (Join-Path $backup 'StartupAuditReport.md') -Encoding UTF8

$enabledRows = @($rows | Where-Object { $_.'Current enabled/disabled status' -like 'Enabled*' })
$enabledRows | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $backup 'AllCurrentlyEnabledStartupApplications.json') -Encoding UTF8

$services = Get-Content -Raw (Join-Path $backup 'ThirdPartyAutomaticServices.json') | ConvertFrom-Json
$services | Export-Csv -LiteralPath (Join-Path $backup 'ThirdPartyAutomaticServices.csv') -NoTypeInformation -Encoding UTF8

$proposed = @($rows | Where-Object {
    $_.'Current enabled/disabled status' -like 'Enabled*' -and $_.Classification -eq 'B. SAFE TO DISABLE' -and $_.Recommendation -like 'Disable*'
})
$decisions = @($rows | Where-Object { $_.'Current enabled/disabled status' -like 'Enabled*' -and $_.Classification -eq 'C. ASK BEFORE DISABLING' })
$kept = @($rows | Where-Object { $_.'Current enabled/disabled status' -like 'Enabled*' -and $_.Classification -in @('A. KEEP ENABLED','D. DO NOT TOUCH') })

$plan = [System.Collections.Generic.List[string]]::new()
$plan.Add('PROPOSED STARTUP CHANGES - NOT YET APPLIED')
$plan.Add("Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')")
$plan.Add('')
$plan.Add('Recommended to disable after explicit approval:')
foreach ($r in $proposed) { $plan.Add("- $($r.'Startup item name') [$($r.'Startup source')] - risk $($r.'Risk level'); $($r.'Reason for recommendation')") }
$plan.Add('')
$plan.Add('Decision required:')
foreach ($r in $decisions) { $plan.Add("- $($r.'Startup item name') [$($r.'Startup source')] - $($r.Recommendation)") }
$plan.Add('')
$plan.Add('Enabled items deliberately protected/kept:')
foreach ($r in $kept) { $plan.Add("- $($r.'Startup item name') [$($r.'Startup source')] - $($r.Recommendation)") }
$plan | Set-Content -LiteralPath (Join-Path $backup 'ProposedChanges.txt') -Encoding UTF8

# Establish a short, read-only baseline for later before/after comparison.
$cpuSamples = [System.Collections.Generic.List[double]]::new()
for ($i=0; $i -lt 8; $i++) {
    $sample = Get-CimInstance Win32_Processor | Measure-Object -Property LoadPercentage -Average
    $cpuSamples.Add([double]$sample.Average)
    Start-Sleep -Seconds 1
}
$os = Get-CimInstance Win32_OperatingSystem
$usedKiB = [double]$os.TotalVisibleMemorySize - [double]$os.FreePhysicalMemory
$perf = [ordered]@{
    CollectedAt=(Get-Date).ToString('o')
    SamplingNote='Eight Win32_Processor LoadPercentage readings at one-second intervals; system was not forced idle.'
    CPUPercentSamples=@($cpuSamples)
    CPUPercentAverage=[math]::Round((($cpuSamples | Measure-Object -Average).Average),1)
    RAMUsedGiB=[math]::Round($usedKiB/1MB,2)
    RAMTotalGiB=[math]::Round(([double]$os.TotalVisibleMemorySize)/1MB,2)
    RAMUsedPercent=[math]::Round(($usedKiB/[double]$os.TotalVisibleMemorySize)*100,1)
}
$perf | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $backup 'BeforeIdleResourceBaseline.json') -Encoding UTF8

[pscustomobject]@{
    TotalAuditRows=$rows.Count
    ProposedDisableCount=$proposed.Count
    DecisionCount=$decisions.Count
    ProtectedEnabledCount=$kept.Count
    CPUAveragePercent=$perf.CPUPercentAverage
    RAMUsedGiB=$perf.RAMUsedGiB
    RAMUsedPercent=$perf.RAMUsedPercent
} | ConvertTo-Json
