

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

    -- Juan Dela Cruz requirements (Diploma & NC11 Trainer Requirements)
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url)
    VALUES
        (intern1_id, 'Diploma Degree / Academic Transcript', 'submitted', 'Official transcript of records verified', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80'),
        (intern1_id, 'NC11 / NC II National Certificate', 'lacking', 'Missing certified copy of National Certificate (NC11). Please submit to scanner.', NULL),
        (intern1_id, 'Trainers Methodology (TM 1) Certificate', 'pending', 'Submitted scan awaiting Admin and Assessor verification', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'),
        (intern1_id, 'National TVET Trainer Certificate (NTTC)', 'lacking', 'Lacking NTTC credentials. Please upload or scan updated certificate.', NULL),
        (intern1_id, 'Medical Physical & Drug Test Clearance', 'submitted', 'Approved valid medical clearance certificate', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80')
    ON CONFLICT DO NOTHING;

    -- Maria Clara requirements
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url)
    VALUES
        (intern2_id, 'OJT Endorsement Letter', 'submitted', 'Approved', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80'),
        (intern2_id, 'Medical Clearance Certificate', 'submitted', 'Complete', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80'),
        (intern2_id, 'Parent/Guardian Waiver & Consent', 'pending', 'Under review by Coordinator', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'),
        (intern2_id, 'Daily Time Record (DTR) - Week 1', 'lacking', 'Please upload or submit physical copy to scanner', NULL)
    ON CONFLICT DO NOTHING;

    -- Crisostomo Ibarra (Complete)
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url)
    VALUES
        (intern3_id, 'OJT Endorsement Letter', 'submitted', 'Verified', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80'),
        (intern3_id, 'Medical Clearance Certificate', 'submitted', 'Verified', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80'),
        (intern3_id, 'Parent/Guardian Waiver & Consent', 'submitted', 'Verified', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'),
        (intern3_id, 'Daily Time Record (DTR) - Week 1', 'submitted', 'Verified 40 hours', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80')
    ON CONFLICT DO NOTHING;
END $$;
