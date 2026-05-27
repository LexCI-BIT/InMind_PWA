import { motion } from 'framer-motion';
import { ParentDock } from '../../components/ParentDock';

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

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f7] font-sans pb-[100px]">

      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-5 pt-safe pt-8 mb-5">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-0.5">Challenges</h1>
          <p className="text-[12px] font-medium text-gray-500">Habit & behavioural growth</p>
        </div>
        
        <button className="size-11 rounded-full bg-[#6366f1] grid place-items-center text-white shadow-md transition relative shrink-0">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="absolute top-0 right-0 size-[10px] bg-[#ff3b30] rounded-full border-2 border-[#f5f5f7]" />
        </button>
      </div>

      {/* ───── 6-Day Streak Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 mb-5"
      >
        <div className="bg-gradient-to-br from-[#0c47af] to-[#042d76] rounded-[16px] p-5 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[26px]">🔥</span>
              <div>
                <h2 className="text-[18px] font-bold text-white leading-tight mb-0.5">6-Day Streak</h2>
                <p className="text-[12px] font-medium text-blue-100/80">Arjun's consistency this week</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 px-1">
              {streakDays.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className={`size-[18px] rounded-full ${item.completed ? 'bg-[#22c55e]' : 'bg-transparent'}`} />
                  <span className="text-[11px] font-medium text-white/90">{item.day}</span>
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
        className="mx-5 mb-5 space-y-4"
      >
        {/* Quiz Challenge */}
        <div className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[12px] bg-[#f3e8ff] grid place-items-center text-[#1a1a1a] font-bold text-[18px]">
              Q
            </div>
            <div className="flex-1 flex justify-between items-center">
              <h3 className="text-[14px] font-bold text-[#1a1a1a]">Quiz Challenge</h3>
              <span className="text-[13px] font-bold text-[#a855f7]">70%</span>
            </div>
          </div>
          <div className="pl-[60px]">
            <div className="h-1.5 w-full bg-[#f3e8ff] rounded-full overflow-hidden">
              <div className="h-full bg-[#a855f7] rounded-full" style={{ width: '70%' }} />
            </div>
          </div>
        </div>

        {/* Check-In */}
        <div className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[12px] bg-[#d1fae5] grid place-items-center text-[#1a1a1a] font-bold text-[18px]">
              C
            </div>
            <div className="flex-1 flex justify-between items-center">
              <h3 className="text-[14px] font-bold text-[#1a1a1a]">Check-In</h3>
              <span className="text-[13px] font-bold text-[#10b981]">70%</span>
            </div>
          </div>
          <div className="pl-[60px]">
            <div className="h-1.5 w-full bg-[#d1fae5] rounded-full overflow-hidden">
              <div className="h-full bg-[#10b981] rounded-full" style={{ width: '70%' }} />
            </div>
          </div>
        </div>

        {/* Weekly Module */}
        <div className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[12px] bg-[#fef3c7] grid place-items-center text-[#1a1a1a] font-bold text-[18px]">
              W
            </div>
            <div className="flex-1 flex justify-between items-center">
              <h3 className="text-[14px] font-bold text-[#1a1a1a]">Weekly Module</h3>
              <span className="text-[13px] font-bold text-[#f59e0b]">50%</span>
            </div>
          </div>
          <div className="pl-[60px]">
            <div className="h-1.5 w-full bg-[#fef3c7] rounded-full overflow-hidden">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───── Habit Milestones ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-[110px]"
      >
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-5">
            Habit Milestones
          </h3>
          
          <div className="space-y-5">
            {/* Milestone 1 */}
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-full bg-[#22c55e] grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-[12px] font-bold text-[#1a1a1a]">First Reflection Week Complete</h4>
                <p className="text-[10px] font-medium text-gray-500">Achieved May 17</p>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-full bg-[#22c55e] grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-[12px] font-bold text-[#1a1a1a]">5-Day Streak Unlocked</h4>
                <p className="text-[10px] font-medium text-gray-500">Achieved May 22</p>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-full bg-[#e0e7ff] grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#6366f1]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-[12px] font-bold text-[#1a1a1a]">Social Awareness Level 2</h4>
                <p className="text-[10px] font-medium text-gray-500">In progress - 4 days left</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ParentDock />

    </section>
  );
}
