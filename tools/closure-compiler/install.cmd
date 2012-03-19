@echo off

set TOOL=Closure Compiler

pushd "%~dp0"
rundll32 setupapi.dll,InstallHinfSection DefaultInstall 128 .\install.inf
popd

echo %TOOL% successfully installed.
pause
