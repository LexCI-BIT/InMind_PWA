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
    image: '/illustrations/yoga_meditation.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 2,
    title: 'Evening Yoga Flow',
    level: 'Beginner',
    description: 'Unwind and prepare your body for restful sleep',
    duration: '10:30',
    color: '#93c5fd',
    image: '/illustrations/yoga_meditation.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 3,
    title: 'Stress Relief Yoga',
    level: 'Intermediate',
    description: 'Calm your mind and reduce daily stress',
    duration: '15:00',
    color: '#f59e0b',
    image: '/illustrations/yoga_upward_dog.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 4,
    title: 'Core Strength Yoga',
    level: 'Advanced',
    description: 'Strengthen your core and improve balance',
    duration: '20:00',
    color: '#f28468',
    image: '/illustrations/yoga_triangle.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 5,
    title: 'Power Vinyasa',
    level: 'Advanced',
    description: 'High intensity flow for experienced practitioners',
    duration: '25:00',
    color: '#c4b5fd',
    image: '/illustrations/yoga_triangle.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
];

function LevelBadge({ level }) {
  const colors = {
    Beginner:     { border: '#f59e0b', text: '#f59e0b' },
    Intermediate: { border: '#00d48f', text: '#00d48f' },
    Advanced:     { border: '#f28468', text: '#f28468' },
  };
  const c = colors[level] || colors.Beginner;
  return (
    <span
      className="text-[9px] font-bold px-2.5 py-1 rounded-full border bg-black/40 backdrop-blur-sm"
      style={{ borderColor: c.border, color: c.text }}
    >
      {level}
    </span>
  );
}

export function YogaSession({ onBack }) {
  const [filter, setFilter] = useState('All');
  const [activeSession, setActiveSession] = useState(SESSIONS.find(s => s.featured) || SESSIONS[0]);
  const [showPlayer, setShowPlayer] = useState(false);
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
    setShowPlayer(true);
    setPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  };

  const handleBack = () => {
    if (showPlayer) {
      setShowPlayer(false);
      setPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      if (onBack) onBack();
    }
  };

  return (
    <section className="relative mx-auto flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans pb-10">

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-8 flex items-center gap-3 shrink-0">
        <button type="button" onClick={handleBack} className="text-white p-2 -ml-2 transition hover:opacity-70">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {showPlayer && (
        <h1 className="relative z-10 text-center text-[28px] font-bold text-[#00d48f] -mt-1 shrink-0">Yoga</h1>
      )}

      {/* Scrollable body */}
      <div className="relative z-10 flex-1 overflow-y-auto">

        {!showPlayer ? (
          <div className="px-6 mt-3 mb-6">
            <h1 className="text-[36px] font-bold text-white leading-[1.1] tracking-tight">
              <span className="text-[#00d48f]">Move</span> your body,<br/>
              clam your mind.
            </h1>
            <p className="text-[13px] font-medium text-white/70 mt-3">Feel strong, balanced and connected</p>
            <div className="w-full mt-10 mb-4 flex justify-center">
              <img src="/illustrations/yoga_boy_warrior.png" alt="Yoga Illustration" className="w-[110%] max-w-[360px] h-auto object-contain drop-shadow-2xl" style={{ filter: 'drop-shadow(0 20px 30px rgba(0,212,143,0.15))' }} />
            </div>
          </div>
        ) : (
          <>
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
                  className="grid size-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
                </button>

                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={handlePlay}
                  className="grid size-14 place-items-center rounded-full bg-white/30 text-white hover:bg-white/40 backdrop-blur-sm transition"
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 ml-1" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Forward 10s */}
                <button
                  type="button"
                  onClick={() => handleSkip(10)}
                  className="grid size-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
                </button>
              </div>

              {/* Progress bar + time */}
              <div>
                <div className="w-full h-[3px] rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: '#00d48f' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-white/80 font-medium tabular-nums">{currentTime}</span>
                  <span className="text-[10px] text-white/80 font-medium tabular-nums">{activeSession.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video info */}
          <div className="flex items-start justify-between mt-4">
            <div className="flex-1">
              <h3 className="text-[16px] font-medium text-white leading-tight">{activeSession.title}</h3>
              <p className="text-[11px] text-[#888] mt-1 leading-relaxed">A perfect 15 min routine to start your day with energy and positivity</p>
            </div>
            <button className="shrink-0 ml-3 grid size-8 place-items-center rounded-lg bg-[#ff5c00] text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>
        </>
        )}

        {/* ───── Filter Pills ───── */}
        <div className="px-6 mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
          {FILTERS.map(f => {
            const isActive = filter === f;
            return (
              <motion.button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                whileTap={{ scale: 0.95 }}
                className={[
                  'shrink-0 rounded-full px-4 py-2 text-[12px] font-bold transition',
                  isActive
                    ? 'bg-[#00d48f] text-white'
                    : 'bg-[#555] text-white hover:bg-[#666]',
                ].join(' ')}
              >
                {f}
              </motion.button>
            );
          })}
        </div>

        {/* ───── Yoga Sessions List ───── */}
        <div className="px-6 mt-5 mb-6">
          <h3 className="text-[14px] font-medium text-white/90 mb-4">Yoga Sessions</h3>

          <div className="flex flex-col gap-6">
            {filtered.map((session, idx) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.3 }}
                onClick={() => handleSelectSession(session)}
                className={[
                  'flex items-center gap-4 transition cursor-pointer',
                  activeSession.id === session.id
                    ? 'opacity-100'
                    : 'opacity-80 hover:opacity-100',
                ].join(' ')}
              >
                {/* Thumbnail */}
                <div className="relative shrink-0 w-[100px] h-[100px] rounded-[16px] overflow-hidden bg-[#111]">
                  <img src={session.image || "/illustrations/yoga_boy_warrior.png"} alt={session.title} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/10 grid place-items-center">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 ml-1 text-white drop-shadow-md" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 py-1">
                  <p className="text-[13px] font-medium text-white leading-tight truncate">{session.title}</p>
                  <p className="text-[10px] text-[#888] mt-1">{session.level}</p>
                  <p className="text-[10px] text-white mt-1.5 leading-snug line-clamp-2">A perfect 15 min routine to start your day with energy and positivity</p>
                </div>

                {/* Download Button */}
                <button className="shrink-0 grid size-8 place-items-center rounded-lg bg-[#ff5c00] text-white hover:bg-[#ff7a2e] transition" onClick={(e) => e.stopPropagation()}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
