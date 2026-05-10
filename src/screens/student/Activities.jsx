import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';

export function Activities() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#222222] font-sans pb-24">
      {/* Background blobs */}
      <div className="absolute -right-20 top-32 size-64 rounded-full bg-[#3d2c2c] blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -left-16 top-64 size-48 rounded-full bg-[#2c2d3e] blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-white p-2 -ml-2 mb-6 transition hover:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <h1 className="text-[34px] font-medium leading-[1.1] text-white tracking-wide">
          Suggested<br />activities
        </h1>
      </div>

      {/* Stacked Cards */}
      <div className="relative z-10 px-5 mt-10 flex-1">
        
        {/* Blue Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full rounded-t-[32px] bg-[#93c5fd] pt-6 pb-20 px-6"
        >
          <h2 className="text-[22px] font-bold text-[#1f1f1f] leading-tight">Breathing</h2>
          <p className="text-[12px] text-[#1f1f1f]/80 mt-0.5">breathe and meditate</p>
        </motion.div>

        {/* Yellow Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative w-full rounded-t-[32px] bg-[#f59e0b] pt-6 pb-20 px-6 mt-[-64px] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
        >
          <h2 className="text-[22px] font-bold text-[#1f1f1f] leading-tight">Focus</h2>
          <p className="text-[12px] text-[#1f1f1f]/80 mt-0.5">breathe and meditate</p>
        </motion.div>

        {/* Salmon Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative w-full rounded-t-[32px] bg-[#f28468] pt-6 pb-20 px-6 mt-[-64px] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
        >
          <h2 className="text-[22px] font-bold text-[#1f1f1f] leading-tight">Meditation</h2>
          <p className="text-[12px] text-[#1f1f1f]/80 mt-0.5">breathe and meditate</p>
        </motion.div>

        {/* Mint Card (Front) */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative w-full rounded-[32px] bg-[#8ed2b1] p-6 mt-[-64px] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] flex justify-between overflow-hidden"
        >
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-[#1f1f1f] leading-tight">Yoga</h2>
              <p className="text-[12px] text-[#1f1f1f]/80 mt-0.5">breathe and meditate</p>
            </div>
            
            <div className="flex flex-col gap-2 mt-8">
              <span className="bg-[#1f1f1f] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-full w-fit flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                3 mins
              </span>
              <span className="bg-[#1f1f1f] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full w-fit">
                Fundamental
              </span>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative w-[140px] h-[140px] bg-[#a7f3d0]/60 rounded-[28px] overflow-hidden ml-2 flex-shrink-0">
            {/* Play Button */}
            <div className="absolute top-3 right-3 size-6 bg-white/70 rounded-full flex items-center justify-center backdrop-blur-md z-20 shadow-sm">
               <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 ml-0.5" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
            </div>
            
            {/* Yoga Graphic */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 z-10" xmlns="http://www.w3.org/2000/svg">
              {/* Props */}
              <rect x="25" y="30" width="18" height="35" fill="white" rx="2" />
              <rect x="18" y="25" width="16" height="16" fill="#f0abfc" rx="2" />
              <circle cx="35" cy="78" r="10" fill="#84cc16" />
              
              <rect x="75" y="65" width="12" height="15" fill="white" rx="2" />
              {/* Smoke */}
              <path d="M81 65 Q83 55 79 45" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <circle cx="81" cy="63" r="1.5" fill="#fca5a5" />

              {/* Person Body */}
              <g transform="translate(-2, 8)">
                {/* Back Arm */}
                <path d="M60 15 L60 5" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" />
                <circle cx="60" cy="5" r="2.5" fill="#fca5a5" />
                {/* Back Leg */}
                <path d="M55 45 L30 75" stroke="#6d28d9" strokeWidth="8" strokeLinecap="round" />
                {/* Front Leg */}
                <path d="M55 45 L65 75" stroke="#6d28d9" strokeWidth="8" strokeLinecap="round" />
                {/* Foot */}
                <path d="M30 75 L25 75" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" />
                <path d="M65 75 L70 75" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" />
                {/* Torso */}
                <path d="M63 32 L55 45" stroke="#6d28d9" strokeWidth="9" strokeLinecap="round" />
                {/* Head */}
                <circle cx="68" cy="24" r="5.5" fill="#fca5a5" />
                {/* Hair */}
                <path d="M67 18 Q75 18 75 25 Q75 28 70 28" fill="white" />
                {/* Front Arm reaching down */}
                <path d="M62 33 L78 60" stroke="#fca5a5" strokeWidth="4.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </motion.div>
      </div>

      <StudentDock active="grid" />
    </section>
  );
}
