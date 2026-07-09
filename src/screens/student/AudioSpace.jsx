import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';
import { fetchTracks, getProgress } from '../../lib/audioApi';

/* ─── Category filter pills ─── */
const FILTERS = [
  { key: null,         label: 'All' },
  { key: 'clip',       label: 'Relax' },
  { key: 'focus',      label: 'Focus' },
  { key: 'audiobook',  label: 'Audiobooks' },
];

/* ─── Helper: format seconds → readable ─── */
function fmtDuration(sec) {
  if (!sec) return '';
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.floor(sec / 60)} min`;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

/* ─── Category-based icon gradients ─── */
const ICON_GRADIENTS = {
  clip:      'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  focus:     'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
  audiobook: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
};

export function AudioSpace() {
  const nav = useNavigate();

  const [tracks, setTracks] = useState([]);
  const [progressMap, setProgressMap] = useState({});    // { trackId: { position_seconds, completed } }
  const [activeFilter, setActiveFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ── Fetch tracks + progress ── */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [t, p] = await Promise.all([fetchTracks(), getProgress()]);
        if (cancelled) return;
        setTracks(t);
        const pMap = {};
        for (const entry of p) {
          pMap[entry.track_id] = entry;
        }
        setProgressMap(pMap);
      } catch (err) {
        console.warn('Audio fetch error (using fallback):', err.message);
        // Fallback: show empty state, the hardcoded seed data will appear once SQL is run
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  /* ── Filter tracks ── */
  const filtered = activeFilter
    ? tracks.filter((t) => t.category === activeFilter)
    : tracks;

  const clips = filtered.filter((t) => t.category === 'clip');
  const audiobooks = filtered.filter((t) => t.category === 'audiobook');
  const focusTracks = filtered.filter((t) => t.category === 'focus');

  /* ── Find continue-listening track ── */
  const continueTrack = tracks.find((t) => {
    const p = progressMap[t.id];
    return p && !p.completed && p.position_seconds > 0;
  });
  const continueProgress = continueTrack ? progressMap[continueTrack.id] : null;

  /* ── Navigate to player ── */
  const playTrack = (track, startAt = 0) => {
    nav('/student/audio/play', { state: { track, startAt } });
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 440, margin: '0 auto', minHeight: '100dvh', background: '#1c1c1e', display: 'flex', flexDirection: 'column', fontFamily: "'Poppins',sans-serif" }}>

      {/* Scrollable Content */}
      <div style={{ flexGrow: 1, overflowY: 'auto', paddingBottom: 120 }} className="no-scrollbar">

        {/* Header */}
        <div style={{ padding: '48px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button type="button" onClick={() => nav(-1)} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" /></svg>
          </button>
          <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Audio Space</h1>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ padding: '0 24px' }}>

          {/* ── Continue Listening Card ── */}
          <AnimatePresence>
            {continueTrack && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  background: 'linear-gradient(145deg, #2a304e 0%, #1a1b26 50%, #231c3b 100%)',
                  borderRadius: 24, padding: 24, position: 'relative', overflow: 'hidden',
                  marginBottom: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'rgba(120,80,250,0.15)', filter: 'blur(40px)', borderRadius: '50%' }} />

                <div style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 16, letterSpacing: 0.5 }}>
                  CONTINUE LISTENING
                </div>

                <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 20px 0', lineHeight: 1.2 }}>
                  {continueTrack.title}
                </h2>

                {/* Progress bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: 11, marginBottom: 8 }}>
                  <span>{fmtDuration(continueProgress.position_seconds)}</span>
                  <span>{fmtDuration(continueTrack.duration_seconds)}</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%',
                    width: `${(continueProgress.position_seconds / continueTrack.duration_seconds) * 100}%`,
                    background: '#60a5fa', borderRadius: 2,
                  }} />
                </div>

                <button
                  type="button"
                  onClick={() => playTrack(continueTrack, continueProgress.position_seconds)}
                  style={{ width: '100%', background: 'linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)', color: '#fff', border: 'none', padding: '14px 0', borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
                >
                  Resume
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Category Filters ── */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto' }} className="no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                style={{
                  flexShrink: 0, border: 'none', padding: '10px 24px', borderRadius: 24,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  background: activeFilter === f.key ? 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 100%)' : '#333',
                  color: activeFilter === f.key ? '#fff' : '#eee',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* ── Loading state ── */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block', fontSize: 24 }}>⏳</motion.div>
              <p style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Loading tracks…</p>
            </div>
          )}

          {/* ── Quick Calm / Clips Section ── */}
          {clips.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Quick Calm</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {clips.map((t, i) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => playTrack(t)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    style={{ background: '#262626', borderRadius: 20, padding: 16, display: 'flex', alignItems: 'center', gap: 16, border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 16, background: ICON_GRADIENTS.clip, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                    </div>
                    <div>
                      <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: '0 0 4px 0' }}>{t.title}</h4>
                      <div style={{ color: '#888', fontSize: 12 }}>{fmtDuration(t.duration_seconds)} • {t.sub_category || 'Calm'}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </>
          )}

          {/* ── Audiobooks Section ── */}
          {audiobooks.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Audiobooks for Growth</h3>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }} className="no-scrollbar">
                {audiobooks.map((t, i) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => playTrack(t, progressMap[t.id]?.position_seconds || 0)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    style={{ flexShrink: 0, width: 180, background: '#262626', borderRadius: 20, padding: 16, border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ width: '100%', height: 180, background: ICON_GRADIENTS.audiobook, borderRadius: 16, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {t.cover_url ? (
                        <img src={t.cover_url} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} />
                      ) : (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity="0.4">
                          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z" />
                        </svg>
                      )}
                    </div>
                    <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: '0 0 6px 0' }}>{t.title}</h4>
                    <div style={{ color: '#888', fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>
                      {fmtDuration(t.duration_seconds)} • AUDIOBOOK
                    </div>
                    {/* Progress indicator */}
                    {progressMap[t.id] && !progressMap[t.id].completed && (
                      <div style={{ marginTop: 8, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(progressMap[t.id].position_seconds / t.duration_seconds) * 100}%`, background: '#60a5fa', borderRadius: 2 }} />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </>
          )}

          {/* ── Focus Sessions Section ── */}
          {focusTracks.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Focus Sessions</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {focusTracks.map((t, i) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => playTrack(t)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    style={{ background: '#262626', borderRadius: 20, padding: 16, display: 'flex', alignItems: 'center', gap: 16, border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="#aaa" stroke="none" />
                      </svg>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: '0 0 4px 0' }}>{t.title}</h4>
                      <div style={{ color: '#888', fontSize: 12 }}>{fmtDuration(t.duration_seconds)} • {t.sub_category || 'Focus'}</div>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </>
          )}

          {/* ── Empty state ── */}
          {!loading && tracks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}>
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="#444" stroke="none" />
              </svg>
              <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>No tracks yet</h3>
              <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}>
                Audio tracks will appear here once they are uploaded to Supabase Storage and the migration is run.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Nav */}
      <StudentDock active="home" />
    </div>
  );
}
