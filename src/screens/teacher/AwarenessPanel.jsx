import { motion } from 'framer-motion';
import { TeacherDock } from '../../components/TeacherDock';

export function AwarenessPanel() {
  const reflectionMeters = [
    { label: 'Empathy Expression', value: 78, color: 'bg-blue-500' },
    { label: 'Interpersonal Growth', value: 65, color: 'bg-green-500' },
    { label: 'Collaborative Thinking', value: 83, color: 'bg-amber-500' },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f7] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-6 mb-6">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a1a]">Awareness Panel</h1>
          <p className="text-[11px] font-medium text-gray-500">Social & self-awareness metrics</p>
        </div>
        <button className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center text-white shadow-lg hover:opacity-90 transition relative">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute -top-0.5 -right-0.5 size-3 bg-red-500 rounded-full border-2 border-[#f5f5f7]" />
        </button>
      </div>

      {/* ───── Self-Awareness Index ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 mb-6"
      >
        <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Self-Awareness Index</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Self-Reflection */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="relative size-24 mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
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
                <span className="text-[20px] font-bold text-[#1a1a1a]">75%</span>
              </div>
            </div>
            <h4 className="text-[13px] font-bold text-[#1a1a1a] mb-1">Self-Reflection</h4>
            <p className="text-[10px] font-medium text-gray-500 text-center">Consistent self-awareness</p>
          </div>

          {/* Social Awareness */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="relative size-24 mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
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
                <span className="text-[20px] font-bold text-[#1a1a1a]">69%</span>
              </div>
            </div>
            <h4 className="text-[13px] font-bold text-[#1a1a1a] mb-1">Social Awareness</h4>
            <p className="text-[10px] font-medium text-gray-500 text-center">Growing empathy signals</p>
          </div>
        </div>
      </motion.div>

      {/* ───── Decision Thinking Arc ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Decision Thinking Arc</h3>
          
          <div className="relative h-32 mb-3">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
              
              {/* Area fill */}
              <path 
                d="M 0 70 Q 14 60 28 50 T 56 30 T 84 50 L 100 55 L 100 100 L 0 100 Z" 
                fill="url(#orangeGradient)" 
                opacity="0.2"
              />
              
              {/* Line */}
              <path 
                d="M 0 70 Q 14 60 28 50 T 56 30 T 84 50 L 100 55" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              
              {/* Peak marker */}
              <circle cx="56" cy="30" r="4" fill="#f59e0b" stroke="white" strokeWidth="2" />
              <text x="56" y="20" fontSize="8" fill="#f59e0b" textAnchor="middle" fontWeight="bold">● Thursday Peak</text>
              
              <defs>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex justify-between px-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <span key={day} className={`text-[10px] font-semibold ${idx === 3 ? 'text-amber-600' : 'text-gray-400'}`}>
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
        className="mx-5 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Social Reflection Meter</h3>
          
          <div className="space-y-4">
            {reflectionMeters.map((meter, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-[#1a1a1a]">{meter.label}</span>
                  <span className="text-[13px] font-bold text-indigo-600">{meter.value}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
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
        className="mx-5 mb-8"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Emotional Consistency Arc</h3>
          
          <div className="relative h-24 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Area fill */}
              <path 
                d="M 0 55 Q 20 50 40 52 T 80 48 L 100 50 L 100 100 L 0 100 Z" 
                fill="url(#consistencyGradient)" 
                opacity="0.2"
              />
              
              {/* Line */}
              <path 
                d="M 0 55 Q 20 50 40 52 T 80 48 L 100 50" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              
              <defs>
                <linearGradient id="consistencyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500" />
            <span className="text-[11px] font-medium text-gray-600">Improving emotional stability over 4 weeks</span>
          </div>
        </div>
      </motion.div>

      <TeacherDock active="awareness" />

    </section>
  );
}
