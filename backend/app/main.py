import sys
import os
from typing import Optional

# Ensure backend root directory and project root are in sys.path for robust module resolution on Vercel and local
_current_dir = os.path.dirname(os.path.abspath(__file__))
_backend_dir = os.path.dirname(_current_dir)
_project_root = os.path.dirname(_backend_dir)

if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from app.routes import auth, documents

app = FastAPI(
    title="KM100 Skills and Training Center - Document & Requirements Portal API",
    description="Backend API implemented following the Lucidchart Document Scanning Workflow with Supabase integration.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for React Native Web / Browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth.router)
app.include_router(documents.router)

def _get_static_path(filename: str) -> Optional[str]:
    candidates = [
        os.path.join(_project_root, filename),
        os.path.join(_project_root, "frontend", filename),
        os.path.join(os.getcwd(), filename),
        os.path.join(os.getcwd(), "frontend", filename),
        os.path.join(_backend_dir, filename),
        os.path.join(_current_dir, filename),
    ]
    for c in candidates:
        if os.path.isfile(c):
            return c
    return None

@app.get("/")
@app.get("/index.html")
def root(request: Request):
    accept = request.headers.get("accept", "")
    # If client explicitly requests application/json without text/html (e.g. automated test / health check)
    if "application/json" in accept and "text/html" not in accept:
        return status_info()

    html_path = _get_static_path("index.html")
    if html_path and os.path.exists(html_path):
        return FileResponse(html_path, media_type="text/html")
    return HTMLResponse("<h1>KM100 Skills and Training Center, Inc.</h1><p>Portal Online</p>")

@app.get("/status")
@app.get("/api/status")
@app.get("/api/info")
def status_info():
    return {
        "system": "Document Scanning & Management System",
        "institution": "KM100 Skills and Training Center, Inc.",
        "status": "online",
        "workflow_steps": [
            "Start",
            "Place Document in Scanner",
            "Scan Document Form",
            "Scan Complete? (Decision: Yes -> Send / No -> Rescan)",
            "Send Scanned Form to System",
            "Document Saved in System",
            "View Scanned Form on Website",
            "Login -> Authentication -> Admin (Yes -> Edit Scanned Form File / No -> View Only)"
        ],
        "database": "Supabase PostgreSQL",
        "docs_url": "/docs"
    }

@app.get("/km100-logo.jpg")
def logo():
    p = _get_static_path("km100-logo.jpg")
    if p:
        return FileResponse(p, media_type="image/jpeg")
    raise HTTPException(status_code=404, detail="Logo not found")

@app.get("/km100-banner.jpg")
def banner():
    p = _get_static_path("km100-banner.jpg")
    if p:
        return FileResponse(p, media_type="image/jpeg")
    raise HTTPException(status_code=404, detail="Banner not found")

@app.get("/tesda-logo.png")
def tesda():
    p = _get_static_path("tesda-logo.png")
    if p:
        return FileResponse(p, media_type="image/png")
    raise HTTPException(status_code=404, detail="TESDA logo not found")

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

