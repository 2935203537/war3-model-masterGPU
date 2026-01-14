@echo off
setlocal
echo Installing dependencies...
npm ci
if errorlevel 1 (
  echo.
  echo npm ci failed. Please make sure Node.js + npm are installed and you have internet access.
  exit /b 1
)
echo.
echo Starting app...
npm run dev
