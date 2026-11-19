from typing import Optional, Dict, Any, List
from pydantic import BaseModel
from datetime import datetime

class RequirementItem(BaseModel):
    id: str
    requirement_name: str
    status: str  # 'lacking' | 'pending' | 'submitted'
    remarks: Optional[str] = None
    document_url: Optional[str] = None
    scanned_at: Optional[str] = None

class InternRecord(BaseModel):
    id: str
    full_name: str
    batch_number: str
    student_id: Optional[str] = None
    email: Optional[str] = None
    department: Optional[str] = None
    overall_status: str  # 'complete' | 'incomplete' | 'pending'
    requirements: List[RequirementItem]
    lacking_count: int
    pending_count: int
    submitted_count: int

class InternSearchResult(BaseModel):
    found: bool
    message: str
    data: Optional[InternRecord] = None

class InternUpdate(BaseModel):
    full_name: Optional[str] = None
    batch_number: Optional[str] = None
    student_id: Optional[str] = None
    email: Optional[str] = None
    department: Optional[str] = None
    overall_status: Optional[str] = None

class RequirementUpdate(BaseModel):
    status: Optional[str] = None  # 'lacking' | 'pending' | 'submitted'
    remarks: Optional[str] = None
    document_url: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str
    role_requested: Optional[str] = "user"

class SignUpRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str = "user"
    batch: Optional[str] = ""
    student_id: Optional[str] = ""
    department: Optional[str] = ""

class UserResponse(BaseModel):
    email: str
    is_admin: bool
    role: str
    token: str

class ScanInitiateRequest(BaseModel):
    document_name: str
    form_type: str = "General Document"
    intern_id: Optional[str] = None
    file_base64: Optional[str] = None
    file_url: Optional[str] = None

class ScanResult(BaseModel):
    scan_id: str
    document_name: str
    form_type: str
    scan_complete: bool
    scan_quality: int
    preview_url: str
    extracted_fields: Dict[str, Any]
    message: str

class ScanVerificationRequest(BaseModel):
    scan_id: str
    is_complete: bool
    rescan_reason: Optional[str] = None

class DocumentCreate(BaseModel):
    title: str
    form_type: str
    intern_id: Optional[str] = None
    file_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    scan_quality: Optional[int] = 100
    metadata: Optional[Dict[str, Any]] = {}

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    form_type: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class DocumentResponse(BaseModel):
    id: str
    title: str
    form_type: str
    intern_id: Optional[str] = None
    file_url: Optional[str] = None
    status: str
    scan_quality: Optional[int] = 100
    metadata: Optional[Dict[str, Any]] = {}
    created_at: str
    updated_at: str
    last_edited_by: Optional[str] = None
