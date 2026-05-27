import { motion } from 'framer-motion';
import { TeacherDock } from '../../components/TeacherDock';

export function Challenges() {
  const streakDays = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: false },
  ];

  const challenges = [
    { id: 'Q', name: 'Quiz Challenge', progress: 70, color: 'bg-purple-500', barColor: 'bg-purple-500' },
    { id: 'C', name: 'Check-In', progress: 70, color: 'bg-cyan-500', barColor: 'bg-cyan-500' },
    { id: 'W', name: 'Weekly Module', progress: 50, color: 'bg-amber-500', barColor: 'bg-amber-500' },
  ];

  const milestones = [
    { icon: '✓', title: 'First Reflection Week Complete', subtitle: 'Achieved May 17', status: 'completed', color: 'bg-green-500' },
    { icon: '✓', title: '5-Day Streak Unlocked', subtitle: 'Achieved May 22', status: 'completed', color: 'bg-green-500' },
    { icon: '→', title: 'Social Awareness Level 2', subtitle: 'In progress · 4 days left', status: 'progress', color: 'bg-blue-500' },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f7] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-6 mb-6">
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">Challenges</h1>
        <button className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center text-white shadow-lg hover:opacity-90 transition relative">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute -top-0.5 -right-0.5 size-3 bg-red-500 rounded-full border-2 border-[#f5f5f7]" />
        </button>
      </div>

      <p className="text-[12px] font-medium text-gray-500 px-5 mb-6">Habit & behavioural growth</p>

      {/* ───── 6-Day Streak Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 mb-6"
      >
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[28px] p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <div>
                <h2 className="text-[20px] font-bold text-white leading-tight">6-Day Streak</h2>
                <p className="text-[11px] font-medium text-blue-200">Arjun's consistency this week</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-2 mt-5">
              {streakDays.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className={`size-9 rounded-full grid place-items-center ${item.completed ? 'bg-green-400' : 'bg-white/20'}`}>
                    {item.completed && (
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-white">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───── Challenge Progress Cards ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-6 space-y-4"
      >
        {challenges.map((challenge, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-3">
              <div className={`size-12 rounded-full ${challenge.color} grid place-items-center text-white font-bold text-lg shadow-md`}>
                {challenge.id}
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-bold text-[#1a1a1a]">{challenge.name}</h3>
              </div>
              <span className="text-[16px] font-bold text-indigo-600">{challenge.progress}%</span>
            </div>

            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${challenge.barColor} rounded-full transition-all duration-500`}
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* ───── Habit Milestones ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-8"
      >
        <h3 className="text-[14px] font-bold text-[#1a1a1a] mb-4">Habit Milestones</h3>
        
        <div className="space-y-3">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`size-10 rounded-full ${milestone.color} grid place-items-center text-white font-bold shadow-md`}>
                {milestone.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-[13px] font-bold text-[#1a1a1a] mb-0.5">{milestone.title}</h4>
                <p className="text-[10px] font-medium text-gray-500">{milestone.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <TeacherDock active="challenges" />

    </section>
  );
}
