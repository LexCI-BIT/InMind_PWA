import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function QuizSessions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-white font-sans pb-10">

      {/* ───── Header ───── */}
      <div className="px-6 pt-safe pt-8 flex items-center gap-3">
        <button onClick={() => navigate('/teacher/home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center shadow-sm"
            style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }}
          />
          <div>
            <h2 className="text-[14px] font-bold text-gray-900">Hello, Sarah</h2>
            <p className="text-[11px] text-gray-400 font-medium">Wed, Oct 24</p>
          </div>
        </div>
      </div>

      {/* ───── Title + Create Button ───── */}
      <div className="px-6 mt-6">
        <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight">Quiz Sessions</h1>

        <motion.button
          onClick={() => navigate('/teacher/create-quiz')}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-bold text-white shadow-md"
          style={{ background: 'linear-gradient(135deg, #1f1f1f 0%, #374151 100%)' }}
        >
          <span>Create New Session</span>
          <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </motion.button>
      </div>

      {/* ───── Tabs ───── */}
      <div className="px-6 mt-6">
        <div className="flex bg-gray-100 p-1 rounded-full">
          {['Daily', 'Weekly', 'Monthly'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[13px] font-bold rounded-full transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ───── Sessions List ───── */}
      <div className="px-6 mt-6 flex flex-col gap-5">

        {/* LIVE NOW */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-wider">Live Now</span>
          </div>

          <div className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-extrabold text-gray-900">Cellular Respiration Quiz</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-1">Started 15mins ago · 24 students joined</p>

            <div className="flex items-center gap-2 mt-4">
              {/* Student avatars */}
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-emerald-400 border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-indigo-400 border-2 border-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-400 ml-1">Real-time engagement high</span>
            </div>
          </div>
        </motion.div>

        {/* SCHEDULED */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Scheduled</p>

          <div className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-extrabold text-gray-900">Cellular Respiration Quiz</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-1">3 Questions · Tomorrow, 2:30 pm</p>

            <div className="flex items-center gap-3 mt-4">
              <button className="px-5 py-2 rounded-full bg-[#f97316] text-white text-[12px] font-bold shadow-sm hover:bg-[#ea580c] transition">
                Edit Session
              </button>
              <button className="px-5 py-2 rounded-full border border-gray-200 text-gray-600 text-[12px] font-bold hover:bg-gray-50 transition">
                Preview
              </button>
            </div>
          </div>
        </motion.div>

        {/* DRAFT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Draft</p>

          <div className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-extrabold text-gray-900">Genetic Mutation Basics</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-1">10 Questions</p>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-rose-400 border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-sky-400 border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-violet-400 border-2 border-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-400 ml-1">Real-time engagement high</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
