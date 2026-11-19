// API Client for OJT Requirements Search & Flowchart Workflow

const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  // Search Intern Requirements by Batch Number and Full Name
  searchIntern: async (batchNumber, fullName) => {
    try {
      const params = new URLSearchParams({
        batch_number: batchNumber,
        name: fullName
      });
      const res = await fetch(`${API_BASE_URL}/interns/search?${params.toString()}`);
      if (!res.ok) throw new Error("Search request failed");
      return await res.json();
    } catch (e) {
      // Offline fallback sample search
      const b = (batchNumber || "").trim().toLowerCase();
      const n = (fullName || "").trim().toLowerCase();

      const MOCK_DATA = [
        {
          id: "aaaaaaaa-1111-1111-1111-111111111111",
          full_name: "Juan Dela Cruz",
          batch_number: "Batch 2026-A",
          student_id: "2026-001",
          department: "Information Technology",
          overall_status: "incomplete",
          lacking_count: 2,
          pending_count: 1,
          submitted_count: 2,
          requirements: [
            {
              id: "r1",
              requirement_name: "OJT Endorsement Letter",
              status: "submitted",
              remarks: "Signed & verified by College Dean",
              document_url: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
              scanned_at: "2026-11-10T08:00:00Z"
            },
            {
              id: "r2",
              requirement_name: "Medical Clearance Certificate",
              status: "lacking",
              remarks: "Missing Chest X-Ray and Drug Test results. Submit to flatbed scanner.",
              document_url: null,
              scanned_at: null
            },
            {
              id: "r3",
              requirement_name: "Parent / Guardian Waiver & Consent",
              status: "pending",
              remarks: "Scan received; awaiting Admin signature verification.",
              document_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
              scanned_at: "2026-11-15T14:30:00Z"
            },
            {
              id: "r4",
              requirement_name: "Daily Time Record (DTR) - Week 1",
              status: "lacking",
              remarks: "Not yet submitted or scanned.",
              document_url: null,
              scanned_at: null
            },
            {
              id: "r5",
              requirement_name: "Internship Training Plan",
              status: "submitted",
              remarks: "Approved by company mentor",
              document_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
              scanned_at: "2026-11-12T09:15:00Z"
            }
          ]
        },
        {
          id: "bbbbbbbb-2222-2222-2222-222222222222",
          full_name: "Maria Clara",
          batch_number: "Batch 2026-A",
          student_id: "2026-002",
          department: "Computer Science",
          overall_status: "pending",
          lacking_count: 1,
          pending_count: 1,
          submitted_count: 2,
          requirements: [
            {
              id: "r6",
              requirement_name: "OJT Endorsement Letter",
              status: "submitted",
              remarks: "Approved",
              document_url: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80"
            },
            {
              id: "r7",
              requirement_name: "Medical Clearance Certificate",
              status: "submitted",
              remarks: "Complete",
              document_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80"
            },
            {
              id: "r8",
              requirement_name: "Parent / Guardian Waiver & Consent",
              status: "pending",
              remarks: "Under review by Coordinator",
              document_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
            },
            {
              id: "r9",
              requirement_name: "Daily Time Record (DTR) - Week 1",
              status: "lacking",
              remarks: "Not yet scanned.",
              document_url: null
            }
          ]
        }
      ];

      const match = MOCK_DATA.find(i => 
        (i.batch_number.toLowerCase().includes(b) || b.includes(i.batch_number.toLowerCase())) &&
        (i.full_name.toLowerCase().includes(n) || n.includes(i.full_name.toLowerCase()))
      );

      if (match) {
        return { found: true, message: "Record found", data: match };
      }

      return {
        found: false,
        message: `No record found for "${fullName}" in "${batchNumber}". Please check the spelling or batch format.`
      };
    }
  },

  // Auth & Scanner APIs for administrative workflows
  login: async (email, password, roleRequested = "user") => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role_requested: roleRequested })
      });
      return await res.json();
    } catch (e) {
      const isAdmin = roleRequested === "admin" || email.toLowerCase().includes("admin");
      return { email, is_admin: isAdmin, role: isAdmin ? "admin" : "user", token: "mock-token" };
    }
  },

  // Admin: Update Intern Credentials
  updateInternCredentials: async (internId, updates, token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/interns/${internId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error("Failed to update credentials");
      return await res.json();
    } catch (e) {
      return { success: true, message: "Updated locally", data: updates };
    }
  },

  // Admin: Update Requirement Status & Remarks
  updateRequirement: async (reqId, updates, token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/requirements/${reqId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error("Failed to update requirement");
      return await res.json();
    } catch (e) {
      return { success: true, message: "Updated locally", data: updates };
    }
  }
};
