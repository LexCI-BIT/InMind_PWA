import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * MoodCheck — pixel-perfect Figma match.
 *
 * Moods: Happy=yellow, Sad=lavender/purple, Angry=salmon, Neutral=cyan
 * Layout: dark top → pills → rounded notch → colored card + CSS dome face
 */

export const MOODS = [
  { id: 'happy',   label: 'Happy',   pill: '#ffc800', pillText: '#1a1a1a', card: '#fef6cd', body: '#ffc800', cheek: 'rgba(230,160,10,0.3)',  face: 'happy'   },
  { id: 'sad',     label: 'Sad',     pill: '#a78bfa', pillText: '#1a1a1a', card: '#e6e2ff', body: '#a78bfa', cheek: 'rgba(130,100,220,0.35)', face: 'sad'     },
  { id: 'angry',   label: 'Angry',   pill: '#ff8c61', pillText: '#1a1a1a', card: '#ffe8dd', body: '#ff8c61', cheek: 'rgba(230,80,50,0.3)',   face: 'angry'   },
  { id: 'neutral', label: 'Neutral', pill: '#3bcece', pillText: '#1a1a1a', card: '#d9f6f6', body: '#3bcece', cheek: 'rgba(30,160,170,0.25)', face: 'neutral' },
  { id: 'anxious', label: 'Anxious', pill: '#c084fc', pillText: '#1a1a1a', card: '#ede9fe', body: '#c084fc', cheek: 'rgba(150,100,220,0.35)', face: 'anxious' },
  { id: 'tired',   label: 'Tired',   pill: '#9ca3af', pillText: '#1a1a1a', card: '#e5e7eb', body: '#9ca3af', cheek: 'rgba(140,140,140,0.35)',  face: 'tired'   },
];

export const NONE = { card: '#e3e3e3', body: '#777777', cheek: 'rgba(140,140,140,0.35)', face: 'default' };

