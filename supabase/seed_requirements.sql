-- =============================================================================
-- KM100 Skills & Training Center, Inc.
-- Prescribed OJT & Trainer Requirements Seed & Automation Script
-- =============================================================================
-- Run this script in your Supabase Dashboard -> SQL Editor
-- This will:
-- 1. Insert/update the 7 official requirements for all existing interns/trainees.
-- 2. Create an automated trigger so any newly registered student automatically
--    gets all 7 prescribed requirements initialized in Supabase.
-- =============================================================================

-- Step 1: Clean up old obsolete requirements for existing demo interns
DELETE FROM public.requirements
WHERE intern_id IN (
    'aaaaaaaa-1111-1111-1111-111111111111',
    'bbbbbbbb-2222-2222-2222-222222222222',
    'cccccccc-3333-3333-3333-333333333333'
);

-- Step 2: Seed Official Requirements for Candidate 1: Juan Dela Cruz (Batch 2026-A)
-- Demonstrates active clearance checklist with realistic submitted / lacking / pending statuses
INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
VALUES
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Birth Certificate NSO/PSA (or Marriage Certificate)',
        'submitted',
        'Official PSA Birth Certificate copy submitted and verified.',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        NOW() - INTERVAL '5 days'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Either: T.O.R / Diploma / ALS / Form 138 / Form 137',
        'submitted',
        'Official Transcript of Records (T.O.R) verified and authenticated.',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        NOW() - INTERVAL '4 days'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)',
        'pending',
        '4 pcs passport photos with nametag and signature submitted; under registrar review.',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        NOW() - INTERVAL '2 days'
    ),
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        '1x1 Picture - 4pcs (White BG w/ Collar & Signature)',
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
        'Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)',
        'submitted',
        'Medical Certificate & Chest X-RAY verified valid by school physician.',
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

-- Step 3: Seed Official Requirements for Candidate 2: Maria Clara (Batch 2026-A)
INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
VALUES
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Birth Certificate NSO/PSA (or Marriage Certificate)',
        'submitted',
        'NSO/PSA copy verified.',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        NOW() - INTERVAL '7 days'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Either: T.O.R / Diploma / ALS / Form 138 / Form 137',
        'submitted',
        'College Diploma verified.',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        NOW() - INTERVAL '6 days'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)',
        'submitted',
        'Photos complete and stamped.',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        NOW() - INTERVAL '5 days'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        '1x1 Picture - 4pcs (White BG w/ Collar & Signature)',
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
        'Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)',
        'pending',
        'Medical certificate received; pending clinic stamp confirmation.',
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

-- Step 4: Seed Official Requirements for Candidate 3: Crisostomo Ibarra (Batch 2026-B) - All Cleared!
INSERT INTO public.requirements (intern_id, requirement_name, status, remarks, document_url, scanned_at)
VALUES
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Birth Certificate NSO/PSA (or Marriage Certificate)',
        'submitted',
        'Complete & Verified.',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Either: T.O.R / Diploma / ALS / Form 138 / Form 137',
        'submitted',
        'TOR & Diploma Complete & Verified.',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)',
        'submitted',
        'Complete & Verified.',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        NOW() - INTERVAL '10 days'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        '1x1 Picture - 4pcs (White BG w/ Collar & Signature)',
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
        'Medical Certificate (w/ Chest X-RAY for SMAW / Medical for BPP, Driving & CSS NCII)',
        'submitted',
        'Full medical clearance approved.',
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

-- Step 5: Automated Trigger Function: When a new student/intern is created in Supabase,
-- automatically populate all 7 official requirements in the checklist!
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

-- Drop trigger if it exists and recreate
DROP TRIGGER IF EXISTS tr_auto_seed_intern_requirements ON public.interns;
CREATE TRIGGER tr_auto_seed_intern_requirements
AFTER INSERT ON public.interns
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_intern_requirements();

-- Confirm execution
SELECT 'Official requirements successfully seeded into Supabase!' AS status,
       COUNT(*) AS total_requirements_in_system
FROM public.requirements;
