import { motion } from 'framer-motion';
import { BottomNav } from '../../components/BottomNav';

export function ParentHome() {
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f9fa] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-[#facc15] grid place-items-center shadow-sm border border-yellow-400">
             <svg viewBox="0 0 24 24" className="h-6 w-6 text-yellow-900/80">
               <circle cx="8" cy="10" r="1.5" fill="currentColor" />
               <circle cx="16" cy="10" r="1.5" fill="currentColor" />
               <path d="M8 15 Q12 18 16 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
             </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[16px] font-bold text-[#1f1f1f] leading-tight tracking-tight">Good morning,</h1>
            <p className="text-[12px] font-bold text-[#7c3aed] mt-0.5 tracking-tight">Mr. Ramesh</p>
          </div>
        </div>
        <button className="size-9 rounded-[10px] bg-[#e0e7ff] grid place-items-center text-[#6366f1] shadow-sm hover:opacity-90 transition">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
        </button>
      </div>

      {/* ───── Hero Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 mt-6 rounded-[24px] bg-[#6366f1] p-5 relative overflow-hidden shadow-[0_12px_24px_rgba(99,102,241,0.25)] h-[240px]"
      >
        {/* Custom Vector Art Background */}
        <div className="absolute right-0 bottom-0 w-[240px] h-[240px] pointer-events-none flex items-end justify-end">
          <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Sparkles / Rays */}
            <g stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
               <line x1="100" y1="20" x2="100" y2="40" />
               <line x1="150" y1="30" x2="140" y2="45" />
               <line x1="50" y1="30" x2="60" y2="45" />
               <line x1="20" y1="80" x2="40" y2="85" />
               <line x1="180" y1="80" x2="160" y2="85" />
               <circle cx="120" cy="50" r="1.5" fill="#a5b4fc" />
               <circle cx="80" cy="60" r="1" fill="#a5b4fc" />
               <circle cx="160" cy="110" r="1.5" fill="#a5b4fc" />
               <circle cx="40" cy="120" r="1" fill="#a5b4fc" />
            </g>

            {/* Mother Silhouette */}
            <g opacity="0.8">
               {/* Body */}
               <path d="M 120 100 Q 150 100 180 140 L 180 200 L 70 200 L 70 140 Q 90 100 120 100 Z" fill="#4f46e5" />
               {/* Head */}
               <ellipse cx="120" cy="70" rx="22" ry="26" fill="#818cf8" />
               <path d="M 98 70 Q 120 20 142 70 Z" fill="#4f46e5" />
               <path d="M 98 70 Q 100 110 120 110 Q 140 110 142 70 Z" fill="#4f46e5" />
               <ellipse cx="120" cy="74" rx="18" ry="22" fill="#818cf8" />
               {/* Mother Features */}
               <path d="M 112 72 Q 115 70 118 72" fill="none" stroke="#4f46e5" strokeWidth="1" />
               <path d="M 125 72 Q 128 70 131 72" fill="none" stroke="#4f46e5" strokeWidth="1" />
               <path d="M 118 84 Q 120 86 122 84" fill="none" stroke="#4f46e5" strokeWidth="1" />
               {/* Flexing Arm right */}
               <path d="M 160 130 Q 180 100 190 110 L 170 140" fill="none" stroke="#4f46e5" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Daughter Silhouette */}
            <g>
               {/* Hair Back */}
               <path d="M 70 160 Q 75 100 95 100 Q 115 100 120 160 Z" fill="#312e81" />
               {/* Face */}
               <ellipse cx="95" cy="120" rx="15" ry="18" fill="#c7d2fe" />
               {/* Hair Front */}
               <path d="M 80 120 Q 95 90 110 120 Z" fill="#312e81" />
               <path d="M 80 120 Q 82 140 95 140 Q 108 140 110 120 Z" fill="#c7d2fe" />
               {/* Features */}
               <path d="M 90 120 Q 92 118 94 120" fill="none" stroke="#312e81" strokeWidth="0.8" />
               <path d="M 100 120 Q 102 118 104 120" fill="none" stroke="#312e81" strokeWidth="0.8" />
               <path d="M 96 130 Q 98 132 100 130" fill="none" stroke="#312e81" strokeWidth="0.8" />
               {/* Body */}
               <path d="M 50 200 L 60 160 Q 95 140 130 160 L 140 200 Z" fill="#3730a3" />
               {/* Folded Arms */}
               <path d="M 60 180 L 100 190 L 130 170" fill="none" stroke="#c7d2fe" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M 60 180 L 100 190 L 130 170" fill="none" stroke="#312e81" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
               {/* Hand */}
               <circle cx="100" cy="190" r="6" fill="#c7d2fe" />
            </g>

            {/* Plant */}
            <g transform="translate(160, 160)">
              <path d="M 10 40 Q 0 20 -10 5 Q 0 20 10 40 Z" fill="#4f46e5" />
              <path d="M 10 40 Q 10 10 15 -5 Q 10 10 10 40 Z" fill="#4f46e5" />
              <path d="M 10 40 Q 20 20 30 10 Q 20 20 10 40 Z" fill="#4f46e5" />
              <rect x="5" y="35" width="10" height="10" fill="#3730a3" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="size-[52px] rounded-full bg-cover bg-center border-[2.5px] border-white shadow-sm mb-3" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
            <h2 className="text-[22px] font-extrabold text-white leading-tight tracking-tight">Jessica Alba</h2>
            <span className="bg-white text-[#6366f1] text-[8px] font-black uppercase px-2.5 py-1 rounded-full w-fit tracking-wider mt-1.5 block">4th Grade</span>
          </div>
          
          <div className="mb-2 flex flex-col gap-3.5 w-[140px]">
            {/* Mood Progress */}
            <div>
              <span className="text-[9.5px] font-black text-white tracking-widest mb-1.5 block">MOOD</span>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full w-[25%] bg-[#ef4444] rounded-full" />
              </div>
            </div>
            {/* Energy Progress */}
            <div>
              <span className="text-[9.5px] font-black text-white tracking-widest mb-1.5 block">ENERGY</span>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full w-[65%] bg-[#22c55e] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───── School Updates ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-black text-[#1f1f1f]">School Updates</h3>
          <span className="text-[10.5px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">View all</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {/* Engagement */}
          <div className="shrink-0 w-[125px] bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between">
             <div className="size-8 rounded-full bg-[#fbbf24] grid place-items-center text-white mb-2.5 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 8 18 16 22 12"/><line x1="2" y1="12" x2="18" y2="12"/></svg>
             </div>
             <span className="text-[8px] font-black text-gray-400 tracking-wider mb-0.5">ENGAGEMENT</span>
             <h4 className="text-[18px] font-black text-[#1f1f1f] leading-none mb-4">High</h4>
             <div className="h-1 w-full bg-orange-100/50 rounded-full overflow-hidden flex">
               <div className="h-full bg-[#fbbf24] w-[70%] rounded-full" />
             </div>
          </div>

          {/* Topics Covered */}
          <div className="shrink-0 w-[125px] bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between">
             <div className="size-8 rounded-full bg-[#60a5fa] grid place-items-center text-white mb-2.5 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
             </div>
             <span className="text-[8px] font-black text-gray-400 tracking-wider mb-0.5">TOPICS COVERED</span>
             <h4 className="text-[18px] font-black text-[#1f1f1f] leading-none mb-4 flex items-baseline gap-1">3 <span className="text-[10px] font-bold">Modules</span></h4>
             <div className="h-1 w-full bg-blue-100/50 rounded-full overflow-hidden flex">
               <div className="h-full bg-[#60a5fa] w-[45%] rounded-full" />
             </div>
          </div>

          {/* Attendance */}
          <div className="shrink-0 w-[125px] bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between pr-6">
             <div className="size-8 rounded-full bg-[#ea580c] grid place-items-center text-white mb-2.5 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
             </div>
             <span className="text-[8px] font-black text-gray-400 tracking-wider mb-0.5">ATTENDANCE</span>
             <h4 className="text-[18px] font-black text-[#1f1f1f] leading-none mb-4">75%</h4>
             <div className="h-1 w-full bg-orange-100/50 rounded-full overflow-hidden flex">
               <div className="h-full bg-[#ea580c] w-[75%] rounded-full" />
             </div>
          </div>
        </div>
      </motion.div>

      {/* ───── Primary Insight ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-6 mt-6 bg-white rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100"
      >
         <span className="bg-[#f3e8ff] text-[#8b5cf6] text-[8px] font-black uppercase px-2.5 py-1 rounded-[6px] w-fit tracking-wider block mb-3">Primary Insight</span>
         <h4 className="text-[14px] font-black text-[#1f1f1f] mb-2.5">Weekly Reflection</h4>
         <p className="text-[11.5px] italic font-medium text-gray-500 leading-snug mb-3">"Your child has been actively engaging with their reflections this week."</p>
         <div className="flex items-center gap-1.5 mb-5">
           <div className="size-2 rounded-full bg-[#22c55e]" />
           <span className="text-[10px] font-extrabold text-[#1f1f1f]">Great progress in emotional awareness</span>
         </div>
         <button className="w-fit bg-[#8b5cf6] hover:bg-[#7c3aed] transition text-white text-[10px] font-bold px-6 py-2.5 rounded-full shadow-md mx-auto block">
           View Full Report
         </button>
      </motion.div>

      {/* ───── Class Updates ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-6 mt-6 mb-8 flex-1"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-black text-[#1f1f1f]">Class Updates</h3>
          <span className="text-[10.5px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">View all</span>
        </div>

        <div className="bg-[#f3e8ff] rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-purple-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-3">
                 <div className="size-5 rounded-full bg-[#6366f1] overflow-hidden relative shadow-sm">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-[#f3e8ff]" />
                 </div>
                 <h4 className="text-[13px] font-extrabold text-[#1f1f1f]">Note from Mrs. Gable</h4>
              </div>
              <p className="text-[10.5px] font-bold text-[#7c3aed] leading-relaxed">"This week, we are focusing on Self-Regulation and Empathy through group storytelling and collaborative activities."</p>
            </div>
            <div className="size-16 shrink-0 rounded-[16px] bg-cover bg-center shadow-sm" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=200&auto=format&fit=crop")' }} />
          </div>

          <div className="bg-[#9333ea] rounded-[16px] p-4 shadow-sm relative overflow-hidden mt-2">
             <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[12px]">💡</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-white">Daily Tip</span>
             </div>
             <p className="text-[10px] font-bold text-white/90 leading-snug">Try asking your child "what made you feel proud today?" during dinner to foster positive self reflection</p>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50">
         <BottomNav active="home" />
      </div>

    </section>
  );
}
