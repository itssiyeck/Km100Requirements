-- =============================================================================
-- KM100 Skills & Training Center, Inc.
-- Prescribed Official Requirements Seed & Automation Script
-- =============================================================================
-- Run this script in your Database -> SQL Editor
-- This script:
-- 1. Sets up the 8 prescribed official requirements.
-- 2. Seeds the sample candidates according to their specific courses:
--    - SMAW Students: Medical Certificate & Chest X-RAY for SMAW
--    - BPP, Driving & CSS NCII Students: Medical Certificate for BPP, Driving & CSS NCII
-- 3. Installs an automated trigger so every new student registration automatically
--    gets their prescribed requirements initialized based on their course!
-- =============================================================================

-- Step 1: Ensure interns exist with proper course departments
INSERT INTO public.interns (id, full_name, batch_number, student_id, email, department, overall_status)
VALUES
    ('aaaaaaaa-1111-1111-1111-111111111111', 'Juan Dela Cruz', 'Batch 2026-A', '2026-001', 'juan.delacruz@school.edu', 'SMAW', 'incomplete'),
    ('bbbbbbbb-2222-2222-2222-222222222222', 'Maria Clara', 'Batch 2026-A', '2026-002', 'maria.clara@school.edu', 'BPP (Bread & Pastry Production)', 'pending'),
    ('cccccccc-3333-3333-3333-333333333333', 'Crisostomo Ibarra', 'Batch 2026-B', '2026-003', 'c.ibarra@school.edu', 'Driving & CSS NCII', 'complete')
ON CONFLICT (id) DO UPDATE SET
    department = EXCLUDED.department,
    full_name = EXCLUDED.full_name;

-- Step 2: Clean up previous requirements for demo candidates
DELETE FROM public.requirements
WHERE intern_id IN (
    'aaaaaaaa-1111-1111-1111-111111111111',
    'bbbbbbbb-2222-2222-2222-222222222222',
    'cccccccc-3333-3333-3333-333333333333'
);

-- Step 3: Seed Requirements for Juan Dela Cruz (SMAW Candidate)
-- Medical Certificate & Chest X-RAY is required because he is a SMAW student!
INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
VALUES
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)',
        'submitted',
        'Official PSA Birth Certificate copy submitted and verified.',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        NOW() - INTERVAL '5 days'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137',
        'submitted',
        'Official Transcript of Records (T.O.R) verified and authenticated.',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        NOW() - INTERVAL '4 days'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)',
        'pending',
        '4 pcs passport photos with nametag and signature submitted; under registrar review.',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        NOW() - INTERVAL '2 days'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)',
        'submitted',
        '4 pcs 1x1 acid-base photos with nametag and signature verified.',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80',
        NOW() - INTERVAL '3 days'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Barangay Certificate',
        'lacking',
        'Valid Barangay Certificate/Clearance of residency required. Please submit to scanner.',
        NULL,
        NULL
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Medical Certificate & Chest X-RAY for SMAW',
        'submitted',
        'Medical Certificate & Chest X-RAY verified valid for SMAW trainee.',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        NOW() - INTERVAL '1 day'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Long Brown Envelope (1pc) & Long White Folder (1pc)',
        'lacking',
        'Physical filing materials: 1pc Long Brown Envelope and 1pc Long White Folder needed.',
        NULL,
        NULL
    );

-- Step 4: Seed Requirements for Maria Clara (BPP Candidate)
-- Medical Certificate for BPP, Driving & CSS NCII is required (Standard Medical, no X-ray required)
INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
VALUES
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)',
        'submitted',
        'NSO/PSA copy verified.',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        NOW() - INTERVAL '7 days'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137',
        'submitted',
        'College Diploma verified.',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        NOW() - INTERVAL '6 days'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)',
        'submitted',
        'Photos complete and stamped.',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        NOW() - INTERVAL '5 days'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)',
        'submitted',
        '1x1 photos complete.',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80',
        NOW() - INTERVAL '5 days'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Barangay Certificate',
        'pending',
        'Submitted Barangay clearance under verification by registrar.',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
        NOW() - INTERVAL '1 day'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Medical Certificate for BPP, Driving & CSS NCII',
        'pending',
        'Medical certificate for BPP received; pending clinic stamp confirmation.',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        NOW() - INTERVAL '1 day'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Long Brown Envelope (1pc) & Long White Folder (1pc)',
        'submitted',
        'Filing supplies received and tagged.',
        NULL,
        NOW() - INTERVAL '2 days'
    );

