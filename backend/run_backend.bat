@echo off
echo ========================================================
echo Starting Document Scanning & Management System (Backend)
echo ========================================================
cd /d "%~dp0"

if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing / Checking dependencies...
pip install -r requirements.txt

echo Starting FastAPI server at http://localhost:8000 ...
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause
