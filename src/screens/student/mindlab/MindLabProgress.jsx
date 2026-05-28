import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MindLabProgress() {
  const navigate = useNavigate();

  // Positioning the nodes based on the path in mainbg.png
  // The background image determines the overall height. We'll set a tall container.
  
  return (
    <section className="relative mx-auto w-full max-w-[440px] bg-[#0c120c] font-sans min-h-[100dvh]">
      
      {/* Background Image - determines height */}
      <img 
        src="/gamification/mainbg.png" 
        alt="Journey Map" 
        className="w-full h-auto block"
      />

      {/* ───── Header (Back Button) ───── */}
      <div className="absolute top-0 left-0 w-full z-10 px-6 pt-safe pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-white hover:opacity-80 transition bg-black/20 rounded-full backdrop-blur-sm"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* 
        Overlays for the nodes. 
        Since the image is responsive (w-full), we use percentages for top/left to keep them aligned with the path.
        These percentages are estimates based on the screenshot.
      */}
      <div className="absolute top-0 left-0 w-full h-full">
        
        {/* Node 1: Forest (Bottom Right) */}
        <div className="absolute" style={{ bottom: '15%', right: '12%' }}>
          <JourneyNode 
            num="01" 
            title="Forest" 
            status="Start" 
            img="/gamification/forest.png" 
            active={true}
            color="#22c55e"
          />
        </div>

        {/* Node 2: River (Mid Left) */}
        <div className="absolute" style={{ bottom: '38%', left: '12%' }}>
          <JourneyNode 
            num="02" 
            title="River" 
            status="Locked" 
            img="/gamification/river.png" 
            active={false}
            color="#3b82f6"
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
        <div className="absolute" style={{ top: '15%', left: '15%' }}>
          <JourneyNode 
            num="04" 
            title="Sky Hills" 
            status="Locked" 
            img="/gamification/skyhills.png" 
            active={false}
            color="#0ea5e9"
          />
        </div>

        {/* Node 5: Summit (Top Right) */}
        <div className="absolute" style={{ top: '5%', right: '15%' }}>
          <JourneyNode 
            num="05" 
            title="Summit" 
            status="Locked" 
            img="/gamification/summit.png" 
            active={false}
            color="#eab308"
          />
        </div>

        {/* "Growth is a path" text overlay at bottom left */}
        <div className="absolute bottom-[10%] left-6 pointer-events-none">
          <h2 className="text-[42px] leading-tight font-serif text-white drop-shadow-lg">
            Growth<br/>
            is a <span className="text-[#f5b30c] italic font-medium">path</span>
          </h2>
        </div>

      </div>
    </section>
  );
}

function JourneyNode({ num, title, status, img, active, color }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center group"
    >
      {/* Node Image */}
      <div 
        className={`w-[90px] h-[90px] rounded-[16px] overflow-hidden shadow-xl border-2 transition-all ${
          active ? 'border-green-400 shadow-green-900/50' : 'border-black/50 shadow-black/50 opacity-90'
        }`}
      >
        <img src={img} alt={title} className="w-full h-full object-cover" />
        
        {/* Dark overlay for locked state */}
        {!active && <div className="absolute inset-0 bg-black/30" />}
      </div>

      {/* Number Badge (overlapping top left) */}
      <div 
        className="absolute -left-3 top-4 size-6 rounded-full flex items-center justify-center border-2 border-black/80 shadow-md z-10"
        style={{ backgroundColor: color }}
      >
        <span className="text-[9px] font-bold text-white">{num}</span>
      </div>

      {/* Title & Status */}
      <div className="mt-2 text-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
        <p className="text-[12px] font-bold text-white leading-tight drop-shadow-md">
          {title}
        </p>
        <p className={`text-[9px] font-bold uppercase mt-0.5 ${
          active ? 'text-[#bbf7d0] bg-green-500/20 px-2 py-0.5 rounded-full' : 'text-gray-400'
        }`}>
          {status}
        </p>
      </div>
    </motion.button>
  );
}
