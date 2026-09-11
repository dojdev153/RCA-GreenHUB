$ErrorActionPreference = 'Continue'
$backup = 'C:\Users\Public\StartupOptimizationBackup'
$statePath = Join-Path $backup 'ApprovedItemBackups\ApprovedStartupOriginalStates.json'
if (-not (Test-Path -LiteralPath $statePath)) { throw "Original-state backup not found: $statePath" }

$state = Get-Content -Raw -LiteralPath $statePath | ConvertFrom-Json
$results = [System.Collections.Generic.List[object]]::new()

foreach ($entry in $state.StartupApprovedValues) {
    try {
        if (-not (Test-Path -LiteralPath $entry.RegistryKey)) { New-Item -Path $entry.RegistryKey -Force | Out-Null }
        if ($entry.OriginalValueExisted -and $entry.OriginalDataBase64) {
            $data = [Convert]::FromBase64String($entry.OriginalDataBase64)
            $method = 'Restored the exact original StartupApproved binary value.'
        } else {
            # Preserve the no-registry-deletion safety rule while restoring enabled behavior.
            $data = [byte[]](0x02,0,0,0,0,0,0,0,0,0,0,0)
            $method = 'Set StartupApproved to Enabled; the original state had no approval value, which is functionally enabled.'
        }
        New-ItemProperty -LiteralPath $entry.RegistryKey -Name $entry.Name -PropertyType Binary -Value $data -Force -ErrorAction Stop | Out-Null
        $results.Add([pscustomobject]@{Item=$entry.Name; Restored=$true; Method=$method; Error=$null})
    } catch {
        $results.Add([pscustomobject]@{Item=$entry.Name; Restored=$false; Method='StartupApproved restore'; Error=$_.Exception.Message})
    }
}

foreach ($entry in $state.ScheduledTasks) {
    try {
        if (-not $entry.Found) { throw 'The task was not present when the backup was captured.' }
        if ($entry.OriginalEnabled) {
            Enable-ScheduledTask -TaskName $entry.Name -TaskPath $entry.TaskPath -ErrorAction Stop | Out-Null
            $method = 'Enable-ScheduledTask'
        } else {
            Disable-ScheduledTask -TaskName $entry.Name -TaskPath $entry.TaskPath -ErrorAction Stop | Out-Null
            $method = 'Disable-ScheduledTask (original state was disabled)'
        }
        $results.Add([pscustomobject]@{Item=($entry.TaskPath+$entry.Name); Restored=$true; Method=$method; Error=$null})
    } catch {
        $results.Add([pscustomobject]@{Item=($entry.TaskPath+$entry.Name); Restored=$false; Method='Scheduled-task restore'; Error=$_.Exception.Message})
    }
}

$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $backup 'RestorationResults.json') -Encoding UTF8
$results | Format-Table -AutoSize
