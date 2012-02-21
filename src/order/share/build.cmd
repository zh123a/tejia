@echo off
pushd "%~dp0"
set ANT="%~dp0..\..\..\tools\ant\bin\ant.bat"
call %ANT% build
pause
exit