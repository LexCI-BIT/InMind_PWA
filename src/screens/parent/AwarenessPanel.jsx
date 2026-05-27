import { motion } from 'framer-motion';
import { ParentDock } from '../../components/ParentDock';

export function AwarenessPanel() {
  const reflectionMeters = [
    { label: 'Empathy Expression', value: 78, color: 'bg-[#3b82f6]', textColor: 'text-[#3b82f6]' },
    { label: 'Interpersonal Growth', value: 65, color: 'bg-[#22c55e]', textColor: 'text-[#22c55e]' },
    { label: 'Collaborative Thinking', value: 83, color: 'bg-[#f59e0b]', textColor: 'text-[#f59e0b]' },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f7] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-8 mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-0.5">Awareness Panel</h1>
          <p className="text-[12px] font-medium text-gray-500">Social & self-awareness metrics</p>
        </div>
        <button className="size-11 rounded-full bg-[#6366f1] grid place-items-center text-white shadow-md transition relative shrink-0">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute top-0 right-0 size-[10px] bg-[#ff3b30] rounded-full border-2 border-[#f5f5f7]" />
        </button>
      </div>

      {/* ───── Self-Awareness Index ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 mb-5"
      >
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-5">
            Self-Awareness Index
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Self-Reflection */}
            <div className="bg-[#f8fafc] rounded-[16px] p-4 flex flex-col items-center">
              <div className="relative size-[72px] mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="62.8"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[15px] font-bold text-[#1a1a1a]">75%</span>
                </div>
              </div>
              <h4 className="text-[12.5px] font-bold text-[#1a1a1a] mb-1">Self-Reflection</h4>
              <p className="text-[9.5px] font-medium text-gray-500 text-center leading-tight">
                Consistent self-<br/>awareness
              </p>
            </div>

            {/* Social Awareness */}
            <div className="bg-[#f8fafc] rounded-[16px] p-4 flex flex-col items-center">
              <div className="relative size-[72px] mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="77.872"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[15px] font-bold text-[#1a1a1a]">69%</span>
                </div>
              </div>
              <h4 className="text-[12.5px] font-bold text-[#1a1a1a] mb-1">Social Awareness</h4>
              <p className="text-[9.5px] font-medium text-gray-500 text-center leading-tight">
                Growing empathy signals
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───── Decision Thinking Arc ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-5"
      >
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Decision Thinking Arc
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="size-1.5 rounded-full bg-[#f59e0b]" />
              <span className="text-[10px] font-bold text-[#f59e0b]">Thursday Peak</span>
            </div>
          </div>
          
          <div className="relative h-[80px] mb-3">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Line */}
              <polyline 
                points="0,65 50,48 100,35 150,15 200,40 250,58 300,50" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="2.5" 
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex justify-between px-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <span 
                key={day} 
                className={`text-[10px] ${idx === 3 ? 'font-bold text-[#f59e0b]' : 'font-medium text-gray-400'}`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Social Reflection Meter ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-5"
      >
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-5">
            Social Reflection Meter
          </h3>
          
          <div className="space-y-4">
            {reflectionMeters.map((meter, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#1a1a1a]">{meter.label}</span>
                  <span className={`text-[12px] font-bold ${meter.textColor}`}>{meter.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${meter.color} rounded-full transition-all duration-500`}
                    style={{ width: `${meter.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Emotional Consistency Arc ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-5 mb-[110px]"
      >
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-5">
            Emotional Consistency Arc
          </h3>
          
          <div className="relative h-[55px] mb-5">
            <svg className="w-full h-full" viewBox="0 0 300 50" preserveAspectRatio="none">
              {/* Area fill */}
              <path 
                d="M 0 40 C 30 38, 50 30, 80 25 C 110 20, 130 18, 160 15 C 190 12, 210 18, 230 22 C 250 26, 270 20, 300 18 L 300 50 L 0 50 Z" 
                fill="url(#consistencyGradient)" 
                opacity="0.12"
              />
              
              {/* Line */}
              <path 
                d="M 0 40 C 30 38, 50 30, 80 25 C 110 20, 130 18, 160 15 C 190 12, 210 18, 230 22 C 250 26, 270 20, 300 18" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              <defs>
                <linearGradient id="consistencyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center gap-1.5 ml-2">
            <div className="size-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-[10px] font-bold text-[#22c55e]">↑ Improving emotional stability over 4 weeks</span>
          </div>
        </div>
      </motion.div>

      <ParentDock />

    </section>
  );
}
