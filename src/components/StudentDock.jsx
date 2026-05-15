import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * StudentDock — floating bottom nav shared by every student route.
 *
 * Pass `active` to highlight a tab (home / chart by default). The centre
 * "home" tab always shows in amber regardless of which tab is technically
 * active in the route tree, matching the Figma where Home is the visual
 * anchor of the dock.
 */
const TABS = [
  { id: 'grid',    label: 'Dashboard', path: '/student/activities',     Icon: GridIcon  },
  { id: 'edit',    label: 'Journal',   path: '/student/journal',  Icon: EditIcon  },
  { id: 'home',    label: 'Home',      path: '/student/home',     Icon: HomeIcon, prominent: true },
  { id: 'chart',   label: 'Insights',  path: '/student/insights', Icon: ChartIcon },
  { id: 'profile', label: 'Profile',   path: '/student/profile', Icon: UserIcon  },
];

export function StudentDock({ active = 'home' }) {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#262626] px-4 py-2 shadow-xl shadow-black/50"
    >
      {TABS.map(({ id, label, path, Icon }) => {
        const isActive = active === id;
        return (
          <motion.button
            key={id}
            type="button"
            aria-label={label}
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate(path)}
            className={[
              'grid place-items-center rounded-full transition',
              isActive
                ? 'size-12 bg-amber-400 text-[#1f1f1f] shadow-lg shadow-amber-400/30'
                : 'size-10 text-white/55 hover:text-white/85',
            ].join(' ')}
          >
            <Icon />
          </motion.button>
        );
      })}
    </nav>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3"  y="3"  width="7" height="7" rx="1.5" />
      <rect x="14" y="3"  width="7" height="7" rx="1.5" />
      <rect x="3"  y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h12M4 12h8M4 18h12" />
      <path d="M16 16l4 4M18 14l4 4-2 2-4-4z" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4"     y="13" width="3.5" height="7"  rx="1" />
      <rect x="10.25" y="9"  width="3.5" height="11" rx="1" />
      <rect x="16.5"  y="5"  width="3.5" height="15" rx="1" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
