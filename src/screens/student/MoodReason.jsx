import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOODS, FaceFeatures } from './MoodCheck';

const REASONS = [
  { id: 'family', label: 'Family', icon: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> },
  { id: 'relationship', label: 'Relationship', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/> },
  { id: 'friends', label: 'Friends', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/> },
  { id: 'school', label: 'School', icon: <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/> },
  { id: 'health', label: 'Health', icon: <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-5.4 12l-2.6-2.6 1.4-1.4 1.2 1.2 3.8-3.8 1.4 1.4-5.2 5.2z"/> },
  { id: 'exercise', label: 'Exercise', icon: <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 1.43-1.43z"/> },
  { id: 'work', label: 'Work', icon: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/> },
  { id: 'food', label: 'Food', icon: <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/> },
  { id: 'sleep', label: 'Sleep', icon: <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/> },
];

const SECONDARY = [
  'Stressed', 'Anxious', 'Tired',
  'Lonely', 'Bored', 'Sick',
  'Confused', 'Lost', 'Numb'
];

export function MoodReason() {
  const { state } = useLocation();
  const nav = useNavigate();
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedSecondary, setSelectedSecondary] = useState([]);

  if (!state?.mood) {
    return <Navigate to="/student/mood" replace />;
  }

  const mood = MOODS.find(m => m.id === state.mood) || MOODS[0];

  const toggleSecondary = (sec) => {
    setSelectedSecondary(prev => 
      prev.includes(sec) ? prev.filter(p => p !== sec) : [...prev, sec]
    );
  };

  return (
    <div style={{ position:'relative', width:'100%', maxWidth:440, margin:'0 auto', minHeight:'100dvh', background:'#242424', display:'flex', flexDirection:'column', fontFamily:"'Poppins',sans-serif" }}>
      
      {/* ──── Dark top ──── */}
      <div style={{ padding:'48px 24px 0', background:'#242424', display:'flex', alignItems:'center' }}>
        <button type="button" onClick={() => nav(-1)} style={{ width:40, height:40, background:'rgba(255,255,255,0.08)', borderRadius:'50%', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
        </button>
      </div>

      {/* ──── Content Area ──── */}
      <div style={{ flexGrow:1, padding:'60px 16px 24px', position:'relative', display:'flex', flexDirection:'column', marginTop:20 }}>
        
        {/* The Card */}
        <div style={{ flexGrow:1, background: mood.card, borderRadius: 24, padding:'40px 16px 24px', display:'flex', flexDirection:'column', alignItems:'center', position:'relative', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
          
          {/* Peeking Character Face */}
          <div style={{ position:'absolute', top: -45, width:90, height:90, borderRadius:'50%', background: mood.body, boxShadow:'0 4px 10px rgba(0,0,0,0.15)', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%) scale(0.6)', width:150, height:120 }}>
              <FaceFeatures type={mood.face} />
            </div>
          </div>

          <h2 style={{ margin:'16px 0 24px', fontSize:22, fontWeight:700, color:'#2b2b2b', textAlign:'center', lineHeight:1.3 }}>
            What made you feel<br/>{mood.label} today?
          </h2>

          {/* Primary Reasons Grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, width:'100%', marginBottom:32 }}>
            {REASONS.map(r => {
              const active = selectedReason === r.id;
              return (
                <button 
                  key={r.id} 
                  onClick={() => setSelectedReason(r.id)}
                  style={{ 
                    background: active ? mood.pill : '#ffffff', 
                    borderRadius:16, 
                    padding:'16px 8px', 
                    border:'none', 
                    display:'flex', 
                    flexDirection:'column', 
                    alignItems:'center', 
                    gap:8, 
                    cursor:'pointer',
                    boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
                    transition:'all 0.2s'
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill={active ? '#fff' : mood.pill}>
                    {r.icon}
                  </svg>
                  <span style={{ fontSize:11, fontWeight:700, color: active ? '#fff' : mood.pill, textTransform:'capitalize' }}>
                    {r.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p style={{ fontSize:10, fontWeight:700, color:'#888', letterSpacing:0.5, marginBottom:16 }}>
            FEELING ANYTHING ELSE?
          </p>

          {/* Secondary Pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:32 }}>
            {SECONDARY.map(sec => {
              const active = selectedSecondary.includes(sec);
              return (
                <button
                  key={sec}
                  onClick={() => toggleSecondary(sec)}
                  style={{
                    background: active ? mood.pill : '#ffffff',
                    color: active ? '#ffffff' : mood.pill,
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s'
                  }}
                >
                  {sec}
                </button>
              );
            })}
          </div>

          {/* Spacer */}
          <div style={{ flexGrow:1 }} />

          {/* Check In Button */}
          <motion.button 
            type="button" 
            onClick={() => nav('/student/home', { replace: true })} 
            whileTap={{scale:0.96}}
            style={{ 
              background: mood.pill, 
              color: mood.id === 'happy' ? '#1a1a1a' : '#ffffff',
              border:'none', 
              padding:'16px', 
              width:'100%',
              borderRadius:32, 
              fontSize:16, 
              fontWeight:700, 
              cursor: selectedReason ? 'pointer' : 'not-allowed', 
              opacity: selectedReason ? 1 : 0.5,
              transition:'opacity 0.3s', 
              fontFamily:"'Poppins',sans-serif",
              boxShadow:'0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            Check In
          </motion.button>
        </div>
      </div>
    </div>
  );
}