-- Step 5: Seed Requirements for Crisostomo Ibarra (Driving & CSS NCII Candidate - Fully Cleared)
INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
VALUES
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)',
        'submitted',
        'Complete & Verified.',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137',
        'submitted',
        'TOR & Diploma Complete & Verified.',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)',
        'submitted',
        'Complete & Verified.',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)',
        'submitted',
        'Complete & Verified.',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Barangay Certificate',
        'submitted',
        'Valid Barangay Certificate on record.',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Medical Certificate for BPP, Driving & CSS NCII',
        'submitted',
        'Full medical clearance approved for Driving & CSS NCII.',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Long Brown Envelope (1pc) & Long White Folder (1pc)',
        'submitted',
        'Filing envelope and folder archived in physical cabinet.',
        NULL,
        NOW() - INTERVAL '10 days'
    );

-- Step 6: Automated Trigger Function
-- Ensures that when any new student is created in the database:
-- 1. All common requirements are created.
-- 2. If their department/course is SMAW, "Medical Certificate & Chest X-RAY for SMAW" is assigned.
-- 3. If their department is BPP, Driving, CSS NCII (or general), "Medical Certificate for BPP, Driving & CSS NCII" is assigned.
CREATE OR REPLACE FUNCTION public.handle_new_intern_requirements()
RETURNS TRIGGER AS $$
DECLARE
    is_smaw BOOLEAN := FALSE;
BEGIN
    IF NEW.department IS NOT NULL AND NEW.department ILIKE '%SMAW%' THEN
        is_smaw := TRUE;
    END IF;

    -- Common requirements for all students
    INSERT INTO public.requirements (intern_id, requirement_name, status, remarks)
    VALUES
        (NEW.id, 'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)', 'lacking', 'Official NSO/PSA copy required. (For married women, bring Marriage Certificate)'),
        (NEW.id, 'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137', 'lacking', 'Submit either of the following: Transcript of Records (T.O.R), Diploma, ALS Certificate, Form 138, or Form 137.'),
        (NEW.id, 'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)', 'lacking', '4 pcs passport-sized photos with white background, collar, nametag, and signature (acid base).'),
        (NEW.id, 'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)', 'lacking', '4 pcs 1x1 photos on acid-based photo paper with white background, collar, nametag, and signature.'),
        (NEW.id, 'Barangay Certificate', 'lacking', 'Current valid Barangay Certificate / Clearance of residency required.'),
        (NEW.id, 'Long Brown Envelope (1pc) & Long White Folder (1pc)', 'lacking', 'Submit 1 pc Long Brown Envelope and 1 pc Long White Folder for document archiving.');

    -- Course-specific Medical Requirement:
    -- Chest X-Ray is for SMAW students only
    IF is_smaw THEN
        INSERT INTO public.requirements (intern_id, requirement_name, status, remarks)
        VALUES (NEW.id, 'Medical Certificate & Chest X-RAY for SMAW', 'lacking', 'Medical Certificate & Chest X-RAY required (Mandatory for SMAW students only).');
    ELSE
        INSERT INTO public.requirements (intern_id, requirement_name, status, remarks)
        VALUES (NEW.id, 'Medical Certificate for BPP, Driving & CSS NCII', 'lacking', 'Valid Medical Certificate required for BPP, Driving & CSS NCII trainees.');
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS tr_auto_seed_intern_requirements ON public.interns;
CREATE TRIGGER tr_auto_seed_intern_requirements
AFTER INSERT ON public.interns
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_intern_requirements();

-- Output status verification
SELECT 'Official requirements successfully seeded!' AS status,
       COUNT(*) AS total_requirements_in_system
FROM public.requirements;
