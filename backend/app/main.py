import sys
import os

# Ensure backend root directory is in sys.path for robust module resolution on Vercel and local
_current_dir = os.path.dirname(os.path.abspath(__file__))
_backend_dir = os.path.dirname(_current_dir)
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, documents

app = FastAPI(
    title="Document Scanning & Management System API",
    description="Backend API implemented following the Lucidchart Document Scanning Workflow with Supabase integration.",
    version="1.0.0"
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

@app.get("/")
def root():
    return {
        "system": "Document Scanning & Management System",
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

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
