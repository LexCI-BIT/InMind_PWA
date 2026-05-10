import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function ClassAnalytics() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center gap-3 px-6 pt-safe pt-8">
        <div className="size-11 rounded-full bg-cover bg-center shadow-sm border border-gray-200" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold text-[#1f1f1f] leading-tight">Sarah</h1>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">Grade 10-A</p>
        </div>
      </div>

      {/* ───── Title & Back ───── */}
      <div className="px-6 mt-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid size-8 place-items-center rounded-full bg-[#7c3aed] text-white shadow-sm hover:opacity-90 transition">
          <svg viewBox="0 0 24 24" className="h-4 w-4 pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-[16px] font-extrabold text-[#1f1f1f]">Classwide Analytics</h2>
      </div>

      {/* ───── Time Filter ───── */}
      <div className="mx-6 mt-5 bg-[#333333] rounded-full p-1 flex items-center justify-between shadow-md">
        <button className="flex-1 bg-white text-[#1f1f1f] text-[11px] font-bold py-2 rounded-full shadow-sm text-center">Daily</button>
        <button className="flex-1 text-white/80 hover:text-white text-[11px] font-bold py-2 rounded-full text-center transition">Weekly</button>
        <button className="flex-1 text-white/80 hover:text-white text-[11px] font-bold py-2 rounded-full text-center transition">Monthly</button>
      </div>

      {/* ───── Wellbeing Score Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 mt-5 rounded-[20px] bg-[#7c3aed] p-5 relative overflow-hidden shadow-[0_8px_20px_rgba(124,58,237,0.25)] h-[130px]"
      >
        {/* Superhero Illustration */}
        <div className="absolute right-0 bottom-0 w-[150px] h-[130px] pointer-events-none flex items-end justify-end">
          <svg viewBox="0 0 100 100" className="w-[120px] h-[100px] mb-2 mr-2" xmlns="http://www.w3.org/2000/svg">
            {/* Ground / Clouds */}
            <ellipse cx="50" cy="90" rx="35" ry="4" fill="#1f2937" opacity="0.3" />
            <path d="M 10 80 Q 20 70 30 80 Q 40 75 50 85" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M 70 70 Q 80 60 90 70" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            
            {/* Cape */}
            <path d="M 45 40 Q 20 50 25 80 Q 35 70 50 60 Z" fill="#facc15" />
            
            {/* Legs */}
            <rect x="42" y="60" width="6" height="30" fill="#374151" />
            <rect x="52" y="60" width="6" height="30" fill="#374151" />
            
            {/* Body */}
            <path d="M 40 30 L 60 30 L 58 60 L 42 60 Z" fill="#f3f4f6" />
            {/* Shirt details */}
            <line x1="50" y1="30" x2="50" y2="60" stroke="#d1d5db" strokeWidth="1" />
            
            {/* Arms (hands on hips) */}
            <path d="M 40 35 L 30 45 L 40 55" fill="none" stroke="#fca5a5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 60 35 L 70 45 L 60 55" fill="none" stroke="#fca5a5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Head & Hair */}
            <path d="M 42 20 Q 50 35 58 20 Q 50 5 42 20 Z" fill="#1f2937" />
            <circle cx="50" cy="22" r="6" fill="#fca5a5" />
          </svg>
        </div>

        <div className="relative z-10">
          <p className="text-[12px] font-bold text-white">Wellbeing Score</p>
          <h2 className="text-[44px] font-black text-[#facc15] leading-none mt-1 tracking-tighter">82%</h2>
          {/* Progress Bar */}
          <div className="mt-3 flex items-center h-[6px] w-[110px] bg-white rounded-full overflow-hidden">
            <div className="h-full bg-[#facc15] w-[82%] rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* ───── Balanced Chart ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mt-4 bg-white rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[18px] font-black text-[#1f1f1f]">Balanced</h3>
          <span className="bg-[#333] text-white text-[8px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full">High Engagement</span>
        </div>
        
        {/* Graph Area */}
        <div className="relative h-[90px] w-full mt-4">
          <svg viewBox="0 0 300 90" className="absolute top-0 left-0 w-full h-full overflow-visible" preserveAspectRatio="none">
             {/* Dotted Purple Line */}
             <path d="M 15 75 Q 60 80 105 55 T 195 65 T 285 40" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="5 3.5" strokeLinecap="round" />
             
             {/* Solid Yellow Line */}
             <path d="M 15 60 Q 40 40 60 55 T 105 65 T 150 15 T 195 55 T 240 105 T 285 40" fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
             
             {/* Data Points */}
             {/* Purple Dot 1 at WED */}
             <circle cx="105" cy="55" r="4.5" fill="#7c3aed" />
             
             {/* Yellow Dot at FRI */}
             <circle cx="195" cy="55" r="4.5" fill="#facc15" />

             {/* Purple Dot 2 at SAT */}
             <circle cx="240" cy="76.25" r="4.5" fill="#7c3aed" />
          </svg>
        </div>

        {/* X Axis */}
        <div className="flex justify-between mt-6 px-[10px] text-[9px] font-extrabold text-gray-400 relative z-10 pointer-events-none">
           <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>
      </motion.div>

      {/* ───── Student Roster ───── */}
      <div className="mx-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-[#1f1f1f]">Student Roster</h3>
          <button className="text-[9px] font-extrabold uppercase text-gray-400 tracking-wider hover:text-gray-600 transition">SORT BY TREND</button>
        </div>
        
        <div className="flex flex-col gap-3">
          <RosterRow name="Sarah Jenkins" status="Calm and Focused • 2hrs ago" trend="up" img="68" />
          <RosterRow name="Jenkins Sarah" status="Calm and Focused • 2hrs ago" trend="up" img="44" />
          <RosterRow name="bheemaiah" status="Calm and Focused • 2hrs ago" trend="down" img="32" />
          <RosterRow name="Kamesh" status="Calm and Focused • 2hrs ago" trend="down" img="26" />
        </div>
      </div>

      {/* ───── Smart Insight ───── */}
      <div className="mx-6 mt-6 bg-white rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[18px]">💡</span>
          <h3 className="text-[14px] font-bold text-[#1f1f1f]">Smart Insight</h3>
        </div>
        <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed">
          Energy if 15 % higher today than Tuesday. Students seem more focused after the morning break
        </p>
      </div>

      {/* ───── Suggested Interventions ───── */}
      <div className="mx-6 mt-6 flex-1">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Suggested Interventions</h3>
        <div className="flex flex-col gap-3">
           <button className="w-fit bg-white rounded-full px-5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-2 text-[12.5px] font-bold text-[#1f1f1f] hover:bg-gray-50 transition">
             <span>💡</span> 5-mins grounding activity
           </button>
           <button className="w-fit bg-white rounded-full px-5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-2 text-[12.5px] font-bold text-[#1f1f1f] hover:bg-gray-50 transition">
             <span>💡</span> Schedule a breather
           </button>
        </div>
      </div>

      {/* Custom Bottom Nav Dock */}
      <TeacherDock />

    </section>
  );
}

function RosterRow({ name, status, trend, img }) {
  return (
    <div className="w-full bg-white rounded-[16px] p-3 flex items-center justify-between border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className="size-[42px] rounded-full bg-cover bg-center border border-gray-100" style={{ backgroundImage: `url("https://i.pravatar.cc/150?img=${img}")` }} />
        <div className="flex flex-col gap-0.5">
          <span className="text-[13.5px] font-bold text-[#1f1f1f]">{name}</span>
          <span className="text-[10px] font-medium text-gray-400">{status}</span>
        </div>
      </div>
      
      {/* Trendline Icon */}
      <div className="pr-2">
        {trend === 'up' ? (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#10b981]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#f43f5e]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        )}
      </div>
    </div>
  );
}
