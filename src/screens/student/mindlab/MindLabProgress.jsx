import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MindLabProgress() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto w-full max-w-[440px] bg-[#0c120c] font-sans min-h-[100dvh]">
      
      {/* Background Image - determines height */}
      <img 
        src="/gamification/mainbg.png" 
        alt="Journey Map" 
        className="w-full h-auto block"
      />

      {/* ───── Header (Back Button) ───── */}
      <div className="absolute top-0 left-0 w-full z-20 px-6 pt-safe pt-8 flex justify-between items-center">
        <button
          type="button"
          onClick={() => navigate('/student/mindlab')}
          className="p-2 -ml-2 text-white hover:opacity-80 transition bg-black/20 rounded-full backdrop-blur-sm shadow-md border border-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 pr-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Overlays for the nodes */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        
        {/* Node 1: Forest (Bottom Right) */}
        <div className="absolute" style={{ bottom: '20%', right: '15%' }}>
          <JourneyNode 
            num="01" 
            title="Forest" 
            status="Start" 
            img="/gamification/forest.png" 
            active={true}
            color="#10b981"
            onClick={() => navigate('/student/mindlab/week1')}
          />
        </div>

        {/* Node 2: River (Mid Left) */}
        <div className="absolute" style={{ bottom: '40%', left: '16%' }}>
          <JourneyNode 
            num="02" 
            title="River" 
            status="Locked" 
            img="/gamification/river.png" 
            active={false}
            color="#0ea5e9"
          />
        </div>

        {/* Node 3: Mountain (Mid Right) */}
        <div className="absolute" style={{ top: '35%', right: '12%' }}>
          <JourneyNode 
            num="03" 
            title="Mountain" 
            status="Locked" 
            img="/gamification/mountains.png" 
            active={false}
            color="#8b5cf6"
          />
        </div>

        {/* Node 4: Sky Hills (Top Left) */}
        <div className="absolute" style={{ top: '16%', left: '16%' }}>
          <JourneyNode 
            num="04" 
            title="Sky Hills" 
            status="Locked" 
            img="/gamification/skyhills.png" 
            active={false}
            color="#38bdf8"
          />
        </div>

        {/* Node 5: Summit (Top Right) */}
        <div className="absolute" style={{ top: '6%', right: '14%' }}>
          <JourneyNode 
            num="05" 
            title="Summit" 
            status="Locked" 
            img="/gamification/summit.png" 
            active={false}
            color="#eab308"
          />
        </div>

        {/* "Growth is a path" Text Overlay */}
        <div className="absolute bottom-[8%] left-6 pointer-events-none drop-shadow-2xl font-serif">
          <h2 className="text-[52px] leading-[1.1] text-white tracking-wide">
            Growth
          </h2>
          <div className="flex items-baseline gap-2 mt-[-5px]">
            <span className="text-[40px] leading-none text-white tracking-wide">is a</span>
            <span className="text-[56px] leading-none text-[#eab308] italic tracking-wide">path</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyNode({ num, title, status, img, active, color, onClick }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex flex-col items-center group outline-none"
    >
      {/* Node Image Container */}
      <div 
        className={`relative w-[110px] h-[115px] rounded-[18px] overflow-hidden transition-all ${
          active 
            ? 'border-[2px] border-[#34d399] shadow-[0_0_20px_rgba(52,211,153,0.5)]' 
            : 'border-[1px] border-black/80 shadow-[0_4px_12px_rgba(0,0,0,0.6)] opacity-90'
        }`}
      >
        {/* Background Image */}
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Dark overlay for locked state */}
        {!active && <div className="absolute inset-0 bg-black/40" />}

        {/* Bottom Gradient for Text Readability */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Text Content (Title & Status) */}
        <div className="absolute inset-x-0 bottom-0 pb-3 flex flex-col items-center">
          <p className="text-[13px] font-bold text-white drop-shadow-md tracking-wide">
            {title}
          </p>
          <div className="mt-1 h-[18px] flex items-center justify-center">
            {active ? (
              <span className="text-[9px] font-bold text-[#1a1a1a] bg-[#a7f3d0] px-3 py-0.5 rounded-full">
                {status}
              </span>
            ) : (
              <span className="text-[9px] font-medium text-gray-400">
                {status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Number Badge (overlapping left edge) */}
      <div 
        className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 rounded-full flex items-center justify-center border-2 border-black/90 shadow-md z-10"
        style={{ backgroundColor: color }}
      >
        <span className="text-[9px] font-black text-white leading-none">{num}</span>
      </div>
    </motion.button>
  );
}
