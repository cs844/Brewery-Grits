@echo off
echo ===================================================
echo Pushing latest Brewery Grits updates to GitHub...
echo ===================================================
cd /d "C:\Users\Pranoti\Downloads\Brewery-Grits-Website"
"C:\Users\Pranoti\AppData\Local\Programs\Git\cmd\git.exe" push origin main --force
echo.
echo ===================================================
echo SUCCESS! Pushed to GitHub.
echo Vercel will now automatically deploy the live site!
echo Check: https://brewery-grits.vercel.app/
echo ===================================================
pause
