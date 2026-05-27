import { motion } from 'framer-motion';
import { ParentDock } from '../../components/ParentDock';

export function ParentHome() {
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f9fa] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-8 mb-5">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-gradient-to-br from-[#fbcfe8] to-[#c084fc] grid place-items-center text-white font-bold text-[18px] shadow-sm">
            P
          </div>
          <div className="flex flex-col">
            <h1 className="text-[16px] font-bold text-[#1a1a1a] leading-tight mb-0.5">Good Morning, Mrs Priya</h1>
            <p className="text-[11px] font-medium text-gray-500">Tuesday · Week 3 of module</p>
          </div>
        </div>
        <button className="size-11 rounded-full bg-[#6366f1] grid place-items-center text-white shadow-md transition relative shrink-0">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute top-0 right-0 size-[10px] bg-[#ff453a] rounded-full border-2 border-[#f8f9fa]" />
        </button>
      </div>

      {/* ───── Student Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 rounded-[20px] bg-[#0c5384] p-6 relative overflow-hidden shadow-lg"
      >
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -left-4 w-40 h-40 bg-[#000000]/10 rounded-full" />
        <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-[#000000]/10 rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-[42px] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#4338ca] grid place-items-center text-white font-bold text-lg shadow-sm">
                A
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-white leading-tight">Aarav Sharma</h2>
                <p className="text-[10px] font-medium text-blue-100/90 mt-1">Grade 6 · Section B · Age 11</p>
              </div>
            </div>
            <span className="bg-[#10b981] text-white text-[10px] font-medium px-3 py-1 rounded-full tracking-wide">
              Active
            </span>
          </div>

          <div>
            <p className="text-[9px] font-bold text-[#facc15] uppercase tracking-wider mb-0.5">Current Module</p>
            <p className="text-[11px] font-medium text-[#facc15]">Emotional Awareness · Week 4 of 8</p>
          </div>
        </div>
      </motion.div>

      {/* ───── Metrics Row ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mt-4 grid grid-cols-2 gap-4"
      >
        {/* Weekly Participation */}
        <div className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-[100px]">
          <p className="text-[10px] font-bold text-gray-400">Weekly Participation</p>
          <div>
            <h3 className="text-[24px] font-bold text-[#1a1a1a] leading-none mb-2">84%</h3>
            <div className="bg-[#d1fae5] text-[#059669] text-[9px] font-bold px-2 py-0.5 rounded-full w-max">
              ↑ +6% this week
            </div>
          </div>
        </div>

        {/* Reflection Depth */}
        <div className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-[100px]">
          <p className="text-[10px] font-bold text-gray-400">Reflection Depth</p>
          <div>
            <h3 className="text-[24px] font-bold text-[#1a1a1a] leading-none mb-2">7.2</h3>
            <div className="bg-[#d1fae5] text-[#059669] text-[9px] font-bold px-2 py-0.5 rounded-full w-max">
              ↑ +0.8 avg
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───── Reflection Engagement ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mt-4"
      >
        <div className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[17px] font-bold text-[#1a1a1a]">Reflection Engagement</h3>
            <span className="text-[10px] font-medium text-white bg-[#0c5384] px-3 py-1 rounded-full">
              This week
            </span>
          </div>
          
          <p className="text-[10px] font-medium text-gray-500 mb-4">7-day engagement trend</p>

          {/* Chart */}
          <div className="relative h-[70px] mb-3">
            <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
              {/* Area fill */}
              <path 
                d="M 0 50 C 15 48, 30 40, 45 35 C 55 32, 60 30, 75 28 C 90 26, 100 30, 115 32 C 130 34, 140 35, 155 34 C 170 33, 180 32, 195 30 C 210 28, 220 22, 240 20 C 255 18, 270 22, 300 25 L 300 60 L 0 60 Z" 
                fill="url(#blueGradientHome)" 
                opacity="0.15"
              />
              
              {/* Line */}
              <path 
                d="M 0 50 C 15 48, 30 40, 45 35 C 55 32, 60 30, 75 28 C 90 26, 100 30, 115 32 C 130 34, 140 35, 155 34 C 170 33, 180 32, 195 30 C 210 28, 220 22, 240 20 C 255 18, 270 22, 300 25" 
                fill="none" 
                stroke="#2563eb" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Highlight points (Tue and Sat) */}
              <circle cx="45" cy="35" r="4" fill="white" stroke="#2563eb" strokeWidth="2" />
              <circle cx="240" cy="20" r="4" fill="white" stroke="#2563eb" strokeWidth="2" />
              
              <defs>
                <linearGradient id="blueGradientHome" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Days */}
          <div className="flex justify-between px-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span 
                key={day} 
                className="text-[10px] font-medium text-[#1a1a1a]"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Social Decision Awareness - Card 1 ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-5 mt-4"
      >
        <div className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Social Decision Awareness</h3>
          <p className="text-[9px] font-medium text-gray-400 mb-6">Pause-and-think behaviour</p>

          <div className="flex items-center gap-5">
            {/* Circular Progress */}
            <div className="relative size-[80px] shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#eff6ff" strokeWidth="12" />
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="#2563eb" 
                  strokeWidth="12" 
                  strokeDasharray="251.2" 
                  strokeDashoffset="60.28"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[18px] font-bold text-[#1a1a1a]">76%</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1 mt-1">
              <h4 className="text-[11px] font-bold text-[#1a1a1a] mb-1.5">Thoughtful Responses</h4>
              <p className="text-[10px] font-medium text-gray-600 leading-snug mb-3 pr-2">
                Aarav pauses and reflects before responding in 3 of 4 social scenarios this week.
              </p>
              <span className="text-[10px] font-bold text-[#10b981] leading-none">
                ↑ Improving steadily
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───── Social Decision Awareness - Card 2 ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mx-5 mt-4 mb-28"
      >
        <div className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Social Decision Awareness</h3>
          <p className="text-[9px] font-medium text-gray-400 mb-5">Stability across interactions</p>
            
          <div className="relative h-[50px] w-full">
            <svg className="w-full h-full" viewBox="0 0 300 50" preserveAspectRatio="none">
              {/* Area fill */}
              <path 
                d="M 0 40 C 30 38, 50 30, 80 25 C 110 20, 130 18, 160 15 C 190 12, 210 18, 230 22 C 250 26, 270 20, 300 18 L 300 50 L 0 50 Z" 
                fill="url(#greenGradientHome)" 
                opacity="0.12"
              />
              
              {/* Line */}
              <path 
                d="M 0 40 C 30 38, 50 30, 80 25 C 110 20, 130 18, 160 15 C 190 12, 210 18, 230 22 C 250 26, 270 20, 300 18" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              <defs>
                <linearGradient id="greenGradientHome" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="size-1.5 rounded-full bg-[#10b981]" />
            <span className="text-[9px] font-medium text-gray-400">Stable emotional rhythm this week</span>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50">
        <ParentDock active="home" />
      </div>

    </section>
  );
}


