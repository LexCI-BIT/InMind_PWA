import { useNavigate, useLocation } from 'react-router-dom';

export function TeacherDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Paths mapping for active states
  const isHome = path === '/teacher/home' || path === '/teacher/priority-students';
  const isAnalytics = path === '/teacher/analytics';
  const isSessions = path === '/teacher/sessions' || path === '/teacher/quiz' || path === '/teacher/create-quiz';
  const isProfile = path === '/teacher/profile';

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[380px] bg-[#2d2d2d] rounded-full p-[5px] flex items-center justify-between shadow-2xl">
         {/* 1. Home */}
         <button 
           onClick={() => navigate('/teacher/home')} 
           className={`grid size-[46px] place-items-center rounded-full transition-all duration-300 ${isHome ? 'bg-[#7c3aed] text-white shadow-md' : 'text-white/50 hover:text-white'}`}
         >
            <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
         </button>
         
         {/* 2. Analytics */}
         <button 
           onClick={() => navigate('/teacher/analytics')} 
           className={`grid size-[46px] place-items-center rounded-full transition-all duration-300 ${isAnalytics ? 'bg-[#7c3aed] text-white shadow-md' : 'text-white/50 hover:text-white'}`}
         >
            <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="8" y1="12" x2="8" y2="16"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="16" y1="14" x2="16" y2="16"/></svg>
         </button>

         {/* 3. Sessions (Grid) */}
         <button 
           onClick={() => navigate('/teacher/sessions')} 
           className={`grid size-[46px] place-items-center rounded-full transition-all duration-300 ${isSessions ? 'bg-[#7c3aed] text-white shadow-md' : 'text-white/50 hover:text-white'}`}
         >
            <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
         </button>

         {/* 4. Profile */}
         <button 
           onClick={() => navigate('/teacher/profile')} 
           className={`grid size-[46px] place-items-center rounded-full transition-all duration-300 ${isProfile ? 'bg-[#7c3aed] text-white shadow-md' : 'text-white/50 hover:text-white'}`}
         >
            <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
         </button>
      </div>
  );
}
