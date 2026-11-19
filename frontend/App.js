import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert
} from 'react-native';
import { api } from './src/services/api';

// PRE-CONFIGURED ACCOUNTS
const INITIAL_AUTH_USERS = [
  {
    id: "admin-1",
    email: "admin@system.local",
    password: "admin123",
    role: "admin",
    name: "System Administrator",
    title: "OJT / TVET Head Coordinator"
  },
  {
    id: "user-1",
    email: "juan.delacruz@school.edu",
    password: "user123",
    role: "user",
    name: "Juan Dela Cruz",
    batch: "Batch 2026-A",
    student_id: "2026-001"
  },
  {
    id: "user-2",
    email: "maria.clara@school.edu",
    password: "user123",
    role: "user",
    name: "Maria Clara",
    batch: "Batch 2026-A",
    student_id: "2026-002"
  },
  {
    id: "user-3",
    email: "c.ibarra@school.edu",
    password: "user123",
    role: "user",
    name: "Crisostomo Ibarra",
    batch: "Batch 2026-B",
    student_id: "2026-003"
  }
];

export default function App() {
  // Session Authentication State (null = user must log in / sign up first!)
  const [currentUser, setCurrentUser] = useState(null);

  // Auth Screen State
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Sign-Up Specific Fields
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState('user'); // 'user' | 'admin'
  const [signupBatch, setSignupBatch] = useState('Batch 2026-A');
  const [signupStudentId, setSignupStudentId] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');

  const [registeredUsers, setRegisteredUsers] = useState(INITIAL_AUTH_USERS);

  // Main Portal State
  const [batchNumber, setBatchNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Admin Modals State
  const [showEditInternModal, setShowEditInternModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBatch, setEditBatch] = useState('');
  const [editStudentId, setEditStudentId] = useState('');
  const [editDept, setEditDept] = useState('');
  const [editOverallStatus, setEditOverallStatus] = useState('incomplete');

  const [showEditReqModal, setShowEditReqModal] = useState(false);
  const [editingReq, setEditingReq] = useState(null);
  const [editReqStatus, setEditReqStatus] = useState('lacking');
  const [editReqRemarks, setEditReqRemarks] = useState('');

  // Auto-search if student logs in
  useEffect(() => {
    if (currentUser && currentUser.role === 'user' && currentUser.batch && currentUser.name) {
      setBatchNumber(currentUser.batch);
      setFullName(currentUser.name);
      handleSearch(currentUser.batch, currentUser.name);
    }
  }, [currentUser]);

  // LOGIN HANDLERS
  const handleLoginSubmit = () => {
    setAuthError('');
    const emailClean = authEmail.trim().toLowerCase();
    const found = registeredUsers.find(
      u => u.email.toLowerCase() === emailClean && u.password === authPassword
    );

    if (!found) {
      setAuthError('Invalid email or password.');
      return;
    }

    const sessionObj = {
      id: found.id,
      role: found.role,
      email: found.email,
      name: found.name,
      batch: found.batch || '',
      student_id: found.student_id || '',
      is_admin: found.role === 'admin'
    };

    setCurrentUser(sessionObj);
    setAuthPassword('');
  };

  const handleQuickLogin = (email, pass) => {
    setAuthEmail(email);
    setAuthPassword(pass);
    const found = registeredUsers.find(u => u.email === email && u.password === pass);
    if (found) {
      const sessionObj = {
        id: found.id,
        role: found.role,
        email: found.email,
        name: found.name,
        batch: found.batch || '',
        student_id: found.student_id || '',
        is_admin: found.role === 'admin'
      };
      setCurrentUser(sessionObj);
      setAuthPassword('');
    }
  };

  // SIGN UP HANDLER
  const handleSignUpSubmit = () => {
    setAuthError('');
    const emailClean = authEmail.trim().toLowerCase();

    if (!signupName.trim() || !emailClean || !authPassword) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (registeredUsers.some(u => u.email.toLowerCase() === emailClean)) {
      setAuthError('An account with this email already exists.');
      return;
    }

    if (signupRole === 'admin' && adminPasscode !== 'admin123' && adminPasscode !== 'ADMIN') {
      setAuthError('Invalid Admin Passcode (Default is: admin123).');
      return;
    }

    const newUser = {
      id: 'user-' + Date.now(),
      email: emailClean,
      password: authPassword,
      role: signupRole,
      name: signupName.trim(),
      batch: signupRole === 'user' ? signupBatch.trim() : '',
      student_id: signupRole === 'user' ? signupStudentId.trim() : ''
    };

    setRegisteredUsers([...registeredUsers, newUser]);

    const sessionObj = {
      id: newUser.id,
      role: newUser.role,
      email: newUser.email,
      name: newUser.name,
      batch: newUser.batch,
      student_id: newUser.student_id,
      is_admin: newUser.role === 'admin'
    };

    setCurrentUser(sessionObj);
    setAuthPassword('');
    alert('Account created successfully! Welcome to the portal.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSearchResult(null);
    setHasSearched(false);
    setBatchNumber('');
    setFullName('');
  };

  // SEARCH FUNCTION
  const handleSearch = async (bArg, nArg) => {
    const b = (bArg !== undefined ? bArg : batchNumber).trim();
    const n = (nArg !== undefined ? nArg : fullName).trim();

    if (!b || !n) {
      alert('Please enter both your Batch Number and Full Name.');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    try {
      const res = await api.searchIntern(b, n);
      if (res.found && res.data) {
        setSearchResult(res.data);
      } else {
        setSearchResult(null);
      }
    } catch (e) {
      alert('Search error: ' + e.message);
    } finally {
      setIsSearching(false);
    }
  };

  // ADMIN ACTIONS
  const openEditIntern = () => {
    if (!currentUser?.is_admin) return;
    setEditName(searchResult.full_name);
    setEditBatch(searchResult.batch_number);
    setEditStudentId(searchResult.student_id || '');
    setEditDept(searchResult.department || '');
    setEditOverallStatus(searchResult.overall_status || 'incomplete');
    setShowEditInternModal(true);
  };

  const saveInternCredentials = () => {
    const updated = {
      ...searchResult,
      full_name: editName.trim(),
      batch_number: editBatch.trim(),
      student_id: editStudentId.trim(),
      department: editDept.trim(),
      overall_status: editOverallStatus
    };
    setSearchResult(updated);
    setShowEditInternModal(false);
    alert('Student credentials updated by Admin!');
  };

  const openEditReq = (req) => {
    if (!currentUser?.is_admin) return;
    setEditingReq(req);
    setEditReqStatus(req.status);
    setEditReqRemarks(req.remarks || '');
    setShowEditReqModal(true);
  };

  const saveRequirementUpdate = () => {
    if (!editingReq) return;
    const updatedReqs = searchResult.requirements.map(r => {
      if (r.id === editingReq.id) {
        return {
          ...r,
          status: editReqStatus,
          remarks: editReqRemarks.trim()
        };
      }
      return r;
    });
    setSearchResult({
      ...searchResult,
      requirements: updatedReqs
    });
    setShowEditReqModal(false);
    alert('Requirement status updated by Admin!');
  };

  const lackingCount = searchResult?.requirements?.filter(r => r.status === 'lacking').length || 0;
  const pendingCount = searchResult?.requirements?.filter(r => r.status === 'pending').length || 0;
  const submittedCount = searchResult?.requirements?.filter(r => r.status === 'submitted').length || 0;

  const filteredRequirements = searchResult?.requirements?.filter(r => {
    if (activeFilter === 'all') return true;
    return r.status === activeFilter;
  }) || [];

  // =====================================================================
  // 1. SEPARATE LOGIN / SIGN UP GATEWAY SCREEN
  // =====================================================================
  if (!currentUser) {
    return (
      <ImageBackground
        source={require('./assets/km100-banner.jpg')}
        style={styles.authContainer}
        resizeMode="cover"
      >
        <View style={styles.authOverlay} />
        <View style={styles.authCard}>
          <View style={styles.authHeader}>
            <View style={styles.authLogo}>
              <Text style={[styles.authLogoText, { fontSize: 16, fontWeight: 'bold', color: '#38bdf8' }]}>KM100</Text>
            </View>
            <Text style={styles.authTitle}>Diploma, NC II Trainee Portal</Text>
            <Text style={styles.authSubtitle}>Please log in or create an account to access the portal.</Text>
          </View>

          {/* TAB SWITCHER */}
          <View style={styles.authTabRow}>
            <TouchableOpacity
              style={[styles.authTabBtn, authMode === 'login' && styles.authTabBtnActive]}
              onPress={() => { setAuthMode('login'); setAuthError(''); }}
            >
              <Text style={[styles.authTabBtnText, authMode === 'login' && styles.authTabBtnTextActive]}>
                Sign In (Login)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.authTabBtn, authMode === 'signup' && styles.authTabBtnActive]}
              onPress={() => { setAuthMode('signup'); setAuthError(''); }}
            >
              <Text style={[styles.authTabBtnText, authMode === 'signup' && styles.authTabBtnTextActive]}>
                Create Account (Sign Up)
              </Text>
            </TouchableOpacity>
          </View>

          {authError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{authError}</Text>
            </View>
          ) : null}

          {/* LOGIN VIEW */}
          {authMode === 'login' ? (
            <View style={styles.formSection}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. admin@system.local or juan.delacruz@school.edu"
                placeholderTextColor="#64748b"
                value={authEmail}
                onChangeText={setAuthEmail}
              />

              <Text style={[styles.inputLabel, { marginTop: 10 }]}>Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter password"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={authPassword}
                onChangeText={setAuthPassword}
              />

              <TouchableOpacity style={styles.btnAuthSubmit} onPress={handleLoginSubmit}>
                <Text style={styles.btnAuthSubmitText}>Sign In & Enter Portal →</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* SIGN UP VIEW */
            <View style={styles.formSection}>
              <Text style={styles.inputLabel}>Account Type</Text>
              <View style={styles.roleToggleRow}>
                <TouchableOpacity
                  style={[styles.roleToggleBtn, signupRole === 'user' && styles.roleToggleBtnActive]}
                  onPress={() => setSignupRole('user')}
                >
                  <Text style={[styles.roleToggleBtnText, signupRole === 'user' && styles.roleToggleBtnTextActive]}>
                    Student / User
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.roleToggleBtn, signupRole === 'admin' && styles.roleToggleBtnActiveAdmin]}
                  onPress={() => setSignupRole('admin')}
                >
                  <Text style={[styles.roleToggleBtnText, signupRole === 'admin' && styles.roleToggleBtnTextActive]}>
                    Administrator
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.inputLabel, { marginTop: 8 }]}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Sarah Jenkins"
                placeholderTextColor="#64748b"
                value={signupName}
                onChangeText={setSignupName}
              />

              <Text style={[styles.inputLabel, { marginTop: 8 }]}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. sarah@school.edu"
                placeholderTextColor="#64748b"
                value={authEmail}
                onChangeText={setAuthEmail}
              />

              <Text style={[styles.inputLabel, { marginTop: 8 }]}>Create Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={authPassword}
                onChangeText={setAuthPassword}
              />

              {signupRole === 'user' ? (
                <>
                  <Text style={[styles.inputLabel, { marginTop: 8 }]}>Batch Number</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. Batch 2026-A"
                    placeholderTextColor="#64748b"
                    value={signupBatch}
                    onChangeText={setSignupBatch}
                  />
                </>
              ) : (
                <>
                  <Text style={[styles.inputLabel, { marginTop: 8, color: '#34d399' }]}>
                    Admin Verification Passcode
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter passcode (demo: admin123)"
                    placeholderTextColor="#64748b"
                    secureTextEntry
                    value={adminPasscode}
                    onChangeText={setAdminPasscode}
                  />
                </>
              )}

              <TouchableOpacity style={styles.btnAuthSubmitSignup} onPress={handleSignUpSubmit}>
                <Text style={styles.btnAuthSubmitText}>Complete Registration & Enter →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }

  // =====================================================================
  // 2. MAIN WEBSITE / PORTAL (RENDERED ONLY AFTER LOGGING IN)
  // =====================================================================
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Diploma, NC II Trainee Portal</Text>
          <Text style={styles.headerSubtitle}>Requirements Clearance • Supabase Backend</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.userBadgeRow}>
            <View style={[styles.rolePill, currentUser.is_admin ? styles.rolePillAdmin : styles.rolePillUser]}>
              <Text style={styles.rolePillText}>
                {currentUser.is_admin ? 'Administrator' : currentUser.name}
              </Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.btnLogout}>
              <Text style={styles.btnLogoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* ROLE NOTICE BANNER (ADMIN ONLY) */}
        {currentUser.is_admin ? (
          <View style={styles.adminBanner}>
            <Text style={styles.adminBannerTitle}>Administrator Mode Active</Text>
            <Text style={styles.adminBannerSubtitle}>
              You have full authority to edit candidate credentials and update requirement compliance statuses.
            </Text>
          </View>
        ) : null}

        {/* SEARCH CARD */}
        <View style={styles.searchCard}>
          <View style={styles.searchHeader}>
            <Text style={styles.portalTag}>VERIFICATION PORTAL</Text>
            <Text style={styles.searchTitle}>Check your Diploma, NC II Trainee Requirements</Text>
            <Text style={styles.searchSubtitle}>
              Enter your Batch Number and Full Name to check if you have any lacking or pending requirements.
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputCol}>
              <Text style={styles.inputLabel}>Batch Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Batch 2026-A"
                placeholderTextColor="#64748b"
                value={batchNumber}
                onChangeText={setBatchNumber}
              />
            </View>

            <View style={styles.inputCol}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Juan Dela Cruz"
                placeholderTextColor="#64748b"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.btnSearch, isSearching && styles.btnDisabled]}
            onPress={() => handleSearch()}
            disabled={isSearching}
          >
            {isSearching ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnSearchText}>Check Requirements</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* RESULTS CARD */}
        {hasSearched && !isSearching && searchResult && (
          <View style={styles.resultContainer}>
            {/* PROFILE & STATS CARD */}
            <View style={styles.profileCard}>
              <View style={styles.profileLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{searchResult.full_name.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.internName}>{searchResult.full_name}</Text>
                  <Text style={styles.internMeta}>
                    {searchResult.batch_number} • {searchResult.department || 'TVET Candidate'}
                  </Text>
                </View>
              </View>

              <View style={styles.statsAndActions}>
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumRed}>{lackingCount}</Text>
                    <Text style={styles.statLabel}>Lacking</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumAmber}>{pendingCount}</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumGreen}>{submittedCount}</Text>
                    <Text style={styles.statLabel}>Submitted</Text>
                  </View>
                </View>

                {/* ADMIN ONLY EDIT BUTTON */}
                {currentUser.is_admin ? (
                  <TouchableOpacity onPress={openEditIntern} style={styles.btnAdminEdit}>
                    <Text style={styles.btnAdminEditText}>Edit Credentials</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.viewOnlyBadge}>
                    <Text style={styles.viewOnlyBadgeText}>Verified Student Record</Text>
                  </View>
                )}
              </View>
            </View>

            {/* CHECKLIST */}
            <View style={styles.checklistCard}>
              <View style={styles.filterRow}>
                <Text style={styles.checklistTitle}>Prescribed Requirements Checklist</Text>
                <View style={styles.filterTabs}>
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'lacking', label: `Lacking (${lackingCount})` },
                    { id: 'pending', label: `Pending (${pendingCount})` },
                    { id: 'submitted', label: `Submitted (${submittedCount})` }
                  ].map(tab => (
                    <TouchableOpacity
                      key={tab.id}
                      style={[styles.tabChip, activeFilter === tab.id && styles.tabChipActive]}
                      onPress={() => setActiveFilter(tab.id)}
                    >
                      <Text style={[styles.tabChipText, activeFilter === tab.id && styles.tabChipTextActive]}>
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.reqList}>
                {filteredRequirements.map(req => {
                  const isLacking = req.status === 'lacking';
                  const isPending = req.status === 'pending';
                  return (
                    <View
                      key={req.id}
                      style={[
                        styles.reqItem,
                        isLacking ? styles.reqItemLacking : isPending ? styles.reqItemPending : styles.reqItemSubmitted
                      ]}
                    >
                      <View style={styles.reqLeft}>
                        <View style={{ flex: 1 }}>
                          <View style={styles.titleBadgeRow}>
                            <Text style={styles.reqName}>{req.name || req.requirement_name}</Text>
                            <View
                              style={[
                                styles.badge,
                                isLacking ? styles.badgeRed : isPending ? styles.badgeAmber : styles.badgeGreen
                              ]}
                            >
                              <Text style={styles.badgeText}>{req.status.toUpperCase()}</Text>
                            </View>
                          </View>
                          <Text style={[styles.reqRemarks, isLacking && styles.reqRemarksRed]}>
                            {req.remarks}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.reqRightButtons}>
                        {req.document_url && (
                          <TouchableOpacity
                            style={styles.btnViewDoc}
                            onPress={() => setSelectedDoc(req)}
                          >
                            <Text style={styles.btnViewDocText}>View Scan</Text>
                          </TouchableOpacity>
                        )}

                        {/* ADMIN UPDATE REQUIREMENT BUTTON */}
                        {currentUser.is_admin && (
                          <TouchableOpacity
                            style={styles.btnAdminUpdateReq}
                            onPress={() => openEditReq(req)}
                          >
                            <Text style={styles.btnAdminUpdateReqText}>Update Status</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ADMIN EDIT CREDENTIALS MODAL */}
      <Modal visible={showEditInternModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.adminModalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Student Credentials</Text>
              <TouchableOpacity onPress={() => setShowEditInternModal(false)}>
                <Text style={styles.closeModalText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput style={styles.textInput} value={editName} onChangeText={setEditName} />

            <Text style={[styles.inputLabel, { marginTop: 10 }]}>Batch Number</Text>
            <TextInput style={styles.textInput} value={editBatch} onChangeText={setEditBatch} />

            <Text style={[styles.inputLabel, { marginTop: 10 }]}>Student ID</Text>
            <TextInput style={styles.textInput} value={editStudentId} onChangeText={setEditStudentId} />

            <Text style={[styles.inputLabel, { marginTop: 10 }]}>Department</Text>
            <TextInput style={styles.textInput} value={editDept} onChangeText={setEditDept} />

            <TouchableOpacity style={styles.btnSaveAdmin} onPress={saveInternCredentials}>
              <Text style={styles.btnSaveAdminText}>Save Credentials</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ADMIN UPDATE REQUIREMENT MODAL */}
      <Modal visible={showEditReqModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.adminModalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Requirement Status</Text>
              <TouchableOpacity onPress={() => setShowEditReqModal(false)}>
                <Text style={styles.closeModalText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.reqTitlePreview}>{editingReq?.name}</Text>

            <View style={styles.statusSelectRow}>
              {['lacking', 'pending', 'submitted'].map(st => (
                <TouchableOpacity
                  key={st}
                  style={[styles.statusSelectBtn, editReqStatus === st && styles.statusSelectBtnActive]}
                  onPress={() => setEditReqStatus(st)}
                >
                  <Text style={[styles.statusSelectBtnText, editReqStatus === st && styles.statusSelectBtnTextActive]}>
                    {st.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.inputLabel, { marginTop: 10 }]}>Admin Remarks / Notes</Text>
            <TextInput
              style={[styles.textInput, { height: 70 }]}
              multiline
              value={editReqRemarks}
              onChangeText={setEditReqRemarks}
            />

            <TouchableOpacity style={styles.btnSaveAdmin} onPress={saveRequirementUpdate}>
              <Text style={styles.btnSaveAdminText}>Save Updates</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DOCUMENT PREVIEW MODAL */}
      <Modal visible={!!selectedDoc} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedDoc?.name || selectedDoc?.requirement_name}</Text>
              <TouchableOpacity onPress={() => setSelectedDoc(null)}>
                <Text style={styles.closeModalText}>✕ Close</Text>
              </TouchableOpacity>
            </View>
            {selectedDoc?.document_url && (
              <Image
                source={{ uri: selectedDoc.document_url }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
            <View style={styles.modalMeta}>
              <Text style={styles.metaText}>• Status: {selectedDoc?.status?.toUpperCase()}</Text>
              <Text style={styles.metaText}>• Remarks: {selectedDoc?.remarks}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center', padding: 20 },
  authOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(2, 6, 23, 0.55)' },
  authCard: { backgroundColor: '#0f172a', borderRadius: 24, padding: 26, width: '100%', maxWidth: 440, borderWidth: 1, borderColor: '#1e293b' },
  authHeader: { alignItems: 'center', marginBottom: 16 },
  authLogo: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#0284c7', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  authLogoText: { fontSize: 26 },
  authTitle: { fontSize: 20, fontWeight: '800', color: '#fff', textAlign: 'center' },
  authSubtitle: { fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 4 },
  authTabRow: { flexDirection: 'row', backgroundColor: '#020617', borderRadius: 12, padding: 4, marginBottom: 14 },
  authTabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  authTabBtnActive: { backgroundColor: '#0284c7' },
  authTabBtnText: { color: '#94a3b8', fontSize: 11, fontWeight: '700' },
  authTabBtnTextActive: { color: '#fff' },
  errorBox: { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderWidth: 1, borderColor: '#ef4444', borderRadius: 10, padding: 10, marginBottom: 12 },
  errorText: { color: '#f87171', fontSize: 11 },
  formSection: { width: '100%' },
  quickLoginLabel: { color: '#64748b', fontSize: 10, fontWeight: '800', marginBottom: 6 },
  quickLoginAdmin: { backgroundColor: 'rgba(5, 150, 105, 0.15)', borderWidth: 1, borderColor: '#059669', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, marginBottom: 8 },
  quickLoginAdminText: { color: '#34d399', fontSize: 11, fontWeight: '700' },
  quickLoginUser: { backgroundColor: 'rgba(2, 132, 199, 0.15)', borderWidth: 1, borderColor: '#0284c7', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, marginBottom: 8 },
  quickLoginUserText: { color: '#38bdf8', fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#1e293b', marginVertical: 12 },
  btnAuthSubmit: { backgroundColor: '#0284c7', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 14 },
  btnAuthSubmitSignup: { backgroundColor: '#059669', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 14 },
  btnAuthSubmitText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  roleToggleRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  roleToggleBtn: { flex: 1, paddingVertical: 8, backgroundColor: '#020617', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  roleToggleBtnActive: { backgroundColor: '#0284c7', borderColor: '#38bdf8' },
  roleToggleBtnActiveAdmin: { backgroundColor: '#059669', borderColor: '#34d399' },
  roleToggleBtnText: { color: '#94a3b8', fontSize: 11, fontWeight: '700' },
  roleToggleBtnTextActive: { color: '#fff' },

  container: { flex: 1, backgroundColor: '#020617' },
  header: { backgroundColor: '#0f172a', paddingVertical: 14, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#f8fafc' },
  headerSubtitle: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  userBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rolePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  rolePillAdmin: { backgroundColor: '#059669' },
  rolePillUser: { backgroundColor: '#0284c7' },
  rolePillText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  btnLogout: { backgroundColor: '#334155', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  btnLogoutText: { color: '#fca5a5', fontSize: 11, fontWeight: '700' },
  adminBanner: { backgroundColor: 'rgba(5, 150, 105, 0.15)', borderWidth: 1, borderColor: '#059669', borderRadius: 14, padding: 12, marginBottom: 14 },
  adminBannerTitle: { color: '#34d399', fontSize: 13, fontWeight: '700' },
  adminBannerSubtitle: { color: '#e2e8f0', fontSize: 11, marginTop: 2 },
  userBanner: { backgroundColor: 'rgba(2, 132, 199, 0.15)', borderWidth: 1, borderColor: '#0284c7', borderRadius: 14, padding: 12, marginBottom: 14 },
  userBannerTitle: { color: '#38bdf8', fontSize: 13, fontWeight: '700' },
  userBannerSubtitle: { color: '#e2e8f0', fontSize: 11, marginTop: 2 },
  content: { flex: 1 },
  contentContainer: { padding: 20, maxWidth: 900, marginHorizontal: 'auto', width: '100%' },
  searchCard: { backgroundColor: '#0f172a', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#1e293b', marginBottom: 20 },
  searchHeader: { alignItems: 'center', marginBottom: 20 },
  portalTag: { color: '#38bdf8', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  searchTitle: { fontSize: 24, fontWeight: '800', color: '#ffffff', textAlign: 'center' },
  searchSubtitle: { fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 6, maxWidth: 480 },
  inputGroup: { flexDirection: 'row', gap: 14, flexWrap: 'wrap' },
  inputCol: { flex: 1, minWidth: 240 },
  inputLabel: { fontSize: 11, fontWeight: '600', color: '#cbd5e1', marginBottom: 4 },
  textInput: { backgroundColor: '#020617', borderWidth: 1, borderColor: '#334155', borderRadius: 10, color: '#ffffff', paddingHorizontal: 12, paddingVertical: 9, fontSize: 13 },
  btnSearch: { backgroundColor: '#0284c7', paddingVertical: 13, borderRadius: 12, alignItems: 'center', marginTop: 14 },
  btnDisabled: { opacity: 0.6 },
  btnSearchText: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
  resultContainer: { gap: 16 },
  profileCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#1e293b', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 },
  profileLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#0284c7', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#ffffff', fontSize: 22, fontWeight: '800' },
  internName: { fontSize: 18, fontWeight: '700', color: '#ffffff' },
  internMeta: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  statsAndActions: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  statsRow: { flexDirection: 'row', gap: 8 },
  statBox: { backgroundColor: '#020617', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#1e293b' },
  statNumRed: { color: '#ef4444', fontSize: 15, fontWeight: '800' },
  statNumAmber: { color: '#f59e0b', fontSize: 15, fontWeight: '800' },
  statNumGreen: { color: '#10b981', fontSize: 15, fontWeight: '800' },
  statLabel: { color: '#64748b', fontSize: 9, fontWeight: '700', textTransform: 'uppercase' },
  btnAdminEdit: { backgroundColor: '#059669', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  btnAdminEditText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  viewOnlyBadge: { backgroundColor: '#020617', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  viewOnlyBadgeText: { color: '#94a3b8', fontSize: 11 },
  checklistCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#1e293b' },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  checklistTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  filterTabs: { flexDirection: 'row', gap: 6 },
  tabChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: '#020617', borderWidth: 1, borderColor: '#1e293b' },
  tabChipActive: { backgroundColor: '#0284c7', borderColor: '#38bdf8' },
  tabChipText: { color: '#94a3b8', fontSize: 11, fontWeight: '600' },
  tabChipTextActive: { color: '#ffffff' },
  reqList: { gap: 10 },
  reqItem: { padding: 14, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  reqItemLacking: { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.3)' },
  reqItemPending: { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.3)' },
  reqItemSubmitted: { backgroundColor: '#020617', borderColor: '#1e293b' },
  reqLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  statusEmoji: { fontSize: 16, marginTop: 2 },
  titleBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  reqName: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeRed: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  badgeAmber: { backgroundColor: 'rgba(245, 158, 11, 0.2)' },
  badgeGreen: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  badgeText: { color: '#ffffff', fontSize: 9, fontWeight: '700' },
  reqRemarks: { color: '#94a3b8', fontSize: 11, marginTop: 4 },
  reqRemarksRed: { color: '#f87171', fontWeight: '500' },
  reqRightButtons: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  btnViewDoc: { backgroundColor: '#0284c7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  btnViewDocText: { color: '#ffffff', fontSize: 11, fontWeight: '600' },
  btnAdminUpdateReq: { backgroundColor: '#059669', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  btnAdminUpdateReqText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  adminModalCard: { backgroundColor: '#0f172a', borderRadius: 20, padding: 24, width: '100%', maxWidth: 500, borderWidth: 1, borderColor: '#059669' },
  modalCard: { backgroundColor: '#0f172a', borderRadius: 20, padding: 20, width: '100%', maxWidth: 650, maxHeight: '85%', borderWidth: 1, borderColor: '#334155' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  modalTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700', flex: 1 },
  closeModalText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  btnSaveAdmin: { backgroundColor: '#059669', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  btnSaveAdminText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  reqTitlePreview: { color: '#38bdf8', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  statusSelectRow: { flexDirection: 'row', gap: 8 },
  statusSelectBtn: { flex: 1, paddingVertical: 8, backgroundColor: '#020617', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  statusSelectBtnActive: { backgroundColor: '#059669', borderColor: '#34d399' },
  statusSelectBtnText: { color: '#94a3b8', fontSize: 11, fontWeight: '700' },
  statusSelectBtnTextActive: { color: '#fff' },
  modalImage: { width: '100%', height: 350, borderRadius: 8, backgroundColor: '#020617' },
  modalMeta: { backgroundColor: '#020617', padding: 12, borderRadius: 8, marginTop: 12, gap: 4 },
  metaText: { color: '#cbd5e1', fontSize: 12 }
});
