import { motion } from 'framer-motion';

export function ActivityFrame({ children, className = '' }) {
  return (
    <section className={`relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-black font-sans text-white ${className}`}>
      {children}
    </section>
  );
}

export function BackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative z-20 grid size-9 place-items-center rounded-full text-white transition hover:bg-white/10"
      aria-label="Go back"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

export function OptionRow({ icon, title, subtitle, accent, selected = false, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="flex h-[64px] w-full items-center rounded-[12px] border bg-[#050505] px-4 text-left transition"
      style={{
        borderColor: selected ? accent : 'rgba(255,255,255,0.15)',
        boxShadow: selected ? `0 0 12px ${accent}44, inset 0 0 16px ${accent}15` : 'none',
      }}
    >
      <span className="mr-4 grid size-10 shrink-0 place-items-center" style={{ color: accent }}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-semibold tracking-wide text-white">{title}</span>
        <span className="mt-1 block text-[10px] font-medium leading-none text-white/60">{subtitle}</span>
      </span>
      <span className="grid size-5 place-items-center opacity-90 transition-opacity group-hover:opacity-100" style={{ color: accent }}>
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16" />
          <path d="M14 6l6 6-6 6" />
        </svg>
      </span>
    </motion.button>
  );
}

export function DurationButton({ minutes, selected, accent, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className="grid h-[64px] w-[54px] place-items-center rounded-[10px] border bg-transparent text-white transition"
      style={{
        borderColor: selected ? accent : 'transparent',
        boxShadow: selected ? `0 0 16px ${accent}44` : 'none',
      }}
    >
      <span className="flex flex-col items-center leading-none">
        <TimerTinyIcon />
        <span className="mt-[6px] text-[16px] font-bold">{minutes}</span>
        <span className="mt-1 text-[9px] font-medium text-white/80">mins</span>
      </span>
    </motion.button>
  );
}

export function BottomControls({ running, onEnd, onPause, onRestart }) {
  return (
    <div className="relative z-20 grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 pb-safe pb-5">
      <button type="button" onClick={onEnd} className="flex flex-col items-center justify-center text-white/90 transition hover:text-white">
        <XIcon />
        <span className="mt-1 text-[13px] leading-none">End</span>
      </button>
      <button
        type="button"
        onClick={onPause}
        className="inline-flex h-[46px] min-w-[136px] items-center justify-center gap-3 rounded-[10px] bg-[#464f60] px-5 text-[16px] font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-[#525d70]"
      >
        {running ? <PauseIcon /> : <PlayIcon />}
        {running ? 'Pause' : 'Start'}
      </button>
      <button type="button" onClick={onRestart} className="flex flex-col items-center justify-center text-white/90 transition hover:text-white">
        <RestartIcon />
        <span className="mt-1 text-[13px] leading-none">Restart</span>
      </button>
    </div>
  );
}

