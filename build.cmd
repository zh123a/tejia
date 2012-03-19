@echo off
pushd "%~dp0"
set ANT="%~dp0tools\ant\bin\ant.bat"
call %ANT% build
pause
exit