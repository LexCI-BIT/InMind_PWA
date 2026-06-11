import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PicturePerceptionDashboard() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#0a120e] font-sans">
      
      {/* Full-screen Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/mindlab/picturepreception/page1bg.png" 
          alt="Desk Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-10 pt-safe-top">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 grid size-10 place-items-center text-white transition hover:opacity-70"
          aria-label="Go Back"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Greeting Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 mb-8"
        >
          <h2 className="text-[17px] font-medium text-white/90 tracking-wide leading-tight">
            Good evening
          </h2>
          <h1 className="text-[24px] font-bold text-[#059669] leading-tight flex items-center gap-2 mt-1">
            Arjun <span>👋🏻</span>
          </h1>
          <p className="text-[12px] text-white/70 mt-2 max-w-[180px] leading-relaxed font-medium">
            Ready to improve your storytelling skills?
          </p>
        </motion.div>

        {/* Your Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative overflow-hidden rounded-[16px] bg-[#1f2b28]/80 backdrop-blur-md border border-white/5 p-6 shadow-xl mb-6"
        >
          <h3 className="text-[15px] font-semibold text-white/90 mb-6">Your Progress</h3>
          
          <div className="flex justify-between items-center px-1">
            {/* Stat 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-[42px] h-[42px] rounded-full bg-[#273733] border border-white/5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-[16px] font-bold text-white leading-tight">08</p>
                <p className="text-[8px] text-white/50 tracking-wide font-medium mt-0.5">Tests Taken</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-[42px] h-[42px] rounded-full bg-[#273733] border border-white/5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#eab308] fill-current" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-[16px] font-bold text-white leading-tight">92%</p>
                <p className="text-[8px] text-white/50 tracking-wide font-medium mt-0.5">Avg Score</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-[42px] h-[42px] rounded-full bg-[#273733] border border-white/5 flex items-center justify-center">
                <span className="text-[18px] leading-none pb-0.5">🔥</span>
              </div>
              <div className="text-center">
                <p className="text-[16px] font-bold text-white leading-tight">12</p>
                <p className="text-[8px] text-white/50 tracking-wide font-medium mt-0.5">Day Streak</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Picture Story Test Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative overflow-hidden rounded-[14px] bg-[#1a4034] border border-[#235344] p-5 shadow-lg flex items-center justify-between mb-8 cursor-pointer hover:bg-[#1f4a3d] transition-colors"
          onClick={() => navigate('/student/mindlab/pictureperception/intro')}
        >
          <div className="flex-1 pr-4">
            <h3 className="text-[14px] font-bold text-white mb-1.5">Picture Story Test</h3>
            <p className="text-[11px] text-white/70 leading-relaxed font-medium">
              Observe the picture and write a meaningful story.
            </p>
          </div>
          <button className="w-8 h-8 shrink-0 rounded-full bg-[#ebdcd2] flex items-center justify-center text-[#1a4034] shadow-md transition-transform hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </motion.div>

        {/* Story Test List Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          <h3 className="text-[15px] font-semibold text-white/90 tracking-wide">Story Test</h3>
          <button className="text-[10px] font-semibold text-white/50 hover:text-white transition-colors">
            View all
          </button>
        </motion.div>

      </div>
    </section>
  );
}
