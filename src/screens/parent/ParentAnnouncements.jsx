import { motion } from 'framer-motion';
import { ParentDock } from '../../components/ParentDock';

export function ParentAnnouncements() {
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f9fa] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-8 mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-0.5">Parent Insights</h1>
          <p className="text-[12px] font-medium text-gray-500">Personalised behavioural observations</p>
        </div>
        <button className="size-11 rounded-full bg-[#6366f1] grid place-items-center text-white shadow-md transition relative shrink-0">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute top-0 right-0 size-[10px] bg-[#ff3b30] rounded-full border-2 border-[#f8f9fa]" />
        </button>
      </div>

      <div className="px-5 flex flex-col gap-5">
        
        {/* ───── Main Summary Card ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#0c4a9e] to-[#0461b5] rounded-[16px] p-5 shadow-lg"
        >
          <span className="text-[10px] font-medium text-blue-200/80 uppercase tracking-wider mb-2 block">
            WEEK OF MAY 19
          </span>
          <p className="text-[12.5px] font-medium text-white leading-relaxed mb-5">
            Arjun demonstrated growing emotional clarity and consistent reflection habits this week. His engagement with the Gratitude and Reflection challenges remained strong, with notable improvements in social thoughtfulness.
          </p>

          <div className="flex gap-2">
            <div className="flex-1 bg-white/10 rounded-[10px] py-2 flex flex-col items-center justify-center">
              <span className="text-[16px] font-bold text-white mb-0.5">84%</span>
              <span className="text-[9px] font-medium text-blue-200">Participation</span>
            </div>
            <div className="flex-1 bg-white/10 rounded-[10px] py-2 flex flex-col items-center justify-center">
              <span className="text-[16px] font-bold text-white mb-0.5">4/5</span>
              <span className="text-[9px] font-medium text-blue-200">Challenges</span>
            </div>
            <div className="flex-1 bg-white/10 rounded-[10px] py-2 flex flex-col items-center justify-center">
              <span className="text-[16px] font-bold text-white mb-0.5">↑76%</span>
              <span className="text-[9px] font-medium text-blue-200">Awareness</span>
            </div>
          </div>
        </motion.div>

        {/* ───── Insight Card 1 ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100"
        >
          <div className="size-9 rounded-[10px] bg-[#fce7f3] mb-4" />
          <p className="text-[12.5px] font-medium text-[#1a1a1a] leading-relaxed mb-4">
            Arjun is becoming noticeably more thoughtful before responding. Over the past week, his pause-and-reflect behaviour rose to 76% of observed interactions.
          </p>
          <div className="bg-[#fce7f3] text-[#db2777] px-2.5 py-1 rounded-full text-[9px] font-bold w-max">
            Reflection Growth
          </div>
        </motion.div>

        {/* ───── Insight Card 2 ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 mb-8"
        >
          <div className="size-9 rounded-[10px] bg-[#d1fae5] mb-4" />
          <p className="text-[12.5px] font-medium text-[#1a1a1a] leading-relaxed mb-4">
            Reflection participation increased noticeably during collaborative group activities on Thursday and Friday, suggesting he engages more deeply with peers in structured settings.
          </p>
          <div className="bg-[#d1fae5] text-[#059669] px-2.5 py-1 rounded-full text-[9px] font-bold w-max">
            Social Engagement
          </div>
        </motion.div>

      </div>

      <ParentDock />

    </section>
  );
}
