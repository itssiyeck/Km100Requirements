import logging
from typing import Optional, Dict, Any, List
import uuid
from datetime import datetime
from app.config import settings

logger = logging.getLogger(__name__)

supabase_client = None

if settings.SUPABASE_URL and settings.SUPABASE_KEY and "your-project-id" not in settings.SUPABASE_URL:
    try:
        from supabase import create_client, Client
        supabase_client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        logger.info("Successfully connected to Supabase Database.")
    except Exception as e:
        logger.warning(f"Could not connect to Supabase: {e}. Falling back to in-memory store.")
else:
    logger.info("Supabase credentials not configured. Using local in-memory fallback store.")

# Local In-Memory Fallback Interns & Requirements Store
_mock_interns = [
    {
        "id": "aaaaaaaa-1111-1111-1111-111111111111",
        "full_name": "Juan Dela Cruz",
        "batch_number": "Batch 2026-A",
        "student_id": "2026-001",
        "email": "juan.delacruz@school.edu",
        "department": "Information Technology",
        "overall_status": "incomplete",
        "requirements": [
            {
                "id": "req-1",
                "requirement_name": "Birth Certificate NSO/PSA (or Marriage Certificate)",
                "status": "submitted",
                "remarks": "Official PSA Birth Certificate copy verified.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-2",
                "requirement_name": "Either: T.O.R / Diploma / ALS / Form 138 / Form 137",
                "status": "submitted",
                "remarks": "Official Transcript of Records (T.O.R) verified.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-11T09:00:00Z"
            },
            {
                "id": "req-3",
                "requirement_name": "Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)",
                "status": "pending",
                "remarks": "Submitted 4 pcs passport photos; under registrar review.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-15T14:30:00Z"
            },
            {
                "id": "req-4",
                "requirement_name": "1x1 Picture - 4pcs (White BG w/ Collar & Signature)",
                "status": "submitted",
                "remarks": "4 pcs 1x1 acid-based photos with nametag and signature verified.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-12T09:15:00Z"
            },
            {
                "id": "req-5",
                "requirement_name": "Barangay Certificate",
                "status": "lacking",
                "remarks": "Valid Barangay Certificate/Clearance of residency required. Submit to scanner.",
                "document_url": None,
                "scanned_at": None
            },
            {
                "id": "req-6",
                "requirement_name": "Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)",
                "status": "submitted",
                "remarks": "Medical Certificate & Chest X-RAY verified valid by school physician.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-14T10:00:00Z"
            },
            {
                "id": "req-7",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "lacking",
                "remarks": "Physical filing supplies: 1pc Long Brown Envelope and 1pc Long White Folder required.",
                "document_url": None,
                "scanned_at": None
            }
        ]
    },
    {
        "id": "bbbbbbbb-2222-2222-2222-222222222222",
        "full_name": "Maria Clara",
        "batch_number": "Batch 2026-A",
        "student_id": "2026-002",
        "email": "maria.clara@school.edu",
        "department": "Computer Science",
        "overall_status": "pending",
        "requirements": [
            {
                "id": "req-8",
                "requirement_name": "Birth Certificate NSO/PSA (or Marriage Certificate)",
                "status": "submitted",
                "remarks": "NSO/PSA copy verified.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-09T10:00:00Z"
            },
            {
                "id": "req-9",
                "requirement_name": "Either: T.O.R / Diploma / ALS / Form 138 / Form 137",
                "status": "submitted",
                "remarks": "College Diploma verified.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T11:00:00Z"
            },
            {
                "id": "req-10",
                "requirement_name": "Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)",
                "status": "submitted",
                "remarks": "Photos complete and stamped.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-14T11:20:00Z"
            },
            {
                "id": "req-11",
                "requirement_name": "1x1 Picture - 4pcs (White BG w/ Collar & Signature)",
                "status": "submitted",
                "remarks": "1x1 photos complete.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-14T11:20:00Z"
            },
            {
                "id": "req-12",
                "requirement_name": "Barangay Certificate",
                "status": "pending",
                "remarks": "Submitted Barangay clearance under verification.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-16T15:00:00Z"
            },
            {
                "id": "req-13",
                "requirement_name": "Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)",
                "status": "pending",
                "remarks": "Medical certificate received; awaiting clinic confirmation.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-16T15:00:00Z"
            },
            {
                "id": "req-14",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Filing supplies received and tagged.",
                "document_url": None,
                "scanned_at": "2026-11-15T12:00:00Z"
            }
        ]
    },
    {
        "id": "cccccccc-3333-3333-3333-333333333333",
        "full_name": "Crisostomo Ibarra",
        "batch_number": "Batch 2026-B",
        "student_id": "2026-003",
        "email": "c.ibarra@school.edu",
        "department": "Information Systems",
        "overall_status": "complete",
        "requirements": [
            {
                "id": "req-15",
                "requirement_name": "Birth Certificate NSO/PSA (or Marriage Certificate)",
                "status": "submitted",
                "remarks": "Complete and verified",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-01T08:00:00Z"
            },
            {
                "id": "req-16",
                "requirement_name": "Either: T.O.R / Diploma / ALS / Form 138 / Form 137",
                "status": "submitted",
                "remarks": "Complete and verified",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-01T08:00:00Z"
            },
            {
                "id": "req-17",
                "requirement_name": "Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)",
                "status": "submitted",
                "remarks": "Complete and verified",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-02T09:30:00Z"
            },
            {
                "id": "req-18",
                "requirement_name": "1x1 Picture - 4pcs (White BG w/ Collar & Signature)",
                "status": "submitted",
                "remarks": "Complete and verified",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-02T09:30:00Z"
            },
            {
                "id": "req-19",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Valid Barangay Certificate on record",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-03T10:15:00Z"
            },
            {
                "id": "req-20",
                "requirement_name": "Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)",
                "status": "submitted",
                "remarks": "Full medical clearance approved",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-04T10:15:00Z"
            },
            {
                "id": "req-21",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Filing materials archived",
                "document_url": None,
                "scanned_at": "2026-11-05T11:00:00Z"
            }
        ]
    }
]

