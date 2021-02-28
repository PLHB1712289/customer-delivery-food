@echo off
echo d | xcopy .\export\lang_VN.json ..\..\src\resources\lang\ /y/f/r
echo d | xcopy .\export\lang_EN.json ..\..\src\resources\lang\ /y/f/r
echo DONE

pause