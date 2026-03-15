@echo off
title DrivePool Launcher
echo ===================================================
echo               Starting DrivePool
echo ===================================================
echo.

echo [1/2] Starting Backend (FastAPI)...
start "DrivePool Backend" cmd /k "cd backend && set PYTHONPATH=. && python -m uvicorn main:app --reload"

echo [2/2] Starting Frontend (Next.js)...
start "DrivePool Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo DrivePool is booting up! 
echo The frontend will be available at: http://localhost:3000
echo The backend API will be available at: http://127.0.0.1:8000
echo.
echo Waiting for servers to start before opening your browser...
timeout /t 5 /nobreak > NUL

echo Opening browser...
start http://localhost:3000

echo.
echo The servers are running in the background.
echo To stop them, you can close the command prompt windows that were opened.
pause
