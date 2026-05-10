import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/BottomNav';

export function ParentProfile() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f9fa] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#6366f1] hover:opacity-80 transition">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h1 className="text-[16px] font-extrabold text-[#1f1f1f]">Child Profile</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* ───── Hero Card ───── */}
      <div className="mx-6 mb-6">
         <div className="relative overflow-hidden bg-gradient-to-br from-[#6b72ff] to-[#4f46e5] rounded-[24px] p-5 shadow-[0_8px_24px_rgba(79,70,229,0.25)] h-[140px]">
            {/* Background Decorations */}
            <div className="absolute top-4 right-8 size-2 rounded-full bg-[#10b981] opacity-80" />
            <div className="absolute top-10 right-24 size-1.5 rounded-full bg-[#f59e0b] opacity-80" />
            <div className="absolute bottom-6 right-[40%] size-2 rounded-full bg-[#ec4899] opacity-80" />
            
            {/* 3D placeholder graphic (right side) */}
            <div className="absolute -bottom-2 -right-4 w-[140px] h-[120px] bg-contain bg-no-repeat bg-bottom opacity-90" style={{ backgroundImage: 'url("https://cdn3d.iconscout.com/3d/premium/thumb/student-avatar-5353110-4475143.png")' }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <div className="size-[52px] rounded-full bg-cover bg-center border-[2.5px] border-white shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }} />
                     <div className="absolute bottom-0 right-0 size-3.5 bg-[#22c55e] border-[2px] border-[#4f46e5] rounded-full" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                     <h2 className="text-[17px] font-black text-white leading-none tracking-wide">Jessica Alba</h2>
                     <span className="bg-white text-[#4f46e5] text-[8.5px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">4th Grade</span>
                  </div>
               </div>

               <div className="mt-auto">
                  <span className="bg-white text-[#4f46e5] text-[8.5px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">Student Id: #850316</span>
               </div>
            </div>
         </div>
      </div>

      {/* ───── Chart Card ───── */}
      <div className="mx-6 mb-6">
         <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center">
            
            {/* Top Month/Mood selector */}
            <div className="flex w-full justify-between px-2 mb-6">
               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
                  const isActive = month === 'Apr';
                  return (
                     <div key={month} className="flex flex-col items-center gap-1.5">
                        <div className={`size-5 rounded-full grid place-items-center ${isActive ? 'text-[#eab308]' : 'text-[#eab308]'}`}>
                           <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><circle cx="9" cy="9" r="1.5" fill="white"/><circle cx="15" cy="9" r="1.5" fill="white"/></svg>
                        </div>
                        <span className={`text-[10px] font-bold ${isActive ? 'text-[#6366f1]' : 'text-gray-400'}`}>{month}</span>
                     </div>
                  );
               })}
            </div>

            {/* Wavy Line Chart */}
            <div className="w-full relative h-[100px] mt-2 mb-2">
               {/* Grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between opacity-30">
                  <div className="w-full h-[1px] bg-gray-100" />
                  <div className="w-full h-[1px] bg-gray-100" />
                  <div className="w-full h-[1px] bg-gray-100" />
                  <div className="w-full h-[1px] bg-gray-100" />
               </div>
               
               {/* The SVG curve */}
               <svg preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 100">
                  <path 
                     d="M 0 80 Q 10 50 20 60 T 40 80 T 60 20 T 80 60 T 100 80" 
                     fill="none" 
                     stroke="#6366f1" 
                     strokeWidth="2.5" 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                  />
                  {/* Point at peak (60, 20) */}
                  <circle cx="60" cy="20" r="3.5" fill="#eab308" />
               </svg>

               {/* Stressed label */}
               <div className="absolute top-1 left-[50%] -translate-x-[20%] text-[9px] font-extrabold text-[#6366f1]">Stressed</div>
            </div>

            {/* Bottom X-axis labels */}
            <div className="flex w-full justify-between px-1">
               {['2016', '2017', '2018', '2019', '2020', '2021', '2022'].map(year => (
                  <span key={year} className="text-[8px] font-bold text-gray-400">{year}</span>
               ))}
            </div>
         </div>
      </div>

      {/* ───── Stats Grid ───── */}
      <div className="mx-6 mb-6">
         <div className="grid grid-cols-2 gap-4">
            {/* Journal Entries */}
            <div className="bg-[#f59e0b] rounded-[20px] p-4 flex flex-col justify-between h-[130px] shadow-sm relative overflow-hidden">
               <span className="text-[10px] font-bold text-white/90 leading-tight">Journal Entries</span>
               <span className="text-[42px] font-black text-white leading-none tracking-tighter">43</span>
               <div className="absolute bottom-3 right-3 size-8 bg-white rounded-full grid place-items-center text-[#f59e0b] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
               </div>
            </div>

            {/* Participation Streak */}
            <div className="bg-[#ea580c] rounded-[20px] p-4 flex flex-col justify-between h-[130px] shadow-sm relative overflow-hidden">
               <span className="text-[10px] font-bold text-white/90 leading-tight">Participation Streak</span>
               <div className="flex items-baseline gap-1">
                  <span className="text-[42px] font-black text-white leading-none tracking-tighter">15</span>
                  <span className="text-[15px] font-bold text-white">Days</span>
               </div>
               <div className="absolute bottom-3 right-3 size-8 bg-white rounded-full grid place-items-center text-[#ea580c] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg>
               </div>
            </div>

            {/* Purple Mood */}
            <div className="bg-[#6366f1] rounded-[20px] p-4 flex flex-col justify-between h-[130px] shadow-sm relative overflow-hidden">
               <span className="text-[10px] font-bold text-white/90 leading-tight">Most Frequent Mood</span>
               <span className="text-[28px] font-black text-white leading-none tracking-tight">CALM</span>
               <div className="absolute bottom-3 right-3 size-8 bg-white rounded-full grid place-items-center text-[#6366f1] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
               </div>
            </div>

            {/* Green Mood */}
            <div className="bg-[#22c55e] rounded-[20px] p-4 flex flex-col justify-between h-[130px] shadow-sm relative overflow-hidden">
               <span className="text-[10px] font-bold text-white/90 leading-tight">Most Frequent Mood</span>
               <span className="text-[28px] font-black text-white leading-none tracking-tight">CALM</span>
               <div className="absolute bottom-3 right-3 size-8 bg-white rounded-full grid place-items-center text-[#22c55e] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
               </div>
            </div>
         </div>
      </div>

      {/* ───── Alert Card ───── */}
      <div className="mx-6 mb-6">
         <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[24px] p-5 shadow-sm flex items-start gap-4">
            <div className="shrink-0 size-8 rounded-full bg-[#fcd34d] grid place-items-center text-white">
               <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div className="flex flex-col gap-1.5">
               <h3 className="text-[13px] font-extrabold text-[#1f1f1f]">Lower Energy This Week</h3>
               <p className="text-[10px] font-medium text-gray-600 leading-snug">Jessica has mentioned feeling "tired" 3 times in journals this week</p>
               <button className="mt-2 w-fit bg-[#f59e0b] text-white text-[9.5px] font-extrabold px-4 py-1.5 rounded-full shadow-sm">
                  Check In
               </button>
            </div>
         </div>
      </div>

      {/* ───── Footer Info ───── */}
      <div className="mx-6 mb-10">
         <div className="bg-gray-50 border-[1.5px] border-dashed border-gray-300 rounded-[20px] p-5 flex flex-col items-center text-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#10b981]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <p className="text-[10px] font-medium text-gray-500 leading-relaxed">Your child's data is end-to-end encrypted. We never sell your data, and it's only used to support Jessica's wellbeing journey at Oakwood International</p>
         </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50">
         <BottomNav active="profile" />
      </div>

    </section>
  );
}