export function MoodCheck() {
  const nav = useNavigate();
  const [sel, setSel] = useState(null);
  const m = sel ? MOODS.find(x => x.id === sel) : null;
  const t = m || NONE;

  return (
    <div style={{ position:'relative', width:'100%', maxWidth:440, margin:'0 auto', minHeight:'100dvh', background:'#242424', display:'flex', flexDirection:'column', overflow:'hidden', fontFamily:"'Poppins',sans-serif" }}>

      {/* ──── Dark top ──── */}
      <div style={{ padding:'48px 24px 0', background:'#242424' }}>
        <button type="button" onClick={() => nav(-1)} style={{ width:40, height:40, background:'rgba(255,255,255,0.08)', borderRadius:'50%', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', marginBottom:16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
        </button>
        <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}} style={{ color:'#fff', fontSize:34, lineHeight:1.15, margin:0, fontWeight:700, letterSpacing:'-0.5px' }}>
          How are you<br/>feeling today?
        </motion.h1>
      </div>

      {/* ──── Pills ──── */}
      <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.3}} className="no-scrollbar" style={{ display:'flex', gap:12, padding:'40px 24px 16px', overflowX:'auto', background:'#242424' }}>
        {MOODS.map(mood => {
          const on = sel === mood.id;
          return (
            <motion.button key={mood.id} type="button" onClick={() => setSel(mood.id)} whileTap={{scale:0.95}}
              style={{ flexShrink:0, padding:'12px 28px', borderRadius:24, border:'none', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:"'Poppins',sans-serif",
                transition:'background 0.35s, color 0.35s',
                background: on ? mood.pill : '#383838',
                color: on ? mood.pillText : 'rgba(255,255,255,0.8)' }}>
              {mood.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* ──── Bottom card + face ──── */}
      <div style={{ flexGrow:1, position:'relative', display:'flex', flexDirection:'column' }}>

        {/* Small rounded notch */}
        <svg viewBox="0 0 440 40" preserveAspectRatio="none" style={{ width:'100%', height:40, display:'block', marginBottom:-1, background:'#242424' }}>
          <motion.path 
            d="M 0,40 L 180,40 Q 195,40 205,25 Q 215,5 220,5 Q 225,5 235,25 Q 245,40 260,40 L 440,40 L 440,50 L 0,50 Z" 
            animate={{fill:t.card}} 
            transition={{duration:0.4}}
          />
        </svg>

        {/* Card bg */}
        <motion.div animate={{backgroundColor:t.card}} transition={{duration:0.4}} style={{ flexGrow:1, position:'relative', overflow:'hidden' }}>

          {/* Dome character */}
          <motion.div animate={{backgroundColor:t.body}} transition={{duration:0.4}} style={{ position:'absolute', bottom:-70, left:'50%', transform:'translateX(-50%)', width:'155%', maxWidth:600, height:500, borderRadius:'50% 50% 0 0' }}>
            {/* L cheek */}
            <motion.div animate={{backgroundColor:t.cheek}} transition={{duration:0.4}} style={{ position:'absolute', width:180, height:180, borderRadius:'50%', bottom:85, left:10 }}/>
            {/* R cheek */}
            <motion.div animate={{backgroundColor:t.cheek}} transition={{duration:0.4}} style={{ position:'absolute', width:180, height:180, borderRadius:'50%', bottom:85, right:10 }}/>

            {/* Face features */}
            <div style={{ position:'absolute', top:100, left:'50%', transform:'translateX(-50%)', width:150, height:140 }}>
              <FaceFeatures type={t.face}/>
            </div>
          </motion.div>

          {/* Submit */}
          <div style={{ position:'absolute', bottom:32, width:'100%', display:'flex', justifyContent:'center', zIndex:10 }}>
            <motion.button type="button" onClick={() => { if(sel) nav('/student/mood-reason',{state:{mood:sel},replace:true}); }} whileTap={{scale:0.96}}
              style={{ background:'#242424', color:'#fff', border:'none', padding:'16px 56px', borderRadius:32, fontSize:16, fontWeight:700, cursor:sel?'pointer':'not-allowed', opacity:sel?1:0.4, transition:'opacity 0.3s', fontFamily:"'Poppins',sans-serif" }}>
              Submit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────── Face features (eyes + brows + mouth) ─────────────── */

export function FaceFeatures({ type }) {
  const ink = '#333333';
  const strW = "5";

  switch (type) {

    /* ── HAPPY / DEFAULT ── */
    case 'happy':
    case 'default':
      return (
        <>
          {/* Eyes: Larger, perfectly round dots */}
          <div style={{ width:28, height:28, background:ink, borderRadius:'50%', position:'absolute', left:18, top:8 }}/>
          <div style={{ width:28, height:28, background:ink, borderRadius:'50%', position:'absolute', right:18, top:8 }}/>
          {/* Smile: Flatter bottom curve with vertical tips */}
          <svg viewBox="0 0 120 50" style={{ position:'absolute', bottom:4, left:'50%', transform:'translateX(-50%)', width:110 }}>
            <path d="M20,18 C20,38 100,38 100,18" fill="none" stroke={ink} strokeWidth="5.5" strokeLinecap="round"/>
          </svg>
        </>
      );

    /* ── SAD ── */
    case 'sad':
      return (
        <>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', left:20, top:16 }}/>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', right:20, top:16 }}/>
          <svg viewBox="0 0 150 28" style={{ position:'absolute', top:-4, left:'50%', transform:'translateX(-50%)', width:135 }}>
            <path d="M30,16 L45,8" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
            <path d="M120,16 L105,8" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
          <svg viewBox="0 0 120 50" style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:110 }}>
            <path d="M28,34 Q30,22 60,22 Q90,22 92,34" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
        </>
      );

    /* ── ANGRY ── */
    case 'angry':
      return (
        <>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', left:20, top:16 }}/>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', right:20, top:16 }}/>
          <svg viewBox="0 0 150 30" style={{ position:'absolute', top:-4, left:'50%', transform:'translateX(-50%)', width:135 }}>
            <path d="M30,8 L50,20" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
            <path d="M120,8 L100,20" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
          <svg viewBox="0 0 120 50" style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:110 }}>
            <path d="M28,34 Q30,22 60,22 Q90,22 92,34" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
        </>
      );

    /* ── NEUTRAL ── */
    case 'neutral':
      return (
        <>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', left:20, top:10 }}/>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', right:20, top:10 }}/>
          <svg viewBox="0 0 120 36" style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', width:100 }}>
            <path d="M28,14 L28,26 M28,20 L92,20 M92,14 L92,26" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
        </>
      );

    /* ── ANXIOUS ── */
    case 'anxious':
      return (
        <>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', left:20, top:16 }}/>
          <div style={{ width:24, height:24, background:ink, borderRadius:'50%', position:'absolute', right:20, top:16 }}/>
          <svg viewBox="0 0 150 28" style={{ position:'absolute', top:-6, left:'50%', transform:'translateX(-50%)', width:135 }}>
            <path d="M20,22 Q40,4 60,16" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
            <path d="M130,22 Q110,4 90,16" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
          <svg viewBox="0 0 120 40" style={{ position:'absolute', bottom:4, left:'50%', transform:'translateX(-50%)', width:105 }}>
            <path d="M25,22 Q40,10 60,22 Q80,34 95,22" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
        </>
      );

    /* ── TIRED ── */
    case 'tired':
      return (
        <>
          <svg viewBox="0 0 150 24" style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', width:135 }}>
            <path d="M20,16 Q35,2 50,16" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
            <path d="M100,16 Q115,2 130,16" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
          <svg viewBox="0 0 120 30" style={{ position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', width:100 }}>
            <path d="M30,15 L90,15" fill="none" stroke={ink} strokeWidth={strW} strokeLinecap="round"/>
          </svg>
        </>
      );
  }
}