_mock_documents = []

class DatabaseManager:
    @staticmethod
    def search_intern(batch_number: str, full_name: str) -> Optional[Dict[str, Any]]:
        batch_clean = batch_number.strip().lower()
        name_clean = full_name.strip().lower()

        if supabase_client:
            try:
                # Query Supabase interns
                res = supabase_client.table("interns").select("*").ilike("batch_number", f"%{batch_clean}%").ilike("full_name", f"%{name_clean}%").execute()
                if res.data and len(res.data) > 0:
                    intern = res.data[0]
                    # Fetch requirements for this intern
                    req_res = supabase_client.table("requirements").select("*").eq("intern_id", intern["id"]).execute()
                    intern["requirements"] = req_res.data or []
                    
                    lacking = sum(1 for r in intern["requirements"] if r["status"] == "lacking")
                    pending = sum(1 for r in intern["requirements"] if r["status"] == "pending")
                    submitted = sum(1 for r in intern["requirements"] if r["status"] == "submitted")
                    intern["lacking_count"] = lacking
                    intern["pending_count"] = pending
                    intern["submitted_count"] = submitted
                    return intern
            except Exception as e:
                logger.error(f"Supabase search failed: {e}. Falling back to in-memory store.")

        # In-memory search fallback
        for intern in _mock_interns:
            i_batch = intern["batch_number"].lower()
            i_name = intern["full_name"].lower()
            if (batch_clean in i_batch or i_batch in batch_clean) and (name_clean in i_name or i_name in name_clean):
                lacking = sum(1 for r in intern["requirements"] if r["status"] == "lacking")
                pending = sum(1 for r in intern["requirements"] if r["status"] == "pending")
                submitted = sum(1 for r in intern["requirements"] if r["status"] == "submitted")
                return {
                    **intern,
                    "lacking_count": lacking,
                    "pending_count": pending,
                    "submitted_count": submitted
                }
        return None

    @staticmethod
    def update_intern_credentials(intern_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        updates["updated_at"] = datetime.utcnow().isoformat() + "Z"
        if supabase_client:
            try:
                res = supabase_client.table("interns").update(updates).eq("id", intern_id).execute()
                if res.data:
                    return res.data[0]
            except Exception as e:
                logger.error(f"Supabase intern update failed: {e}")

        # Update in-memory fallback
        for i, intern in enumerate(_mock_interns):
            if intern["id"] == intern_id:
                _mock_interns[i].update(updates)
                return _mock_interns[i]
        return None

    @staticmethod
    def update_requirement(req_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        updates["updated_at"] = datetime.utcnow().isoformat() + "Z"
        if supabase_client:
            try:
                res = supabase_client.table("requirements").update(updates).eq("id", req_id).execute()
                if res.data:
                    return res.data[0]
            except Exception as e:
                logger.error(f"Supabase requirement update failed: {e}")

        # Update in-memory fallback
        for intern in _mock_interns:
            for req in intern["requirements"]:
                if req["id"] == req_id:
                    req.update(updates)
                    return req
        return None

    @staticmethod
    def get_all_documents():
        return _mock_documents

    @staticmethod
    def create_document(doc_data: Dict[str, Any]) -> Dict[str, Any]:
        doc_data["id"] = str(uuid.uuid4())
        doc_data["created_at"] = datetime.utcnow().isoformat() + "Z"
        doc_data["updated_at"] = doc_data["created_at"]
        doc_data["status"] = "saved"
        _mock_documents.insert(0, doc_data)
        return doc_data

    @staticmethod
    def update_document(doc_id: str, updates: Dict[str, Any], editor_email: str) -> Optional[Dict[str, Any]]:
        for i, doc in enumerate(_mock_documents):
            if doc["id"] == doc_id:
                _mock_documents[i].update(updates)
                _mock_documents[i]["updated_at"] = datetime.utcnow().isoformat() + "Z"
                _mock_documents[i]["last_edited_by"] = editor_email
                return _mock_documents[i]
        return None
