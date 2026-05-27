import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ParentDock } from '../../components/ParentDock';

export function ParentInsights() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f8f9fa] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-8 mb-6">
        <div className="pr-2">
          <h1 className="text-[22px] font-bold text-[#1a1a1a] mb-1">Parent Insights</h1>
          <p className="text-[12px] font-medium text-gray-500">Personalised behavioural observations</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="size-[42px] rounded-full bg-[#6366f1] grid place-items-center text-white shadow-md transition relative shrink-0"
        >
          <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute top-0 right-0 size-[10px] bg-[#ff453a] rounded-full border-2 border-[#f8f9fa]" />
        </button>
      </div>

      <div className="px-5 flex flex-col gap-4">

        {/* ───── Main Blue Card ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[16px] p-5 shadow-md bg-gradient-to-br from-[#0c2380] to-[#0275c2]"
        >
          <p className="text-[9px] font-bold text-blue-200/90 uppercase tracking-widest mb-2.5">
            Week of May 19
          </p>
          <p className="text-[13px] font-medium text-white leading-[1.6] mb-6">
            Arjun demonstrated growing emotional clarity and consistent reflection habits this week. His engagement with the Gratitude and Reflection challenges remained strong, with notable improvements in social thoughtfulness.
          </p>

          {/* Stats Pills */}
          <div className="flex items-center gap-2.5">
            <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-[10px] py-2.5 flex flex-col items-center justify-center shadow-inner">
              <span className="text-[17px] font-bold text-white mb-0.5 leading-none">84%</span>
              <span className="text-[8.5px] font-medium text-blue-100">Participation</span>
            </div>
            <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-[10px] py-2.5 flex flex-col items-center justify-center shadow-inner">
              <span className="text-[17px] font-bold text-white mb-0.5 leading-none">4/5</span>
              <span className="text-[8.5px] font-medium text-blue-100">Challenges</span>
            </div>
            <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-[10px] py-2.5 flex flex-col items-center justify-center shadow-inner">
              <span className="text-[17px] font-bold text-white mb-0.5 leading-none">↑76%</span>
              <span className="text-[8.5px] font-medium text-blue-100">Awareness</span>
            </div>
          </div>
        </motion.div>

        {/* ───── Card 1: Reflection Growth ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 mt-2"
        >
          <div className="size-[38px] rounded-[10px] bg-[#f5d0e6] mb-4" />
          <p className="text-[13.5px] font-medium text-[#1a1a1a] leading-relaxed mb-4 pr-2">
            Arjun is becoming noticeably more thoughtful before responding. Over the past week, his pause-and-reflect behaviour rose to 76% of observed interactions.
          </p>
          <div className="bg-[#fce7f3] text-[#d946ef] text-[9px] font-bold px-3 py-1.5 rounded-full w-max">
            Reflection Growth
          </div>
        </motion.div>

        {/* ───── Card 2: Social Engagement ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 mb-8"
        >
          <div className="size-[38px] rounded-[10px] bg-[#bbf7d0] mb-4" />
          <p className="text-[13.5px] font-medium text-[#1a1a1a] leading-relaxed mb-4 pr-2">
            Reflection participation increased noticeably during collaborative group activities on Thursday and Friday, suggesting he engages more deeply with peers in structured settings.
          </p>
          <div className="bg-[#d1fae5] text-[#059669] text-[9px] font-bold px-3 py-1.5 rounded-full w-max">
            Social Engagement
          </div>
        </motion.div>

      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50">
        <ParentDock active="home" />
      </div>

    </section>
  );
}