export function BreathingOrb({ size = 200, active = false, phase = 'Inhale' }) {
  const particles = [
    [7, 43, 3], [16, 70, 2], [25, 18, 2], [39, 11, 1.8], [76, 9, 1.8], [88, 37, 3],
    [93, 59, 1.8], [77, 81, 2.8], [60, 91, 2], [31, 87, 2], [10, 59, 2.4], [50, 4, 1.4],
  ];

  // Determine scale and transition based on phase
  let scale = active ? 1 : [0.95, 1.02, 0.95];
  let transitionDuration = active ? 4 : 6;
  let ease = 'easeInOut';

  if (active) {
    if (phase === 'Inhale') {
      scale = 1.35;
      transitionDuration = 4;
      ease = 'easeOut';
    } else if (phase === 'Hold') {
      scale = 1.35;
      transitionDuration = 4;
      ease = 'linear';
    } else if (phase === 'Exhale') {
      scale = 0.85;
      transitionDuration = 6;
      ease = 'easeInOut';
    }
  }

  return (
    <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0">
        {particles.map(([left, top, dot], index) => (
          <motion.span
            key={`${left}-${top}`}
            className="absolute rounded-full bg-[#26d9ff]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: dot,
              height: dot,
              boxShadow: '0 0 10px #2adfff',
              opacity: index % 3 === 0 ? 0.95 : 0.6,
            }}
            animate={{ scale: active ? [0.8, 1.2, 0.8] : 1 }}
            transition={{ duration: 3 + (index % 3), repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      
      {/* Outer Ring */}
      <motion.div
        className="absolute rounded-full border border-[#20d9ff]/80"
        style={{
          width: size * 0.72,
          height: size * 0.72,
          boxShadow: '0 0 18px rgba(32,217,255,0.55), inset 0 0 22px rgba(32,217,255,0.25)',
        }}
        animate={{ rotate: 360, scale }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, 
          scale: { duration: transitionDuration, ease, repeat: active ? 0 : Infinity } 
        }}
      />
      
      {/* Middle Ring */}
      <motion.div
        className="absolute rounded-full border border-[#58f3ff]/70"
        style={{
          width: size * 0.64,
          height: size * 0.82,
          boxShadow: '0 0 18px rgba(38,217,255,0.5)',
        }}
        animate={{ rotate: -360, scale }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, 
          scale: { duration: transitionDuration, ease, repeat: active ? 0 : Infinity } 
        }}
      />
      
      {/* Inner Ring */}
      <motion.div
        className="absolute rounded-full border border-[#1ccfff]/50"
        style={{ width: size * 0.82, height: size * 0.62 }}
        animate={{ rotate: 360, scale }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, 
          scale: { duration: transitionDuration, ease, repeat: active ? 0 : Infinity } 
        }}
      />
      
      {/* Core Glowing Orb */}
      <motion.div
        className="relative grid rounded-full place-items-center"
        style={{
          width: size * 0.36,
          height: size * 0.36,
          background: 'radial-gradient(circle at 35% 28%, #d8ffff 0%, #66eff6 43%, #18c7dc 100%)',
          boxShadow: '0 0 36px rgba(88,243,255,0.9), inset 0 -10px 18px rgba(0,111,139,0.2)',
        }}
        animate={{ scale }}
        transition={{ duration: transitionDuration, ease, repeat: active ? 0 : Infinity }}
      >
        <div className="relative h-8 w-12 opacity-80">
          <span className="absolute left-[9px] top-[8px] h-[7px] w-[10px] rounded-b-full border-b-2 border-black" />
          <span className="absolute right-[9px] top-[8px] h-[7px] w-[10px] rounded-b-full border-b-2 border-black" />
          <motion.span 
            className="absolute left-1/2 top-[22px] h-[7px] w-[18px] -translate-x-1/2 rounded-b-full border-b-2 border-black"
            animate={{ height: phase === 'Exhale' ? 3 : 7 }}
            transition={{ duration: transitionDuration }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function FocusScene() {
  return (
    <div
      className="relative mx-auto flex items-center justify-center overflow-hidden"
      style={{
        width: 320,
        height: 240,
        WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
        maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
      }}
    >
      <img src="/illustrations/focus_boy.png" alt="Focus Mode" className="h-full w-full object-cover" />
    </div>
  );
}

export function MeditationScene() {
  return (
    <div
      className="relative mx-auto flex items-center justify-center overflow-hidden"
      style={{
        width: 320,
        height: 240,
        WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
        maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
      }}
    >
      <img src="/illustrations/meditation_boy.png" alt="Meditation Mode" className="h-full w-full object-cover" />
    </div>
  );
}

export function FocusCircle({ progress, time, label }) {
  const size = 300;
  const radius = 135;
  const center = size / 2;
  const angle = (1 - progress) * Math.PI * 2 - Math.PI / 2;
  const dotX = center + radius * Math.cos(angle);
  const dotY = center + radius * Math.sin(angle);
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="white" strokeWidth="4" />
        <circle cx={center} cy={center - radius} r="7" fill="#ff625e" />
        <circle cx={dotX} cy={dotY} r="7" fill="#ff625e" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[64px] font-bold tracking-tight text-white tabular-nums leading-none">{time}</div>
        <div className="mt-3 text-[14px] font-medium text-white/60">{label}</div>
      </div>
    </div>
  );
}

export function TimerTinyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="7" />
      <path d="M9 2h6M12 7v5l3 2" />
    </svg>
  );
}

export function NeonTargetIcon() {
  return (
    <div className="relative grid size-full place-items-center">
      <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-md" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <path d="M21 3L14 10" strokeWidth="2" />
        <path d="M21 3h-5M21 3v5" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function NeonBookIcon() {
  return (
    <div className="relative grid size-full place-items-center">
      <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-md" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        <path d="M6 7h2M6 11h2M6 15h2M16 7h2M16 11h2M16 15h2" />
      </svg>
    </div>
  );
}

export function NeonBellIcon() {
  return (
    <div className="relative grid size-full place-items-center">
      <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-md" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
        <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
        <path d="M18 8a6 6 0 0 0-9.33-5" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    </div>
  );
}

export function NeonLotusIcon() {
  return (
    <div className="relative grid size-full place-items-center">
      <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-md" />
      <svg viewBox="0 0 24 24" className="relative h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
        <path d="M12 22c4-2 8-5 8-10 0-3-2-5-4-5s-4 3-4 5c0-2-2-5-4-5s-4 2-4 5c0 5 4 8 8 10z" />
        <path d="M12 22c-2-3-4-6-4-9M12 22c2-3 4-6 4-9" />
        <path d="M7 21h10" strokeOpacity="0.4" />
        <path d="M4 19h16" strokeOpacity="0.2" />
        <circle cx="6" cy="6" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="18" cy="7" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="4" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

export function NeonMindIcon() {
  return (
    <div className="relative grid size-full place-items-center">
      <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-md" />
      <svg viewBox="0 0 24 24" className="relative h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
        <path d="M12 22a8 8 0 0 0 8-8c0-3.5-2-6-4-8-1.5-1.5-2.5-3-2.5-4 0 1-1 2.5-2.5 4-2 2-4 4.5-4 8a8 8 0 0 0 5 7.5v.5" />
        <path d="M9 13s1-2 3-2 3 2 3 2M9 16s1 1.5 3 1.5 3-1.5 3-1.5" />
        <path d="M12 7v2" />
      </svg>
    </div>
  );
}

export function NeonMeditateIcon() {
  return (
    <div className="relative grid size-full place-items-center">
      <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-md" />
      <svg viewBox="0 0 24 24" className="relative h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
        <circle cx="12" cy="6" r="2.5" />
        <path d="M12 10.5c-3 0-5.5 2-5.5 5.5l-2 3M12 10.5c3 0 5.5 2 5.5 5.5l2 3" />
        <path d="M7 19.5h10M5 22h14" strokeOpacity="0.4" />
        <circle cx="5" cy="11" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="11" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="8" cy="5" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7 4l12 8-12 8z" />
    </svg>
  );
}

function RestartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v6h6" />
      <path d="M20 11a8 8 0 1 0-2.35 5.65" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M7 7l10 10M17 7L7 17" />
    </svg>
  );
}
