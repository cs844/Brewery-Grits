@echo off
echo ===================================================
echo Pushing Brewery Grits files to GitHub...
echo ===================================================
cd /d "C:\Users\Pranoti\Downloads\Brewery-Grits-Website"
"C:\Users\Pranoti\AppData\Local\Programs\Git\cmd\git.exe" push -u origin main
echo.
echo ===================================================
echo If push succeeded, go back to Vercel and click Deploy!
echo ===================================================
pause
