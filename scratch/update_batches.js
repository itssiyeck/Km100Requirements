const fs = require('fs');
const path = require('path');

// 5 Batches mock data generator
const BATCHES = [
  { batch: 'Batch 1', prefix: '2026-B1', names: ['Juan Dela Cruz', 'Maria Clara', 'Andres Bonifacio'], depts: ['SMAW', 'BPP (Bread & Pastry Production)', 'SMAW'] },
  { batch: 'Batch 2', prefix: '2026-B2', names: ['Crisostomo Ibarra', 'Leonor Rivera', 'Emilio Jacinto'], depts: ['Driving & CSS NCII', 'BPP (Bread & Pastry Production)', 'Driving & CSS NCII'] },
  { batch: 'Batch 3', prefix: '2026-B3', names: ['Antonio Luna', 'Melchora Aquino', 'Marcelo Del Pilar'], depts: ['SMAW', 'BPP (Bread & Pastry Production)', 'Driving & CSS NCII'] },
  { batch: 'Batch 4', prefix: '2026-B4', names: ['Jose Rizal', 'Gabriela Silang', 'Apolinario Mabini'], depts: ['Driving & CSS NCII', 'SMAW', 'CSS NC II'] },
  { batch: 'Batch 5', prefix: '2026-B5', names: ['Diego Silang', 'Teresa Magbanua', 'Gregorio Del Pilar'], depts: ['SMAW', 'BPP (Bread & Pastry Production)', 'Driving & CSS NCII'] }
];

