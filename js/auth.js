// ══════════════════════════════════════════════
//  🔐 BABIL AUTH — Firebase Authentication
// ══════════════════════════════════════════════
const SESSION_KEY = 'babilSession';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 أيام

// ── حفظ الجلسة المحلية (UI فقط — Firebase يتحكم بالأمان الحقيقي) ──
function saveSession(uid, tenantData) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    tenantId:  uid,
    username:  tenantData.admin?.username || '',
    nameAr:    tenantData.nameAr || '',
    email:     tenantData.email  || '',
    loginTime: Date.now()
  }));
}

// ── قراءة الجلسة ──
function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (Date.now() - s.loginTime > SESSION_TTL) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch { return null; }
}

// ── مسح الجلسة + Firebase signOut ──
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  if (window._auth && window._fbAuth) {
    window._fbAuth.signOut(window._auth).catch(() => {});
  }
}

// ── حماية الصفحات ──
function requireAuth() {
  if (!getSession()) {
    location.replace('login.html');
    throw new Error('unauthenticated');
  }
}

// ── تحويل للداشبورد إذا مسجّل الدخول ──
function redirectIfAuth() {
  if (getSession()) location.replace('dashboard.html');
}

// ── انتظار Firebase ──
function waitForFb() {
  return new Promise(resolve => {
    if (window._fbReady) return resolve();
    document.addEventListener('fbReady', resolve, { once: true });
  });
}

// ── تسجيل مستخدم جديد (Firebase Auth) ──
async function registerWithEmail(email, password) {
  await waitForFb();
  const { createUserWithEmailAndPassword } = window._fbAuth;
  return createUserWithEmailAndPassword(window._auth, email, password);
}

// ── تسجيل الدخول (Firebase Auth) ──
async function loginWithEmail(email, password) {
  await waitForFb();
  const { signInWithEmailAndPassword } = window._fbAuth;
  return signInWithEmailAndPassword(window._auth, email, password);
}

// ── إعادة تعيين كلمة المرور ──
async function resetPassword(email) {
  await waitForFb();
  const { sendPasswordResetEmail } = window._fbAuth;
  return sendPasswordResetEmail(window._auth, email);
}

window.saveSession       = saveSession;
window.getSession        = getSession;
window.clearSession      = clearSession;
window.requireAuth       = requireAuth;
window.redirectIfAuth    = redirectIfAuth;
window.waitForFb         = waitForFb;
window.registerWithEmail = registerWithEmail;
window.loginWithEmail    = loginWithEmail;
window.resetPassword     = resetPassword;
