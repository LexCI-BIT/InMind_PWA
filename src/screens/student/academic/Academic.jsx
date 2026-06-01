import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Academic() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#11141e] font-sans">
      {/* ───── Header ───── */}
      <div className="bg-white rounded-b-3xl py-5 px-6 shadow-sm z-10">
        <h2 className="text-center text-xl font-bold tracking-widest text-black">
          ACADEMICS
        </h2>
      </div>

      {/* ───── Main Content ───── */}
      <div className="flex-1 overflow-y-auto px-5 pb-safe pb-8 pt-6 space-y-6">
        
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-[#161a27] p-5 shadow-lg"
          style={{
            backgroundImage: "url('/academics/titlebg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            minHeight: '140px'
          }}
        >
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold text-white mb-1">
              Welcome back, <br />
              <span className="text-[#818cf8]">Aarav</span>
            </h3>
            <p className="text-xs text-gray-300 leading-snug mt-3">
              Let's continue your journey <br /> of learning and growth.
            </p>
          </div>
        </motion.div>

        {/* Mentor Support Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={() => navigate('/student/academic/mentor')}
          className="relative flex items-center rounded-2xl bg-[#151923] p-4 shadow-md overflow-hidden cursor-pointer active:scale-95 transition-transform"
        >
          {/* Left Border Accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8b5cf6] rounded-l-2xl" />
          
          <div className="flex-shrink-0 w-20 h-20 mr-4 ml-2">
            <img 
              src="/academics/mentorsupport.png" 
              alt="Mentor Support" 
              className="w-full h-full object-contain mix-blend-lighten"
              style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }}
            />
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg">Mentor Support</h4>
            <div className="h-0.5 w-10 bg-[#8b5cf6] my-2" />
            <p className="text-[#9ca3af] text-[10px] leading-tight pr-2">
              Connect with mentors, get personalized guidance, and grow with expert support.
            </p>
          </div>
        </motion.div>

        {/* Exam Reference Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => navigate('/student/academic/exam-reference')}
          className="relative flex items-center rounded-2xl bg-[#151923] p-4 shadow-md overflow-hidden cursor-pointer active:scale-95 transition-transform"
        >
          {/* Left Border Accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#10b981] rounded-l-2xl" />
          
          <div className="flex-shrink-0 w-20 h-20 mr-4 ml-2">
            <img 
              src="/academics/examreference.png" 
              alt="Exam Reference" 
              className="w-full h-full object-contain mix-blend-lighten"
              style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }}
            />
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg">Exam Reference</h4>
            <div className="h-0.5 w-10 bg-[#10b981] my-2" />
            <p className="text-[#9ca3af] text-[10px] leading-tight pr-2">
              Access important study materials, notes, formulas, and resources to prepare better.
            </p>
          </div>
        </motion.div>

        {/* Current Affairs Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          onClick={() => navigate('/student/academic/current-affairs')}
          className="relative flex items-center rounded-2xl bg-[#151923] p-4 shadow-md overflow-hidden cursor-pointer active:scale-95 transition-transform"
        >
          {/* Left Border Accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ec4899] rounded-l-2xl" />
          
          <div className="flex-shrink-0 w-20 h-20 mr-4 ml-2">
            <img 
              src="/academics/currentafffair.png" 
              alt="Current Affairs" 
              className="w-full h-full object-contain mix-blend-lighten"
              style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }}
            />
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg">Current Affairs</h4>
            <div className="h-0.5 w-10 bg-[#ec4899] my-2" />
            <p className="text-[#9ca3af] text-[10px] leading-tight pr-2">
              Stay updated with important national and global developments that shape the world around you.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
