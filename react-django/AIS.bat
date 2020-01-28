@ECHO OFF
:::---------------------------------------------
::: Welcome to Alex's Initialiser Script^!
::: Pls code responsibly^!^! 
::: ‹…’c‚Ì‰ïˆõ‚½‚¿‚ª‚Ç‚±‚ÉZ‚ñ‚Å‚é‚ª’m‚Á‚Ä‚é ( :
:::---------------------------------------------

setlocal EnableDelayedExpansion
FOR /f "delims=: tokens=*" %%A in ('findstr /b ::: "%~f0"') do @echo(%%A
FOR /f %%a in ('copy "%~f0" nul /z') do SET "CR=%%a"
PAUSE
set "spin=/-\|"
ECHO Installing dependancies...
CALL CMD /C "npm i"
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error installing NPM dependancies, please resolve!
    PAUSE
    EXIT /B
)
CALL CMD /C "pipenv run pipenv install" 
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error installing Python dependancies, please resolve!
    PAUSE
    EXIT /B
)
ECHO Starting servers...
START CMD /k "npm run dev"
START CMD /K "pipenv run python ./base/manage.py migrate && pipenv run python ./base/manage.py runserver & pipenv shell"
FOR /L %%n in (1,2,10) DO (
    call :spinner
    ping localhost -n 2 > nul
)
ECHO Everything initialised successfully^^! Compile errors are independant of initialisation.
PAUSE
EXIT /B
:spinner
set /a "spinner=(spinner + 1) %% 4"
set "spinChars=\|/-"
<nul set /p ".=Initialising !spinChars:~%spinner%,1!!CR!"

