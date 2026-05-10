import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/BottomNav';

export function ParentInsights() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f9fa] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#6366f1] hover:opacity-80 transition">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h1 className="text-[16px] font-extrabold text-[#1f1f1f]">Weekly Reflection</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* ───── Avatars ───── */}
      <div className="flex items-center gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide mb-8">
        <button className="shrink-0 size-14 rounded-full bg-[#e0e7ff] text-[#6366f1] grid place-items-center shadow-sm border-[1.5px] border-[#6366f1]">
           <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <div className="shrink-0 size-14 rounded-full bg-cover bg-center shadow-sm border-[1.5px] border-[#6366f1]" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=32")' }} />
        <div className="shrink-0 size-14 rounded-full bg-cover bg-center shadow-sm border-[1.5px] border-[#6366f1]" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=12")' }} />
        <div className="shrink-0 size-14 rounded-full bg-cover bg-center shadow-sm border-[1.5px] border-[#6366f1]" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }} />
        <div className="shrink-0 size-14 rounded-full bg-cover bg-center shadow-sm border-[1.5px] border-[#6366f1]" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=11")' }} />
      </div>

      {/* ───── Alex's Journey (Chart) ───── */}
      <div className="mx-6 mb-8">
         <h2 className="text-[20px] font-extrabold text-[#1f1f1f] leading-tight">Alex's Journey</h2>
         <p className="text-[10px] font-medium text-gray-400 mb-4">for the week of 8-14 jan</p>
         
         <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100">
            <div className="flex items-end justify-between h-[120px] mb-4">
               {/* Bar 1 */}
               <div className="flex flex-col items-center gap-2 h-full">
                 <div className="w-[30px] flex-1 bg-gray-100 rounded-[15px] flex items-end justify-center relative overflow-hidden">
                    <div className="w-full bg-[#6366f1] rounded-[15px]" style={{ height: '80%' }} />
                 </div>
                 <span className="text-[10px] font-extrabold text-[#1f1f1f]">M</span>
               </div>
               {/* Bar 2 */}
               <div className="flex flex-col items-center gap-2 h-full">
                 <div className="w-[30px] flex-1 bg-gray-100 rounded-[15px] flex items-end justify-center relative overflow-hidden">
                    <div className="w-full bg-[#8b98f9]" style={{ height: '35%', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                 </div>
                 <span className="text-[10px] font-extrabold text-[#1f1f1f]">T</span>
               </div>
               {/* Bar 3 */}
               <div className="flex flex-col items-center gap-2 h-full">
                 <div className="w-[30px] flex-1 bg-gray-100 rounded-[15px] flex items-end justify-center relative overflow-hidden">
                    <div className="w-full bg-[#8b98f9]" style={{ height: '55%', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                 </div>
                 <span className="text-[10px] font-extrabold text-[#1f1f1f]">W</span>
               </div>
               {/* Bar 4 */}
               <div className="flex flex-col items-center gap-2 h-full">
                 <div className="w-[30px] flex-1 bg-gray-100 rounded-[15px] flex items-end justify-center relative overflow-hidden">
                    <div className="w-full bg-[#8b98f9]" style={{ height: '40%', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                 </div>
                 <span className="text-[10px] font-extrabold text-[#1f1f1f]">T</span>
               </div>
               {/* Bar 5 */}
               <div className="flex flex-col items-center gap-2 h-full">
                 <div className="w-[30px] flex-1 bg-gray-100 rounded-[15px] flex items-end justify-center relative overflow-hidden">
                    <div className="w-full bg-[#8b98f9]" style={{ height: '60%', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                 </div>
                 <span className="text-[10px] font-extrabold text-[#1f1f1f]">F</span>
               </div>
               {/* Bar 6 */}
               <div className="flex flex-col items-center gap-2 h-full">
                 <div className="w-[30px] flex-1 bg-gray-100 rounded-[15px] flex items-end justify-center relative overflow-hidden">
                    <div className="w-full bg-[#8b98f9]" style={{ height: '45%', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                 </div>
                 <span className="text-[10px] font-extrabold text-[#1f1f1f]">S</span>
               </div>
               {/* Bar 7 */}
               <div className="flex flex-col items-center gap-2 h-full">
                 <div className="w-[30px] flex-1 bg-gray-100 rounded-[15px] flex items-end justify-center relative overflow-hidden">
                    <div className="w-full bg-[#6366f1] rounded-[15px]" style={{ height: '70%' }} />
                 </div>
                 <span className="text-[10px] font-extrabold text-[#1f1f1f]">S</span>
               </div>
            </div>

            <div className="flex gap-3 items-start mt-5 pt-4 border-t border-gray-50">
               <div className="size-5 rounded-full bg-[#ecfdf5] text-[#10b981] grid place-items-center shrink-0">
                  <span className="text-[10px]">✨</span>
               </div>
               <p className="text-[10px] italic text-gray-500 leading-relaxed font-medium">"Jessica showed incredible focus mid-week. Especially during project collaboration"</p>
            </div>
         </div>
      </div>

      {/* ───── Weekly Wellbeing ───── */}
      <div className="mx-6 mb-8">
         <h3 className="text-[15px] font-extrabold text-[#1f1f1f] mb-4">Weekly Wellbeing</h3>
         <div className="grid grid-cols-2 gap-4">
            {/* MOOD */}
            <div className="bg-[#eab308] rounded-[20px] p-4 flex flex-col items-center justify-center h-[120px] shadow-sm">
               <div className="size-[42px] bg-white rounded-full grid place-items-center text-[#eab308] mb-2 shadow-sm">
                 <svg viewBox="0 0 24 24" className="h-6 w-6"><circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
               </div>
               <span className="text-[8px] font-black uppercase text-white tracking-widest mb-0.5">MOOD</span>
               <span className="text-[14px] font-bold text-white">Steady</span>
            </div>

            {/* SOCIAL */}
            <div className="bg-[#ea580c] rounded-[20px] p-4 flex flex-col items-center justify-center h-[120px] shadow-sm">
               <div className="size-[42px] bg-white rounded-full grid place-items-center text-[#ea580c] mb-2 shadow-sm">
                 <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M9 21h6v-1H9v1zm3-19C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/></svg>
               </div>
               <span className="text-[8px] font-black uppercase text-white tracking-widest mb-0.5">SOCIAL</span>
               <span className="text-[14px] font-bold text-white">Steady</span>
            </div>

            {/* ENERGY */}
            <div className="bg-[#6366f1] rounded-[20px] p-4 flex flex-col items-center justify-center h-[120px] shadow-sm">
               <div className="size-[42px] bg-white rounded-full grid place-items-center text-[#6366f1] mb-2 shadow-sm">
                 <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
               </div>
               <span className="text-[8px] font-black uppercase text-white tracking-widest mb-0.5">ENERGY</span>
               <span className="text-[14px] font-bold text-white">Resting</span>
            </div>

            {/* FOCUS */}
            <div className="bg-[#22c55e] rounded-[20px] p-4 flex flex-col items-center justify-center h-[120px] shadow-sm">
               <div className="size-[42px] bg-white rounded-full grid place-items-center text-[#22c55e] mb-2 shadow-sm">
                 <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>
               </div>
               <span className="text-[8px] font-black uppercase text-white tracking-widest mb-0.5">FOCUS</span>
               <span className="text-[14px] font-bold text-white">Deep</span>
            </div>
         </div>
      </div>

      {/* ───── From Jessica ───── */}
      <div className="mx-6 mb-8">
        <h3 className="text-[16px] font-extrabold text-[#1f1f1f] mb-3">From Jessica</h3>
        <div className="bg-[#333333] rounded-[24px] p-5 shadow-lg">
           <span className="bg-white text-[#333] text-[9px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider mb-4 block w-fit">STUDENT REFLECTION</span>
           <p className="text-[13px] font-medium text-white/90 leading-relaxed mb-6">"I liked making the robot out of boxes.it was hard to glue but my friends helped me"</p>
           
           <div className="flex items-center gap-2.5">
              <div className="relative">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                <div className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[#f97316] border border-[#333]" />
              </div>
              <span className="text-[11px] italic text-white/80">shared during Friday reflection session</span>
           </div>
        </div>
      </div>

      {/* ───── Our Connection ───── */}
      <div className="mx-6 mb-10">
        <h3 className="text-[16px] font-extrabold text-[#1f1f1f] mb-3">Our Connection</h3>
        <div className="bg-[#6366f1] rounded-[40px] px-6 py-7 shadow-[0_8px_24px_rgba(99,102,241,0.25)] flex flex-col gap-5">
           <div>
             <span className="text-[10px] font-extrabold text-white/90 uppercase tracking-widest mb-2 block">TRY THIS CONVERSATION</span>
             <p className="text-[15px] font-bold text-white leading-snug">"What was the trickiest part of building the robot today"</p>
           </div>
           
           <div className="bg-white/20 rounded-[24px] p-4 flex items-center gap-4 mt-2">
             <div className="size-10 rounded-full bg-white text-[#f59e0b] grid place-items-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M9 21h6v-1H9v1zm3-19C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/></svg>
             </div>
             <p className="text-[10.5px] font-medium text-white leading-relaxed">Talk about small challenges helps alex process resilience and builds confidence iin problem-solving</p>
           </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50">
         <BottomNav active="analytics" />
      </div>

    </section>
  );
}
