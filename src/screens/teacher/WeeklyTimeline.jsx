import { motion } from 'framer-motion';
import { TeacherDock } from '../../components/TeacherDock';

export function WeeklyTimeline() {
  const days = [
    { day: 'Mon', completed: true, percentage: '100%' },
    { day: 'Tue', completed: true, percentage: '90%' },
    { day: 'Wed', completed: true, percentage: '95%' },
    { day: 'Thu', completed: false, percentage: '60%' },
    { day: 'Fri', completed: false, percentage: '45%' },
    { day: 'Sat', completed: true, percentage: '88%' },
    { day: 'Sun', completed: false, percentage: '-' },
  ];

  const challenges = [
    { id: 'Q', name: 'Quiz Challenge', completed: 3, total: 5, color: 'bg-purple-500', progress: 60 },
    { id: 'C', name: 'Check-In', completed: 2, total: 5, color: 'bg-cyan-500', progress: 40 },
    { id: 'W', name: 'Weekly Module', completed: 2, total: 5, color: 'bg-amber-500', progress: 40 },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f7] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-6 mb-6">
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">Weekly Timeline</h1>
        <button className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center text-white shadow-lg hover:opacity-90 transition relative">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute -top-0.5 -right-0.5 size-3 bg-red-500 rounded-full border-2 border-[#f5f5f7]" />
        </button>
      </div>

      <p className="text-[12px] font-medium text-gray-500 px-5 mb-6">May 18 - 25, 2025</p>

      {/* ───── Daily Participation ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Daily Participation</h3>
          
          <div className="flex justify-between items-end mb-3">
            {days.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`size-7 rounded-full grid place-items-center ${item.completed ? 'bg-green-500' : 'bg-gray-200'}`}>
                  {item.completed ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <div className="size-2 rounded-full bg-gray-400" />
                  )}
                </div>
                <span className="text-[10px] font-semibold text-gray-600">{item.day}</span>
                <span className="text-[9px] font-bold text-gray-400">{item.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Reflection Depth Per Day ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Reflection Depth Per Day</h3>
          
          <div className="flex justify-between items-end h-32 mb-3">
            {[80, 70, 85, 90, 75, 65, 50].map((height, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
                  <div 
                    className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                    style={{ height: `${height}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between px-1">
            {days.map((item, idx) => (
              <span key={idx} className="text-[10px] font-semibold text-gray-600">{item.day}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Challenge Completions ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Challenge Completions</h3>
          
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center gap-3">
                <div className={`size-10 rounded-full ${challenge.color} grid place-items-center text-white font-bold text-sm shadow-md`}>
                  {challenge.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-semibold text-[#1a1a1a]">{challenge.name}</span>
                    <span className="text-[12px] font-bold text-indigo-600">{challenge.completed}/{challenge.total}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${challenge.color} rounded-full transition-all duration-500`}
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                  <p className="text-[9px] font-medium text-gray-500 mt-1">
                    Completed {challenge.completed} {challenge.completed === 1 ? 'time' : 'times'} this week
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Behaviour Rhythm Wave ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-5 mb-8"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-1">Behaviour Rhythm Wave</h3>
          <p className="text-[10px] font-medium text-gray-500 mb-4">Emotional engagement over 7 days</p>
          
          <div className="relative h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Area fill */}
              <path 
                d="M 0 60 Q 14 45 28 50 T 56 35 T 84 45 L 100 40 L 100 100 L 0 100 Z" 
                fill="url(#rhythmGradient)" 
                opacity="0.2"
              />
              
              {/* Line */}
              <path 
                d="M 0 60 Q 14 45 28 50 T 56 35 T 84 45 L 100 40" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              
              <defs>
                <linearGradient id="rhythmGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </motion.div>

      <TeacherDock active="weekly" />

    </section>
  );
}
