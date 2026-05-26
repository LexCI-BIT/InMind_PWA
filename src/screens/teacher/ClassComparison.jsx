import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

const CLASS_DATA = [
  { name: '9A', score: 78, reflect: '71%', sessions: '82%', mood: '😌' },
  { name: '9B', score: 72, reflect: '63%', sessions: '74%', mood: '😑' },
  { name: '10A', score: 65, reflect: '54%', sessions: '48%', mood: '😑' },
  { name: '10B', score: 80, reflect: '79%', sessions: '86%', mood: '😌' },
  { name: '11A', score: 74, reflect: '68%', sessions: '76%', mood: '😑' },
  { name: '11B', score: 70, reflect: '61%', sessions: '71%', mood: '😑' },
];

export function ClassComparison() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f7f8fa] font-sans pb-[120px]">

      {/* Header */}
      <header className="px-6 pt-safe pt-8 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold tracking-tight text-gray-900 leading-tight">
            Class Comparison
          </h1>
          <p className="text-[13px] text-gray-400 font-medium mt-1">
            Side-by-side wellness analytics
          </p>
        </div>
        
        {/* Notification Bell */}
        <button onClick={() => navigate('/teacher/alerts')} className="relative">
          <div className="w-12 h-12 rounded-full bg-[#7c3aed] flex items-center justify-center text-white shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#f7f8fa]"></div>
        </button>
      </header>

      <main className="flex-1 px-5 flex flex-col gap-7 mt-4">
        
        {/* ═══════ Section 1: Wellness Score ═══════ */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/50"
        >
          <h2 className="text-[15px] font-bold text-gray-900 mb-5">Wellness Score · All Classes</h2>
          
          <div className="flex flex-col gap-3.5">
            {CLASS_DATA.map((cls) => (
              <div key={cls.name} className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-gray-500 w-8">{cls.name}</span>
                <div className="flex-1 h-[16px] bg-[#ede9fe] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cls.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-[#8b5cf6] rounded-full flex items-center justify-end pr-2.5"
                  >
                    <span className="text-[9px] font-extrabold text-white leading-none">{cls.score}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-[12px] font-bold text-gray-500">School avg : 73</span>
            <span className="text-[12px] font-bold text-emerald-500">10B Leading</span>
          </div>
        </motion.div>

        {/* ═══════ Section 2: Detailed Comparison ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-[18px] font-extrabold text-gray-900 mb-4">Detailed Comparison</h2>
          
          <div className="flex gap-3">
            
            {/* Class 9A Card */}
            <div className="flex-1 bg-[#f8f7fb] rounded-[22px] p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15px] font-extrabold text-gray-900">Class 9A</span>
                <span className="text-[22px] font-extrabold text-[#8b5cf6]">78</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <CompareBar label="Reflection" color="bg-indigo-500" width="65%" />
                <CompareBar label="Stability" color="bg-emerald-400" width="80%" />
                <CompareBar label="Sessions" color="bg-rose-400" width="55%" />
              </div>
              
              <p className="text-[11px] font-bold text-gray-700 mt-4">
                <span className="mr-1">😌</span> Calm dominant mood
              </p>
            </div>

            {/* Class 10B Card */}
            <div className="flex-1 bg-[#f4faf8] rounded-[22px] p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15px] font-extrabold text-gray-900">Class 10B</span>
                <span className="text-[22px] font-extrabold text-[#8b5cf6]">80</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <CompareBar label="Reflection" color="bg-indigo-500" width="79%" />
                <CompareBar label="Stability" color="bg-emerald-400" width="85%" />
                <CompareBar label="Sessions" color="bg-emerald-400" width="86%" />
              </div>
              
              <p className="text-[11px] font-bold text-gray-700 mt-4">
                <span className="mr-1">😌</span> Calm dominant mood
              </p>
            </div>

          </div>
        </motion.div>

        {/* ═══════ Section 3: All Metrics Table ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/50"
        >
          <h2 className="text-[17px] font-extrabold text-gray-900 mb-5">All Metrics at a Glance</h2>
          
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-[11px] font-semibold text-gray-400">Class</th>
                <th className="pb-3 text-center text-[11px] font-semibold text-gray-400">Score</th>
                <th className="pb-3 text-center text-[11px] font-semibold text-gray-400">Reflect</th>
                <th className="pb-3 text-center text-[11px] font-semibold text-gray-400">Sessions</th>
                <th className="pb-3 text-right text-[11px] font-semibold text-gray-400">Mood</th>
              </tr>
            </thead>
            <tbody>
              {[...CLASS_DATA].sort((a, b) => b.score - a.score).map((cls) => (
                <tr key={cls.name} className="border-b border-gray-50 last:border-0">
                  <td className="py-3.5 text-[13px] font-bold text-gray-800 text-left">{cls.name}</td>
                  <td className="py-3.5 text-[13px] font-bold text-gray-800 text-center">{cls.score}</td>
                  <td className="py-3.5 text-[13px] font-semibold text-gray-500 text-center">{cls.reflect}</td>
                  <td className="py-3.5 text-[13px] font-semibold text-gray-500 text-center">{cls.sessions}</td>
                  <td className="py-3.5 text-[16px] text-right">{cls.mood}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>

      {/* Shared Teacher Dock */}
      <TeacherDock />
    </section>
  );
}

function CompareBar({ label, color, width }) {
  return (
    <div>
      <span className="text-[10px] font-bold text-gray-600 block mb-1">{label}</span>
      <div className="h-[6px] w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}
