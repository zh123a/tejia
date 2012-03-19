@echo off
pushd "%~dp0"
set ANT="%~dp0tools\ant\bin\ant.bat"
call %ANT% -file build-compress.xml
pause
exit