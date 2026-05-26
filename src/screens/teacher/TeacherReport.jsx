import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

const REPORTS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    iconBg: 'bg-red-50',
    title: 'School Wellness Summary',
    sub: 'All classes · Weekly · Updated today',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    iconBg: 'bg-purple-50',
    title: 'Class Comparison Report',
    sub: 'All 8 classes · Monthly · May 2025',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    iconBg: 'bg-emerald-50',
    title: 'Student Progress Reports',
    sub: 'Individual · All students · Custom range',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    iconBg: 'bg-violet-50',
    title: 'Weekly Behavioral Summary',
    sub: 'School-wide · This week',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    iconBg: 'bg-teal-50',
    title: 'Emotional Stability Report',
    sub: 'Month-over-month trends',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    iconBg: 'bg-rose-50',
    title: 'Behavioral Growth Report',
    sub: 'Term 2 progress · All students',
  },
];

export function TeacherReport() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f7f8fa] font-sans pb-[120px]">

      {/* Header */}
      <header className="px-6 pt-safe pt-8 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold tracking-tight text-gray-900 leading-tight">
            Reports Center
          </h1>
          <p className="text-[13px] text-gray-400 font-medium mt-1">
            Download & share wellness reports
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

      <main className="flex-1 px-5 flex flex-col gap-6 mt-4">

        {/* ═══════ Stats Cards ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          {/* Reports Generated */}
          <div className="bg-[#ede9fe] rounded-[20px] p-5">
            <p className="text-[9px] font-extrabold text-[#7c3aed] uppercase tracking-[0.08em]">Reports Generated</p>
            <p className="text-[28px] font-black text-gray-900 mt-1 leading-none">24</p>
            <p className="text-[11px] font-semibold text-gray-500 mt-1">This month</p>
          </div>

          {/* Last Export */}
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/60">
            <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-[0.08em]">Last Export</p>
            <p className="text-[28px] font-black text-gray-900 mt-1 leading-none">Today</p>
            <p className="text-[11px] font-semibold text-gray-500 mt-1">Weekly summary</p>
          </div>
        </motion.div>

        {/* ═══════ Available Reports ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="text-[16px] font-extrabold text-gray-900 mb-4">Available Reports</h2>

          <div className="flex flex-col gap-3">
            {REPORTS.map((report, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                className="bg-white rounded-[18px] px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-100/50"
              >
                <div className={`w-10 h-10 rounded-full ${report.iconBg} flex items-center justify-center shrink-0`}>
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-bold text-gray-900 leading-tight">{report.title}</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{report.sub}</p>
                </div>
                <button className="shrink-0 px-3 py-1.5 rounded-full border border-[#8b5cf6] text-[10px] font-bold text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white transition">
                  Export
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════ Quick Generate ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#fdf2f8] rounded-[24px] p-6 border border-pink-100/60"
        >
          <h3 className="text-[16px] font-extrabold text-[#c026d3] italic mb-4">Quick Generate</h3>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 rounded-full border-2 border-[#d8b4fe] text-[13px] font-bold text-gray-700 bg-white hover:bg-[#ede9fe] transition">
              This Week
            </button>
            <button className="py-3 rounded-full border-2 border-[#d8b4fe] text-[13px] font-bold text-gray-700 bg-white hover:bg-[#ede9fe] transition">
              This Month
            </button>
            <button className="py-3 rounded-full border-2 border-[#d8b4fe] text-[13px] font-bold text-gray-700 bg-white hover:bg-[#ede9fe] transition">
              By Class
            </button>
            <button className="py-3 rounded-full border-2 border-[#d8b4fe] text-[13px] font-bold text-gray-700 bg-white hover:bg-[#ede9fe] transition">
              By Student
            </button>
          </div>
        </motion.div>

      </main>

      <TeacherDock />
    </section>
  );
}
