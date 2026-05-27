import React from 'react';
import { motion } from 'framer-motion';
import { ParentDock } from '../../components/ParentDock';

export function WeeklyTimeline() {
  const participationData = [
    { day: 'Mon', active: true, value: '100%' },
    { day: 'Tue', active: true, value: '90%' },
    { day: 'Wed', active: true, value: '95%' },
    { day: 'Thu', active: false, value: '60%' },
    { day: 'Fri', active: false, value: '45%' },
    { day: 'Sat', active: true, value: '88%' },
    { day: 'Sun', active: false, value: '-' },
  ];

  const reflectionData = [
    { day: 'Mon', depth: 72 },
    { day: 'Tue', depth: 62 },
    { day: 'Wed', depth: 55 },
    { day: 'Thu', depth: 85 },
    { day: 'Fri', depth: 78 },
    { day: 'Sat', depth: 48 },
    { day: 'Sun', depth: 30 },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f8f9fa] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-8 mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-0.5">Weekly Timeline</h1>
          <p className="text-[12px] font-medium text-gray-500">May 19 – 25, 2026</p>
        </div>
        <button className="size-11 rounded-full bg-[#6366f1] grid place-items-center text-white shadow-md transition relative shrink-0">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute top-0 right-0 size-[10px] bg-[#ff3b30] rounded-full border-2 border-[#f8f9fa]" />
        </button>
      </div>

      <div className="px-5 flex flex-col gap-4 mb-8">

        {/* ───── Daily Participation ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100"
        >
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-4">Daily Participation</h3>
          
          <div className="flex justify-between items-center px-1">
            {participationData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[11px] font-medium text-[#1a1a1a]">{d.day}</span>
                {d.active ? (
                  <div className="size-[22px] rounded-full bg-[#22c55e] flex items-center justify-center text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                ) : (
                  <div className="size-[22px] rounded-full bg-[#f3f4f6] flex items-center justify-center text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                )}
                <span className="text-[10px] font-medium text-gray-600">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ───── Reflection Depth Per Day ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100"
        >
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-5">Reflection Depth Per Day</h3>
          
          <div className="flex justify-between items-end h-[80px] mb-4 px-3">
            {reflectionData.map((d, i) => {
              const barH = (d.depth / 100) * 80;
              const fillH = barH * (d.depth / 100);
              return (
                <div key={i} className="flex flex-col items-center" style={{ width: 28 }}>
                  <div className="w-full rounded-[8px] overflow-hidden relative bg-[#bfdbfe]" style={{ height: barH }}>
                    <div className="absolute bottom-0 w-full bg-[#0369a1] rounded-[8px]" style={{ height: `${d.depth}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center px-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <span key={day} className="text-[10px] font-medium text-[#1a1a1a] w-[28px] text-center">{day}</span>
            ))}
          </div>
        </motion.div>

        {/* ───── Challenge Completions ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100"
        >
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-5">Challenge Completions</h3>
          
          <div className="flex flex-col gap-5">
             {/* Quiz Challenge */}
             <div className="flex items-center gap-4">
                <div className="size-9 rounded-full bg-[#4f46e5] flex items-center justify-center text-white font-normal text-lg shadow-sm">
                  Q
                </div>
                <div className="flex-1">
                   <h4 className="text-[14px] font-bold text-[#1a1a1a] mb-0.5">Quiz Challenge</h4>
                   <p className="text-[9px] text-gray-400 font-medium tracking-wide">Completed Mon, Thu, Fri</p>
                </div>
                <div className="text-[16px] font-normal text-[#8b5cf6]">3/5</div>
             </div>
             
             {/* Check-In */}
             <div className="flex items-center gap-4">
                <div className="size-9 rounded-full bg-[#38bdf8] flex items-center justify-center text-white font-normal text-lg shadow-sm">
                  C
                </div>
                <div className="flex-1">
                   <h4 className="text-[14px] font-bold text-[#1a1a1a] mb-0.5">Check-In</h4>
                   <p className="text-[9px] text-gray-400 font-medium tracking-wide">Completed Mon, Thu, Fri</p>
                </div>
                <div className="text-[16px] font-normal text-[#0ea5e9]">3/5</div>
             </div>

             {/* Weekly Module */}
             <div className="flex items-center gap-4">
                <div className="size-9 rounded-full bg-[#f59e0b] flex items-center justify-center text-white font-normal text-lg shadow-sm">
                  W
                </div>
                <div className="flex-1">
                   <h4 className="text-[14px] font-bold text-[#1a1a1a] mb-0.5">Weekly Module</h4>
                   <p className="text-[9px] text-gray-400 font-medium tracking-wide">Completed Mon, Thu, Fri</p>
                </div>
                <div className="text-[16px] font-normal text-[#ef4444]">2/5</div>
             </div>
          </div>
        </motion.div>

        {/* ───── Behaviour Rhythm Wave ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100"
        >
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Behaviour Rhythm Wave</h3>
          <p className="text-[10px] font-medium text-gray-400 mb-5">Emotional engagement over 7 days</p>

          <div className="relative h-[60px] w-full mt-2">
              <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                {/* Area fill */}
                <path 
                  d="M 0 45 C 20 42, 35 38, 50 35 C 65 32, 75 30, 90 28 C 110 25, 120 22, 140 20 C 160 18, 170 25, 185 30 C 200 35, 210 38, 225 35 C 240 32, 250 28, 265 25 C 275 23, 285 22, 300 20 L 300 60 L 0 60 Z" 
                  fill="url(#blueWaveTimeline)" 
                  opacity="0.15"
                />
                
                {/* Line */}
                <path 
                  d="M 0 45 C 20 42, 35 38, 50 35 C 65 32, 75 30, 90 28 C 110 25, 120 22, 140 20 C 160 18, 170 25, 185 30 C 200 35, 210 38, 225 35 C 240 32, 250 28, 265 25 C 275 23, 285 22, 300 20" 
                  fill="none" 
                  stroke="#1e40af" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                <defs>
                  <linearGradient id="blueWaveTimeline" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
          </div>
        </motion.div>

      </div>

      <ParentDock />
    </section>
  );
}

