import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function TeacherHome() {
  const navigate = useNavigate();
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-cover bg-center shadow-sm border border-gray-200" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
          <div className="flex flex-col">
            <h1 className="text-[17px] font-bold text-[#1f1f1f] leading-tight">Hello, Sarah</h1>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5">Wed, Oct 24</p>
          </div>
        </div>
        <button className="relative grid size-11 place-items-center rounded-full bg-[#7c3aed] text-white shadow-md shadow-purple-500/20 hover:bg-[#6d28d9] transition">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>
          <span className="absolute right-0 top-0 size-[11px] rounded-full bg-[#ef4444] border-[2px] border-[#f5f5f5]" />
        </button>
      </div>

      {/* ───── Active Class Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 mt-6 rounded-[20px] bg-[#333333] p-[14px] flex items-center justify-between shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-full bg-[#f5f5f5]">
            <div className="grid size-6 place-items-center rounded-[6px] border-[1.5px] border-[#333]">
              <span className="text-[12px] font-black text-[#333]">8</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-0.5">
            <span className="bg-white text-[#333] text-[7.5px] font-extrabold uppercase px-1.5 py-0.5 rounded-[4px] w-fit tracking-wider leading-none">Active Class</span>
            <p className="text-[13px] font-bold text-white">Grade 8 - Section B</p>
          </div>
        </div>
        <button className="grid size-7 place-items-center rounded-full bg-white text-[#333]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 pr-[1px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </motion.div>

      {/* ───── Daily Mood Snapshot ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mt-5 rounded-[24px] bg-[#6366f1] p-6 relative overflow-hidden shadow-[0_12px_24px_rgba(99,102,241,0.25)] h-[180px]"
      >
        {/* SVG Rocket Illustration */}
        <div className="absolute -right-2 -bottom-2 w-[220px] h-[190px] pointer-events-none">
          <svg viewBox="0 0 200 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="50" r="2" fill="#fff" opacity="0.8" />
            <circle cx="160" cy="40" r="1.5" fill="#fff" opacity="0.6" />
            <path d="M 20 130 L 26 130 M 23 127 L 23 133" stroke="#fff" strokeWidth="1.5" />
            <path d="M 180 80 L 186 80 M 183 77 L 183 83" stroke="#fff" strokeWidth="1.5" />
            <circle cx="150" cy="120" r="2.5" fill="#fff" opacity="0.8" />

            {/* Top Left Yellow Planet */}
            <circle cx="60" cy="30" r="10" fill="#facc15" />
            <path d="M 52 35 Q 60 40 68 25" stroke="#ca8a04" strokeWidth="1.5" fill="none" />

            {/* Bottom Right Ringed Planet */}
            <g transform="translate(150, 140) rotate(-20)">
               <circle cx="0" cy="0" r="16" fill="#1f2937" />
               <ellipse cx="0" cy="0" rx="28" ry="6" fill="none" stroke="#4b5563" strokeWidth="2.5" />
               <path d="M -16 0 A 16 16 0 0 0 16 0" fill="#374151" />
            </g>

            {/* Bottom Left Moon */}
            <circle cx="70" cy="150" r="30" fill="#e5e7eb" />
            <circle cx="60" cy="140" r="6" fill="#d1d5db" />
            <circle cx="85" cy="155" r="8" fill="#d1d5db" />
            <circle cx="55" cy="160" r="4" fill="#d1d5db" />

            {/* Exhaust Cloud */}
            <path d="M 50 140 Q 60 110 80 120 Q 90 90 110 110 Q 120 130 90 150 Q 60 160 50 140" fill="#fef08a" opacity="0.8" />
            <path d="M 40 130 Q 50 100 70 110 Q 80 80 100 100 Q 110 120 80 140 Q 50 150 40 130" fill="#ffffff" opacity="0.9" />

            {/* Rocket */}
            <g transform="translate(110, 60) rotate(45)">
               <path d="M -15 10 L -30 25 L -10 30 Z" fill="#facc15" />
               <path d="M 15 10 L 30 25 L 10 30 Z" fill="#facc15" />
               <path d="M 0 -40 Q 25 -10 20 30 L -20 30 Q -25 -10 0 -40 Z" fill="#ffffff" />
               <path d="M -5 15 L 0 35 L 5 15 Z" fill="#facc15" />
               <circle cx="0" cy="-5" r="8" fill="#93c5fd" stroke="#e5e7eb" strokeWidth="2" />
               <path d="M -10 30 L 0 50 L 10 30 Z" fill="#f97316" />
               <path d="M -5 30 L 0 42 L 5 30 Z" fill="#facc15" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h2 className="text-[18px] font-extrabold text-white leading-tight">Daily Mood<br/>Snapshot</h2>
            <p className="text-[38px] font-black text-[#fbbf24] leading-none mt-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>65%</p>
            <p className="text-[11px] font-bold text-white mt-1">Feeling <span className="text-[#fbbf24]">Focused</span> today</p>
          </div>
          
          <button className="grid size-[34px] place-items-center rounded-full bg-[#333] text-white hover:bg-black transition">
            <svg viewBox="0 0 24 24" className="h-4 w-4 pr-[1px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </motion.div>

      {/* ───── Quick Actions ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-6 mt-6"
      >
        <h3 className="text-[16px] font-bold text-[#1f1f1f]">Quick Actions</h3>
        <div className="mt-3 flex gap-3">
          {/* Action 1 */}
          <button onClick={() => navigate('/teacher/quiz')} className="flex-1 flex flex-col items-center justify-center bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 hover:scale-[1.02] transition">
             <div className="grid size-11 place-items-center rounded-full bg-yellow-50 text-yellow-500 mb-2">
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
             </div>
             <p className="text-[11.5px] font-bold text-[#1f1f1f]">Start Quiz</p>
          </button>
          {/* Action 2 */}
          <button onClick={() => navigate('/teacher/appreciation')} className="flex-1 flex flex-col items-center justify-center bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 hover:scale-[1.02] transition">
             <div className="grid size-11 place-items-center rounded-full bg-blue-50 text-blue-500 mb-2">
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
             </div>
             <p className="text-[11.5px] font-bold text-[#1f1f1f]">Post Prompt</p>
          </button>
          {/* Action 3 */}
          <button onClick={() => navigate('/teacher/checkin-summary')} className="flex-1 flex flex-col items-center justify-center bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 hover:scale-[1.02] transition">
             <div className="grid size-11 place-items-center rounded-full bg-emerald-50 text-emerald-500 mb-2">
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
             </div>
             <p className="text-[11.5px] font-bold text-[#1f1f1f]">Check-in</p>
          </button>
        </div>
      </motion.div>

      {/* ───── Priority Students ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-6 mt-8 flex-1"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-[#1f1f1f]">Priority Students</h3>
          <button onClick={() => navigate('/teacher/priority-students')} className="text-[9px] font-extrabold uppercase text-gray-400 tracking-wider hover:text-gray-600 transition">VIEW ALL</button>
        </div>
        
        <div className="flex flex-col gap-3">
          <StudentRow name="Alex Johnson" status="Low engagement for 2 days" dashOffset="80" />
          <StudentRow name="J Sreedharan" status="Low engagement for 2 days" dashOffset="60" />
          <StudentRow name="James" status="Low engagement for 2 days" dashOffset="40" />
        </div>
      </motion.div>

      {/* Custom Bottom Nav Dock */}
      <TeacherDock />

    </section>
  );
}

function StudentRow({ name, status, dashOffset }) {
  return (
    <button className="w-full text-left bg-white rounded-[20px] p-4 flex items-center justify-between border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-full bg-[#9ca3af] text-white">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[14.5px] font-bold text-[#1f1f1f]">{name}</span>
          <span className="text-[11px] font-bold text-[#ea580c]">{status}</span>
        </div>
      </div>
      
      {/* Circle arrow with partial yellow border */}
      <div className="relative grid size-[42px] place-items-center rounded-full">
         <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
           <circle cx="20" cy="20" r="19" fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray={`${dashOffset} 100`} strokeLinecap="round" />
         </svg>
         <div className="grid size-8 place-items-center rounded-full bg-[#333] text-white shadow-sm z-10">
           <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] pr-[1px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
         </div>
      </div>
    </button>
  );
}
