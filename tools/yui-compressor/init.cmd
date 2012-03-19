@echo off

REM YUI Compressor CMD Script
REM
REM @author	<yubo@taobao.com>, <fahai@taobao.com>
REM @version	1.2 build 2009-02-12

SETLOCAL ENABLEEXTENSIONS

:switch_dir
cd /d %~dp1
goto main

:main
echo YUI Compressor
echo ==============
goto input_filter

:input_filter
REM Check file extensions.
if "%~x1" NEQ ".js" (
	if "%~x1" NEQ ".css" (
		goto no_file
	)
)

REM Check environment.
if "%JAVA_HOME%" == "" goto no_java_home
if not exist "%JAVA_HOME%\bin\java.exe" goto no_java_home
if not exist "%JAVA_HOME%\bin\native2ascii.exe" goto no_java_home
goto output_filter

:output_filter
REM Get compressed file name:
REM 1. filename.source.js -> filename.js
REM 2. filename.js -> filename-min.js
set RESULT_FILE=%~n1-min%~x1
dir /b "%~f1" | find ".source." > nul
if %ERRORLEVEL% == 0 (
	for %%a in ("%~n1") do (
		set RESULT_FILE=%%~na%~x1
	)
)
goto compress

:compress
"%JAVA_HOME%\bin\java.exe" -jar "%~dp0yuicompressor.jar" --charset GB18030 "%~nx1" -o "%RESULT_FILE%"
goto fix_encoding

:fix_encoding
REM When the encoding in js file is different form that in page, non-ascii chars will cause problem.
REM 1. For js files, call native2ascii.exe and escape non-ascii chars to \uxxxx
copy /y "%RESULT_FILE%" "%RESULT_FILE%.tmp" > nul
"%JAVA_HOME%\bin\native2ascii.exe" -encoding GB18030 "%RESULT_FILE%.tmp" "%RESULT_FILE%"
del /q "%RESULT_FILE%.tmp"

REM 2. For css files, replace \uxxxx with \xxxx
REM if "%~x1" == ".css"
goto print_result

:print_result
if %ERRORLEVEL% == 0 (
	echo Compress %~nx1 to %RESULT_FILE%.
	for %%a in ("%RESULT_FILE%") do (
		echo The file is compressed from %~z1 bytes to %%~za bytes
	)
	goto bonus
) else (
	echo There are syntax errors in %~nx1.
	goto end
)

:bonus
find /i "taobao.net" "%RESULT_FILE%" > nul
if %ERRORLEVEL% == 0 (
	echo "taobao.net" found in %~nx1.
)
goto end

:no_java_home
echo JRE not found.
goto end

:no_file
echo Only js and css files are accepted.
goto end

:end
echo Exit.
ENDLOCAL
