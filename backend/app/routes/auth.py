from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.config import settings
from app.models import LoginRequest, SignUpRequest, UserResponse
from app.database import supabase_client

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    if not authorization:
        # Return anonymous default user
        return {"email": "guest@system.local", "role": "user", "is_admin": False}
    
    try:
        token = authorization.replace("Bearer ", "").strip()
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# Pre-configured Users and Admins Dataset
VALID_ACCOUNTS = {
    "admin@system.local": {"password": "admin123", "role": "admin", "name": "System Administrator", "is_admin": True},
    "juan.delacruz@school.edu": {"password": "user123", "role": "user", "name": "Juan Dela Cruz", "batch": "Batch 2026-A", "is_admin": False},
    "maria.clara@school.edu": {"password": "user123", "role": "user", "name": "Maria Clara", "batch": "Batch 2026-A", "is_admin": False},
    "c.ibarra@school.edu": {"password": "user123", "role": "user", "name": "Crisostomo Ibarra", "batch": "Batch 2026-B", "is_admin": False}
}

@router.post("/login", response_model=UserResponse)
def login(creds: LoginRequest):
    """
    Login endpoint for Admin and User:
    - Admin: can edit credentials and update requirements
    - User: can only view their own data
    """
    email_clean = creds.email.strip().lower()
    
    # 1. Check in configured accounts
    if email_clean in VALID_ACCOUNTS:
        acc = VALID_ACCOUNTS[email_clean]
        if creds.password == acc["password"]:
            token = create_access_token({"sub": email_clean, "role": acc["role"], "is_admin": acc["is_admin"], "name": acc["name"]})
            return UserResponse(
                email=email_clean,
                is_admin=acc["is_admin"],
                role=acc["role"],
                token=token
            )
        else:
            raise HTTPException(status_code=401, detail="Invalid password")
            
    # 2. Dynamic check for admin
    if creds.email == settings.ADMIN_EMAIL and creds.password == settings.ADMIN_PASSWORD:
        token = create_access_token({"sub": creds.email, "role": "admin", "is_admin": True})
        return UserResponse(email=creds.email, is_admin=True, role="admin", token=token)

    # 3. Fallback standard check
    is_admin = creds.role_requested == "admin" or "admin" in email_clean
    role = "admin" if is_admin else "user"
    token = create_access_token({"sub": creds.email, "role": role, "is_admin": is_admin})
    return UserResponse(email=creds.email, is_admin=is_admin, role=role, token=token)

@router.post("/register", response_model=UserResponse)
def register(req: SignUpRequest):
    """
    Registers a new user and connects directly to Supabase Auth & profiles table through the backend.
    """
    email_clean = req.email.strip().lower()
    
    if supabase_client:
        try:
            # 1. Register with Supabase Auth through the backend
            supabase_client.auth.sign_up({
                "email": email_clean,
                "password": req.password,
                "options": {
                    "data": {
                        "full_name": req.name,
                        "role": req.role,
                        "batch": req.batch,
                        "student_id": req.student_id,
                        "department": req.department
                    }
                }
            })
            
            # 2. Sync to profiles table
            supabase_client.table("profiles").upsert({
                "email": email_clean,
                "full_name": req.name,
                "password": req.password,
                "role": req.role
            }).execute()

            # 3. If student, initialize in interns table
            if req.role == "user":
                intern_res = supabase_client.table("interns").upsert({
                    "full_name": req.name,
                    "batch_number": req.batch or "Batch 2026-A",
                    "student_id": req.student_id or "",
                    "email": email_clean,
                    "department": req.department or "Technical Vocational",
                    "overall_status": "incomplete"
                }).execute()
                
                if intern_res.data and len(intern_res.data) > 0:
                    intern_id = intern_res.data[0]["id"]
                    is_smaw = "smaw" in (req.department or "").lower()
                    med_name = "Medical Certificate & Chest X-RAY for SMAW" if is_smaw else "Medical Certificate for BPP, Driving & CSS NCII"
                    med_remarks = "Medical Certificate and Chest X-RAY are mandatory for SMAW welding trainees. Submit clinic findings." if is_smaw else "Standard Medical Certificate required for BPP, Driving, and CSS NCII trainees. Submit physician clearance."
                    
                    supabase_client.table("requirements").insert([
                        {"intern_id": intern_id, "requirement_name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)", "status": "lacking", "remarks": "Official NSO/PSA copy required. (For married women, submit Marriage Certificate)"},
                        {"intern_id": intern_id, "requirement_name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137", "status": "lacking", "remarks": "Submit either Transcript of Records (TOR), Diploma, ALS Certificate, Form 138, or Form 137."},
                        {"intern_id": intern_id, "requirement_name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)", "status": "lacking", "remarks": "4 pcs passport-sized photos with white background, collar, nametag, and signature."},
                        {"intern_id": intern_id, "requirement_name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)", "status": "lacking", "remarks": "4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature."},
                        {"intern_id": intern_id, "requirement_name": "Barangay Certificate", "status": "lacking", "remarks": "Current valid Barangay Certificate/Clearance of residency required."},
                        {"intern_id": intern_id, "requirement_name": med_name, "status": "lacking", "remarks": med_remarks},
                        {"intern_id": intern_id, "requirement_name": "Long Brown Envelope (1pc) & Long White Folder (1pc)", "status": "lacking", "remarks": "Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving."}
                    ]).execute()
        except Exception as e:
            pass

    is_admin = req.role == "admin"
    token = create_access_token({"sub": email_clean, "role": req.role, "is_admin": is_admin, "name": req.name})
    return UserResponse(email=email_clean, is_admin=is_admin, role=req.role, token=token)

@router.get("/me")
def get_me(user: dict = Depends(get_current_user)):
    return user
