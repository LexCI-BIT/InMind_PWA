import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * BottomNav — Modern five-icon dock for parent portal
 * Matches the design from the images with clean icons and smooth animations
 *
 * Routes:
 * - dashboard: Grid view (home overview)
 * - lists: Weekly timeline
 * - home: Main home (center, highlighted)
 * - analytics: Awareness panel
 * - profile: Profile settings
 */
const TABS = [
  { id: 'dashboard',  label: 'Dashboard',  Icon: DashboardIcon,  route: '/parent/home' },
  { id: 'lists',      label: 'Weekly',     Icon: ListIcon,       route: '/parent/weekly' },
  { id: 'home',       label: 'Home',       Icon: HomeIcon,       route: '/parent/home' },
  { id: 'analytics',  label: 'Analytics',  Icon: ChartIcon,      route: '/parent/awareness' },
  { id: 'profile',    label: 'Profile',    Icon: UserIcon,       route: '/parent/profile' },
];

export function BottomNav({ active = 'home' }) {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Primary Navigation"
      className="mx-auto mb-safe mb-4 flex max-w-[380px] items-center justify-between rounded-[28px] bg-[#1a1a1a] px-3 py-2.5 shadow-2xl border border-gray-800"
    >
      {TABS.map(({ id, label, Icon, route }) => {
        const isActive = id === active;
        const isCenter = id === 'home';
        
        return (
          <motion.button
            key={id}
            type="button"
            aria-label={label}
            whileTap={{ scale: 0.88 }}
            onClick={() => navigate(route)}
            className={[
              'grid place-items-center rounded-full transition-all duration-300 relative',
              isCenter 
                ? 'flex-1 h-[56px]' 
                : 'flex-1 h-[48px]',
              isActive 
                ? isCenter
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md'
                : 'bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/50',
            ].join(' ')}
          >
            <div className={isActive ? "scale-110 transition-transform" : "transition-transform"}>
              <Icon isActive={isActive} isCenter={isCenter} />
            </div>
            
            {/* Active indicator dot */}
            {isActive && !isCenter && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

function DashboardIcon({ isActive, isCenter }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={isCenter ? "h-[22px] w-[22px]" : "h-[20px] w-[20px]"} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={isActive ? "2.5" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="3"  y="3"  width="7" height="7" rx="1.5" />
      <rect x="14" y="3"  width="7" height="7" rx="1.5" />
      <rect x="3"  y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ListIcon({ isActive, isCenter }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={isCenter ? "h-[22px] w-[22px]" : "h-[20px] w-[20px]"} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={isActive ? "2.5" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function HomeIcon({ isActive, isCenter }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={isCenter ? "h-[24px] w-[24px]" : "h-[22px] w-[22px]"} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={isActive ? "2.5" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ChartIcon({ isActive, isCenter }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={isCenter ? "h-[22px] w-[22px]" : "h-[20px] w-[20px]"} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={isActive ? "2.5" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function UserIcon({ isActive, isCenter }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={isCenter ? "h-[22px] w-[22px]" : "h-[20px] w-[20px]"} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={isActive ? "2.5" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
