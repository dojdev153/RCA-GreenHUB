$ErrorActionPreference = 'Continue'
$backup = 'C:\Users\Public\StartupOptimizationBackup'
$targets = @(
    @{ Name='Adobe Creative Cloud'; Path='\'; Source='Task Scheduler logon trigger' },
    @{ Name='OneDrive Startup Task-S-1-5-21-4195380835-319858697-2364398054-1001'; Path='\'; Source='Task Scheduler logon trigger' },
    @{ Name='Seelen UI Service'; Path='\Seelen\'; Source='Task Scheduler logon trigger' }
)
$results = [System.Collections.Generic.List[object]]::new()
$log = [System.Collections.Generic.List[string]]::new()
foreach ($target in $targets) {
    try {
        $before = Get-ScheduledTask -TaskName $target.Name -TaskPath $target.Path -ErrorAction Stop
        Disable-ScheduledTask -TaskName $target.Name -TaskPath $target.Path -ErrorAction Stop | Out-Null
        $after = Get-ScheduledTask -TaskName $target.Name -TaskPath $target.Path -ErrorAction Stop
        if ($after.Settings.Enabled) { throw 'Task still reports Enabled after the elevated disable request.' }
        $results.Add([pscustomobject]@{Item=($target.Path+$target.Name); Success=$true; OriginalState=if ($before.Settings.Enabled) {"Enabled ($($before.State))"} else {'Already disabled'}; NewState='Disabled'; Error=$null})
        $log.Add('')
        $log.Add("Item name: $($target.Path)$($target.Name)")
        $log.Add("Original state: Enabled ($($before.State))")
        $log.Add('New state: Disabled')
        $log.Add("Startup source: $($target.Source)")
        $log.Add("Command or method used: Elevated Disable-ScheduledTask -TaskName '$($target.Name)' -TaskPath '$($target.Path)'; task retained")
        $log.Add("Date and time: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))")
        $log.Add('How to restore it: Run C:\Users\Public\StartupOptimizationBackup\RestoreApprovedStartupChanges.ps1 as administrator or enable the task in Task Scheduler.')
    } catch {
        $results.Add([pscustomobject]@{Item=($target.Path+$target.Name); Success=$false; OriginalState='Unknown/unchanged'; NewState='Unchanged / failed'; Error=$_.Exception.Message})
    }
}
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $backup 'ElevatedTaskChangeResults.json') -Encoding UTF8
if ($log.Count) { Add-Content -LiteralPath (Join-Path $backup 'ChangesMade.txt') -Value $log -Encoding UTF8 }
exit $(if (@($results | Where-Object {-not $_.Success}).Count) {1} else {0})
