import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * YogaSession — Yoga screen with featured video player,
 * difficulty filter pills, and scrollable session list.
 */

const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const SESSIONS = [
  {
    id: 1,
    title: 'Morning Yoga Flow',
    level: 'Beginner',
    description: 'A perfect 15 min routine to start your day with energy and positivity',
    duration: '12:45',
    featured: true,
    color: '#8ed2b1',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 2,
    title: 'Evening Yoga Flow',
    level: 'Beginner',
    description: 'Unwind and prepare your body for restful sleep',
    duration: '10:30',
    color: '#93c5fd',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 3,
    title: 'Stress Relief Yoga',
    level: 'Intermediate',
    description: 'Calm your mind and reduce daily stress',
    duration: '15:00',
    color: '#f59e0b',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 4,
    title: 'Core Strength Yoga',
    level: 'Advanced',
    description: 'Strengthen your core and improve balance',
    duration: '20:00',
    color: '#f28468',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 5,
    title: 'Power Vinyasa',
    level: 'Advanced',
    description: 'High intensity flow for experienced practitioners',
    duration: '25:00',
    color: '#c4b5fd',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
];

function LevelBadge({ level }) {
  const colors = {
    Beginner:     { bg: '#8ed2b1', text: '#1a1a1a' },
    Intermediate: { bg: '#f59e0b', text: '#1a1a1a' },
    Advanced:     { bg: '#f28468', text: '#1a1a1a' },
  };
  const c = colors[level] || colors.Beginner;
  return (
    <span
      className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
      style={{ background: c.bg, color: c.text }}
    >
      {level}
    </span>
  );
}

export function YogaSession({ onBack }) {
  const [filter, setFilter] = useState('All');
  const [activeSession, setActiveSession] = useState(SESSIONS.find(s => s.featured) || SESSIONS[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const videoRef = useRef(null);

  const filtered = filter === 'All' ? SESSIONS : SESSIONS.filter(s => s.level === filter);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const pct = (v.currentTime / v.duration) * 100 || 0;
    setProgress(pct);
    const m = Math.floor(v.currentTime / 60);
    const s = Math.floor(v.currentTime % 60);
    setCurrentTime(`${m}:${String(s).padStart(2, '0')}`);
  };

  const handleSkip = (sec) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + sec);
  };

  const handleSelectSession = (session) => {
    setActiveSession(session);
    setPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans pb-10">

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-8 flex items-center gap-3">
        <button type="button" onClick={onBack} className="text-white p-2 -ml-2 transition hover:opacity-70">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <h1 className="relative z-10 text-center text-[28px] font-bold text-white -mt-1">Yoga</h1>

      {/* Scrollable body */}
      <div className="relative z-10 flex-1 overflow-y-auto">

        {/* ───── Find Your Flow ───── */}
        <div className="px-6 mt-5">
          <h2 className="text-[18px] font-bold text-white">Find Your Flow</h2>
        </div>

        {/* ───── Featured Video Player ───── */}
        <div className="px-6 mt-4">
          <div className="relative rounded-[20px] overflow-hidden bg-[#222] aspect-video">
            {/* Video element */}
            <video
              ref={videoRef}
              src={activeSession.video}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setPlaying(false)}
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
            />

            {/* Overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex flex-col justify-between p-4">
              {/* Level badge */}
              <div>
                <LevelBadge level={activeSession.level} />
              </div>

              {/* Center play controls */}
              <div className="flex items-center justify-center gap-6">
                {/* Rewind 10s */}
                <button
                  type="button"
                  onClick={() => handleSkip(-10)}
                  className="text-white/70 hover:text-white transition"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                  </svg>
                </button>

                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={handlePlay}
                  className="grid size-12 place-items-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 ml-0.5" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Forward 10s */}
                <button
                  type="button"
                  onClick={() => handleSkip(10)}
                  className="text-white/70 hover:text-white transition"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8V1l-5 5 5 5V7c3.31 0 6 2.69 6 6z" />
                  </svg>
                </button>
              </div>

              {/* Progress bar + time */}
              <div>
                <div className="w-full h-[3px] rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-white/60 font-medium tabular-nums">{currentTime}</span>
                  <span className="text-[10px] text-white/60 font-medium tabular-nums">{activeSession.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video info */}
          <div className="flex items-start justify-between mt-4">
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-white leading-tight">{activeSession.title}</h3>
              <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{activeSession.description}</p>
            </div>
            <button className="shrink-0 ml-3 grid size-9 place-items-center rounded-xl bg-[#f28468] text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* ───── Filter Pills ───── */}
        <div className="px-6 mt-6 flex items-center gap-2">
          {FILTERS.map(f => {
            const isActive = filter === f;
            return (
              <motion.button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                whileTap={{ scale: 0.95 }}
                className={[
                  'rounded-full px-4 py-2 text-[11px] font-bold border transition',
                  isActive
                    ? 'bg-[#f59e0b] border-[#f59e0b] text-[#1a1a1a]'
                    : 'bg-transparent border-[#444] text-white/60 hover:border-white/40',
                ].join(' ')}
              >
                {f}
              </motion.button>
            );
          })}
        </div>

        {/* ───── Yoga Sessions List ───── */}
        <div className="px-6 mt-5 mb-6">
          <h3 className="text-[14px] font-bold text-white/70 mb-4">Yoga Sessions</h3>

          <div className="flex flex-col gap-4">
            {filtered.map((session, idx) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.3 }}
                onClick={() => handleSelectSession(session)}
                className={[
                  'flex items-center gap-3 p-3 rounded-2xl transition cursor-pointer',
                  activeSession.id === session.id
                    ? 'bg-[#2a2a2a] ring-1 ring-[#444]'
                    : 'hover:bg-[#222]',
                ].join(' ')}
              >
                {/* Thumbnail */}
                <div
                  className="relative shrink-0 size-[64px] rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${session.color}, ${session.color}88)` }}
                >
                  {/* Pose emoji */}
                  <span className="text-[28px]">🧘</span>
                  {/* Play icon */}
                  <div className="absolute bottom-1.5 left-1.5 size-5 rounded-full bg-black/50 backdrop-blur-sm grid place-items-center">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 ml-px text-white" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-white leading-tight truncate">{session.title}</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{ color: session.color }}>{session.level}</p>
                  <p className="text-[11px] text-white/40 mt-0.5 leading-snug line-clamp-2">{session.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
