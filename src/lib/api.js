/**
 * InMind App — API layer.
 *
 * All auth, flow, quiz, and journal calls go through apiRequest()
 * which auto-attaches the JWT from localStorage.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// ─── Token helpers ───────────────────────────────────────────

export function getAuthToken() {
  try {
    const auth = JSON.parse(localStorage.getItem('inmind_auth'));
    return auth?.access_token || null;
  } catch {
    return null;
  }
}

export function saveAuthSession(auth) {
  localStorage.setItem('inmind_auth', JSON.stringify(auth));
}

export function clearAuthSession() {
  localStorage.removeItem('inmind_auth');
}

export function getAuthSession() {
  try {
    return JSON.parse(localStorage.getItem('inmind_auth'));
  } catch {
    return null;
  }
}

// ─── Core request helper ─────────────────────────────────────

// Single in-flight refresh shared across concurrent 401s.
let _refreshing = null;

async function tryRefresh() {
  const session = getAuthSession();
  if (!session?.refresh_token) return false;
  if (!_refreshing) {
    _refreshing = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    })
      .then(async (r) => {
        if (!r.ok) {
          clearAuthSession(); // refresh token also dead → must re-login
          return false;
        }
        const fresh = await r.json();
        saveAuthSession(fresh);
        return true;
      })
      .catch(() => false)
      .finally(() => { _refreshing = null; });
  }
  return _refreshing;
}

async function apiRequest(path, options = {}, _retried = false) {
  const doFetch = () => {
    const token = getAuthToken();
    const headers = {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  };

  let response = await doFetch();

  // On an expired token, refresh once and retry the original request.
  const skipRefresh =
    path === '/auth/refresh' || path.startsWith('/auth/login') || path.startsWith('/auth/signup');
  if (response.status === 401 && !_retried && !skipRefresh) {
    const ok = await tryRefresh();
    if (ok) response = await doFetch();
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    let message = 'Something went wrong';

    if (data?.detail) {
      if (typeof data.detail === 'string') {
        // Simple string error (e.g. "Invalid credentials.")
        message = data.detail;
      } else if (Array.isArray(data.detail)) {
        // FastAPI 422 validation errors: [{loc:["body","email"], msg:"...", type:"..."}]
        message = data.detail
          .map((e) => `${e.loc?.slice(1).join('.')}: ${e.msg}`)
          .join('; ');
      } else if (data.detail.message) {
        message = data.detail.message;
      }
    } else if (data?.message) {
      message = data.message;
    }

    console.error(`API Error [${response.status}]:`, message, data);
    throw new Error(message);
  }

  return data;
}

// ═════════════════════════════════════════════════════════════
//  AUTH
// ═════════════════════════════════════════════════════════════

export function signupStudent(payload) {
  return apiRequest('/auth/signup/student', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function signupParent(payload) {
  return apiRequest('/auth/signup/parent', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function signupTeacher(payload) {
  return apiRequest('/auth/signup/teacher', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getMe() {
  return apiRequest('/auth/me');
}

export function updateMe(payload) {
  return apiRequest('/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function logoutUser() {
  return apiRequest('/auth/logout', { method: 'POST' });
}

// ═════════════════════════════════════════════════════════════
//  FLOWS (static + dynamic check-in sessions)
// ═════════════════════════════════════════════════════════════

export function submitFlowSession(payload) {
  return apiRequest('/api/flows/session', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getFlowSessions() {
  return apiRequest('/api/flows/sessions');
}

// The student's LOCAL calendar date (YYYY-MM-DD). Used so the daily gate
// resets at the student's local midnight, not UTC.
export function localDate() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

// Has the student already done the static check-in for `date`? (once-per-day gate)
export function getStaticToday(date = localDate()) {
  return apiRequest(`/api/flows/today?date=${encodeURIComponent(date)}`);
}

// ═════════════════════════════════════════════════════════════
//  INSIGHTS (static-flow scoring → dashboard metrics)
// ═════════════════════════════════════════════════════════════

export function getMyInsights() {
  return apiRequest('/api/insights/me');
}

// ═════════════════════════════════════════════════════════════
//  THOUGHTS (Share a Thought → class feed)
// ═════════════════════════════════════════════════════════════

export function createThought(payload) {
  return apiRequest('/api/thoughts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listThoughts() {
  return apiRequest('/api/thoughts');
}

export function getStudentsRoster() {
  return apiRequest('/api/insights/students');
}

export function getStudentInsights(studentId) {
  return apiRequest(`/api/insights/student/${studentId}`);
}

// ─── Per-screen check-in helpers ─────────────────────────────
// The daily check-in is persisted to the backend in a single batch via
// submitFlowSession() (and via the signup payload's static_flow). These
// per-screen helpers are lightweight client-side no-ops kept so the
// DailyCheckinFlow's optional, in-progress telemetry calls resolve cleanly
// without requiring a dedicated per-screen endpoint.

export function getDailyFlowScreen() {
  // No per-screen endpoint; the flow uses a client-generated session id.
  return Promise.resolve(null);
}

export function submitScreenResponse() {
  return Promise.resolve(null);
}

export function submitBodyMap() {
  return Promise.resolve(null);
}

// ═════════════════════════════════════════════════════════════
//  QUIZZES
// ═════════════════════════════════════════════════════════════

export function createQuiz(payload) {
  return apiRequest('/api/quizzes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listQuizzes() {
  return apiRequest('/api/quizzes');
}

export function getQuiz(quizId) {
  return apiRequest(`/api/quizzes/${quizId}`);
}

export function updateQuiz(quizId, payload) {
  return apiRequest(`/api/quizzes/${quizId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function submitQuiz(quizId, payload) {
  return apiRequest(`/api/quizzes/${quizId}/submit`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getQuizResults(quizId) {
  return apiRequest(`/api/quizzes/${quizId}/results`);
}

export function getMyQuizResult(quizId) {
  return apiRequest(`/api/quizzes/${quizId}/my-result`);
}

// ═════════════════════════════════════════════════════════════
//  JOURNAL
// ═════════════════════════════════════════════════════════════

export function createJournalEntry(payload) {
  return apiRequest('/api/journal', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listJournalEntries() {
  return apiRequest('/api/journal');
}