const REQ_TEMPLATES = [
  { name: 'Birth Certificate NSO/PSA (For Married women bring Marriage Certificate)', url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80' },
  { name: 'Either of the ff: T.O.R / Diploma / ALS Certificate / FORM 138 / FORM 137', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80' },
  { name: 'Picture (White Background w/Collar: Acid base): Passport size - 4pcs (w/nametag & signature)', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
  { name: 'Picture (White Background w/Collar: Acid base): 1x1 picture - 4pcs (w/nametag & signature)', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80' },
  { name: 'Barangay Certificate', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80' },
  { name_smaw: 'Medical Certificate & Chest X-RAY for SMAW', name_other: 'Medical Certificate for BPP, Driving & CSS NCII', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80' },
  { name: 'Long Brown Envelope (1pc) & Long White Folder (1pc)', url: null }
];

const initialUsers = [
  {
    id: "admin-1",
    email: "admin@system.local",
    password: "admin123",
    role: "admin",
    name: "System Administrator",
    title: "OJT / TVET Head Coordinator"
  }
];

const initialInterns = [];
let userCount = 0;
let reqCount = 0;

BATCHES.forEach((bObj, bIdx) => {
  bObj.names.forEach((name, nIdx) => {
    userCount++;
    const sId = `${bObj.prefix}-${String(nIdx + 1).padStart(3, '0')}`;
    const emailName = name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.');
    const email = `${emailName}@school.edu`;
    const dept = bObj.depts[nIdx];
    const isSmaw = dept.includes('SMAW');
    const isComplete = (userCount % 3 === 0);
    const isPending = (userCount % 3 === 2);
    const overallStatus = isComplete ? 'complete' : (isPending ? 'pending' : 'incomplete');

    initialUsers.push({
      id: `user-${userCount}`,
      email: email,
      password: "user123",
      role: "user",
      name: name,
      batch: bObj.batch,
      student_id: sId
    });

    const internReqs = REQ_TEMPLATES.map((tpl, tIdx) => {
      reqCount++;
      const reqName = tpl.name || (isSmaw ? tpl.name_smaw : tpl.name_other);
      let status = 'submitted';
      let remarks = `${reqName} verified and authenticated on record.`;
      let docUrl = tpl.url;
      let scanDate = `Nov ${String(10 + (reqCount % 12)).padStart(2, '0')}, 2026`;

      if (!isComplete) {
        if (tIdx === 6) { // envelopes
          status = isPending ? 'submitted' : 'lacking';
          remarks = isPending ? 'Archived in registrar.' : 'Physical filing materials required.';
          docUrl = null;
          scanDate = isPending ? scanDate : null;
        } else if (tIdx === 4 && !isPending) {
          status = 'lacking';
          remarks = 'Valid Barangay Certificate/Clearance of residency required.';
          docUrl = null;
          scanDate = null;
        } else if (tIdx === 2 && isPending) {
          status = 'pending';
          remarks = 'Under registrar verification.';
        }
      }

      return {
        id: `req-${reqCount}`,
        name: reqName,
        status: status,
        remarks: remarks,
        document_url: docUrl,
        scanned_at: scanDate
      };
    });

    initialInterns.push({
      id: `intern-b${bIdx + 1}-${nIdx + 1}`,
      full_name: name,
      batch_number: bObj.batch,
      student_id: sId,
      email: email,
      department: dept,
      overall_status: overallStatus,
      requirements: internReqs
    });
  });
});

console.log(`Generated ${initialUsers.length} users and ${initialInterns.length} interns across 5 batches.`);

// 1. UPDATE FRONTEND/INDEX.HTML
const indexHtmlPath = path.join(__dirname, '..', 'frontend', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace INITIAL_AUTH_USERS and INITIAL_INTERNS
const oldAuthAndInternsRegex = /\/\/ PRE-CONFIGURED LOGIN ACCOUNTS[\s\S]*?\/\/ THEME TOGGLE: Removed/;

const newAuthCode = `// PRE-CONFIGURED LOGIN ACCOUNTS FOR 5 BATCHES
    const INITIAL_AUTH_USERS = ${JSON.stringify(initialUsers, null, 6)};

    // DATABASE SEED FOR KM100 OFFICIAL PRESCRIBED REQUIREMENTS (5 BATCHES)
    const INITIAL_INTERNS = ${JSON.stringify(initialInterns, null, 6)};

    // THEME TOGGLE: Removed`;

indexHtml = indexHtml.replace(oldAuthAndInternsRegex, newAuthCode);

// Update requirements version to invalidate old 2-batch cache
indexHtml = indexHtml.replace(/KM100_REQUIREMENTS_V2026_OFFICIAL_8/g, 'KM100_REQUIREMENTS_V2026_5_BATCHES_V1');

// Update performSearch fallback match to enforce exact match for batch number
const oldFallbackMatch = `let match = internDatabase.find(intern => {
            const iBatch = intern.batch_number.toLowerCase();
            const iName = intern.full_name.toLowerCase();
            return (iBatch.includes(b.toLowerCase()) || b.toLowerCase().includes(iBatch)) &&
              (iName.includes(n.toLowerCase()) || n.toLowerCase().includes(iName));
          });`;

const newFallbackMatch = `const bNorm = b.toLowerCase().replace(/[^a-z0-9]/g, '');
        const nNorm = n.toLowerCase().trim();

        setTimeout(() => {
          let match = internDatabase.find(intern => {
            const iBatchNorm = (intern.batch_number || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const iNameNorm = (intern.full_name || '').toLowerCase().trim();
            // STRICT ISOLATION: Intern can ONLY be found if searched in their exact batch
            const batchMatches = (iBatchNorm === bNorm);
            const nameMatches = (iNameNorm === nNorm || iNameNorm.includes(nNorm) || nNorm.includes(iNameNorm));
            return batchMatches && nameMatches;
          });`;

indexHtml = indexHtml.replace(oldFallbackMatch, newFallbackMatch);

// Update Supabase ilike in frontend/index.html to use eq for batch_number
const oldSupabaseQuery = `.ilike('batch_number', \`%\${b}%\`)
              .ilike('full_name', \`%\${n}%\`);`;

const newSupabaseQuery = `.ilike('batch_number', b)
              .ilike('full_name', \`%\${n}%\`);`;

indexHtml = indexHtml.replace(oldSupabaseQuery, newSupabaseQuery);

// Update quick check sample buttons to show representative trainees across 5 batches
const oldQuickCheck = `{[
                          { batch: 'Batch 2026-A', name: 'Juan Dela Cruz', course: 'SMAW' },
                          { batch: 'Batch 2026-A', name: 'Maria Clara', course: 'BPP' },
                          { batch: 'Batch 2026-B', name: 'Crisostomo Ibarra', course: 'CSS NC II' }
                        ]`;

const newQuickCheck = `{[
                          { batch: 'Batch 1', name: 'Juan Dela Cruz', course: 'SMAW' },
                          { batch: 'Batch 2', name: 'Crisostomo Ibarra', course: 'Driving & CSS' },
                          { batch: 'Batch 3', name: 'Antonio Luna', course: 'SMAW' },
                          { batch: 'Batch 4', name: 'Jose Rizal', course: 'Driving & CSS' },
                          { batch: 'Batch 5', name: 'Diego Silang', course: 'SMAW' }
                        ]`;

indexHtml = indexHtml.replace(oldQuickCheck, newQuickCheck);

// Update placeholder to e.g. Batch 1
indexHtml = indexHtml.replace(/placeholder="e\.g\. Batch 2026-A"/g, 'placeholder="e.g. Batch 1"');

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('Successfully updated frontend/index.html');

// 2. UPDATE BACKEND/APP/DATABASE.PY
const dbPyPath = path.join(__dirname, '..', 'backend', 'app', 'database.py');
let dbPy = fs.readFileSync(dbPyPath, 'utf8');

// Build python dict for _mock_interns
const backendInterns = initialInterns.map(i => {
  return {
    id: i.id,
    full_name: i.full_name,
    batch_number: i.batch_number,
    student_id: i.student_id,
    email: i.email,
    department: i.department,
    overall_status: i.overall_status,
    requirements: i.requirements.map(r => ({
      id: r.id,
      requirement_name: r.name,
      status: r.status,
      remarks: r.remarks,
      document_url: r.document_url,
      scanned_at: r.scanned_at ? "2026-11-10T08:00:00Z" : null
    }))
  };
});

// JSON formatting for python (replace null with None)
let pyInternsStr = JSON.stringify(backendInterns, null, 4)
  .replace(/: null/g, ': None')
  .replace(/: true/g, ': True')
  .replace(/: false/g, ': False');

const oldMockInternsRegex = /# Local In-Memory Fallback Interns & Requirements Store\r?\n_mock_interns = \[[\s\S]*?\r?\n\]\r?\n\r?\n_mock_documents = \[\]/;
const newMockInternsCode = `# Local In-Memory Fallback Interns & Requirements Store (5 Batches)
_mock_interns = ${pyInternsStr}

_mock_documents = []`;

dbPy = dbPy.replace(oldMockInternsRegex, newMockInternsCode);

// Enforce strict batch comparison in backend search_intern
const oldPySearch = `        # In-memory search fallback
        for intern in _mock_interns:
            i_batch = intern["batch_number"].lower()
            i_name = intern["full_name"].lower()
            if (batch_clean in i_batch or i_batch in batch_clean) and (name_clean in i_name or i_name in name_clean):`;

const newPySearch = `        # In-memory search fallback with strict per-batch isolation
        b_norm = "".join(c for c in batch_clean if c.isalnum())
        for intern in _mock_interns:
            i_batch_norm = "".join(c for c in intern["batch_number"].lower() if c.isalnum())
            i_name = intern["full_name"].lower()
            # STRICT ISOLATION: Intern can ONLY be found in their exact batch
            batch_matches = (b_norm == i_batch_norm)
            name_matches = (name_clean in i_name or i_name in name_clean)
            if batch_matches and name_matches:`;

dbPy = dbPy.replace(oldPySearch, newPySearch);

fs.writeFileSync(dbPyPath, dbPy, 'utf8');
console.log('Successfully updated backend/app/database.py');
