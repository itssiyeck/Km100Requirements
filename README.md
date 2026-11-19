# Document Scanning & Management System (DocScan Pro)

Full-stack application based on the **Lucidchart Document Workflow Architecture**, built with:
- **Frontend:** React Native (Web / Expo) + Interactive Web Prototype
- **Backend:** Python (FastAPI) with REST endpoints
- **Database:** Supabase (PostgreSQL with Row Level Security & Audit Logs)

---

## 🗺️ Flowchart Workflow Mapping

| Lucidchart Step / Decision | Implementation Details |
| :--- | :--- |
| **Start** | System initialization & user session startup |
| **Place Document in Scanner** | Document selection, title, classification, flatbed staging |
| **Scan Document Form** | Optical scanner simulation with laser progress & OCR metadata extraction |
| **Scan Complete?** (Decision) | Quality check: <br>• **No: Rescan** (red branch loops back to scanner)<br>• **Yes** (green branch advances to save) |
| **Send Scanned Form to System** | `POST /api/documents` payload dispatch to the backend |
| **Document Saved in System** | Stored in Supabase `public.documents` table with timestamps and metadata |
| **View Scanned Form on Website** | Searchable document repository grid with high-res modal viewer |
| **Login → Authentication** | Role-based token authentication (`admin` or `user`) |
| **Admin Check** (Decision) | • **Admin = Yes:** Unlocks `Edit Scanned Form File`<br>• **Admin = No:** Restricted to read-only `View Scanned Form on Website` |
| **Edit Scanned Form File** | Admin editing of document title, classification, and verification notes |

---

## 🚀 Quick Start Guide

### 1. Instant Direct Browser Preview (Zero Setup Needed)
To immediately test the entire system without installing any dependencies:
- Simply double-click [`frontend/index.html`](file:///c:/Users/KM100%20-%201002/Documents/OJT/frontend/index.html) or open it in Google Chrome.
- All flowchart steps, animations, scanner hardware simulation, decision trees, and role switching (Admin vs User) are fully functional right in the browser!

---

### 2. Setting Up Supabase Database

1. Go to [Supabase](https://supabase.com/) and create or open your project.
2. In the left menu, click **SQL Editor**.
3. Open and copy the contents of [`supabase/schema.sql`](file:///c:/Users/KM100%20-%201002/Documents/OJT/supabase/schema.sql).
4. Run the query. It will create:
   - `profiles` (User role access control)
   - `documents` (Saved scanned forms)
   - `audit_logs` (Workflow action trail)
   - Row-Level Security (RLS) policies enforcing admin-only editing.
5. In Supabase **Project Settings → API**, copy:
   - `Project URL`
   - `anon key`
   - `service_role key`
6. Paste these into `backend/.env` (see `backend/.env.example`).

---

### 3. Running the Python (FastAPI) Backend

1. Open PowerShell or Command Prompt in `backend/`:
   ```bash
   cd "C:\Users\KM100 - 1002\Documents\OJT\backend"
   ```
2. Run the helper script:
   ```cmd
   run_backend.bat
   ```
   Or manually:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. Interactive API documentation is available at:
   - **Swagger UI:** `http://localhost:8000/docs`
   - **ReDoc:** `http://localhost:8000/redoc`

*Note: The backend includes an automatic fallback memory store, so it runs immediately even before you enter real Supabase credentials!*

---

### 4. Running the React Native (Expo) Frontend

1. Open PowerShell or Command Prompt in `frontend/`:
   ```bash
   cd "C:\Users\KM100 - 1002\Documents\OJT\frontend"
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Start the Web app:
   ```bash
   npx expo start --web
   ```
4. Press `w` to open in your browser (`http://localhost:8081`).

---

## 📁 Project Structure

```
C:\Users\KM100 - 1002\Documents\OJT\
├── backend/
│   ├── app/
│   │   ├── config.py         # App configuration & environment variables
│   │   ├── database.py       # Supabase client + fallback memory store
│   │   ├── main.py           # FastAPI server with CORS & routes
│   │   ├── models.py         # Pydantic schemas for docs & scan workflow
│   │   └── routes/
│   │       ├── auth.py       # Login, authentication & admin check
│   │       └── documents.py  # Scanner, verify, save, view & edit endpoints
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Environment variables template
│   └── run_backend.bat       # Windows one-click backend runner
├── frontend/
│   ├── App.js                # React Native main component with flowchart flow
│   ├── app.json              # Expo configuration
│   ├── package.json          # Node dependencies
│   ├── index.html            # Standalone zero-install web launcher
│   └── src/
│       └── services/
│           ├── api.js            # FastAPI integration client
│           └── supabaseClient.js # Supabase JavaScript SDK client
├── supabase/
│   ├── schema.sql            # PostgreSQL schema, RLS policies & seed data
│   └── README.md             # Supabase configuration instructions
└── README.md                 # Complete documentation
```
