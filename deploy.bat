@echo off
echo.
echo ========================================
echo   Election Process Educator AI
echo   Quick Deployment Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo [*] Initializing Git repository...
    git init
    echo [+] Git initialized
) else (
    echo [+] Git already initialized
)

echo.
echo [*] Adding files to Git...
git add .
echo [+] Files added

echo.
echo [*] Committing changes...
git commit -m "Deploy: Election Process Educator AI with impressive UI"
echo [+] Changes committed

echo.
echo [*] Checking remote...
git remote -v

echo.
echo [*] Pushing to GitHub...
git branch -M main
git push -u origin main
echo [+] Pushed to GitHub

echo.
echo [*] Building for production...
call npm run build
echo [+] Build complete

echo.
echo ========================================
echo   Deployment preparation complete!
echo ========================================
echo.
echo Next steps:
echo   1. Go to vercel.com or netlify.com
echo   2. Import your GitHub repository
echo   3. Deploy with one click!
echo.
echo Your app will be live in 2-3 minutes!
echo.
echo Good luck with the hackathon!
echo ========================================
echo.
pause
