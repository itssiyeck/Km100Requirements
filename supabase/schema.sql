

-- =============================================================================
-- Supabase Schema for OJT Requirements & Document Management System
-- Allows students to search by Batch Number & Name to check lacking/pending requirements
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. APP USERS & PROFILES (Admin / User Login Table)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL DEFAULT 'user123',
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Default Admin and User logins
INSERT INTO public.profiles (email, full_name, password, role)
VALUES
    ('admin@system.local', 'System Administrator', 'admin123', 'admin'),
    ('juan.delacruz@school.edu', 'Juan Dela Cruz', 'user123', 'user'),
    ('maria.clara@school.edu', 'Maria Clara', 'user123', 'user'),
    ('c.ibarra@school.edu', 'Crisostomo Ibarra', 'user123', 'user')
ON CONFLICT (email) DO NOTHING;

-- 2. INTERNS / STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.interns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    batch_number TEXT NOT NULL,
    student_id TEXT,
    email TEXT,
    department TEXT,
    overall_status TEXT NOT NULL DEFAULT 'incomplete' CHECK (overall_status IN ('complete', 'incomplete', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_interns_search ON public.interns (batch_number, full_name);

-- 3. REQUIREMENTS CHECKLIST TABLE (Lacking / Pending / Submitted status)
CREATE TABLE IF NOT EXISTS public.requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intern_id UUID REFERENCES public.interns(id) ON DELETE CASCADE NOT NULL,
    requirement_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'lacking' CHECK (status IN ('submitted', 'pending', 'lacking')),
    remarks TEXT,
    document_url TEXT,
    scanned_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_requirements_intern_id ON public.requirements (intern_id);

-- 4. DOCUMENTS (Scanned Forms saved in system)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intern_id UUID REFERENCES public.interns(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    form_type TEXT NOT NULL,
    file_url TEXT,
    status TEXT NOT NULL DEFAULT 'saved' CHECK (status IN ('scanned', 'saved', 'edited')),
    scan_quality INTEGER DEFAULT 100,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security
ALTER TABLE public.interns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Allow public search for interns & requirements by anyone
CREATE POLICY "Public search interns" ON public.interns FOR SELECT USING (true);
CREATE POLICY "Public search requirements" ON public.requirements FOR SELECT USING (true);
CREATE POLICY "Public search documents" ON public.documents FOR SELECT USING (true);

-- Admin modification policies
CREATE POLICY "Admin manage interns" ON public.interns FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage requirements" ON public.requirements FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage documents" ON public.documents FOR ALL
USING (auth.role() = 'authenticated');

-- Sample Seed Data for Testing
DO $$
DECLARE
    intern1_id UUID := 'aaaaaaaa-1111-1111-1111-111111111111';
    intern2_id UUID := 'bbbbbbbb-2222-2222-2222-222222222222';
    intern3_id UUID := 'cccccccc-3333-3333-3333-333333333333';
BEGIN
    INSERT INTO public.interns (id, full_name, batch_number, student_id, email, department, overall_status)
    VALUES
        (intern1_id, 'Juan Dela Cruz', 'Batch 2026-A', '2026-001', 'juan.delacruz@school.edu', 'Information Technology', 'incomplete'),
        (intern2_id, 'Maria Clara', 'Batch 2026-A', '2026-002', 'maria.clara@school.edu', 'Computer Science', 'pending'),
        (intern3_id, 'Crisostomo Ibarra', 'Batch 2026-B', '2026-003', 'c.ibarra@school.edu', 'Information Systems', 'complete')
    ON CONFLICT (id) DO NOTHING;

    -- Juan Dela Cruz requirements (Official KM100 System Requirements)
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
    VALUES
        (intern1_id, 'Birth Certificate NSO/PSA (or Marriage Certificate)', 'submitted', 'Official PSA Birth Certificate copy verified.', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80', NOW() - INTERVAL '5 days'),
        (intern1_id, 'Either: T.O.R / Diploma / ALS / Form 138 / Form 137', 'submitted', 'Official Transcript of Records (T.O.R) verified.', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', NOW() - INTERVAL '4 days'),
        (intern1_id, 'Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)', 'pending', 'Submitted 4 pcs passport photos; under registrar review.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', NOW() - INTERVAL '2 days'),
        (intern1_id, '1x1 Picture - 4pcs (White BG w/ Collar & Signature)', 'submitted', '4 pcs 1x1 acid-based photos with nametag and signature verified.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80', NOW() - INTERVAL '3 days'),
        (intern1_id, 'Barangay Certificate', 'lacking', 'Valid Barangay Certificate/Clearance of residency required. Submit to scanner.', NULL, NULL),
        (intern1_id, 'Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)', 'submitted', 'Medical Certificate & Chest X-RAY verified valid.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', NOW() - INTERVAL '1 day'),
        (intern1_id, 'Long Brown Envelope (1pc) & Long White Folder (1pc)', 'lacking', 'Physical filing supplies: 1pc Long Brown Envelope and 1pc Long White Folder required.', NULL, NULL)
    ON CONFLICT DO NOTHING;

    -- Maria Clara requirements
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
    VALUES
        (intern2_id, 'Birth Certificate NSO/PSA (or Marriage Certificate)', 'submitted', 'NSO/PSA copy verified.', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80', NOW() - INTERVAL '7 days'),
        (intern2_id, 'Either: T.O.R / Diploma / ALS / Form 138 / Form 137', 'submitted', 'College Diploma verified.', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', NOW() - INTERVAL '6 days'),
        (intern2_id, 'Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)', 'submitted', 'Photos complete and stamped.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', NOW() - INTERVAL '5 days'),
        (intern2_id, '1x1 Picture - 4pcs (White BG w/ Collar & Signature)', 'submitted', '1x1 photos complete.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80', NOW() - INTERVAL '5 days'),
        (intern2_id, 'Barangay Certificate', 'pending', 'Submitted Barangay clearance under verification.', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', NOW() - INTERVAL '1 day'),
        (intern2_id, 'Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)', 'pending', 'Medical certificate received; awaiting clinic confirmation.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', NOW() - INTERVAL '1 day'),
        (intern2_id, 'Long Brown Envelope (1pc) & Long White Folder (1pc)', 'submitted', 'Filing supplies received and tagged.', NULL, NOW() - INTERVAL '2 days')
    ON CONFLICT DO NOTHING;

    -- Crisostomo Ibarra (Complete)
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
    VALUES
        (intern3_id, 'Birth Certificate NSO/PSA (or Marriage Certificate)', 'submitted', 'Complete & Verified.', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80', NOW() - INTERVAL '10 days'),
        (intern3_id, 'Either: T.O.R / Diploma / ALS / Form 138 / Form 137', 'submitted', 'Complete & Verified.', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', NOW() - INTERVAL '10 days'),
        (intern3_id, 'Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)', 'submitted', 'Complete & Verified.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', NOW() - INTERVAL '10 days'),
        (intern3_id, '1x1 Picture - 4pcs (White BG w/ Collar & Signature)', 'submitted', 'Complete & Verified.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80', NOW() - INTERVAL '10 days'),
        (intern3_id, 'Barangay Certificate', 'submitted', 'Valid Barangay Certificate on record.', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', NOW() - INTERVAL '10 days'),
        (intern3_id, 'Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)', 'submitted', 'Full medical clearance approved.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', NOW() - INTERVAL '10 days'),
        (intern3_id, 'Long Brown Envelope (1pc) & Long White Folder (1pc)', 'submitted', 'Filing materials archived.', NULL, NOW() - INTERVAL '10 days')
    ON CONFLICT DO NOTHING;
END $$;

-- Automated Trigger: New students automatically get all 7 official requirements
CREATE OR REPLACE FUNCTION public.handle_new_intern_requirements()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks)
    VALUES
        (NEW.id, 'Birth Certificate NSO/PSA (or Marriage Certificate)', 'lacking', 'Official NSO/PSA copy required. (For married women, submit Marriage Certificate)'),
        (NEW.id, 'Either: T.O.R / Diploma / ALS / Form 138 / Form 137', 'lacking', 'Submit either Transcript of Records (TOR), Diploma, ALS Certificate, Form 138, or Form 137.'),
        (NEW.id, 'Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)', 'lacking', '4 pcs passport-sized photos with white background, collar, nametag, and signature.'),
        (NEW.id, '1x1 Picture - 4pcs (White BG w/ Collar & Signature)', 'lacking', '4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature.'),
        (NEW.id, 'Barangay Certificate', 'lacking', 'Current valid Barangay Certificate/Clearance of residency required.'),
        (NEW.id, 'Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)', 'lacking', 'Medical Certificate required (includes Chest X-Ray for SMAW, or standard Medical for BPP, Driving & CSS NCII).'),
        (NEW.id, 'Long Brown Envelope (1pc) & Long White Folder (1pc)', 'lacking', 'Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving.');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_auto_seed_intern_requirements ON public.interns;
CREATE TRIGGER tr_auto_seed_intern_requirements
AFTER INSERT ON public.interns
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_intern_requirements();
