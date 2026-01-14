# 简单杀掉 node 和 electron 进程
$ErrorActionPreference = 'SilentlyContinue'

$ports = @(5173, 5174)
for ($p = 15173; $p -le 15199; $p += 1) {
    $ports += $p
}

$netstatLines = netstat -ano -p tcp 2>$null

$pids = foreach ($port in $ports) {
    foreach ($line in $netstatLines) {
        if ($line -match "LISTENING" -and $line -match "[:\]]$port\s") {
            ($line -split "\s+")[-1]
        }
    }
}

$pids = $pids | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique
foreach ($pid in $pids) {
    taskkill /F /PID $pid 2>$null | Out-Null
}

taskkill /F /IM electron.exe 2>$null | Out-Null

Write-Host "Done"
exit 0
