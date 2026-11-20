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

# Local In-Memory Fallback Interns & Requirements Store (5 Batches)
_mock_interns = [
    {
        "id": "intern-b1-1",
        "full_name": "Juan Dela Cruz",
        "batch_number": "Batch 1",
        "student_id": "2026-B1-001",
        "email": "juan.dela.cruz@school.edu",
        "department": "SMAW",
        "overall_status": "incomplete",
        "requirements": [
            {
                "id": "req-1",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-2",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-3",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-4",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-5",
                "requirement_name": "Barangay Certificate",
                "status": "lacking",
                "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                "document_url": None,
                "scanned_at": None
            },
            {
                "id": "req-6",
                "requirement_name": "Medical Certificate & Chest X-RAY for SMAW",
                "status": "submitted",
                "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-7",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "lacking",
                "remarks": "Physical filing materials required.",
                "document_url": None,
                "scanned_at": None
            }
        ]
    },
    {
        "id": "intern-b1-2",
        "full_name": "Maria Clara",
        "batch_number": "Batch 1",
        "student_id": "2026-B1-002",
        "email": "maria.clara@school.edu",
        "department": "BPP (Bread & Pastry Production)",
        "overall_status": "pending",
        "requirements": [
            {
                "id": "req-8",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-9",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-10",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "pending",
                "remarks": "Under registrar verification.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-11",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-12",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-13",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-14",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Archived in registrar.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b1-3",
        "full_name": "Andres Bonifacio",
        "batch_number": "Batch 1",
        "student_id": "2026-B1-003",
        "email": "andres.bonifacio@school.edu",
        "department": "SMAW",
        "overall_status": "complete",
        "requirements": [
            {
                "id": "req-15",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-16",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-17",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-18",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-19",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-20",
                "requirement_name": "Medical Certificate & Chest X-RAY for SMAW",
                "status": "submitted",
                "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-21",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b2-1",
        "full_name": "Crisostomo Ibarra",
        "batch_number": "Batch 2",
        "student_id": "2026-B2-001",
        "email": "crisostomo.ibarra@school.edu",
        "department": "Driving & CSS NCII",
        "overall_status": "incomplete",
        "requirements": [
            {
                "id": "req-22",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-23",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-24",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-25",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-26",
                "requirement_name": "Barangay Certificate",
                "status": "lacking",
                "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                "document_url": None,
                "scanned_at": None
            },
            {
                "id": "req-27",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-28",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "lacking",
                "remarks": "Physical filing materials required.",
                "document_url": None,
                "scanned_at": None
            }
        ]
    },
    {
        "id": "intern-b2-2",
        "full_name": "Leonor Rivera",
        "batch_number": "Batch 2",
        "student_id": "2026-B2-002",
        "email": "leonor.rivera@school.edu",
        "department": "BPP (Bread & Pastry Production)",
        "overall_status": "pending",
        "requirements": [
            {
                "id": "req-29",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-30",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-31",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "pending",
                "remarks": "Under registrar verification.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-32",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-33",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-34",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-35",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Archived in registrar.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b2-3",
        "full_name": "Emilio Jacinto",
        "batch_number": "Batch 2",
        "student_id": "2026-B2-003",
        "email": "emilio.jacinto@school.edu",
        "department": "Driving & CSS NCII",
        "overall_status": "complete",
        "requirements": [
            {
                "id": "req-36",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-37",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-38",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-39",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-40",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-41",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-42",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b3-1",
        "full_name": "Antonio Luna",
        "batch_number": "Batch 3",
        "student_id": "2026-B3-001",
        "email": "antonio.luna@school.edu",
        "department": "SMAW",
        "overall_status": "incomplete",
        "requirements": [
            {
                "id": "req-43",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-44",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-45",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-46",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-47",
                "requirement_name": "Barangay Certificate",
                "status": "lacking",
                "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                "document_url": None,
                "scanned_at": None
            },
            {
                "id": "req-48",
                "requirement_name": "Medical Certificate & Chest X-RAY for SMAW",
                "status": "submitted",
                "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-49",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "lacking",
                "remarks": "Physical filing materials required.",
                "document_url": None,
                "scanned_at": None
            }
        ]
    },
    {
        "id": "intern-b3-2",
        "full_name": "Melchora Aquino",
        "batch_number": "Batch 3",
        "student_id": "2026-B3-002",
        "email": "melchora.aquino@school.edu",
        "department": "BPP (Bread & Pastry Production)",
        "overall_status": "pending",
        "requirements": [
            {
                "id": "req-50",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-51",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-52",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "pending",
                "remarks": "Under registrar verification.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-53",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-54",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-55",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-56",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Archived in registrar.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b3-3",
        "full_name": "Marcelo Del Pilar",
        "batch_number": "Batch 3",
        "student_id": "2026-B3-003",
        "email": "marcelo.del.pilar@school.edu",
        "department": "Driving & CSS NCII",
        "overall_status": "complete",
        "requirements": [
            {
                "id": "req-57",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-58",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-59",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-60",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-61",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-62",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-63",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b4-1",
        "full_name": "Jose Rizal",
        "batch_number": "Batch 4",
        "student_id": "2026-B4-001",
        "email": "jose.rizal@school.edu",
        "department": "Driving & CSS NCII",
        "overall_status": "incomplete",
        "requirements": [
            {
                "id": "req-64",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-65",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-66",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-67",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-68",
                "requirement_name": "Barangay Certificate",
                "status": "lacking",
                "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                "document_url": None,
                "scanned_at": None
            },
            {
                "id": "req-69",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-70",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "lacking",
                "remarks": "Physical filing materials required.",
                "document_url": None,
                "scanned_at": None
            }
        ]
    },
    {
        "id": "intern-b4-2",
        "full_name": "Gabriela Silang",
        "batch_number": "Batch 4",
        "student_id": "2026-B4-002",
        "email": "gabriela.silang@school.edu",
        "department": "SMAW",
        "overall_status": "pending",
        "requirements": [
            {
                "id": "req-71",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-72",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-73",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "pending",
                "remarks": "Under registrar verification.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-74",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-75",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-76",
                "requirement_name": "Medical Certificate & Chest X-RAY for SMAW",
                "status": "submitted",
                "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-77",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Archived in registrar.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b4-3",
        "full_name": "Apolinario Mabini",
        "batch_number": "Batch 4",
        "student_id": "2026-B4-003",
        "email": "apolinario.mabini@school.edu",
        "department": "CSS NC II",
        "overall_status": "complete",
        "requirements": [
            {
                "id": "req-78",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-79",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-80",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-81",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-82",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-83",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-84",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b5-1",
        "full_name": "Diego Silang",
        "batch_number": "Batch 5",
        "student_id": "2026-B5-001",
        "email": "diego.silang@school.edu",
        "department": "SMAW",
        "overall_status": "incomplete",
        "requirements": [
            {
                "id": "req-85",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-86",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-87",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-88",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-89",
                "requirement_name": "Barangay Certificate",
                "status": "lacking",
                "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                "document_url": None,
                "scanned_at": None
            },
            {
                "id": "req-90",
                "requirement_name": "Medical Certificate & Chest X-RAY for SMAW",
                "status": "submitted",
                "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-91",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "lacking",
                "remarks": "Physical filing materials required.",
                "document_url": None,
                "scanned_at": None
            }
        ]
    },
    {
        "id": "intern-b5-2",
        "full_name": "Teresa Magbanua",
        "batch_number": "Batch 5",
        "student_id": "2026-B5-002",
        "email": "teresa.magbanua@school.edu",
        "department": "BPP (Bread & Pastry Production)",
        "overall_status": "pending",
        "requirements": [
            {
                "id": "req-92",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-93",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-94",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "pending",
                "remarks": "Under registrar verification.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-95",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-96",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-97",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-98",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Archived in registrar.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
            }
        ]
    },
    {
        "id": "intern-b5-3",
        "full_name": "Gregorio Del Pilar",
        "batch_number": "Batch 5",
        "student_id": "2026-B5-003",
        "email": "gregorio.del.pilar@school.edu",
        "department": "Driving & CSS NCII",
        "overall_status": "complete",
        "requirements": [
            {
                "id": "req-99",
                "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                "status": "submitted",
                "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-100",
                "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                "status": "submitted",
                "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-101",
                "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-102",
                "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                "status": "submitted",
                "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-103",
                "requirement_name": "Barangay Certificate",
                "status": "submitted",
                "remarks": "Barangay Certificate verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-104",
                "requirement_name": "Medical Certificate for BPP, Driving & CSS NCII",
                "status": "submitted",
                "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                "scanned_at": "2026-11-10T08:00:00Z"
            },
            {
                "id": "req-105",
                "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                "status": "submitted",
                "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                "document_url": None,
                "scanned_at": "2026-11-10T08:00:00Z"
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

        # In-memory search fallback with strict per-batch isolation
        b_norm = "".join(c for c in batch_clean if c.isalnum())
        for intern in _mock_interns:
            i_batch_norm = "".join(c for c in intern["batch_number"].lower() if c.isalnum())
            i_name = intern["full_name"].lower()
            # STRICT ISOLATION: Intern can ONLY be found in their exact batch
            batch_matches = (b_norm == i_batch_norm)
            name_matches = (name_clean in i_name or i_name in name_clean)
            if batch_matches and name_matches:
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
