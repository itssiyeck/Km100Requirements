const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'frontend', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Add authPortalTab state
const oldStateTarget = `      // Form Credentials & Roles
      const [authEmail, setAuthEmail] = useState('');
      const [authPassword, setAuthPassword] = useState('');`;

const newStateTarget = `      // Form Credentials & Roles
      const [authPortalTab, setAuthPortalTab] = useState('user'); // 'user' (Student) or 'admin' (Administrator)
      const [authEmail, setAuthEmail] = useState('');
      const [authPassword, setAuthPassword] = useState('');`;

html = html.replace(oldStateTarget, newStateTarget);

// 2. Update handleLogin with portal tab check and error handling
const oldHandleLoginStart = `      // LOGIN SUBMISSION (SUPABASE AUTH + LOCAL DEMO)
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
        }`;

const newHandleLoginStart = `      // LOGIN SUBMISSION (SUPABASE AUTH + LOCAL DEMO)
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
          // STRICT ROLE SEPARATION FOR LOGIN GATEWAY
          if (authPortalTab === 'admin' && demoUser.role !== 'admin') {
            setAuthError('Access Denied: This is a Student/Trainee account. Please switch to the "Student / Trainee Portal" tab to sign in.');
            setShakeError(true);
            setTimeout(() => setShakeError(false), 500);
            return;
          }
          if (authPortalTab === 'user' && demoUser.role === 'admin') {
            setAuthError('Access Notice: This is an Administrator account. Please switch to the "Administrator Portal" tab to sign in.');
            setShakeError(true);
            setTimeout(() => setShakeError(false), 500);
            return;
          }

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
        }`;

html = html.replace(oldHandleLoginStart, newHandleLoginStart);

// Update Supabase login session handling to also enforce portal role check
const oldSupabaseLoginSession = `            if (authData?.user) {
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
            }`;

const newSupabaseLoginSession = `            if (authData?.user) {
              const uMeta = authData.user.user_metadata || {};
              const userRole = uMeta.role || 'user';

              if (authPortalTab === 'admin' && userRole !== 'admin') {
                setIsAuthenticating(false);
                setAuthError('Access Denied: Student account detected. Please switch to the "Student / Trainee Portal" tab to sign in.');
                setShakeError(true);
                setTimeout(() => setShakeError(false), 500);
                return;
              }
              if (authPortalTab === 'user' && userRole === 'admin') {
                setIsAuthenticating(false);
                setAuthError('Access Notice: Administrator account detected. Please switch to the "Administrator Portal" tab to sign in.');
                setShakeError(true);
                setTimeout(() => setShakeError(false), 500);
                return;
              }

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
            }`;

html = html.replace(oldSupabaseLoginSession, newSupabaseLoginSession);

// 3. Replace SIGNUP VIEW with dedicated tabs and separated portals
const oldSignupViewRegex = /if \(currentView === 'signup'\) \{[\s\S]*?return \(\r?\n\s+<div className="auth-hero-scope min-h-screen[\s\S]*?<\/div>\r?\n\s+\);\r?\n\s+\}/;

const newSignupViewCode = `if (currentView === 'signup') {
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
                  className={\`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 \${
                    !isAdminSignup
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-1 ring-orange-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }\`}
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
                  className={\`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 \${
                    isAdminSignup
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }\`}
                >
                  <Icons.Shield className="w-3.5 h-3.5" />
                  <span>Administrator Portal</span>
                </button>
              </div>

              {/* SIGN UP CARD */}
              <div
                className={\`bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-4 sm:p-5 w-full auth-card-glow space-y-3 transition-all duration-200 \${shakeError ? 'shake-error' : ''}\`}
              >
                {/* Header Switcher */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={\`w-2 h-2 rounded-full \${isAdminSignup ? 'bg-emerald-500' : 'bg-orange-500'}\`}></span>
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
                    className={\`text-xs font-semibold flex items-center gap-1 transition \${
                      isAdminSignup
                        ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-600'
                        : 'text-orange-600 dark:text-orange-400 hover:text-orange-500'
                    }\`}
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
                      className={\`w-full py-2.5 rounded-xl font-bold text-xs shadow-lg btn-shimmer flex items-center justify-center gap-2 disabled:opacity-75 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] \${
                        isAdminSignup
                          ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white shadow-orange-600/30'
                      }\`}
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
                          className={\`font-bold transition hover:underline \${
                            isAdminSignup
                              ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-600'
                              : 'text-orange-600 dark:text-orange-400 hover:text-orange-500'
                          }\`}
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
      }`;

html = html.replace(oldSignupViewRegex, newSignupViewCode);

// 4. Replace LOGIN VIEW with dedicated separated tabs
const oldLoginViewRegex = /if \(currentView === 'login' \|\| !currentUser\) \{[\s\S]*?return \(\r?\n\s+<div className="auth-hero-scope min-h-screen[\s\S]*?<\/div>\r?\n\s+\);\r?\n\s+\}/;

const newLoginViewCode = `if (currentView === 'login' || !currentUser) {
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
                  className={\`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 \${
                    !isAdminLogin
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-1 ring-orange-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }\`}
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
                  className={\`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 \${
                    isAdminLogin
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }\`}
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
                className={\`bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-4 sm:p-6 w-full auth-card-glow space-y-3 transition-all duration-200 \${shakeError ? 'shake-error' : ''}\`}
              >
                {/* Header Switcher */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={\`w-2 h-2 rounded-full \${isAdminLogin ? 'bg-emerald-500' : 'bg-orange-500'}\`}></span>
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
                      className={\`w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs shadow-xl btn-shimmer flex items-center justify-center gap-2 disabled:opacity-75 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] \${
                        isAdminLogin
                          ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white shadow-orange-600/30'
                      }\`}
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
                          className={\`font-bold transition hover:underline \${
                            isAdminLogin
                              ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-600'
                              : 'text-orange-600 dark:text-orange-400 hover:text-orange-500'
                          }\`}
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
      }`;

html = html.replace(oldLoginViewRegex, newLoginViewCode);

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Successfully separated Admin and User Sign In / Sign Up portals!');
