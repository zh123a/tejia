@echo off

set TOOL=YUI Compressor

pushd "%~dp0"
rundll32 setupapi.dll,InstallHinfSection DefaultInstall 128 .\install.inf
popd

echo %TOOL% successfully installed.
pause
