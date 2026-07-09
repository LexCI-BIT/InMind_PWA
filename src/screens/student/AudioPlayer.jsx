import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { saveProgress } from '../../lib/audioApi';

/* ─── Helper: format seconds → "mm:ss" ─── */
function fmtTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ─── Gradient presets per category ─── */
const CAT_GRADIENT = {
  audiobook: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  clip:      'linear-gradient(160deg, #0d1b2a 0%, #1b2838 50%, #1a3a2a 100%)',
  focus:     'linear-gradient(160deg, #1a1025 0%, #2d1b4e 50%, #1a1035 100%)',
};

export function AudioPlayer() {
  const navigate = useNavigate();
  const { state } = useLocation();          // track object passed via navigate state
  const track = state?.track;

  const audioRef = useRef(null);
  const progressSaveRef = useRef(null);     // debounce timer for saving progress

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrent] = useState(state?.startAt || 0);
  const [duration, setDuration] = useState(track?.duration_seconds || 0);

  /* ── Navigate away if no track data ── */
  useEffect(() => {
    if (!track) navigate(-1);
  }, [track, navigate]);

  /* ── Audio event handlers ── */
  const onLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
      if (state?.startAt) {
        audio.currentTime = state.startAt;
      }
    }
  }, [state?.startAt]);

  const onTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setCurrent(audio.currentTime);
  }, []);

  const onEnded = useCallback(() => {
    setPlaying(false);
    if (track) {
      saveProgress(track.id, Math.floor(duration), true).catch(() => {});
    }
  }, [track, duration]);

  /* ── Auto-save progress every 10 seconds ── */
  useEffect(() => {
    if (!track || !playing) return;
    progressSaveRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (audio) {
        saveProgress(track.id, Math.floor(audio.currentTime), false).catch(() => {});
      }
    }, 10_000);
    return () => clearInterval(progressSaveRef.current);
  }, [track, playing]);

  /* ── Save progress on unmount ── */
  useEffect(() => {
    return () => {
      if (track && audioRef.current) {
        saveProgress(track.id, Math.floor(audioRef.current.currentTime), false).catch(() => {});
      }
    };
  }, [track]);

  /* ── Controls ── */
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play().catch(() => {}); }
    setPlaying(!playing);
  };

  const skip = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
  };

  const seekTo = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  };

  if (!track) return null;

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bg = CAT_GRADIENT[track.category] || CAT_GRADIENT.clip;

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center font-sans select-none"
      style={{ background: bg }}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={track.audio_url}
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />

      {/* ── Back button ── */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-5 top-12 z-30 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Go back"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* ── Cover Art ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-28 mb-8"
      >
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-[28px] shadow-2xl"
          style={{ width: 260, height: 260, background: 'rgba(255,255,255,0.06)' }}
        >
          {track.cover_url ? (
            <img src={track.cover_url} alt={track.title} className="h-full w-full object-cover" />
          ) : (
            /* Fallback: styled icon */
            <div className="flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-20 w-20 opacity-30" fill="white">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
              <span className="text-white/20 text-xs font-bold tracking-widest uppercase">
                {track.category}
              </span>
            </div>
          )}

          {/* Glow overlay when playing */}
          {playing && (
            <motion.div
              className="absolute inset-0 rounded-[28px]"
              style={{ boxShadow: '0 0 60px 10px rgba(96, 165, 250, 0.15)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
      </motion.div>

      {/* ── Title & Author ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-1 text-center px-8"
      >
        <h1 className="text-[22px] font-bold text-white leading-tight">{track.title}</h1>
        {track.author && (
          <p className="mt-1.5 text-[13px] text-white/50 font-medium">{track.author}</p>
        )}
        {track.sub_category && (
          <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-white/60 uppercase">
            {track.sub_category}
          </span>
        )}
      </motion.div>

      {/* ── Progress Bar ── */}
      <div className="mt-10 w-full px-10">
        <div
          className="relative h-[5px] w-full cursor-pointer rounded-full bg-white/15 overflow-hidden"
          onClick={seekTo}
          role="slider"
          aria-valuenow={Math.floor(currentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-white transition-[width] duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-white/40 font-medium">
          <span>{fmtTime(currentTime)}</span>
          <span>{fmtTime(duration)}</span>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="mt-8 flex items-center justify-center gap-10">
        {/* Skip -15s */}
        <button
          type="button"
          onClick={() => skip(-15)}
          className="grid size-12 place-items-center rounded-full text-white/60 transition hover:text-white hover:bg-white/10"
          aria-label="Rewind 15 seconds"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
            <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            <text x="9" y="16" fontSize="7" fontWeight="bold" fill="currentColor">15</text>
          </svg>
        </button>

        {/* Play / Pause */}
        <motion.button
          type="button"
          onClick={togglePlay}
          whileTap={{ scale: 0.92 }}
          className="grid size-[72px] place-items-center rounded-full bg-white shadow-xl transition"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#111">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-8 w-8 ml-1" fill="#111">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        {/* Skip +15s */}
        <button
          type="button"
          onClick={() => skip(15)}
          className="grid size-12 place-items-center rounded-full text-white/60 transition hover:text-white hover:bg-white/10"
          aria-label="Forward 15 seconds"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
            <path d="M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6V3l5 5-5 5V9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4h2z" />
            <text x="9" y="16" fontSize="7" fontWeight="bold" fill="currentColor">15</text>
          </svg>
        </button>
      </div>

      {/* ── Description ── */}
      {track.description && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 mx-8 rounded-2xl bg-white/5 px-5 py-4"
        >
          <p className="text-[12px] leading-relaxed text-white/50">{track.description}</p>
        </motion.div>
      )}
    </section>
  );
}
