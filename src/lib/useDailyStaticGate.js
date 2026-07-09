import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStaticToday, getAuthToken, localDate } from './api';

/**
 * useDailyStaticGate — once-per-day static check-in gate.
 *
 * Call this from screens that should ensure the student has done today's
 * static flow (e.g. the home landing after login, or a non-academic section).
 * If today's check-in is missing, it routes the student into the flow.
 *
 * A localStorage day-stamp avoids hitting the backend on every navigation.
 */
const KEY = 'inmind_static_last';

export function useDailyStaticGate(enabled = true) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;
    if (!getAuthToken()) return; // not signed in → nothing to gate

    const today = localDate(); // student's LOCAL date — resets at local midnight

    let active = true;
    // The backend is the source of truth so this stays correct even if the DB
    // is cleared mid-session. Missing today's row → take the check-in.
    getStaticToday(today)
      .then((res) => {
        if (!active) return;
        if (res?.completed_today) {
          try { localStorage.setItem(KEY, today); } catch { /* ignore */ }
        } else {
          try { localStorage.removeItem(KEY); } catch { /* ignore */ }
          navigate('/student/daily-checkin', { replace: true, state: { from: location.pathname } });
        }
      })
      .catch(() => { /* don't block the UI on gate errors */ });

    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}
