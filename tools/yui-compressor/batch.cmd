@echo off

REM YUI Compressor batch Script
REM
REM @author	<fahai@taobao.com>
REM @version	1.0 build 2011-1-19

SETLOCAL ENABLEEXTENSIONS

:set_path
set INIT=%~dp0init.cmd
goto main

:main
echo YUI Compressor Batch
echo ====================
goto loop

:loop
call %INIT% %1
shift
if %1 == "" goto end
goto loop

:end
echo Exit batch.
ENDLOCAL
