
    const { useState, useEffect, useRef } = React;

    // =========================================================================
    // LUCIDE SVG ICONS SUITE (Zero external dependency, instant rendering, theme-adaptive)
    // =========================================================================
    const Icons = {
      Search: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      ),
      CheckCircle: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      AlertCircle: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      Clock: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      XCircle: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      ),
      Shield: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      User: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      ArrowLeft: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      ),
      ArrowRight: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      ),
      LogOut: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      ),
      Edit: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
      Plus: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      ),
      Eye: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      EyeOff: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      ),
      Sun: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ),
      Moon: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ),
      Calendar: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      Lock: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      FileText: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      Key: ({ className = "w-4 h-4" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
        </svg>
      )
    };

    // Clean background placeholder (random animations removed as requested)
    function ParticleCanvas() {
      return null;
    }

    // PRE-CONFIGURED LOGIN ACCOUNTS FOR 5 BATCHES
    const INITIAL_AUTH_USERS = [
      {
            "id": "admin-1",
            "email": "admin@system.local",
            "password": "admin123",
            "role": "admin",
            "name": "System Administrator",
            "title": "OJT / TVET Head Coordinator"
      },
      {
            "id": "user-1",
            "email": "juan.dela.cruz@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Juan Dela Cruz",
            "batch": "Batch 1",
            "student_id": "2026-B1-001"
      },
      {
            "id": "user-2",
            "email": "maria.clara@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Maria Clara",
            "batch": "Batch 1",
            "student_id": "2026-B1-002"
      },
      {
            "id": "user-3",
            "email": "andres.bonifacio@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Andres Bonifacio",
            "batch": "Batch 1",
            "student_id": "2026-B1-003"
      },
      {
            "id": "user-4",
            "email": "crisostomo.ibarra@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Crisostomo Ibarra",
            "batch": "Batch 2",
            "student_id": "2026-B2-001"
      },
      {
            "id": "user-5",
            "email": "leonor.rivera@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Leonor Rivera",
            "batch": "Batch 2",
            "student_id": "2026-B2-002"
      },
      {
            "id": "user-6",
            "email": "emilio.jacinto@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Emilio Jacinto",
            "batch": "Batch 2",
            "student_id": "2026-B2-003"
      },
      {
            "id": "user-7",
            "email": "antonio.luna@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Antonio Luna",
            "batch": "Batch 3",
            "student_id": "2026-B3-001"
      },
      {
            "id": "user-8",
            "email": "melchora.aquino@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Melchora Aquino",
            "batch": "Batch 3",
            "student_id": "2026-B3-002"
      },
      {
            "id": "user-9",
            "email": "marcelo.del.pilar@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Marcelo Del Pilar",
            "batch": "Batch 3",
            "student_id": "2026-B3-003"
      },
      {
            "id": "user-10",
            "email": "jose.rizal@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Jose Rizal",
            "batch": "Batch 4",
            "student_id": "2026-B4-001"
      },
      {
            "id": "user-11",
            "email": "gabriela.silang@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Gabriela Silang",
            "batch": "Batch 4",
            "student_id": "2026-B4-002"
      },
      {
            "id": "user-12",
            "email": "apolinario.mabini@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Apolinario Mabini",
            "batch": "Batch 4",
            "student_id": "2026-B4-003"
      },
      {
            "id": "user-13",
            "email": "diego.silang@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Diego Silang",
            "batch": "Batch 5",
            "student_id": "2026-B5-001"
      },
      {
            "id": "user-14",
            "email": "teresa.magbanua@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Teresa Magbanua",
            "batch": "Batch 5",
            "student_id": "2026-B5-002"
      },
      {
            "id": "user-15",
            "email": "gregorio.del.pilar@school.edu",
            "password": "user123",
            "role": "user",
            "name": "Gregorio Del Pilar",
            "batch": "Batch 5",
            "student_id": "2026-B5-003"
      }
];

    // DATABASE SEED FOR KM100 OFFICIAL PRESCRIBED REQUIREMENTS (5 BATCHES)
    const INITIAL_INTERNS = [
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-2",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 12, 2026"
                  },
                  {
                        "id": "req-3",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-4",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-5",
                        "name": "Barangay Certificate",
                        "status": "lacking",
                        "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                        "document_url": null,
                        "scanned_at": null
                  },
                  {
                        "id": "req-6",
                        "name": "Medical Certificate & Chest X-RAY for SMAW",
                        "status": "submitted",
                        "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-7",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "lacking",
                        "remarks": "Physical filing materials required.",
                        "document_url": null,
                        "scanned_at": null
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 18, 2026"
                  },
                  {
                        "id": "req-9",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 19, 2026"
                  },
                  {
                        "id": "req-10",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "pending",
                        "remarks": "Under registrar verification.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 20, 2026"
                  },
                  {
                        "id": "req-11",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 21, 2026"
                  },
                  {
                        "id": "req-12",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 10, 2026"
                  },
                  {
                        "id": "req-13",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-14",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Archived in registrar.",
                        "document_url": null,
                        "scanned_at": "Nov 12, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-16",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-17",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 15, 2026"
                  },
                  {
                        "id": "req-18",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-19",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 17, 2026"
                  },
                  {
                        "id": "req-20",
                        "name": "Medical Certificate & Chest X-RAY for SMAW",
                        "status": "submitted",
                        "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 18, 2026"
                  },
                  {
                        "id": "req-21",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                        "document_url": null,
                        "scanned_at": "Nov 19, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 20, 2026"
                  },
                  {
                        "id": "req-23",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 21, 2026"
                  },
                  {
                        "id": "req-24",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 10, 2026"
                  },
                  {
                        "id": "req-25",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-26",
                        "name": "Barangay Certificate",
                        "status": "lacking",
                        "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                        "document_url": null,
                        "scanned_at": null
                  },
                  {
                        "id": "req-27",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-28",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "lacking",
                        "remarks": "Physical filing materials required.",
                        "document_url": null,
                        "scanned_at": null
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 15, 2026"
                  },
                  {
                        "id": "req-30",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-31",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "pending",
                        "remarks": "Under registrar verification.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 17, 2026"
                  },
                  {
                        "id": "req-32",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 18, 2026"
                  },
                  {
                        "id": "req-33",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 19, 2026"
                  },
                  {
                        "id": "req-34",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 20, 2026"
                  },
                  {
                        "id": "req-35",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Archived in registrar.",
                        "document_url": null,
                        "scanned_at": "Nov 21, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 10, 2026"
                  },
                  {
                        "id": "req-37",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-38",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 12, 2026"
                  },
                  {
                        "id": "req-39",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-40",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-41",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 15, 2026"
                  },
                  {
                        "id": "req-42",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                        "document_url": null,
                        "scanned_at": "Nov 16, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 17, 2026"
                  },
                  {
                        "id": "req-44",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 18, 2026"
                  },
                  {
                        "id": "req-45",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 19, 2026"
                  },
                  {
                        "id": "req-46",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 20, 2026"
                  },
                  {
                        "id": "req-47",
                        "name": "Barangay Certificate",
                        "status": "lacking",
                        "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                        "document_url": null,
                        "scanned_at": null
                  },
                  {
                        "id": "req-48",
                        "name": "Medical Certificate & Chest X-RAY for SMAW",
                        "status": "submitted",
                        "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 10, 2026"
                  },
                  {
                        "id": "req-49",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "lacking",
                        "remarks": "Physical filing materials required.",
                        "document_url": null,
                        "scanned_at": null
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 12, 2026"
                  },
                  {
                        "id": "req-51",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-52",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "pending",
                        "remarks": "Under registrar verification.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-53",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 15, 2026"
                  },
                  {
                        "id": "req-54",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-55",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 17, 2026"
                  },
                  {
                        "id": "req-56",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Archived in registrar.",
                        "document_url": null,
                        "scanned_at": "Nov 18, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 19, 2026"
                  },
                  {
                        "id": "req-58",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 20, 2026"
                  },
                  {
                        "id": "req-59",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 21, 2026"
                  },
                  {
                        "id": "req-60",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 10, 2026"
                  },
                  {
                        "id": "req-61",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-62",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 12, 2026"
                  },
                  {
                        "id": "req-63",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                        "document_url": null,
                        "scanned_at": "Nov 13, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-65",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 15, 2026"
                  },
                  {
                        "id": "req-66",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-67",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 17, 2026"
                  },
                  {
                        "id": "req-68",
                        "name": "Barangay Certificate",
                        "status": "lacking",
                        "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                        "document_url": null,
                        "scanned_at": null
                  },
                  {
                        "id": "req-69",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 19, 2026"
                  },
                  {
                        "id": "req-70",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "lacking",
                        "remarks": "Physical filing materials required.",
                        "document_url": null,
                        "scanned_at": null
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 21, 2026"
                  },
                  {
                        "id": "req-72",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 10, 2026"
                  },
                  {
                        "id": "req-73",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "pending",
                        "remarks": "Under registrar verification.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-74",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 12, 2026"
                  },
                  {
                        "id": "req-75",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-76",
                        "name": "Medical Certificate & Chest X-RAY for SMAW",
                        "status": "submitted",
                        "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-77",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Archived in registrar.",
                        "document_url": null,
                        "scanned_at": "Nov 15, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-79",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 17, 2026"
                  },
                  {
                        "id": "req-80",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 18, 2026"
                  },
                  {
                        "id": "req-81",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 19, 2026"
                  },
                  {
                        "id": "req-82",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 20, 2026"
                  },
                  {
                        "id": "req-83",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 21, 2026"
                  },
                  {
                        "id": "req-84",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                        "document_url": null,
                        "scanned_at": "Nov 10, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-86",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 12, 2026"
                  },
                  {
                        "id": "req-87",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-88",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-89",
                        "name": "Barangay Certificate",
                        "status": "lacking",
                        "remarks": "Valid Barangay Certificate/Clearance of residency required.",
                        "document_url": null,
                        "scanned_at": null
                  },
                  {
                        "id": "req-90",
                        "name": "Medical Certificate & Chest X-RAY for SMAW",
                        "status": "submitted",
                        "remarks": "Medical Certificate & Chest X-RAY for SMAW verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-91",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "lacking",
                        "remarks": "Physical filing materials required.",
                        "document_url": null,
                        "scanned_at": null
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 18, 2026"
                  },
                  {
                        "id": "req-93",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 19, 2026"
                  },
                  {
                        "id": "req-94",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "pending",
                        "remarks": "Under registrar verification.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 20, 2026"
                  },
                  {
                        "id": "req-95",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 21, 2026"
                  },
                  {
                        "id": "req-96",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 10, 2026"
                  },
                  {
                        "id": "req-97",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 11, 2026"
                  },
                  {
                        "id": "req-98",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Archived in registrar.",
                        "document_url": null,
                        "scanned_at": "Nov 12, 2026"
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
                        "name": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)",
                        "status": "submitted",
                        "remarks": "Birth Certificate NSO/PSA (For Married women bring Marriage Certificate) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
                        "scanned_at": "Nov 13, 2026"
                  },
                  {
                        "id": "req-100",
                        "name": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137",
                        "status": "submitted",
                        "remarks": "Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137 verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                        "scanned_at": "Nov 14, 2026"
                  },
                  {
                        "id": "req-101",
                        "name": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
                        "scanned_at": "Nov 15, 2026"
                  },
                  {
                        "id": "req-102",
                        "name": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)",
                        "status": "submitted",
                        "remarks": "Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature) verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
                        "scanned_at": "Nov 16, 2026"
                  },
                  {
                        "id": "req-103",
                        "name": "Barangay Certificate",
                        "status": "submitted",
                        "remarks": "Barangay Certificate verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
                        "scanned_at": "Nov 17, 2026"
                  },
                  {
                        "id": "req-104",
                        "name": "Medical Certificate for BPP, Driving & CSS NCII",
                        "status": "submitted",
                        "remarks": "Medical Certificate for BPP, Driving & CSS NCII verified and authenticated on record.",
                        "document_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                        "scanned_at": "Nov 18, 2026"
                  },
                  {
                        "id": "req-105",
                        "name": "Long Brown Envelope (1pc) & Long White Folder (1pc)",
                        "status": "submitted",
                        "remarks": "Long Brown Envelope (1pc) & Long White Folder (1pc) verified and authenticated on record.",
                        "document_url": null,
                        "scanned_at": "Nov 19, 2026"
                  }
            ]
      }
];

    // THEME TOGGLE: Removed (System operates permanently in Light Mode)
    function ThemeToggle() {
      return null;
    }

    // PASSWORD VISIBILITY TOGGLE EYE ICON (Lucide Eye / EyeOff)
    function PasswordEyeIcon({ show, className = "w-4 h-4" }) {
      return show ? <Icons.Eye className={className} /> : <Icons.EyeOff className={className} />;
    }

    // MODAL PORTAL: Mounts modals directly to document.body
    // Guarantees true viewport centering immune to any ancestor transform, overflow, or scroll offsets
    function ModalPortal({ children }) {
      if (typeof document === 'undefined') return null;
      return ReactDOM.createPortal(children, document.body);
    }

    // Default Supabase Cloud Backend Configuration
    const DEFAULT_SUPABASE_URL = 'https://huhdxgzwtazqxjirwgby.supabase.co';
    const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aGR4Z3p3dGF6cXhqaXJ3Z2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4OTUwNzYsImV4cCI6MjExMDQ3MTA3Nn0.fZECAjsLcqc2i7GME8cSaKBURqY9zSsxrf3p3RQBxvg';
    const DEFAULT_SUPABASE_PUB_KEY = 'sb_publishable_lN2qNPC4zS4HbK6SX_cUog_P44kkLdi';

    // Auto-sanitizer for Supabase URL: ensures strict origin URL without paths or query parameters
    function sanitizeSupabaseUrl(rawUrl) {
      if (!rawUrl || typeof rawUrl !== 'string') return DEFAULT_SUPABASE_URL;
      let clean = rawUrl.trim();
      const dashMatch = clean.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9_-]+)/i);
      if (dashMatch) {
        return `https://${dashMatch[1]}.supabase.co`;
      }
      try {
        const urlObj = new URL(clean.startsWith('http') ? clean : 'https://' + clean);
        return urlObj.origin;
      } catch (e) {
        return DEFAULT_SUPABASE_URL;
      }
    }

    function App() {
      // THEME: System locked to Light Mode only
      const theme = 'light';

      useEffect(() => {
        try {
          localStorage.setItem('portal_theme', 'light');
        } catch (e) { }
        document.documentElement.classList.add('light-theme');
        document.body.classList.add('light-theme');
        document.documentElement.classList.remove('dark', 'dark-theme');
        document.body.classList.remove('dark', 'dark-theme');
      }, []);

      // DEFAULT FALLBACK ADMIN SESSION (used when visiting #main directly without prior login)
      const DEFAULT_ADMIN_SESSION = {
        id: 'admin-default',
        email: 'admin@system.local',
        name: 'Administrator',
        role: 'admin',
        is_admin: true
      };

      // PAGE NAVIGATION / ROUTING STATE: 'login' | 'signup' | 'redirecting' | 'main'
      // Always starts at the Login Page (or Sign Up Page) before the user is redirected to the main page!
      const [currentView, setCurrentView] = useState(() => {
        const hash = window.location.hash.toLowerCase();
        if (hash === '#signup') return 'signup';
        if (hash === '#main') return 'main';
        return 'login';
      });

      // PERSISTENT AUTHENTICATION STATE
      const [currentUser, setCurrentUser] = useState(() => {
        const hash = window.location.hash.toLowerCase();
        try {
          const saved = localStorage.getItem('auth_user_session');
          if (saved) return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved session', e);
        }
        if (hash === '#main') {
          try {
            localStorage.setItem('auth_user_session', JSON.stringify(DEFAULT_ADMIN_SESSION));
          } catch (e) { }
          return DEFAULT_ADMIN_SESSION;
        }
        return null; // Ensure user starts at login / signup page!
      });

      // Cached saved session from previous login (for quick 1-click continue banner on login page)
      const [savedSession] = useState(() => {
        const saved = localStorage.getItem('auth_user_session');
        return saved ? JSON.parse(saved) : null;
      });

      // User object during redirecting transition
      const [redirectingUser, setRedirectingUser] = useState(null);

      // Dedicated Navigation Helper
      const navigateTo = (view) => {
        setAuthError('');
        setAuthSuccess('');
        setCurrentView(view);
        if (view === 'login') window.location.hash = '#login';
        else if (view === 'signup') window.location.hash = '#signup';
        else if (view === 'main') window.location.hash = '#main';
        else if (view === 'redirecting') window.location.hash = '#redirecting';
      };

      // Hash change listener for browser history (Back / Forward buttons)
      useEffect(() => {
        const handleHashChange = () => {
          const hash = window.location.hash.toLowerCase();
          if (hash === '#signup') {
            setCurrentView('signup');
          } else if (hash === '#login') {
            setCurrentView('login');
          } else if (hash === '#main') {
            let session = null;
            try {
              const saved = localStorage.getItem('auth_user_session');
              if (saved) session = JSON.parse(saved);
            } catch (e) { }
            if (!session) {
              session = DEFAULT_ADMIN_SESSION;
              try {
                localStorage.setItem('auth_user_session', JSON.stringify(DEFAULT_ADMIN_SESSION));
              } catch (e) { }
            }
            setCurrentUser(session);
            setCurrentView('main');
          }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
      }, []);

      // Form Credentials & Roles
      const [authEmail, setAuthEmail] = useState('');
      const [authPassword, setAuthPassword] = useState('');
      const [authError, setAuthError] = useState('');
      const [authSuccess, setAuthSuccess] = useState('');

      // Sign-Up Specific Fields
      const [signupName, setSignupName] = useState('');
      const [signupRole, setSignupRole] = useState('user');
      const [signupBatch, setSignupBatch] = useState('Batch 2026-A');
      const [signupStudentId, setSignupStudentId] = useState('');
      const [signupDept, setSignupDept] = useState('Technical Vocational');
      const [adminPasscode, setAdminPasscode] = useState('');

      // Animation & Interactive States
      const [isAuthenticating, setIsAuthenticating] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [shakeError, setShakeError] = useState(false);
      const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

      const handleCardMouseMove = (e) => {
        if (window.innerWidth < 768) return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setCardTilt({ x: x * 6, y: -y * 6 });
      };
      const handleCardMouseLeave = () => {
        setCardTilt({ x: 0, y: 0 });
      };

      // In-Memory Database & Registered Users
      const [registeredUsers, setRegisteredUsers] = useState(() => {
        const saved = localStorage.getItem('registered_users');
        return saved ? JSON.parse(saved) : INITIAL_AUTH_USERS;
      });

      const REQUIREMENTS_VERSION = 'KM100_REQUIREMENTS_V2026_5_BATCHES_V1';
      const [internDatabase, setInternDatabase] = useState(() => {
        try {
          const savedVer = localStorage.getItem('km100_requirements_version');
          const saved = localStorage.getItem('intern_database');
          const isObsolete = saved && (saved.includes('Diploma Degree') || saved.includes('NC11') || saved.includes('Trainers Methodology') || saved.includes('Medical Physical'));
          if (!saved || savedVer !== REQUIREMENTS_VERSION || isObsolete) {
            localStorage.setItem('km100_requirements_version', REQUIREMENTS_VERSION);
            localStorage.setItem('intern_database', JSON.stringify(INITIAL_INTERNS));
            return INITIAL_INTERNS;
          }
          return JSON.parse(saved);
        } catch (e) {
          return INITIAL_INTERNS;
        }
      });

      // Main Portal State
      const [batchNumber, setBatchNumber] = useState('');
      const [fullName, setFullName] = useState('');
      const [isSearching, setIsSearching] = useState(false);
      const [hasSearched, setHasSearched] = useState(false);
      const [searchResult, setSearchResult] = useState(null);
      const [selectedDocument, setSelectedDocument] = useState(null);
      const [activeFilter, setActiveFilter] = useState('all');

      // Admin Modals
      const [showEditInternModal, setShowEditInternModal] = useState(false);
      const [editName, setEditName] = useState('');
      const [editBatch, setEditBatch] = useState('');
      const [editStudentId, setEditStudentId] = useState('');
      const [editDept, setEditDept] = useState('');
      const [editEmail, setEditEmail] = useState('');
      const [editPassword, setEditPassword] = useState('');
      const [showEditPassword, setShowEditPassword] = useState(false);
      const [isSavingPassword, setIsSavingPassword] = useState(false);
      const [editOverallStatus, setEditOverallStatus] = useState('incomplete');

      // User Password Management State
      const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
      const [myNewPassword, setMyNewPassword] = useState('');
      const [myConfirmPassword, setMyConfirmPassword] = useState('');
      const [showMyPassword, setShowMyPassword] = useState(false);
      const [isSavingMyPassword, setIsSavingMyPassword] = useState(false);
      const [savePasswordStatus, setSavePasswordStatus] = useState('');

      const [showEditReqModal, setShowEditReqModal] = useState(false);
      const [editingReq, setEditingReq] = useState(null);
      const [editReqStatus, setEditReqStatus] = useState('lacking');
      const [editReqRemarks, setEditReqRemarks] = useState('');
      const [editReqDocUrl, setEditReqDocUrl] = useState('');

      const [showAddReqModal, setShowAddReqModal] = useState(false);
      const [newReqName, setNewReqName] = useState('');
      const [newReqStatus, setNewReqStatus] = useState('lacking');
      const [newReqRemarks, setNewReqRemarks] = useState('');

      // Supabase State: Auto-sanitized and pre-configured with project defaults
      const [sbUrl, setSbUrl] = useState(() => {
        const stored = localStorage.getItem('sb_project_url');
        return sanitizeSupabaseUrl(stored || DEFAULT_SUPABASE_URL);
      });
      const [sbKey, setSbKey] = useState(() => {
        const stored = localStorage.getItem('sb_anon_key');
        return (stored && stored.trim()) || DEFAULT_SUPABASE_ANON_KEY;
      });
      const [isSbConnected, setIsSbConnected] = useState(true);
      const [showSbModal, setShowSbModal] = useState(false);

      // Auto-heal localStorage on mount to clear any previously saved malformed URLs or keys
      useEffect(() => {
        try {
          const rawUrl = localStorage.getItem('sb_project_url');
          const cleanUrl = sanitizeSupabaseUrl(rawUrl || DEFAULT_SUPABASE_URL);
          localStorage.setItem('sb_project_url', cleanUrl);
          setSbUrl(cleanUrl);

          const rawKey = localStorage.getItem('sb_anon_key');
          if (!rawKey || !rawKey.startsWith('eyJ')) {
            localStorage.setItem('sb_anon_key', DEFAULT_SUPABASE_ANON_KEY);
            setSbKey(DEFAULT_SUPABASE_ANON_KEY);
          } else {
            setSbKey(rawKey.trim());
          }
          setIsSbConnected(true);
        } catch (e) {
          console.warn("Storage sync:", e);
        }
      }, []);

      // Lock background scrolling and keep viewport centered whenever any modal opens
      useEffect(() => {
        const isAnyModalOpen = Boolean(
          showEditInternModal || showEditReqModal || showAddReqModal || selectedDocument || showSbModal || showChangePasswordModal
        );
        if (isAnyModalOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => {
          document.body.style.overflow = '';
        };
      }, [showEditInternModal, showEditReqModal, showAddReqModal, selectedDocument, showSbModal, showChangePasswordModal]);

      // Ensure that if searchResult is currently showing obsolete requirements, update them immediately
      useEffect(() => {
        if (searchResult && Array.isArray(searchResult.requirements)) {
          const hasObsolete = searchResult.requirements.some(r =>
            (r.name || '').includes('Diploma Degree') ||
            (r.name || '').includes('NC11') ||
            (r.name || '').includes('Trainers Methodology') ||
            (r.name || '').includes('Medical Physical')
          );
          if (hasObsolete) {
            const match = INITIAL_INTERNS.find(i => i.full_name.toLowerCase() === (searchResult.full_name || '').toLowerCase());
            if (match) {
              setSearchResult({
                ...searchResult,
                requirements: match.requirements
              });
            } else {
              const isSmaw = (searchResult.department || '').toLowerCase().includes('smaw');
              const medName = isSmaw
                ? 'Medical Certificate & Chest X-RAY for SMAW'
                : 'Medical Certificate for BPP, Driving & CSS NCII';
              const medRemarks = isSmaw
                ? 'Medical Certificate and Chest X-RAY are mandatory for SMAW welding trainees. Submit clinic findings.'
                : 'Standard Medical Certificate required for BPP, Driving, and CSS NCII trainees. Submit physician clearance.';

              setSearchResult({
                ...searchResult,
                requirements: [
                  { id: 'req-1', name: 'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)', status: 'lacking', remarks: 'Official NSO/PSA copy required. (For married women, submit Marriage Certificate)', document_url: null, scanned_at: null },
                  { id: 'req-2', name: 'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137', status: 'lacking', remarks: 'Submit either Transcript of Records (TOR), Diploma, ALS Certificate, Form 138, or Form 137.', document_url: null, scanned_at: null },
                  { id: 'req-3', name: 'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)', status: 'lacking', remarks: '4 pcs passport-sized photos with white background, collar, nametag, and signature.', document_url: null, scanned_at: null },
                  { id: 'req-4', name: 'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)', status: 'lacking', remarks: '4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature.', document_url: null, scanned_at: null },
                  { id: 'req-5', name: 'Barangay Certificate', status: 'lacking', remarks: 'Current valid Barangay Certificate/Clearance of residency required.', document_url: null, scanned_at: null },
                  { id: 'req-6', name: medName, status: 'lacking', remarks: medRemarks, document_url: null, scanned_at: null },
                  { id: 'req-7', name: 'Long Brown Envelope (1pc) & Long White Folder (1pc)', status: 'lacking', remarks: 'Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving.', document_url: null, scanned_at: null }
                ]
              });
            }
          }
        }
      }, [searchResult]);

      const getSupabaseClient = () => {
        const cleanUrl = sanitizeSupabaseUrl(sbUrl);
        const cleanKey = (sbKey && sbKey.trim()) || DEFAULT_SUPABASE_ANON_KEY;

        if (window.supabase && cleanUrl) {
          try {
            return window.supabase.createClient(cleanUrl, cleanKey);
          } catch (e) {
            console.error("Supabase init error:", e);
          }
        }
        return null;
      };

      const renderSupabaseModal = () => {
        if (!showSbModal) return null;
        return (
          <ModalPortal>
            <div className="fixed-modal-overlay">
              <form role="dialog" aria-modal="true" aria-labelledby="supabase-modal-title" onSubmit={(e) => {
                e.preventDefault();
                const urlClean = sanitizeSupabaseUrl(sbUrl);
                const keyClean = (sbKey && sbKey.trim()) || DEFAULT_SUPABASE_ANON_KEY;
                localStorage.setItem('sb_project_url', urlClean);
                localStorage.setItem('sb_anon_key', keyClean);
                setSbUrl(urlClean);
                setSbKey(keyClean);
                setIsSbConnected(true);
                setShowSbModal(false);
                alert("Connected to Supabase! URL validated and synced.");
              }} className="bg-white dark:bg-slate-900 border-2 border-orange-500 rounded-2xl sm:rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[calc(100vh-1.5rem)] overflow-y-auto m-auto shadow-2xl space-y-4 animate-modal-pop">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowSbModal(false)}
                      aria-label="Back and close Supabase dialog"
                      className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition"
                    >
                      <span>←</span> Back
                    </button>
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                      <Icons.Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 id="supabase-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">Connect Supabase Database & Auth</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Sync with live PostgreSQL & Supabase Auth</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setShowSbModal(false)} aria-label="Close Supabase modal" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 text-slate-400 hover:text-slate-700 dark:hover:text-white text-base font-bold">✕</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="sb-url" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Supabase Project URL</label>
                    <input
                      id="sb-url"
                      type="url"
                      placeholder="https://your-project-id.supabase.co"
                      value={sbUrl}
                      onChange={(e) => setSbUrl(e.target.value)}
                      className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="sb-key" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Supabase Anon Key</label>
                    <textarea
                      id="sb-key"
                      rows="3"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={sbKey}
                      onChange={(e) => setSbKey(e.target.value)}
                      className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono shadow-sm"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSbModal(false)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition flex items-center gap-1 shadow-sm"
                  >
                    <span>←</span> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSbUrl('');
                      setSbKey('');
                      localStorage.removeItem('sb_project_url');
                      localStorage.removeItem('sb_anon_key');
                      setIsSbConnected(false);
                      setShowSbModal(false);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-xs font-semibold transition shadow-sm"
                  >
                    Disconnect
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-600/25 btn-shimmer"
                  >
                    Save & Connect Database
                  </button>
                </div>
              </form>
            </div>
          </ModalPortal>
        );
      };

      // When user logs in as a student, automatically show their own records!
      useEffect(() => {
        if (currentUser && currentUser.role === 'user' && currentUser.batch && currentUser.name) {
          setBatchNumber(currentUser.batch);
          setFullName(currentUser.name);
          performSearch(currentUser.batch, currentUser.name);
        }
      }, [currentUser]);

      // SMOOTH REDIRECT TRIGGER (Shows Redirecting Screen Before Entering Main Portal)
      const triggerRedirect = (sessionObj) => {
        setIsAuthenticating(false);
        setRedirectingUser(sessionObj);
        setCurrentView('redirecting');
        window.location.hash = '#redirecting';
        localStorage.setItem('auth_user_session', JSON.stringify(sessionObj));

        setTimeout(() => {
          setCurrentUser(sessionObj);
          setCurrentView('main');
          window.location.hash = '#main';
          setRedirectingUser(null);
          setAuthPassword('');
        }, 1100);
      };

      // LOGIN SUBMISSION (SUPABASE AUTH + LOCAL DEMO)
      const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setAuthError('');
        setAuthSuccess('');
        const emailClean = authEmail.trim().toLowerCase();

        // 1. Check local demo / preset users first for instant access
        const demoUser = registeredUsers.find(
          u => u.email.toLowerCase() === emailClean && u.password === authPassword
        );

        if (demoUser) {
          const sessionObj = {
            id: demoUser.id,
            role: demoUser.role,
            email: demoUser.email,
            name: demoUser.name,
            batch: demoUser.batch || '',
            student_id: demoUser.student_id || '',
            is_admin: demoUser.role === 'admin'
          };

          setIsAuthenticating(true);
          setTimeout(() => {
            triggerRedirect(sessionObj);
          }, 350);
          return;
        }

        // 2. If not local demo user, authenticate via live Supabase Auth
        const sbClient = getSupabaseClient();
        if (sbClient) {
          setIsAuthenticating(true);
          try {
            const { data: authData, error: authErr } = await sbClient.auth.signInWithPassword({
              email: emailClean,
              password: authPassword
            });

            if (authErr) {
              setIsAuthenticating(false);
              setAuthError(`Supabase Auth: ${authErr.message}`);
              setShakeError(true);
              setTimeout(() => setShakeError(false), 500);
              return;
            }

            if (authData?.user) {
              const uMeta = authData.user.user_metadata || {};
              const userRole = uMeta.role || 'user';
              const sessionObj = {
                id: authData.user.id,
                role: userRole,
                email: authData.user.email,
                name: uMeta.full_name || authData.user.email.split('@')[0],
                batch: uMeta.batch_number || '',
                student_id: uMeta.student_id || '',
                is_admin: userRole === 'admin'
              };

              triggerRedirect(sessionObj);
              return;
            }
          } catch (err) {
            console.error('Supabase login error:', err);
          }
          setIsAuthenticating(false);
        }

        setAuthError('Invalid email or password. If you registered on Supabase, check your credentials or switch to Sign Up.');
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
      };

      // ONE-CLICK DEMO LOGIN
      const handleQuickLogin = (email, pass) => {
        setAuthEmail(email);
        setAuthPassword(pass);
        const user = registeredUsers.find(u => u.email === email && u.password === pass);
        if (user) {
          const sessionObj = {
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name,
            batch: user.batch || '',
            student_id: user.student_id || '',
            is_admin: user.role === 'admin'
          };
          setIsAuthenticating(true);
          setTimeout(() => {
            triggerRedirect(sessionObj);
          }, 350);
        }
      };

      // SIGN UP SUBMISSION WITH SUPABASE AUTH INTEGRATION
      const handleSignUp = async (e) => {
        e.preventDefault();
        setAuthError('');
        setAuthSuccess('');

        const emailClean = authEmail.trim().toLowerCase();

        if (registeredUsers.some(u => u.email.toLowerCase() === emailClean)) {
          setAuthError('An account with this email already exists. Please log in.');
          setShakeError(true);
          setTimeout(() => setShakeError(false), 500);
          return;
        }

        if (signupRole === 'admin' && adminPasscode !== 'admin123' && adminPasscode !== 'ADMIN') {
          setAuthError('Invalid Admin Passcode! (Default demo passcode is: admin123)');
          setShakeError(true);
          setTimeout(() => setShakeError(false), 500);
          return;
        }

        setIsAuthenticating(true);

        const sbClient = getSupabaseClient();
        let supabaseUserId = null;
        let requiresEmailConfirm = false;

        // 1. Attempt registration through Backend API (Backend securely manages Supabase Auth & DB)
        try {
          const apiBaseUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '8000'
            ? 'http://localhost:8000'
            : '';
          const apiRes = await fetch(`${apiBaseUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: emailClean,
              password: authPassword,
              name: signupName.trim(),
              role: signupRole,
              batch: signupRole === 'user' ? signupBatch.trim() : '',
              student_id: signupRole === 'user' ? signupStudentId.trim() : '',
              department: signupRole === 'user' ? signupDept.trim() : ''
            })
          });
          if (apiRes.ok) {
            console.log("Successfully registered through backend Supabase connection.");
          }
        } catch (backendErr) {
          // Backend offline or local, continue with Supabase client / memory
        }

        // 2. Direct client fallback if configured
        if (sbClient) {
          try {
            const { data: authData, error: authErr } = await sbClient.auth.signUp({
              email: emailClean,
              password: authPassword,
              options: {
                data: {
                  full_name: signupName.trim(),
                  role: signupRole,
                  batch_number: signupRole === 'user' ? signupBatch.trim() : '',
                  student_id: signupRole === 'user' ? signupStudentId.trim() : '',
                  department: signupRole === 'user' ? signupDept.trim() : ''
                }
              }
            });

            if (authErr) {
              const errMsg = authErr.message || '';
              if (errMsg.toLowerCase().includes('already registered')) {
                setIsAuthenticating(false);
                setAuthError('An account with this email already exists in Supabase. Please sign in.');
                setShakeError(true);
                setTimeout(() => setShakeError(false), 500);
                return;
              } else if (errMsg.toLowerCase().includes('password')) {
                setIsAuthenticating(false);
                setAuthError(`Password notice: ${errMsg}`);
                setShakeError(true);
                setTimeout(() => setShakeError(false), 500);
                return;
              } else {
                console.warn('Supabase Auth notice (completing registration):', errMsg);
              }
            }

            if (authData?.user) {
              supabaseUserId = authData.user.id;
              if (authData.user.identities && authData.user.identities.length === 0) {
                setIsAuthenticating(false);
                setAuthError('An account with this email already exists in Supabase. Please sign in.');
                return;
              }

              if (!authData.session) {
                requiresEmailConfirm = true;
              }

              // Sync into public.profiles table
              try {
                await sbClient.from('profiles').upsert({
                  id: authData.user.id,
                  email: emailClean,
                  full_name: signupName.trim(),
                  password: authPassword,
                  role: signupRole
                });
              } catch (profErr) {
                console.warn('Profiles table sync:', profErr);
              }

              // If registered as student/user, sync to public.interns and public.requirements
              if (signupRole === 'user') {
                try {
                  const { data: internData } = await sbClient.from('interns').upsert({
                    id: authData.user.id,
                    full_name: signupName.trim(),
                    batch_number: signupBatch.trim(),
                    student_id: signupStudentId.trim() || `ID-${Date.now().toString().slice(-4)}`,
                    email: emailClean,
                    department: signupDept.trim(),
                    overall_status: 'incomplete'
                  }).select().single();

                  if (internData?.id) {
                    const isSmaw = (signupDept || '').toLowerCase().includes('smaw');
                    const medicalReqName = isSmaw
                      ? 'Medical Certificate & Chest X-RAY for SMAW'
                      : 'Medical Certificate for BPP, Driving & CSS NCII';
                    const medicalReqRemarks = isSmaw
                      ? 'Medical Certificate and Chest X-RAY are mandatory for SMAW welding trainees. Submit clinic findings.'
                      : 'Standard Medical Certificate required for BPP, Driving, and CSS NCII trainees. Submit physician clearance.';

                    const defaultReqs = [
                      { intern_id: internData.id, requirement_name: 'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)', status: 'lacking', remarks: 'Official NSO/PSA copy required. (For married women, submit Marriage Certificate)' },
                      { intern_id: internData.id, requirement_name: 'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137', status: 'lacking', remarks: 'Submit either Transcript of Records (TOR), Diploma, ALS Certificate, Form 138, or Form 137.' },
                      { intern_id: internData.id, requirement_name: 'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)', status: 'lacking', remarks: '4 pcs passport-sized photos with white background, collar, nametag, and signature.' },
                      { intern_id: internData.id, requirement_name: 'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)', status: 'lacking', remarks: '4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature.' },
                      { intern_id: internData.id, requirement_name: 'Barangay Certificate', status: 'lacking', remarks: 'Current valid Barangay Certificate/Clearance of residency required.' },
                      { intern_id: internData.id, requirement_name: medicalReqName, status: 'lacking', remarks: medicalReqRemarks },
                      { intern_id: internData.id, requirement_name: 'Long Brown Envelope (1pc) & Long White Folder (1pc)', status: 'lacking', remarks: 'Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving.' }
                    ];
                    await sbClient.from('requirements').insert(defaultReqs);
                  }
                } catch (internErr) {
                  console.warn('Intern table sync:', internErr);
                }
              }
            }
          } catch (err) {
            console.error('Supabase registration error:', err);
          }
        }

        const newUserId = supabaseUserId || ('user-' + Date.now());
        const newUser = {
          id: newUserId,
          email: emailClean,
          password: authPassword,
          role: signupRole,
          name: signupName.trim(),
          batch: signupRole === 'user' ? signupBatch.trim() : '',
          student_id: signupRole === 'user' ? signupStudentId.trim() : ''
        };

        const updatedUsers = [...registeredUsers, newUser];
        setRegisteredUsers(updatedUsers);
        localStorage.setItem('registered_users', JSON.stringify(updatedUsers));

        // If registered as student, initialize their record and requirements checklist locally
        if (signupRole === 'user') {
          const isSmawLocal = (signupDept || '').toLowerCase().includes('smaw');
          const localMedReqName = isSmawLocal
            ? 'Medical Certificate & Chest X-RAY for SMAW'
            : 'Medical Certificate for BPP, Driving & CSS NCII';
          const localMedReqRemarks = isSmawLocal
            ? 'Medical Certificate and Chest X-RAY are mandatory for SMAW welding trainees. Submit clinic findings.'
            : 'Standard Medical Certificate required for BPP, Driving, and CSS NCII trainees. Submit physician clearance.';

          const newStudentEntry = {
            id: newUserId,
            full_name: signupName.trim(),
            batch_number: signupBatch.trim(),
            student_id: signupStudentId.trim() || `ID-${Date.now().toString().slice(-4)}`,
            email: emailClean,
            department: signupDept.trim(),
            overall_status: 'incomplete',
            requirements: [
              {
                id: 'req-' + Date.now() + '-1',
                name: 'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)',
                status: 'lacking',
                remarks: 'Official NSO/PSA copy required. (For married women, submit Marriage Certificate)',
                document_url: null,
                scanned_at: null
              },
              {
                id: 'req-' + Date.now() + '-2',
                name: 'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137',
                status: 'lacking',
                remarks: 'Submit either Transcript of Records (TOR), Diploma, ALS Certificate, Form 138, or Form 137.',
                document_url: null,
                scanned_at: null
              },
              {
                id: 'req-' + Date.now() + '-3',
                name: 'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)',
                status: 'lacking',
                remarks: '4 pcs passport-sized photos with white background, collar, nametag, and signature.',
                document_url: null,
                scanned_at: null
              },
              {
                id: 'req-' + Date.now() + '-4',
                name: 'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)',
                status: 'lacking',
                remarks: '4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature.',
                document_url: null,
                scanned_at: null
              },
              {
                id: 'req-' + Date.now() + '-5',
                name: 'Barangay Certificate',
                status: 'lacking',
                remarks: 'Current valid Barangay Certificate/Clearance of residency required.',
                document_url: null,
                scanned_at: null
              },
              {
                id: 'req-' + Date.now() + '-6',
                name: localMedReqName,
                status: 'lacking',
                remarks: localMedReqRemarks,
                document_url: null,
                scanned_at: null
              },
              {
                id: 'req-' + Date.now() + '-7',
                name: 'Long Brown Envelope (1pc) & Long White Folder (1pc)',
                status: 'lacking',
                remarks: 'Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving.',
                document_url: null,
                scanned_at: null
              }
            ]
          };

          const updatedDatabase = [newStudentEntry, ...internDatabase];
          setInternDatabase(updatedDatabase);
          localStorage.setItem('intern_database', JSON.stringify(updatedDatabase));
        }

        const sessionObj = {
          id: newUser.id,
          role: newUser.role,
          email: newUser.email,
          name: newUser.name,
          batch: newUser.batch,
          student_id: newUser.student_id,
          is_admin: newUser.role === 'admin'
        };

        setIsAuthenticating(false);

        if (requiresEmailConfirm) {
          setAuthSuccess('Account registered successfully! A confirmation link was sent to your email. You can also sign in directly now.');
          navigateTo('login');
        } else {
          triggerRedirect(sessionObj);
        }
      };

      // LOGOUT & RETURN TO LOGIN PAGE
      const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('auth_user_session');
        setSearchResult(null);
        setHasSearched(false);
        setBatchNumber('');
        setFullName('');
        setRedirectingUser(null);
        navigateTo('login');
      };

      // SEARCH FUNCTION
      const performSearch = async (bArg, nArg) => {
        const b = (bArg !== undefined ? bArg : batchNumber).trim();
        const n = (nArg !== undefined ? nArg : fullName).trim();

        if (!b || !n) {
          alert('Please enter both your Batch Number and your Full Name.');
          return;
        }

        setIsSearching(true);
        setHasSearched(true);

        // 1. Attempt connection through Backend API (Backend securely proxies to Supabase)
        try {
          const apiBaseUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '8000'
            ? 'http://localhost:8000'
            : '';
          const apiRes = await fetch(`${apiBaseUrl}/api/interns/search?batch_number=${encodeURIComponent(b)}&name=${encodeURIComponent(n)}`);
          if (apiRes.ok) {
            const apiData = await apiRes.json();
            if (apiData.found && apiData.data) {
              setSearchResult(apiData.data);
              setIsSearching(false);
              return;
            }
          }
        } catch (backendErr) {
          // Backend offline or running decoupled, proceed to Supabase client / memory
        }

        const sb = getSupabaseClient();
        if (sb) {
          try {
            const { data: interns } = await sb
              .from('interns')
              .select('*')
              .ilike('batch_number', `%${b}%`)
              .ilike('full_name', `%${n}%`);

            if (interns && interns.length > 0) {
              const intern = interns[0];
              const { data: reqs } = await sb
                .from('requirements')
                .select('*')
                .eq('intern_id', intern.id);

              let formattedReqs = (reqs || []).map(r => ({
                id: r.id,
                name: r.requirement_name || r.name,
                status: r.status,
                remarks: r.remarks,
                document_url: r.document_url,
                scanned_at: r.scanned_at ? new Date(r.scanned_at).toLocaleDateString() : null
              }));

              // If Supabase requirements table for this student is empty or has obsolete requirements, use official requirements
              const hasObsolete = formattedReqs.some(r =>
                (r.name || '').includes('Diploma Degree') ||
                (r.name || '').includes('NC11') ||
                (r.name || '').includes('Trainers Methodology') ||
                (r.name || '').includes('Medical Physical')
              );
              if (formattedReqs.length === 0 || hasObsolete) {
                const seedMatch = INITIAL_INTERNS.find(i => i.full_name.toLowerCase() === intern.full_name.toLowerCase());
                if (seedMatch) {
                  formattedReqs = seedMatch.requirements;
                } else {
                  const isSmaw = (intern.department || '').toLowerCase().includes('smaw');
                  const medName = isSmaw
                    ? 'Medical Certificate & Chest X-RAY for SMAW'
                    : 'Medical Certificate for BPP, Driving & CSS NCII';
                  const medRemarks = isSmaw
                    ? 'Medical Certificate and Chest X-RAY are mandatory for SMAW welding trainees. Submit clinic findings.'
                    : 'Standard Medical Certificate required for BPP, Driving, and CSS NCII trainees. Submit physician clearance.';

                  formattedReqs = [
                    { id: 'req-1', name: 'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)', status: 'lacking', remarks: 'Official NSO/PSA copy required. (For married women, submit Marriage Certificate)', document_url: null, scanned_at: null },
                    { id: 'req-2', name: 'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137', status: 'lacking', remarks: 'Submit either Transcript of Records (TOR), Diploma, ALS Certificate, Form 138, or Form 137.', document_url: null, scanned_at: null },
                    { id: 'req-3', name: 'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)', status: 'lacking', remarks: '4 pcs passport-sized photos with white background, collar, nametag, and signature.', document_url: null, scanned_at: null },
                    { id: 'req-4', name: 'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)', status: 'lacking', remarks: '4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature.', document_url: null, scanned_at: null },
                    { id: 'req-5', name: 'Barangay Certificate', status: 'lacking', remarks: 'Current valid Barangay Certificate/Clearance of residency required.', document_url: null, scanned_at: null },
                    { id: 'req-6', name: medName, status: 'lacking', remarks: medRemarks, document_url: null, scanned_at: null },
                    { id: 'req-7', name: 'Long Brown Envelope (1pc) & Long White Folder (1pc)', status: 'lacking', remarks: 'Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving.', document_url: null, scanned_at: null }
                  ];
                }
              }

              setSearchResult({
                ...intern,
                requirements: formattedReqs
              });
              setIsSearching(false);
              return;
            }
          } catch (err) {
            console.warn("Supabase query error, falling back:", err);
          }
        }

        setTimeout(() => {
          let match = internDatabase.find(intern => {
            const iBatch = intern.batch_number.toLowerCase();
            const iName = intern.full_name.toLowerCase();
            return (iBatch.includes(b.toLowerCase()) || b.toLowerCase().includes(iBatch)) &&
              (iName.includes(n.toLowerCase()) || n.toLowerCase().includes(iName));
          });

          if (match) {
            const seedMatch = INITIAL_INTERNS.find(i => i.full_name.toLowerCase() === match.full_name.toLowerCase());
            if (seedMatch) {
              match = { ...match, requirements: seedMatch.requirements, department: seedMatch.department };
            }
          }

          setSearchResult(match || null);
          setIsSearching(false);
        }, 300);
      };

      // ADMIN EDIT CREDENTIALS
      const openEditInternModal = () => {
        if (!currentUser?.is_admin) return;
        setEditName(searchResult.full_name);
        setEditBatch(searchResult.batch_number);
        setEditStudentId(searchResult.student_id || '');
        setEditDept(searchResult.department || '');
        setEditEmail(searchResult.email || '');
        setEditOverallStatus(searchResult.overall_status || 'incomplete');

        // Look up student's existing password from registeredUsers or fallback
        const existingUser = registeredUsers.find(
          u => (searchResult.email && u.email?.toLowerCase() === searchResult.email.toLowerCase()) || u.id === searchResult.id
        );
        setEditPassword(existingUser?.password || 'user123');
        setShowEditPassword(false);
        setIsSavingPassword(false);
        setShowEditInternModal(true);
      };

      // DEDICATED SAVE PASSWORD BUTTON FOR STUDENT (SAVES DIRECTLY TO SUPABASE)
      const handleSaveStudentPassword = async () => {
        if (!editPassword.trim()) {
          alert('Please enter a valid password.');
          return;
        }
        setIsSavingPassword(true);
        try {
          const sbClient = getSupabaseClient();
          const targetEmail = (editEmail || searchResult.email || '').trim().toLowerCase();

          if (sbClient && targetEmail) {
            // Upsert into Supabase profiles table
            const { error: profErr } = await sbClient
              .from('profiles')
              .upsert({
                email: targetEmail,
                full_name: editName.trim() || searchResult.full_name,
                password: editPassword.trim(),
                role: 'user'
              }, { onConflict: 'email' });

            if (profErr) {
              console.warn('Supabase profiles update notice:', profErr);
            }
          }

          // Sync into registeredUsers
          const updatedUsers = registeredUsers.map(u => {
            if ((targetEmail && u.email?.toLowerCase() === targetEmail) || u.id === searchResult.id) {
              return { ...u, password: editPassword.trim(), name: editName.trim() || u.name };
            }
            return u;
          });
          if (!updatedUsers.some(u => targetEmail && u.email?.toLowerCase() === targetEmail)) {
            updatedUsers.push({
              id: searchResult.id || `user-${Date.now()}`,
              email: targetEmail,
              password: editPassword.trim(),
              role: 'user',
              name: editName.trim() || searchResult.full_name
            });
          }
          setRegisteredUsers(updatedUsers);
          localStorage.setItem('registered_users', JSON.stringify(updatedUsers));

          alert(`Password successfully reset for ${targetEmail || searchResult.full_name}!`);
        } catch (err) {
          console.error('Reset password error:', err);
          alert('Failed to reset password: ' + (err.message || err));
        } finally {
          setIsSavingPassword(false);
        }
      };

      const handleSaveInternCredentials = async (e) => {
        e.preventDefault();
        const updatedIntern = {
          ...searchResult,
          full_name: editName.trim(),
          batch_number: editBatch.trim(),
          student_id: editStudentId.trim(),
          department: editDept.trim(),
          email: editEmail.trim(),
          overall_status: editOverallStatus
        };

        setSearchResult(updatedIntern);
        const updatedList = internDatabase.map(item => (item.id === searchResult.id ? updatedIntern : item));
        setInternDatabase(updatedList);
        localStorage.setItem('intern_database', JSON.stringify(updatedList));

        // Sync to Supabase Database
        const sbClient = getSupabaseClient();
        if (sbClient) {
          try {
            await sbClient.from('interns').upsert({
              id: searchResult.id,
              full_name: editName.trim(),
              batch_number: editBatch.trim(),
              student_id: editStudentId.trim(),
              department: editDept.trim(),
              email: editEmail.trim(),
              overall_status: editOverallStatus,
              updated_at: new Date().toISOString()
            });

            if (editPassword.trim()) {
              await sbClient.from('profiles').upsert({
                email: editEmail.trim().toLowerCase(),
                full_name: editName.trim(),
                password: editPassword.trim(),
                role: 'user'
              }, { onConflict: 'email' });
            }
          } catch (sbErr) {
            console.warn('Supabase credentials sync notice:', sbErr);
          }
        }

        if (editPassword.trim()) {
          const targetEmail = editEmail.trim().toLowerCase();
          const updatedUsers = registeredUsers.map(u => {
            if ((targetEmail && u.email?.toLowerCase() === targetEmail) || u.id === searchResult.id) {
              return { ...u, password: editPassword.trim(), name: editName.trim() };
            }
            return u;
          });
          setRegisteredUsers(updatedUsers);
          localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
        }

        setShowEditInternModal(false);
        alert('Credentials & password successfully saved!');
      };

      // USER CHANGE & SAVE PASSWORD
      const handleSaveMyPassword = async (e) => {
        if (e) e.preventDefault();
        setSavePasswordStatus('');
        if (!myNewPassword.trim()) {
          alert('Please enter a new password.');
          return;
        }
        if (myNewPassword !== myConfirmPassword) {
          alert('Passwords do not match. Please re-enter.');
          return;
        }
        if (myNewPassword.length < 6) {
          alert('Password must be at least 6 characters.');
          return;
        }

        setIsSavingMyPassword(true);
        try {
          const sbClient = getSupabaseClient();
          const userEmail = (currentUser?.email || '').trim().toLowerCase();

          // 1. Supabase Auth user update
          if (sbClient) {
            try {
              const { error: authErr } = await sbClient.auth.updateUser({
                password: myNewPassword.trim()
              });
              if (authErr) {
                console.warn('Supabase auth.updateUser notice:', authErr.message);
              }
            } catch (authEx) {
              console.warn('Supabase auth update exception:', authEx);
            }

            // 2. Sync to Supabase profiles table
            try {
              await sbClient
                .from('profiles')
                .update({ password: myNewPassword.trim() })
                .eq('email', userEmail);
            } catch (profEx) {
              console.warn('Supabase profiles update exception:', profEx);
            }
          }

          // 3. Update registeredUsers in localStorage
          const updatedUsers = registeredUsers.map(u => {
            if (u.email.toLowerCase() === userEmail) {
              return { ...u, password: myNewPassword.trim() };
            }
            return u;
          });
          setRegisteredUsers(updatedUsers);
          localStorage.setItem('registered_users', JSON.stringify(updatedUsers));

          setSavePasswordStatus('success');
          alert('Password successfully reset!');
          setShowChangePasswordModal(false);
          setMyNewPassword('');
          setMyConfirmPassword('');
        } catch (err) {
          console.error('Save password failed:', err);
          alert('Failed to save password: ' + (err.message || err));
        } finally {
          setIsSavingMyPassword(false);
        }
      };

      // ADMIN UPDATE REQUIREMENT
      const openEditReqModal = (req) => {
        if (!currentUser?.is_admin) return;
        setEditingReq(req);
        setEditReqStatus(req.status);
        setEditReqRemarks(req.remarks || '');
        setEditReqDocUrl(req.document_url || '');
        setShowEditReqModal(true);
      };

      const handleSaveRequirementUpdate = (e) => {
        e.preventDefault();
        if (!editingReq) return;

        const updatedReqs = searchResult.requirements.map(r => {
          if (r.id === editingReq.id) {
            return {
              ...r,
              status: editReqStatus,
              remarks: editReqRemarks.trim(),
              document_url: editReqDocUrl.trim() || null
            };
          }
          return r;
        });

        const updatedIntern = { ...searchResult, requirements: updatedReqs };
        setSearchResult(updatedIntern);
        const updatedList = internDatabase.map(item => (item.id === searchResult.id ? updatedIntern : item));
        setInternDatabase(updatedList);
        localStorage.setItem('intern_database', JSON.stringify(updatedList));

        setShowEditReqModal(false);
        alert('Requirement status & remarks updated by Administrator!');
      };

      // ADMIN ADD REQUIREMENT
      const handleSaveAddRequirement = (e) => {
        e.preventDefault();
        if (!newReqName.trim()) return;

        const newReqItem = {
          id: 'req-' + Date.now(),
          name: newReqName.trim(),
          status: newReqStatus,
          remarks: newReqRemarks.trim(),
          document_url: null,
          scanned_at: newReqStatus === 'submitted' ? new Date().toLocaleDateString() : null
        };

        const updatedReqs = [...searchResult.requirements, newReqItem];
        const updatedIntern = { ...searchResult, requirements: updatedReqs };
        setSearchResult(updatedIntern);
        const updatedList = internDatabase.map(item => (item.id === searchResult.id ? updatedIntern : item));
        setInternDatabase(updatedList);
        localStorage.setItem('intern_database', JSON.stringify(updatedList));

        setShowAddReqModal(false);
        setNewReqName('');
        setNewReqRemarks('');
        alert('New requirement added to candidate checklist!');
      };

      // Statistics
      const lackingList = searchResult?.requirements.filter(r => r.status === 'lacking') || [];
      const pendingList = searchResult?.requirements.filter(r => r.status === 'pending') || [];
      const submittedList = searchResult?.requirements.filter(r => r.status === 'submitted') || [];

      const filteredRequirements = searchResult?.requirements.filter(r => {
        if (activeFilter === 'all') return true;
        return r.status === activeFilter;
      }) || [];

      // =====================================================================
      // 1. DEDICATED REDIRECTION PAGE (BEFORE REDIRECTING TO MAIN PORTAL)
      // =====================================================================
      if (currentView === 'redirecting') {
        const targetUser = redirectingUser || currentUser || { name: 'User', is_admin: false };
        return (
          <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-y-auto">
            <ParticleCanvas theme={theme} />

            <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
              <div className="orb-1 absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-gradient-to-tr from-orange-600/20 to-cyan-500/10 rounded-full blur-[110px]"></div>
              <div className="orb-2 absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-gradient-to-bl from-indigo-600/20 to-purple-600/15 rounded-full blur-[120px]"></div>
              <div className="light-wave-overlay absolute inset-0"></div>
            </div>

            <div className="w-full max-w-md my-auto relative z-10 animate-modal-pop">
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 w-full backdrop-blur-xl auth-card-glow text-center space-y-4 shadow-xl">
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin"></div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                    <Icons.Shield className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Icons.CheckCircle className="w-3.5 h-3.5" /> Verified Credentials
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Authentication Successful!
                  </h2>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    Welcome, <b className="text-orange-600 dark:text-orange-400">{targetUser.name}</b>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {targetUser.is_admin
                      ? 'Administrator Access Enabled • Loading System Records...'
                      : 'Student Clearance Checklist Loading...'}
                  </p>
                </div>

                {/* Animated Loading Bar */}
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800 p-0.5">
                  <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-400 h-full rounded-full animate-redirect-progress"></div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Redirecting you to the Main Clearance Portal...
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentUser(targetUser);
                    setCurrentView('main');
                    window.location.hash = '#main';
                  }}
                  className="text-xs text-orange-400 hover:text-orange-300 underline font-semibold transition"
                >
                  Click here if not redirected automatically →
                </button>
              </div>
            </div>
          </div>
        );
      }

      // =====================================================================
      // 2. DEDICATED SIGN UP PAGE (SHOWN BEFORE REDIRECTING TO MAIN PAGE)
      // =====================================================================
      if (currentView === 'signup') {
        const isAdminSignup = (authPortalTab === 'admin');

        return (
          <div className="auth-hero-scope min-h-screen bg-slate-950 flex flex-col justify-center items-center p-3 sm:p-4 md:p-6 relative overflow-y-auto">
            {/* Top Navigation: Logo + Back Button */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-6 z-30 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-stone-200/90 shadow-sm">
                <img
                  src="km100-logo.jpg"
                  alt="KM100 Logo"
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-500 bg-white flex-shrink-0"
                  loading="eager"
                  decoding="async"
                />
                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-baseline">
                    <span className="text-base font-black tracking-tight text-orange-600">KM</span>
                    <span className="text-base font-black tracking-tight text-stone-900">100</span>
                  </div>
                  <span className="text-[9px] font-bold text-stone-700 tracking-tight whitespace-nowrap">
                    Skills and Training Center, Inc.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthError('');
                  setAuthSuccess('');
                  navigateTo('login');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 border border-stone-200/90 text-stone-800 hover:bg-white backdrop-blur-sm transition flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </button>
            </div>

            {/* Official KM100 Background Banner */}
            <div className="home-bg-banner pointer-events-none fixed inset-0 z-0 overflow-hidden">
              <img
                src="km100-banner.jpg?v=2026"
                alt="KM100 Skills and Training Center Banner"
                fetchpriority="high"
                decoding="async"
              />
              <div className="home-bg-overlay"></div>
            </div>

            {/* Centered Auth Container */}
            <div className="w-full max-w-lg my-auto flex flex-col items-center relative z-10">
              {/* Portal Header */}
              <div className="text-center mb-3 w-full mt-14 sm:mt-16">
                <h1 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight animate-heading">
                  {isAdminSignup ? 'Staff & Administrator Registration' : 'Student & Trainee Registration'}
                </h1>
                <p className="text-xs text-stone-600 font-medium mt-0.5 animate-subtitle">
                  {isAdminSignup
                    ? 'OJT Coordinators, Instructors & System Management'
                    : 'Diploma, NC II & Short Course Trainee Portal'}
                </p>
                <p className="text-[10px] text-stone-500 font-medium mt-0.5">
                  KM Building, Jamoral Ville, Purok 13, Brgy. Cogon, Bogo City, Cebu 6010
                </p>
              </div>

              {/* SEPARATED PORTAL SELECTOR TABS */}
              <div className="w-full max-w-lg mb-2.5 bg-slate-900/40 p-1 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthPortalTab('user');
                    setSignupRole('user');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    !isAdminSignup
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-1 ring-orange-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icons.User className="w-3.5 h-3.5" />
                  <span>Student / Trainee Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthPortalTab('admin');
                    setSignupRole('admin');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAdminSignup
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icons.Shield className="w-3.5 h-3.5" />
                  <span>Administrator Portal</span>
                </button>
              </div>

              {/* SIGN UP CARD */}
              <div
                className={`bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-4 sm:p-5 w-full auth-card-glow space-y-3 transition-all duration-200 ${shakeError ? 'shake-error' : ''}`}
              >
                {/* Header Switcher */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isAdminSignup ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {isAdminSignup ? 'Create Administrator Account' : 'Create Trainee Account'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError('');
                      setAuthSuccess('');
                      navigateTo('login');
                    }}
                    className={`text-xs font-semibold flex items-center gap-1 transition ${
                      isAdminSignup
                        ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-600'
                        : 'text-orange-600 dark:text-orange-400 hover:text-orange-500'
                    }`}
                  >
                    <span>Sign In</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Error & Success Messages */}
                {authError && (
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                    <Icons.AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0" />
                    <span className="leading-relaxed">{authError}</span>
                  </div>
                )}
                {authSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Icons.CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span className="leading-relaxed">{authSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-2.5" key={isAdminSignup ? 'signup-admin-form' : 'signup-user-form'}>
                  {/* 2-Column Grid: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 stagger-1">
                    <div>
                      <label htmlFor="signup-name" className="block text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                        {isAdminSignup ? 'Administrator / Staff Name' : 'Trainee Full Name'}
                      </label>
                      <input
                        id="signup-name"
                        type="text"
                        placeholder={isAdminSignup ? 'e.g. Dr. Roberto Tan' : 'e.g. Juan Dela Cruz'}
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none shadow-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="signup-email" className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5">
                        {isAdminSignup ? 'Official Admin Email' : 'Student Email Address'}
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        placeholder={isAdminSignup ? 'admin@system.local' : 'trainee@school.edu'}
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none shadow-sm transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* USER SPECIFIC FIELDS: BATCH & STUDENT ID */}
                  {!isAdminSignup ? (
                    <div className="grid grid-cols-2 gap-2 stagger-2">
                      <div>
                        <label htmlFor="signup-batch" className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5 flex items-center gap-1">
                          <Icons.FileText className="w-3 h-3 text-orange-400" />
                          <span>Batch Number</span>
                        </label>
                        <input
                          id="signup-batch"
                          type="text"
                          placeholder="e.g. Batch 1"
                          value={signupBatch}
                          onChange={(e) => setSignupBatch(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none shadow-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="signup-id" className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5 flex items-center gap-1">
                          <Icons.User className="w-3 h-3 text-orange-400" />
                          <span>Student ID</span>
                        </label>
                        <input
                          id="signup-id"
                          type="text"
                          placeholder="e.g. 2026-B1-004"
                          value={signupStudentId}
                          onChange={(e) => setSignupStudentId(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none shadow-sm transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    /* ADMIN SPECIFIC FIELDS: PASSCODE VERIFICATION */
                    <div className="stagger-2 bg-emerald-50/80 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-500/30">
                      <label htmlFor="signup-admin-passcode" className="block text-[10px] font-bold text-emerald-800 dark:text-emerald-300 mb-0.5 flex items-center gap-1">
                        <Icons.Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Administrator Authorization Passcode</span>
                      </label>
                      <input
                        id="signup-admin-passcode"
                        type="password"
                        placeholder="Enter master admin passcode (demo: admin123)"
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        className="w-full input-animated border border-emerald-400 dark:border-emerald-500/50 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none focus:border-emerald-600 shadow-sm transition-all"
                        required
                      />
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1">
                        Requires coordinator key to unlock administrative document verification permissions.
                      </p>
                    </div>
                  )}

                  {/* Password Field */}
                  <div className="stagger-3">
                    <label htmlFor="signup-password" className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-lg pl-2.5 pr-10 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none shadow-sm transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-0.5 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-400 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-400 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        <PasswordEyeIcon show={showPassword} className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" />
                      </button>
                    </div>
                  </div>

                  <div className="stagger-4 pt-1 space-y-1.5">
                    <button
                      type="submit"
                      disabled={isAuthenticating}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-lg btn-shimmer flex items-center justify-center gap-2 disabled:opacity-75 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                        isAdminSignup
                          ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white shadow-orange-600/30'
                      }`}
                    >
                      {isAuthenticating ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Creating Account & Syncing...</span>
                        </>
                      ) : (
                        <span>{isAdminSignup ? 'Complete Administrator Registration â†’' : 'Complete Trainee Registration â†’'}</span>
                      )}
                    </button>

                    <div className="text-center pt-1 border-t border-slate-200 dark:border-slate-800">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError('');
                            setAuthSuccess('');
                            navigateTo('login');
                          }}
                          className={`font-bold transition hover:underline ${
                            isAdminSignup
                              ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-600'
                              : 'text-orange-600 dark:text-orange-400 hover:text-orange-500'
                          }`}
                        >
                          Sign In here â†’
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              <p className="auth-footer-text text-[10px] text-slate-700 dark:text-slate-400 mt-1.5 text-center animate-subtitle font-medium">
                Secured by Supabase Authentication &amp; Role-Based Access Control
              </p>
            </div>
          </div>
        );
      }

      // =====================================================================
      // 3. DEDICATED LOGIN PAGE (SHOWN BEFORE REDIRECTING TO MAIN PAGE)
      // =====================================================================
      if (currentView === 'login' || !currentUser) {
        const isAdminLogin = (authPortalTab === 'admin');

        return (
          <div className="auth-hero-scope min-h-screen bg-slate-950 flex flex-col justify-center items-center p-3 sm:p-4 md:p-6 relative overflow-y-auto">
            {/* Top-Left Logo + Company Name */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-6 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-stone-200/90 shadow-sm">
              <img
                src="km100-logo.jpg"
                alt="KM100 Logo"
                className="w-8 h-8 rounded-full object-cover border-2 border-orange-500 bg-white flex-shrink-0"
                loading="eager"
                decoding="async"
              />
              <div className="flex flex-col text-left leading-tight">
                <div className="flex items-baseline">
                  <span className="text-base font-black tracking-tight text-orange-600">KM</span>
                  <span className="text-base font-black tracking-tight text-stone-900">100</span>
                </div>
                <span className="text-[9px] font-bold text-stone-700 tracking-tight whitespace-nowrap">
                  Skills and Training Center, Inc.
                </span>
              </div>
            </div>

            {/* Official KM100 Training Center High-Res Background Banner */}
            <div className="home-bg-banner pointer-events-none fixed inset-0 z-0 overflow-hidden">
              <img
                src="km100-banner.jpg?v=2026"
                alt="KM100 Skills and Training Center Banner"
                fetchpriority="high"
                decoding="async"
              />
              <div className="home-bg-overlay"></div>
            </div>

            {/* Centered Auth Container - Raised by 25px for optical vertical balance */}
            <div
              className="w-full max-w-md my-auto py-2 sm:py-4 flex flex-col items-center relative z-10 -translate-y-[25px]"
              style={{ transform: 'translateY(-25px)' }}
            >
              {/* Portal Branding */}
              <div className="text-center mb-3 w-full mt-14 sm:mt-16">
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-stone-600 my-1">
                  <span>Practical Skills</span>
                  <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                  <span>Real Opportunities</span>
                </div>

                <h1 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight flex items-center justify-center gap-2 flex-wrap mt-1">
                  {isAdminLogin ? 'ADMINISTRATOR GATEWAY' : 'KM100 REQUIREMENTS PORTAL'}
                </h1>
                <p className="text-xs text-stone-600 font-medium mt-0.5 animate-subtitle">
                  {isAdminLogin
                    ? 'Staff, Instructors & Document Coordinators Only'
                    : 'Diploma & Technical-Vocational Trainee Portal'}
                </p>
                <p className="text-[10px] text-stone-500 font-medium mt-1">
                  KM Building, Jamoral Ville, Purok 13, Brgy. Cogon, Bogo City, Cebu 6010
                </p>
              </div>

              {/* SEPARATED PORTAL SELECTOR TABS */}
              <div className="w-full mb-3 bg-slate-900/40 p-1 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthPortalTab('user');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    !isAdminLogin
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-1 ring-orange-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icons.User className="w-3.5 h-3.5" />
                  <span>Student / Trainee Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthPortalTab('admin');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAdminLogin
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icons.Shield className="w-3.5 h-3.5" />
                  <span>Administrator Portal</span>
                </button>
              </div>

              {/* Optional: Resume previous session card if found */}
              {savedSession && (
                <div className="w-full mb-3 animate-form-enter">
                  <div className="bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-500/30 rounded-xl p-2.5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <Icons.User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-orange-900 dark:text-white">Active Session Found</p>
                        <p className="text-[10px] text-orange-700 dark:text-orange-300">Continue as {savedSession.name} ({savedSession.role})</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerRedirect(savedSession)}
                      className="py-1 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition shadow-sm flex items-center gap-1"
                    >
                      <span>Enter Portal</span>
                      <Icons.ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* LOGIN CARD */}
              <div
                className={`bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-4 sm:p-6 w-full auth-card-glow space-y-3 transition-all duration-200 ${shakeError ? 'shake-error' : ''}`}
              >
                {/* Header Switcher */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isAdminLogin ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {isAdminLogin ? 'Administrator Sign In' : 'Student / Trainee Sign In'}
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isAdminLogin ? 'Staff authentication & access clearance' : 'Access your trainee requirements & scan records'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ERROR ALERT */}
                {authError && (
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                    <Icons.AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0" />
                    <span className="leading-relaxed">{authError}</span>
                  </div>
                )}

                {/* SUCCESS ALERT */}
                {authSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Icons.CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span className="leading-relaxed">{authSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-3 animate-form-enter" key={isAdminLogin ? 'login-admin-form' : 'login-user-form'}>
                  <div className="stagger-3">
                    <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isAdminLogin ? 'Admin Email Address' : 'Student Email Address'}
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder={isAdminLogin ? 'admin@system.local' : 'e.g. juan.dela.cruz@school.edu'}
                      className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none shadow-sm transition-all"
                      required
                    />
                  </div>

                  <div className="stagger-4">
                    <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Enter your account password"
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl pl-3.5 pr-12 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none shadow-sm transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 text-slate-400 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-400 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        <PasswordEyeIcon show={showPassword} className="w-4 h-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" />
                      </button>
                    </div>
                  </div>

                  <div className="stagger-5 pt-1 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isAuthenticating}
                      className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs shadow-xl btn-shimmer flex items-center justify-center gap-2 disabled:opacity-75 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                        isAdminLogin
                          ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white shadow-orange-600/30'
                      }`}
                    >
                      {isAuthenticating ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Verifying & Redirecting...</span>
                        </>
                      ) : (
                        <span>{isAdminLogin ? 'Sign In as Administrator â†’' : 'Sign In as Trainee â†’'}</span>
                      )}
                    </button>

                    {/* Quick Demo Access Bar */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Quick Demo:</span>
                      {isAdminLogin ? (
                        <button
                          type="button"
                          onClick={() => handleQuickLogin('admin@system.local', 'admin123')}
                          className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                        >
                          Auto-fill Coordinator (admin@system.local)
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleQuickLogin('juan.dela.cruz@school.edu', 'user123')}
                          className="font-bold text-orange-600 hover:text-orange-700 hover:underline"
                        >
                          Auto-fill Trainee (juan.dela.cruz@school.edu)
                        </button>
                      )}
                    </div>

                    <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Don't have an account yet?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError('');
                            setAuthSuccess('');
                            setSignupRole(isAdminLogin ? 'admin' : 'user');
                            navigateTo('signup');
                          }}
                          className={`font-bold transition hover:underline ${
                            isAdminLogin
                              ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-600'
                              : 'text-orange-600 dark:text-orange-400 hover:text-orange-500'
                          }`}
                        >
                          {isAdminLogin ? 'Register Admin Account â†’' : 'Register Trainee Account â†’'}
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              <p className="auth-footer-text text-[11px] text-slate-700 dark:text-slate-300 font-semibold mt-3 text-center animate-subtitle">
                Secured by Supabase Authentication &amp; Role-Based Access Control
              </p>
            </div>
          </div>
        );
      }

      // =====================================================================
      // 2. MAIN WEBSITE / PORTAL INTERFACE (ACCESSIBLE ONLY AFTER LOGIN)
      // =====================================================================
      return (
        <div className="flex-1 flex flex-col relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-200">
          {/* Subtle Ambient Background Backdrop */}
          <div className="portal-bg-banner pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <img
              src="km100-banner.jpg?v=2026"
              alt="KM100 Background"
              loading="lazy"
              decoding="async"
            />
            <div className="portal-bg-overlay"></div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col animate-dashboard-in">
            {/* HEADER BAR */}
            <header className="header-glass bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center flex-shrink-0">
                  <img
                    src="km100-logo.jpg"
                    alt="KM100 Logo"
                    className="w-11 h-11 rounded-full object-cover border-2 border-orange-500 shadow-sm bg-white flex-shrink-0 transition-transform duration-200 hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-baseline">
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-orange-600">KM</span>
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">100</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-stone-800 hidden sm:inline">
                      Skills and Training Center, Inc.
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-800 bg-orange-100 border border-orange-300 px-2.5 py-0.5 rounded-full shadow-sm transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>

                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium mt-0.5">
                    &amp; NC II Trainee Clearance Portal • Bogo City, Cebu
                  </p>
                </div>
              </div>

              {/* LOGGED IN USER PROFILE BAR & CONTROLS */}
              <div className="flex items-center">
                <div className="user-profile-capsule flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-xl shadow-sm backdrop-blur-md transition-all duration-200">
                  {/* User Identity */}
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${currentUser?.is_admin
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25'
                      : 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/25'
                      }`}>
                      {currentUser?.is_admin ? (
                        <Icons.Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Icons.User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </div>
                    <div className="text-left text-xs">
                      <span className="user-profile-name font-bold block leading-tight">
                        {currentUser?.is_admin ? 'Administrator' : (currentUser?.name || 'Student')}
                      </span>
                      <span className="user-profile-sub text-[10px] font-semibold uppercase tracking-wider block mt-0.5">
                        {currentUser?.is_admin ? 'Full Access' : 'View Only'}
                      </span>
                    </div>
                  </div>

                  <div className="user-profile-divider h-6 w-px hidden sm:block"></div>

                  {/* Actions: Reset Password & Log Out */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMyNewPassword('');
                        setMyConfirmPassword('');
                        setSavePasswordStatus('');
                        setShowChangePasswordModal(true);
                      }}
                      className="btn-profile-reset text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95"
                      title="Reset Password"
                    >
                      <Icons.Key className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="hidden sm:inline">Reset Password</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="btn-profile-logout text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95"
                      title="Exit and return to Login Gateway"
                    >
                      <Icons.LogOut className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="hidden sm:inline">Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* MAIN DASHBOARD CONTAINER */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 space-y-6">
              {/* ROLE STATUS BANNER (ADMIN ONLY) */}
              {currentUser?.is_admin ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-3.5 sm:p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 flex-shrink-0">
                      <Icons.Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                        Administrator Mode Active
                      </h3>
                      <p className="text-xs text-emerald-900/80 dark:text-slate-300 mt-0.5">
                        You have authorization to edit student credentials, verify requirements, and manage the clearance registry.
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                    Admin: Active
                  </span>
                </div>
              ) : null}

              {/* SEARCH BOX (DISPLAYED WHEN NOT VIEWING A CANDIDATE RESULT) */}
              {!searchResult && (
                <div className="main-portal-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl w-full mx-auto space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Check your Diploma, NC II Trainee Requirements
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Enter your Batch Number and Full Name to check if you have any lacking or pending requirements for clearance.
                    </p>
                  </div>

                  {/* INLINE NOT FOUND ALERT - IMMEDIATELY VISIBLE WITHOUT SCROLLING */}
                  {hasSearched && !isSearching && !searchResult && (
                    <div className="search-error-banner p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 animate-form-enter shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 flex-shrink-0 mt-0.5">
                        <Icons.AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left text-xs">
                        <h4 className="font-bold text-red-500 dark:text-red-400">No Clearance Record Found</h4>
                        <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                          We could not find any clearance record matching <strong className="text-red-600 dark:text-red-300 font-semibold">"{fullName}"</strong> under batch <strong className="text-red-600 dark:text-red-300 font-semibold">"{batchNumber}"</strong>. Please check the spelling or batch format and try again.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHasSearched(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-bold"
                        aria-label="Dismiss alert"
                        title="Dismiss alert"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <form onSubmit={(e) => { e.preventDefault(); performSearch(); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="search-batch" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Batch Number
                        </label>
                        <input
                          id="search-batch"
                          type="text"
                          placeholder="e.g. Batch 1"
                          value={batchNumber}
                          onChange={(e) => {
                            setBatchNumber(e.target.value);
                            if (hasSearched && !searchResult) setHasSearched(false);
                          }}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none transition-all shadow-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="search-fullname" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Full Name
                        </label>
                        <input
                          id="search-fullname"
                          type="text"
                          placeholder="e.g. Juan Dela Cruz"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (hasSearched && !searchResult) setHasSearched(false);
                          }}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-white dark:bg-transparent focus:outline-none transition-all shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSearching}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-200"
                    >
                      {isSearching ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Searching Database...</span>
                        </>
                      ) : (
                        <>
                          <Icons.Search className="w-4 h-4" />
                          <span>Check Requirements</span>
                        </>
                      )}
                    </button>

                    {/* Quick Select Registered Trainees for instant verification */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        Quick Check Registered Trainees:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { batch: 'Batch 2026-A', name: 'Juan Dela Cruz', course: 'SMAW' },
                          { batch: 'Batch 2026-A', name: 'Maria Clara', course: 'BPP' },
                          { batch: 'Batch 2026-B', name: 'Crisostomo Ibarra', course: 'CSS NC II' }
                        ].map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => {
                              setBatchNumber(c.batch);
                              setFullName(c.name);
                              performSearch(c.batch, c.name);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500/40 transition-all shadow-sm active:scale-95"
                          >
                            <Icons.User className="w-3.5 h-3.5 text-orange-500" />
                            <span>{c.name}</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">({c.batch})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* RESULTS VIEW */}
              {hasSearched && !isSearching && searchResult && (() => {
                const totalReqs = searchResult.requirements ? searchResult.requirements.length : 0;
                const percentComplete = totalReqs > 0 ? Math.round((submittedList.length / totalReqs) * 100) : 0;
                const isCleared = totalReqs > 0 && lackingList.length === 0 && pendingList.length === 0;

                return (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* TOP ACTION TOOLBAR */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl shadow-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchResult(null);
                          setHasSearched(false);
                        }}
                        className="search-another-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <Icons.ArrowLeft className="w-3.5 h-3.5" />
                        <span>Search Another Candidate</span>
                      </button>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-600 dark:text-slate-400 font-semibold hidden sm:inline">
                          Status:
                        </span>
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${isCleared
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                          : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                          }`}>
                          {isCleared ? (
                            <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Icons.Clock className="w-3.5 h-3.5 text-amber-500" />
                          )}
                          <span>{isCleared ? 'Clearance Approved' : 'Clearance Pending'}</span>
                        </span>
                      </div>
                    </div>

                    {/* UNIFIED CANDIDATE CLEARANCE OVERVIEW PANEL */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                        {/* Intern Identity */}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                              {searchResult.full_name}
                            </h3>
                            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-orange-50 dark:bg-orange-500/15 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30 shadow-sm">
                              {searchResult.student_id}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                            <span className="font-bold text-slate-800 dark:text-slate-200">{searchResult.batch_number}</span>
                            <span className="text-slate-400 dark:text-slate-600">•</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{searchResult.department}</span>
                            {searchResult.email && (
                              <>
                                <span className="text-slate-400 dark:text-slate-600">•</span>
                                <span className="font-mono text-slate-600 dark:text-slate-400 font-normal">{searchResult.email}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Admin Action Button / Student Badge */}
                        <div className="flex items-center gap-2.5">
                          {currentUser?.is_admin ? (
                            <button
                              onClick={openEditInternModal}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 active:scale-95"
                            >
                              <Icons.Edit className="w-3.5 h-3.5" />
                              <span>Edit Intern Record</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 shadow-sm">
                                <Icons.User className="w-3.5 h-3.5 text-slate-400" />
                                <span>Verified Student Record</span>
                              </span>
                              <button
                                onClick={() => {
                                  setMyNewPassword('');
                                  setMyConfirmPassword('');
                                  setSavePasswordStatus('');
                                  setShowChangePasswordModal(true);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 active:scale-95"
                                title="Reset Password"
                              >
                                <Icons.Key className="w-3.5 h-3.5" />
                                <span>Reset Password</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CLEARANCE PROGRESS BAR */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            Clearance Completion
                          </span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {submittedList.length} of {totalReqs} Approved ({percentComplete}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${percentComplete === 100
                              ? 'bg-emerald-500'
                              : 'bg-gradient-to-r from-orange-500 to-amber-500'
                              }`}
                            style={{ width: `${percentComplete}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* 3 KPI STAT CARDS */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {/* Lacking Card */}
                        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30 rounded-xl p-4 flex items-center justify-between shadow-sm">
                          <div>
                            <div className="text-2xl font-black text-red-700 dark:text-red-400">
                              {lackingList.length}
                            </div>
                            <div className="text-xs font-bold text-red-900 dark:text-red-200 mt-0.5">
                              Lacking Documents
                            </div>
                            <div className="text-[11px] font-semibold text-red-700/90 dark:text-red-300/80">
                              {lackingList.length > 0 ? 'Action Required' : 'None lacking'}
                            </div>
                          </div>
                          <Icons.XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                        </div>

                        {/* Pending Card */}
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 flex items-center justify-between shadow-sm">
                          <div>
                            <div className="text-2xl font-black text-amber-700 dark:text-amber-400">
                              {pendingList.length}
                            </div>
                            <div className="text-xs font-bold text-amber-900 dark:text-amber-200 mt-0.5">
                              Pending Review
                            </div>
                            <div className="text-[11px] font-semibold text-amber-800/90 dark:text-amber-300/80">
                              {pendingList.length > 0 ? 'Under Evaluation' : 'None pending'}
                            </div>
                          </div>
                          <Icons.Clock className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        </div>

                        {/* Submitted Card */}
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-4 flex items-center justify-between shadow-sm">
                          <div>
                            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                              {submittedList.length}
                            </div>
                            <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mt-0.5">
                              Verified & Approved
                            </div>
                            <div className="text-[11px] font-semibold text-emerald-800/90 dark:text-emerald-300/80">
                              Ready for Clearance
                            </div>
                          </div>
                          <Icons.CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        </div>
                      </div>
                    </div>

                    {/* CRITICAL ALERT NOTICE (IF LACKING) */}
                    {lackingList.length > 0 && (
                      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 shadow-sm">
                        <Icons.AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-red-800 dark:text-red-200">
                            Attention: You have {lackingList.length} Lacking Requirement{lackingList.length > 1 ? 's' : ''}!
                          </h4>
                          <p className="text-xs text-red-700/90 dark:text-red-300/80 mt-0.5 leading-relaxed">
                            Diploma and NC II Trainee clearance cannot be approved until all lacking documents are submitted or digitally scanned into the KM100 registry.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* REQUIREMENTS REGISTRY TABLE / LIST */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            Prescribed Requirements Registry
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {currentUser?.is_admin
                              ? 'Admin Mode: Update compliance status or upload digital document scans.'
                              : 'Student View: Showing verified compliance status and official remarks.'}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                          {/* ADMIN ADD REQUIREMENT BUTTON */}
                          {currentUser?.is_admin && (
                            <button
                              onClick={() => setShowAddReqModal(true)}
                              className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                            >
                              <Icons.Plus className="w-3.5 h-3.5" />
                              <span>Add Requirement</span>
                            </button>
                          )}

                          {/* FILTER PILL TABS */}
                          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                            {[
                              { id: 'all', label: `All (${totalReqs})` },
                              { id: 'lacking', label: `Lacking (${lackingList.length})` },
                              { id: 'pending', label: `Pending (${pendingList.length})` },
                              { id: 'submitted', label: `Submitted (${submittedList.length})` }
                            ].map(tab => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${activeFilter === tab.id
                                  ? 'bg-orange-600 text-white shadow-sm'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                                  }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* REQUIREMENT REGISTRY ROWS */}
                      <div className="divide-y divide-slate-200 dark:divide-slate-800/80">
                        {filteredRequirements.map(req => {
                          const isLacking = req.status === 'lacking';
                          const isPending = req.status === 'pending';

                          return (
                            <div
                              key={req.id}
                              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-150"
                            >
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="mt-0.5 flex-shrink-0">
                                  {isLacking ? (
                                    <Icons.XCircle className="w-4 h-4 text-red-500" />
                                  ) : isPending ? (
                                    <Icons.Clock className="w-4 h-4 text-amber-500" />
                                  ) : (
                                    <Icons.CheckCircle className="w-4 h-4 text-emerald-500" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                                      {req.name}
                                    </h5>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isLacking
                                      ? 'bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30'
                                      : isPending
                                        ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30'
                                        : 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                                      }`}>
                                      {req.status}
                                    </span>
                                  </div>
                                  <p className={`text-xs ${isLacking ? 'text-red-700 dark:text-red-300 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {req.remarks}
                                  </p>
                                  {req.scanned_at && (
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                                      <Icons.Calendar className="w-3 h-3" />
                                      <span>Scanned: {req.scanned_at}</span>
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* ACTION BUTTONS */}
                              <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                                {req.document_url && (
                                  <button
                                    onClick={() => setSelectedDocument(req)}
                                    className="py-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 active:scale-95"
                                  >
                                    <Icons.FileText className="w-3.5 h-3.5" />
                                    <span>View Document</span>
                                  </button>
                                )}

                                {currentUser?.is_admin && (
                                  <button
                                    onClick={() => openEditReqModal(req)}
                                    className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                                  >
                                    <Icons.Edit className="w-3.5 h-3.5" />
                                    <span>Update</span>
                                  </button>
                                )}

                                {!req.document_url && !currentUser?.is_admin && (
                                  <span className="text-[11px] font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-lg border border-red-200 dark:border-red-500/20">
                                    Required: Submit to Scanner
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {filteredRequirements.length === 0 && (
                          <div className="p-8 sm:p-12 text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                              <Icons.FileText className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              No requirements match the current filter
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              No documents marked as "{activeFilter}". Switch to "All" to view all prescribed requirements.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </main>

            {/* Campus Address & Footer matching official KM100 Flyer */}
            <footer className="mt-auto border-t border-stone-200/90 bg-white/80 backdrop-blur-md py-4 px-4 sm:px-6 z-20">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-stone-600">
                <div className="flex items-center gap-2 font-bold text-stone-800">
                  <span className="text-orange-600 font-black text-sm">KM</span><span className="font-black text-sm">100</span>
                  <span>Skills and Training Center, Inc.</span>
                  <span className="text-stone-300 font-normal hidden sm:inline">•</span>
                  <span className="font-normal italic text-stone-500 hidden sm:inline">Be Practical, Get Technical.</span>
                </div>
                <div className="text-[11px] text-stone-500 text-center sm:text-right">
                  KM Building, Jamoral Ville, Purok 13, Brgy. Cogon, Bogo City, Cebu 6010
                </div>
              </div>
            </footer>

            {/* ============================================================== */}
            {/* MODALS (ADMIN EDIT, UPDATE REQ, ADD REQ, VIEW DOC)             */}
            {/* ============================================================== */}
            {showEditInternModal && (
              <ModalPortal>
                <div className="fixed-modal-overlay">
                  <form role="dialog" aria-modal="true" aria-labelledby="edit-intern-title" onSubmit={handleSaveInternCredentials} className="bg-white dark:bg-slate-900 border border-emerald-500/30 dark:border-emerald-500/50 rounded-2xl p-4 sm:p-6 max-w-lg w-full max-h-[calc(100vh-1.5rem)] overflow-y-auto m-auto shadow-2xl space-y-3.5 animate-modal-pop">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setShowEditInternModal(false)}
                          aria-label="Back and close edit student dialog"
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition"
                        >
                          <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Admin Exclusive</span>
                          <h3 id="edit-intern-title" className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Edit Student Credentials</h3>
                        </div>
                      </div>
                      <button type="button" onClick={() => setShowEditInternModal(false)} aria-label="Close dialog" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 text-slate-400 hover:text-slate-700 dark:hover:text-white text-base font-bold">✕</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="edit-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input
                          id="edit-name"
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="edit-batch" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Batch Number</label>
                        <input
                          id="edit-batch"
                          type="text"
                          value={editBatch}
                          onChange={(e) => setEditBatch(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="edit-id" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Student ID / Trainee No.</label>
                        <input
                          id="edit-id"
                          type="text"
                          value={editStudentId}
                          onChange={(e) => setEditStudentId(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="edit-dept" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                        <input
                          id="edit-dept"
                          type="text"
                          value={editDept}
                          onChange={(e) => setEditDept(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="edit-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input
                          id="edit-email"
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="edit-status" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Overall Clearance Status</label>
                        <select
                          id="edit-status"
                          value={editOverallStatus}
                          onChange={(e) => setEditOverallStatus(e.target.value)}
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                        >
                          <option value="incomplete">Incomplete (Lacking Documents)</option>
                          <option value="pending">Pending (Under Review)</option>
                          <option value="complete">Complete (Fully Cleared)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="edit-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Student Account Password
                        </label>
                        <span className="text-[10px] text-emerald-400 font-mono">Encrypted</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="relative flex-1">
                          <input
                            id="edit-password"
                            type={showEditPassword ? "text" : "password"}
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder="Set password for student"
                            className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 pr-9 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowEditPassword(!showEditPassword)}
                            aria-label={showEditPassword ? "Hide password" : "Show password"}
                            title={showEditPassword ? "Hide password" : "Show password"}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            <PasswordEyeIcon show={showEditPassword} className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleSaveStudentPassword}
                          disabled={isSavingPassword || !editPassword.trim()}
                          className="px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-bold shadow-sm transition active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                          title="Reset Password"
                        >
                          <Icons.Key className="w-3.5 h-3.5" />
                          <span>{isSavingPassword ? 'Resetting...' : 'Reset Password'}</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Click <strong className="text-orange-300">Reset Password</strong> to immediately update this student's account password.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-1.5">
                      <button
                        type="button"
                        onClick={() => setShowEditInternModal(false)}
                        className="py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Save Credentials & Password</span>
                      </button>
                    </div>
                  </form>
                </div>
              </ModalPortal>
            )}

            {/* ADMIN UPDATE REQ MODAL */}
            {showEditReqModal && editingReq && (
              <ModalPortal>
                <div className="fixed-modal-overlay">
                  <form role="dialog" aria-modal="true" aria-labelledby="edit-req-title" onSubmit={handleSaveRequirementUpdate} className="bg-white dark:bg-slate-900 border border-emerald-500/30 dark:border-emerald-500/50 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[calc(100vh-1.5rem)] overflow-y-auto m-auto shadow-2xl space-y-3 animate-modal-pop">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setShowEditReqModal(false)}
                          aria-label="Back and close update requirement dialog"
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition"
                        >
                          <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Admin Exclusive</span>
                          <h3 id="edit-req-title" className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Update Requirement Status</h3>
                        </div>
                      </div>
                      <button type="button" onClick={() => setShowEditReqModal(false)} aria-label="Close dialog" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 text-slate-400 hover:text-slate-700 dark:hover:text-white text-base font-bold">✕</button>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Requirement Name:</span>
                      <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{editingReq.name}</div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Compliance Status</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'lacking', label: 'Lacking', icon: <Icons.XCircle className="w-3.5 h-3.5 text-red-500" />, color: 'border-red-500/40 text-red-400 bg-red-500/10' },
                          { id: 'pending', label: 'Pending', icon: <Icons.Clock className="w-3.5 h-3.5 text-amber-500" />, color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
                          { id: 'submitted', label: 'Submitted', icon: <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-500" />, color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' }
                        ].map(st => (
                          <button
                            type="button"
                            key={st.id}
                            onClick={() => setEditReqStatus(st.id)}
                            className={`py-2 rounded-xl text-xs font-semibold border transition flex items-center justify-center gap-1.5 ${editReqStatus === st.id ? st.color : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                              }`}
                          >
                            {st.icon}
                            <span>{st.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="edit-req-remarks" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Admin Remarks / Verification Notes</label>
                      <textarea
                        id="edit-req-remarks"
                        rows="2"
                        value={editReqRemarks}
                        onChange={(e) => setEditReqRemarks(e.target.value)}
                        placeholder="e.g. Official transcript verified. / Missing page 2 stamp."
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="edit-req-docurl" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Scanned Document URL (Optional)</label>
                      <input
                        id="edit-req-docurl"
                        type="url"
                        value={editReqDocUrl}
                        onChange={(e) => setEditReqDocUrl(e.target.value)}
                        placeholder="https://... image or PDF URL"
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 font-mono shadow-sm"
                      />
                    </div>

                    <div className="flex gap-3 pt-1.5">
                      <button
                        type="button"
                        onClick={() => setShowEditReqModal(false)}
                        className="py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95"
                      >
                        Update Status
                      </button>
                    </div>
                  </form>
                </div>
              </ModalPortal>
            )}

            {/* ADMIN ADD REQ MODAL */}
            {showAddReqModal && (
              <ModalPortal>
                <div className="fixed-modal-overlay">
                  <form role="dialog" aria-modal="true" aria-labelledby="add-req-title" onSubmit={handleSaveAddRequirement} className="bg-white dark:bg-slate-900 border border-emerald-500/30 dark:border-emerald-500/50 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[calc(100vh-1.5rem)] overflow-y-auto m-auto shadow-2xl space-y-3 animate-modal-pop">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setShowAddReqModal(false)}
                          aria-label="Back and close add requirement dialog"
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition"
                        >
                          <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Admin Exclusive</span>
                          <h3 id="add-req-title" className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Add Prescribed Requirement</h3>
                        </div>
                      </div>
                      <button type="button" onClick={() => setShowAddReqModal(false)} aria-label="Close dialog" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 text-slate-400 hover:text-slate-700 dark:hover:text-white text-base font-bold">✕</button>
                    </div>

                    <div>
                      <label htmlFor="new-req-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Requirement Title</label>
                      <input
                        id="new-req-name"
                        type="text"
                        value={newReqName}
                        onChange={(e) => setNewReqName(e.target.value)}
                        placeholder="e.g. Birth Certificate NSO/PSA"
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                        required
                      />
                      {/* Prescribed Requirements Quick Presets */}
                      <div className="mt-2 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Official Prescribed Presets:</span>
                        <div className="flex flex-col gap-1 max-h-36 overflow-y-auto p-1.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px]">
                          {[
                            'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)',
                            'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137',
                            'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)',
                            'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)',
                            'Barangay Certificate',
                            'Medical Certificate & Chest X-RAY for SMAW',
                            'Medical Certificate for BPP, Driving & CSS NCII',
                            'Long Brown Envelope (1pc) & Long White Folder (1pc)'
                          ].map(preset => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                setNewReqName(preset);
                                if (preset.includes('SMAW')) setNewReqRemarks('Medical Certificate and Chest X-RAY are mandatory for SMAW welding trainees. Submit clinic findings.');
                                else if (preset.includes('BPP')) setNewReqRemarks('Standard Medical Certificate required for BPP, Driving, and CSS NCII trainees. Submit physician clearance.');
                                else if (preset.includes('Birth Certificate')) setNewReqRemarks('Official NSO/PSA copy required. (For married women, submit Marriage Certificate)');
                                else if (preset.includes('Either')) setNewReqRemarks('Submit either Transcript of Records (TOR), Diploma, ALS Certificate, Form 138, or Form 137.');
                                else if (preset.includes('Passport')) setNewReqRemarks('4 pcs passport-sized photos with white background, collar, nametag, and signature.');
                                else if (preset.includes('1x1')) setNewReqRemarks('4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature.');
                                else if (preset.includes('Barangay')) setNewReqRemarks('Current valid Barangay Certificate/Clearance of residency required.');
                                else if (preset.includes('Envelope')) setNewReqRemarks('Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving.');
                              }}
                              className="text-left px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition truncate"
                              title={preset}
                            >
                              + {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="new-req-status" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Status</label>
                      <select
                        id="new-req-status"
                        value={newReqStatus}
                        onChange={(e) => setNewReqStatus(e.target.value)}
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                      >
                        <option value="lacking">Lacking (Missing document)</option>
                        <option value="pending">Pending (Awaiting review)</option>
                        <option value="submitted">Submitted (Verified)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="new-req-remarks" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Remarks / Submission Instructions</label>
                      <textarea
                        id="new-req-remarks"
                        rows="2"
                        value={newReqRemarks}
                        onChange={(e) => setNewReqRemarks(e.target.value)}
                        placeholder="e.g. Must be stamped by authorized supervisor."
                        className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-emerald-500 shadow-sm"
                      ></textarea>
                    </div>

                    <div className="flex gap-3 pt-1.5">
                      <button
                        type="button"
                        onClick={() => setShowAddReqModal(false)}
                        className="py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Icons.Plus className="w-3.5 h-3.5" />
                        <span>Add to Registry</span>
                      </button>
                    </div>
                  </form>
                </div>
              </ModalPortal>
            )}

            {/* VIEW DOCUMENT MODAL */}
            {selectedDocument && (
              <ModalPortal>
                <div className="fixed-modal-overlay">
                  <div role="dialog" aria-modal="true" aria-labelledby="view-doc-title" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[calc(100vh-1.5rem)] overflow-y-auto m-auto shadow-2xl space-y-3.5 animate-modal-pop">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setSelectedDocument(null)}
                          aria-label="Back and return to registry"
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition"
                        >
                          <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <div>
                          <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Scanned Document In System</span>
                          <h3 id="view-doc-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">{selectedDocument.name}</h3>
                        </div>
                      </div>
                      <button onClick={() => setSelectedDocument(null)} aria-label="Close document viewer" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 text-slate-400 hover:text-slate-700 dark:hover:text-white text-base font-bold">✕</button>
                    </div>

                    <div className="max-h-64 sm:max-h-72 h-auto min-h-[160px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2">
                      <img src={selectedDocument.document_url} alt="Scanned Document" loading="lazy" decoding="async" className="max-h-60 sm:max-h-68 max-w-full object-contain" />
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">Document Status:</span> <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase">{selectedDocument.status}</span></p>
                      <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">Remarks:</span> {selectedDocument.remarks}</p>
                      <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">Verified Timestamp:</span> {selectedDocument.scanned_at || "Verified"}</p>
                    </div>

                    <div className="pt-1.5">
                      <button
                        onClick={() => setSelectedDocument(null)}
                        className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        <Icons.ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Registry</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ModalPortal>
            )}

            {/* USER SAVE PASSWORD TO SUPABASE MODAL */}
            {showChangePasswordModal && (
              <ModalPortal>
                <div className="fixed-modal-overlay">
                  <form
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="change-password-title"
                    onSubmit={handleSaveMyPassword}
                    className="bg-white dark:bg-slate-900 border border-orange-500/30 dark:border-orange-500/50 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[calc(100vh-1.5rem)] overflow-y-auto m-auto shadow-2xl space-y-3.5 animate-modal-pop"
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setShowChangePasswordModal(false)}
                          aria-label="Back and close password dialog"
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition"
                        >
                          <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <div>
                          <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Account Security</span>
                          <h3 id="change-password-title" className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Reset Password</h3>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowChangePasswordModal(false)}
                        aria-label="Close dialog"
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 text-slate-400 hover:text-slate-700 dark:hover:text-white text-base font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl p-3 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Account:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{currentUser?.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Role:</span>
                        <span className="font-mono text-orange-700 dark:text-orange-400 font-bold uppercase">{currentUser?.role || (currentUser?.is_admin ? 'Admin' : 'Student')}</span>
                      </div>
                      <p className="text-[11px] text-orange-700 dark:text-orange-300 pt-1 border-t border-orange-200 dark:border-orange-500/20">
                        Updates and secures your portal account credentials.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label htmlFor="reset-new-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                        <div className="relative">
                          <input
                            id="reset-new-password"
                            type={showMyPassword ? "text" : "password"}
                            value={myNewPassword}
                            onChange={(e) => setMyNewPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 pr-9 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-orange-500 shadow-sm"
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowMyPassword(!showMyPassword)}
                            aria-label={showMyPassword ? "Hide password" : "Show password"}
                            title={showMyPassword ? "Hide password" : "Show password"}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            <PasswordEyeIcon show={showMyPassword} className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reset-confirm-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                        <input
                          id="reset-confirm-password"
                          type={showMyPassword ? "text" : "password"}
                          value={myConfirmPassword}
                          onChange={(e) => setMyConfirmPassword(e.target.value)}
                          placeholder="Re-type new password"
                          className="w-full input-animated border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-transparent focus:outline-none focus:border-orange-500 shadow-sm"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowChangePasswordModal(false)}
                        className="py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingMyPassword}
                        className="flex-1 py-2 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Icons.Key className="w-3.5 h-3.5" />
                        <span>{isSavingMyPassword ? 'Resetting...' : 'Reset Password'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </ModalPortal>
            )}

          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  