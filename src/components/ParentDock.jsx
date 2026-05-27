import { useNavigate, useLocation } from 'react-router-dom';

export function ParentDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isAwareness = path === '/parent/awareness';
  const isChallenges = path === '/parent/challenges';
  const isHome = path === '/parent/home';
  const isWeekly = path === '/parent/weekly';
  const isProfile = path === '/parent/profile';

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[400px] bg-black rounded-[32px] p-[6px] flex items-center justify-between shadow-2xl">
         
         <NavItem 
           isActive={isAwareness} 
           onClick={() => navigate('/parent/awareness')}
           icon={
             <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
               <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
               <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
               <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
               <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
             </svg>
           }
         />

         <NavItem 
           isActive={isChallenges} 
           onClick={() => navigate('/parent/challenges')}
           icon={
             <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <line x1="4" y1="7" x2="16" y2="7" />
               <line x1="4" y1="12" x2="16" y2="12" />
               <line x1="4" y1="17" x2="10" y2="17" />
               <path d="M13.5 21l6.5-6.5 2 2-6.5 6.5H13.5v-2z" strokeWidth="1.8" />
             </svg>
           }
         />

         <NavItem 
           isActive={isHome} 
           onClick={() => navigate('/parent/home')}
           icon={
             <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M4 10l8-7 8 7v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
               <line x1="12" y1="14" x2="12" y2="18" strokeWidth="2.5" />
             </svg>
           }
         />

         <NavItem 
           isActive={isWeekly} 
           onClick={() => navigate('/parent/weekly')}
           icon={
             <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
               <rect x="3" y="3" width="18" height="18" rx="2" />
               <line x1="7" y1="16" x2="7" y2="12" strokeWidth="2" />
               <line x1="12" y1="16" x2="12" y2="10" strokeWidth="2" />
               <line x1="17" y1="16" x2="17" y2="6" strokeWidth="2" />
             </svg>
           }
         />

         <NavItem 
           isActive={isProfile} 
           onClick={() => navigate('/parent/profile')}
           icon={
             <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="12" cy="7.5" r="3.5" />
               <ellipse cx="12" cy="18" rx="6.5" ry="2.5" />
             </svg>
           }
         />
         
      </div>
  );
}

function NavItem({ isActive, onClick, icon }) {
  return (
    <button 
      onClick={onClick} 
      className={`grid place-items-center rounded-full transition-all duration-300 ${
        isActive 
          ? 'size-[54px] bg-[#8b5cf6] text-white shadow-lg scale-100' 
          : 'size-[50px] text-white/50 hover:text-white/90 scale-95 hover:scale-100'
      }`}
    >
      {icon}
    </button>
  );
}
