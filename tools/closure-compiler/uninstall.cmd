@echo off

set TOOL=Closure Compiler

pushd "%~dp0"
rundll32 setupapi.dll,InstallHinfSection DefaultUnInstall 128 .\install.inf
popd

echo %TOOL% successfully uninstalled.
pause
