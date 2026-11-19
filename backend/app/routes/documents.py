from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from app.database import DatabaseManager
from app.models import (
    InternSearchResult, InternUpdate, RequirementUpdate, ScanInitiateRequest, ScanResult, ScanVerificationRequest,
    DocumentCreate, DocumentUpdate, DocumentResponse
)
from app.routes.auth import get_current_user

router = APIRouter(prefix="/api", tags=["OJT Workflow & Requirements"])

# --- 1. USER FACING: SEARCH SYSTEM (BATCH NUMBER & NAME) ---

@router.get("/interns/search", response_model=InternSearchResult)
def search_intern_requirements(
    batch_number: str = Query(..., description="Batch Number of the intern, e.g. Batch 2026-A"),
    name: str = Query(..., description="Full Name of the intern, e.g. Juan Dela Cruz")
):
    """
    Primary user portal search:
    Allows user to search by batch number and name to check lacking or pending requirements.
    """
    if not batch_number.strip() or not name.strip():
        return InternSearchResult(
            found=False,
            message="Please provide both your Batch Number and Full Name to search."
        )

    record = DatabaseManager.search_intern(batch_number, name)
    if not record:
        return InternSearchResult(
            found=False,
            message=f"No intern records found for '{name}' in '{batch_number}'. Please verify spelling or contact your OJT Coordinator."
        )

    return InternSearchResult(
        found=True,
        message="Record retrieved successfully.",
        data=record
    )

# --- 2. SCANNER PIPELINE (Flowchart) ---

_pending_scans: Dict[str, Dict[str, Any]] = {}

@router.post("/scanner/scan", response_model=ScanResult)
def scan_document(payload: ScanInitiateRequest):
    scan_id = str(uuid.uuid4())
    scan_quality = 97
    
    extracted_fields = {
        "title": payload.document_name,
        "form_type": payload.form_type,
        "document_code": f"SCAN-{datetime.utcnow().strftime('%Y%m%d')}-{scan_id[:4].upper()}",
        "scan_timestamp": datetime.utcnow().isoformat()
    }
    
    preview_url = payload.file_url or "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80"
    
    scan_record = {
        "scan_id": scan_id,
        "document_name": payload.document_name,
        "form_type": payload.form_type,
        "scan_complete": True,
        "scan_quality": scan_quality,
        "preview_url": preview_url,
        "extracted_fields": extracted_fields,
        "message": "Document scanned. Ready for verification."
    }
    _pending_scans[scan_id] = scan_record
    return scan_record

@router.post("/scanner/verify")
def verify_scan(request: ScanVerificationRequest):
    if not request.is_complete:
        return {
            "action": "rescan",
            "message": "Scan rejected. Please place document in scanner to rescan.",
            "rescan_required": True
        }
    return {
        "action": "proceed",
        "message": "Scan verified complete. Ready to send to system.",
        "rescan_required": False
    }

@router.post("/documents", response_model=DocumentResponse)
def send_scanned_form_to_system(doc: DocumentCreate, current_user: dict = Depends(get_current_user)):
    doc_dict = {
        "title": doc.title,
        "form_type": doc.form_type,
        "intern_id": doc.intern_id,
        "file_url": doc.file_url or "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
        "scan_quality": doc.scan_quality or 100,
        "metadata": doc.metadata or {}
    }
    saved_doc = DatabaseManager.create_document(doc_dict)
    return saved_doc

@router.get("/documents", response_model=List[DocumentResponse])
def view_scanned_forms_on_website():
    return DatabaseManager.get_all_documents()

@router.put("/documents/{doc_id}", response_model=DocumentResponse)
def edit_scanned_form_file(doc_id: str, updates: DocumentUpdate, current_user: dict = Depends(get_current_user)):
    is_admin = current_user.get("is_admin", False) or current_user.get("role") == "admin"
    if not is_admin:
        raise HTTPException(status_code=403, detail="Forbidden: Admin role required to edit scanned form files.")
    
    clean_updates = {k: v for k, v in updates.dict().items() if v is not None}
    updated = DatabaseManager.update_document(doc_id, clean_updates, current_user.get("sub", "admin"))
    if not updated:
        raise HTTPException(status_code=404, detail="Document not found")
    return updated

# --- 5. ADMIN CREDENTIAL & REQUIREMENT MANAGEMENT ---

@router.put("/interns/{intern_id}")
def update_intern_credentials(
    intern_id: str,
    updates: InternUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Admin only: Edit intern credentials (name, batch, ID, department, clearance status).
    Users only view their own credentials.
    """
    is_admin = current_user.get("is_admin", False) or current_user.get("role") == "admin"
    if not is_admin:
        raise HTTPException(status_code=403, detail="Forbidden: Admin access required to update intern credentials.")
    
    clean_updates = {k: v for k, v in updates.dict().items() if v is not None}
    res = DatabaseManager.update_intern_credentials(intern_id, clean_updates)
    if not res:
        raise HTTPException(status_code=404, detail="Intern record not found")
    return {"message": "Intern credentials updated successfully", "data": res}

@router.put("/requirements/{requirement_id}")
def update_requirement(
    requirement_id: str,
    updates: RequirementUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Admin only: Update requirement status (lacking/pending/submitted), remarks, document URL.
    """
    is_admin = current_user.get("is_admin", False) or current_user.get("role") == "admin"
    if not is_admin:
        raise HTTPException(status_code=403, detail="Forbidden: Admin access required to update requirements.")
    
    clean_updates = {k: v for k, v in updates.dict().items() if v is not None}
    res = DatabaseManager.update_requirement(requirement_id, clean_updates)
    if not res:
        raise HTTPException(status_code=404, detail="Requirement record not found")
    return {"message": "Requirement updated successfully", "data": res}

