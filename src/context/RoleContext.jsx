import { createContext, useContext, useState, useCallback } from 'react';

/**
 * RoleContext — global state for the selected user role.
 *
 * Stores the active role ('student' | 'parent' | 'teacher' | null)
 * and persists it to sessionStorage so it survives page refreshes
 * but resets when the browser tab is closed.
 *
 * Usage:
 *   const { role, setRole, isStudent, isParent, isTeacher } = useRole();
 */

const STORAGE_KEY = 'inmind_role';

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const setRole = useCallback((newRole) => {
    setRoleState(newRole);
    try {
      if (newRole) {
        sessionStorage.setItem(STORAGE_KEY, newRole);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // sessionStorage unavailable (private browsing, etc.)
    }
  }, []);

  const clearRole = useCallback(() => {
    setRoleState(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const value = {
    role,
    setRole,
    clearRole,
    isStudent: role === 'student',
    isParent: role === 'parent',
    isTeacher: role === 'teacher',
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

/**
 * Hook to access the current role.
 * Must be used inside a <RoleProvider>.
 */
export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error('useRole() must be used inside <RoleProvider>');
  }
  return ctx;
}
