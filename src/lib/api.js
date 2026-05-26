const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export function getAuthToken() {
  try {
    const auth = JSON.parse(localStorage.getItem('inmind_auth'));
    return auth?.access_token || null;
  } catch {
    return null;
  }
}

async function apiRequest(path, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.detail?.message || data?.detail || data?.message || 'Something went wrong';
    throw new Error(message);
  }

  return data;
}

export function saveAuthSession(auth) {
  localStorage.setItem('inmind_auth', JSON.stringify(auth));
}

export function signupStudent(payload) {
  return apiRequest('/auth/signup/student', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginStudent(payload) {
  return apiRequest('/auth/login', {
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

// Flow & Telemetry
export function getDailyFlowScreen(sessionId = null) {
  const url = sessionId ? `/flow/daily-flow?session_id=${sessionId}` : '/flow/daily-flow';
  return apiRequest(url, {
    method: 'POST',
  });
}

export function submitScreenResponse(payload) {
  return apiRequest('/responses/response', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function submitBodyMap(payload) {
  return apiRequest('/responses/body-map', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
