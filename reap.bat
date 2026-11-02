@echo off
REM ========================================================
REM Verapay Process Reaper CLI Wrapper (CMD / PowerShell)
REM ========================================================
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0reap.ps1" %*
exit /b %ERRORLEVEL%
