import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * BottomNav — five-icon dock used by all three portal homes (student / parent
 * / teacher). Pass `active` to highlight one tab in gold.
 *
 * Tabs: dashboard, lists, home, analytics, profile.
 * Currently only "home" navigates back to the active portal's root — wire the
 * others when those routes exist.
 */
const TABS = [
  { id: 'home',          label: 'Home',          Icon: HomeIcon },
  { id: 'analytics',     label: 'Insights',      Icon: ChartIcon },
  { id: 'announcements', label: 'Announcements', Icon: GridIcon },
  { id: 'profile',       label: 'Profile',       Icon: UserIcon  },
];

export function BottomNav({ active = 'home' }) {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Primary"
      className="mx-auto mb-safe mb-5 flex max-w-[360px] items-center justify-between rounded-[32px] bg-[#2d2d2d] px-2 py-2 shadow-lg"
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <motion.button
            key={id}
            type="button"
            aria-label={label}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (id === 'home') navigate('/parent/home');
              if (id === 'announcements') navigate('/parent/announcements');
              if (id === 'analytics') navigate('/parent/insights');
              if (id === 'profile') navigate('/parent/profile');
            }}
            className={[
              'grid place-items-center rounded-full transition flex-1 h-[52px]',
              isActive ? 'bg-[#7c3aed] text-white shadow-sm' : 'bg-transparent text-gray-400 hover:text-white',
            ].join(' ')}
          >
            <div className={isActive ? "scale-110 transition" : "transition"}>
              <Icon />
            </div>
          </motion.button>
        );
      })}
    </nav>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3"  y="3"  width="7" height="7" rx="1.5" />
      <rect x="14" y="3"  width="7" height="7" rx="1.5" />
      <rect x="3"  y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3"  y="12" width="4" height="9"  rx="1" />
      <rect x="10" y="6"  width="4" height="15" rx="1" />
      <rect x="17" y="3"  width="4" height="18" rx="1" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
