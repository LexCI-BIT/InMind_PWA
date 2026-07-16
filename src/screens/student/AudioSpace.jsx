import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';

export function AudioSpace() {
  const nav = useNavigate();

  return (
    <div style={{ position:'relative', width:'100%', maxWidth:440, margin:'0 auto', minHeight:'100dvh', background:'#1c1c1e', display:'flex', flexDirection:'column', fontFamily:"'Poppins',sans-serif" }}>
      
      {/* Scrollable Content */}
      <div style={{ flexGrow:1, overflowY:'auto', paddingBottom: 160 }} className="no-scrollbar">
        
        {/* Header */}
        <div style={{ padding:'48px 24px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button type="button" onClick={() => nav(-1)} style={{ background:'transparent', border:'none', padding:0, cursor:'pointer', display:'flex', alignItems:'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
          </button>
          <h1 style={{ color:'#fff', fontSize:18, fontWeight:700, margin:0 }}>Audio Space</h1>
          <div style={{ width:24 }} /> {/* Spacer for centering */}
        </div>

        <div style={{ padding:'0 24px' }}>
          
          {/* Continue Listening Card */}
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} style={{ background:'linear-gradient(145deg, #2a304e 0%, #1a1b26 50%, #231c3b 100%)', borderRadius:24, padding:'24px', position:'relative', overflow:'hidden', marginBottom:24, boxShadow:'0 10px 30px rgba(0,0,0,0.4)' }}>
            <div style={{ position:'absolute', top:-50, right:-50, width:150, height:150, background:'rgba(120,80,250,0.15)', filter:'blur(40px)', borderRadius:'50%' }} />
            
            <div style={{ background:'rgba(59, 130, 246, 0.15)', color:'#60a5fa', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:8, display:'inline-block', marginBottom:16, letterSpacing:0.5 }}>
              CONTINUE LISTENING
            </div>
            
            <h2 style={{ color:'#fff', fontSize:22, fontWeight:700, margin:'0 0 20px 0', lineHeight:1.2 }}>2-Min Calm Breathing</h2>
            
            {/* Progress */}
            <div style={{ display:'flex', justifyContent:'space-between', color:'#888', fontSize:11, marginBottom:8 }}>
              <span>01:12</span>
              <span>02:00</span>
            </div>
            <div style={{ height:4, background:'rgba(255,255,255,0.1)', borderRadius:2, marginBottom:24, overflow:'hidden', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, height:'100%', width:'60%', background:'#60a5fa', borderRadius:2 }} />
            </div>

            <button style={{ width:'100%', background:'linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)', color:'#fff', border:'none', padding:'14px 0', borderRadius:16, fontSize:15, fontWeight:700, cursor:'pointer' }}>
              Play
            </button>
          </motion.div>

          {/* Category Pills */}
          <div style={{ display:'flex', gap:12, marginBottom:32, overflowX:'auto' }} className="no-scrollbar">
            <button style={{ flexShrink:0, background:'#333', color:'#fff', border:'none', padding:'10px 24px', borderRadius:24, fontSize:14, fontWeight:600 }}>Relax</button>
            <button style={{ flexShrink:0, background:'linear-gradient(90deg, #a855f7 0%, #8b5cf6 100%)', color:'#fff', border:'none', padding:'10px 24px', borderRadius:24, fontSize:14, fontWeight:600 }}>Focus</button>
            <button style={{ flexShrink:0, background:'#333', color:'#eee', border:'none', padding:'10px 24px', borderRadius:24, fontSize:14, fontWeight:600 }}>Stress Relief</button>
            <button style={{ flexShrink:0, background:'#333', color:'#eee', border:'none', padding:'10px 24px', borderRadius:24, fontSize:14, fontWeight:600 }}>Mindfulness</button>
          </div>

          {/* Recommended for You */}
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:16 }}>
            <h3 style={{ color:'#fff', fontSize:18, fontWeight:700, margin:0 }}>Recommended for You</h3>
            <div style={{ width:4, height:4, background:'#60a5fa', borderRadius:'50%' }} />
          </div>

          {/* Large Featured Card */}
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} style={{ background:'#18181a', borderRadius:24, padding:'24px', position:'relative', overflow:'hidden', marginBottom:16 }}>
            {/* Abstract Light Streaks Background */}
            <div style={{ position:'absolute', top:'20%', left:'10%', width:80, height:20, background:'#f59e0b', filter:'blur(15px)', opacity:0.3, transform:'rotate(-10deg)' }}/>
            <div style={{ position:'absolute', top:'30%', left:'40%', width:100, height:25, background:'#fcd34d', filter:'blur(20px)', opacity:0.3, transform:'rotate(-5deg)' }}/>
            <div style={{ position:'absolute', top:'50%', left:'20%', width:90, height:20, background:'#fbbf24', filter:'blur(18px)', opacity:0.25, transform:'rotate(-8deg)' }}/>
            <div style={{ position:'absolute', top:'60%', left:'50%', width:120, height:30, background:'#f59e0b', filter:'blur(25px)', opacity:0.3, transform:'rotate(-5deg)' }}/>

            {/* Premium Pill */}
            <div style={{ position:'absolute', top:16, right:16, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.1)', padding:'6px 10px', borderRadius:16, display:'flex', alignItems:'center', gap:4, backdropFilter:'blur(4px)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
              <span style={{ color:'#fff', fontSize:9, fontWeight:700, letterSpacing:0.5 }}>PREMIUM</span>
            </div>

            <div style={{ position:'relative', zIndex:1, marginTop:80 }}>
              <div style={{ color:'#60a5fa', fontSize:10, fontWeight:800, letterSpacing:0.5, marginBottom:6 }}>DEEP FOCUS</div>
              <h2 style={{ color:'#fff', fontSize:22, fontWeight:700, lineHeight:1.2, margin:'0 0 8px 0' }}>Neural Sync Beats for Work</h2>
              <p style={{ color:'#999', fontSize:12, lineHeight:1.5, margin:0, paddingRight:20 }}>Optimized frequencies to maintain high cognitive output during long sessions.</p>
            </div>
          </motion.div>

          {/* Two Small Cards */}
          <div style={{ display:'flex', gap:16, marginBottom:32 }}>
            {/* Card 1 */}
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.15}} style={{ flex:1, background:'#262626', borderRadius:20, padding:'20px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(59, 130, 246, 0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#60a5fa"><path d="M12 3L4 9v12h16V9l-8-6zm0 2.84l5.96 4.47C17.15 11.2 16 13 16 15c0 2.21 1.79 4 4 4v1h-3.5c-1.35 0-2.58-.6-3.41-1.54C12.26 17.51 11 16.29 11 14.5c0-1.38.6-2.61 1.54-3.41.94.8 1.54 2.03 1.54 3.41 0 1.1-.9 2-2 2s-2-.9-2-2c0-1.79 1.25-3.25 3-3.8V9.45c-2.45.69-4.22 3-4.22 5.55 0 1.94.94 3.65 2.39 4.75C10.43 18.84 9.27 18 8 18c-2.21 0-4-1.79-4-4 0-2 1.15-3.8 2.96-4.69L12 5.84z" opacity="0"/></svg>
                {/* Custom Leaf/Lotus Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6"><path d="M17.5,10.5C17.5,10.5 15,10.5 12,14C9,10.5 6.5,10.5 6.5,10.5C6.5,10.5 6.5,13 9.5,16.5C10,17 11,18.5 12,21C13,18.5 14,17 14.5,16.5C17.5,13 17.5,10.5 17.5,10.5Z" /><path d="M12,4C12,4 10,7 10,9.5C10,10.33 10.67,11 11.5,11H12.5C13.33,11 14,10.33 14,9.5C14,7 12,4 12,4Z"/></svg>
              </div>
              <div>
                <h4 style={{ color:'#fff', fontSize:14, fontWeight:700, margin:'0 0 4px 0' }}>Morning Zen</h4>
                <div style={{ color:'#888', fontSize:11 }}>5 min • Meditation</div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} style={{ flex:1, background:'#262626', borderRadius:20, padding:'20px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(245, 158, 11, 0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                {/* Book Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#d97706"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM11 18c-1.5-.5-3.5-.5-4.5-.5-1.5 0-3 .25-4.5.75V8c1.5-.5 3-.75 4.5-.75 1.5 0 3 .25 4.5.75v10zm9 0c-1.5-.5-3.5-.5-4.5-.5-1.5 0-3 .25-4.5.75V8c1.5-.5 3-.75 4.5-.75 1.5 0 3 .25 4.5.75v10z"/><path d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-1 4.5-1zM17.5 13.16c.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.3-4.5.83v1.66c1.13-.64 2.7-1 4.5-1zM17.5 15.83c.88 0 1.73.09 2.5.26v-1.52c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-1 4.5-1z"/></svg>
              </div>
              <div>
                <h4 style={{ color:'#fff', fontSize:14, fontWeight:700, margin:'0 0 4px 0' }}>The Power of Now</h4>
                <div style={{ color:'#888', fontSize:11 }}>12 min • Audiobook</div>
              </div>
            </motion.div>
          </div>

          {/* Quick Calm (2-3 min) */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <h3 style={{ color:'#fff', fontSize:18, fontWeight:700, margin:0 }}>Quick Calm (2–3 min)</h3>
            <span style={{ color:'#60a5fa', fontSize:13, fontWeight:600 }}>See all</span>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
            <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:0.2}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:48, height:48, borderRadius:16, background:'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {/* Wind Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M2.5 12a.5.5 0 0 1 .5-.5h13a2.5 2.5 0 1 0-1.78-4.26.5.5 0 0 1-.72-.7A3.5 3.5 0 1 1 16 12.5H3a.5.5 0 0 1-.5-.5z"/><path d="M5.5 8a.5.5 0 0 1 .5-.5h8a2.5 2.5 0 1 0-1.78-4.26.5.5 0 1 1-.72-.7A3.5 3.5 0 1 1 14 8.5H6a.5.5 0 0 1-.5-.5z"/><path d="M7.5 16a.5.5 0 0 1 .5-.5h10a2.5 2.5 0 1 0-1.78-4.26.5.5 0 0 1-.72-.7A3.5 3.5 0 1 1 18 16.5H8a.5.5 0 0 1-.5-.5z"/></svg>
              </div>
              <div>
                <h4 style={{ color:'#fff', fontSize:15, fontWeight:700, margin:'0 0 4px 0' }}>Breath Release</h4>
                <div style={{ color:'#888', fontSize:12 }}>2 min • Refresh</div>
              </div>
            </motion.div>

            <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:0.25}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:48, height:48, borderRadius:16, background:'linear-gradient(135deg, #34d399 0%, #10b981 100%)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {/* Water Drop Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
              </div>
              <div>
                <h4 style={{ color:'#fff', fontSize:15, fontWeight:700, margin:'0 0 4px 0' }}>Ocean Mist</h4>
                <div style={{ color:'#888', fontSize:12 }}>3 min • Calm</div>
              </div>
            </motion.div>

            <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:0.3}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:48, height:48, borderRadius:16, background:'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {/* Sun Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              </div>
              <div>
                <h4 style={{ color:'#fff', fontSize:15, fontWeight:700, margin:'0 0 4px 0' }}>Mental Reset</h4>
                <div style={{ color:'#888', fontSize:12 }}>2 min • Focus</div>
              </div>
            </motion.div>
          </div>

          {/* Audiobooks for Growth */}
          <div style={{ marginBottom:16 }}>
            <h3 style={{ color:'#fff', fontSize:18, fontWeight:700, margin:0 }}>Audiobooks for Growth</h3>
          </div>

          <div style={{ display:'flex', gap:16, marginBottom:32, overflowX:'auto', paddingBottom:8 }} className="no-scrollbar">
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.35}} style={{ flexShrink:0, width:180, background:'#262626', borderRadius:20, padding:'16px' }}>
              <div style={{ width:'100%', height:180, background:'#f4e7c3', borderRadius:16, marginBottom:16 }} />
              <h4 style={{ color:'#fff', fontSize:15, fontWeight:700, margin:'0 0 6px 0' }}>Atomic Habits</h4>
              <div style={{ color:'#888', fontSize:10, fontWeight:700, letterSpacing:0.5 }}>10 MIN • AUDIO BOOK</div>
            </motion.div>

            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.4}} style={{ flexShrink:0, width:180, background:'#262626', borderRadius:20, padding:'16px' }}>
              <div style={{ width:'100%', height:180, background:'#e5e5e5', borderRadius:16, marginBottom:16, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:16, position:'relative', overflow:'hidden' }}>
                {/* Simulated Stack of Books Placeholder */}
                <div style={{ background:'#ccc', width:'90%', height:12, marginBottom:4, borderRadius:2, alignSelf:'center' }}/>
                <div style={{ background:'#bbb', width:'95%', height:14, marginBottom:4, borderRadius:2, alignSelf:'center' }}/>
                <div style={{ background:'#999', width:'100%', height:16, marginBottom:4, borderRadius:2, alignSelf:'center' }}/>
                <div style={{ background:'#ccc', width:'85%', height:10, marginBottom:4, borderRadius:2, alignSelf:'center' }}/>
                <div style={{ background:'#888', width:'95%', height:18, marginBottom:4, borderRadius:2, alignSelf:'center' }}/>
                <div style={{ background:'#666', width:'100%', height:14, borderRadius:2, alignSelf:'center' }}/>
              </div>
              <h4 style={{ color:'#fff', fontSize:15, fontWeight:700, margin:'0 0 6px 0' }}>Ego is the Enemy</h4>
              <div style={{ color:'#888', fontSize:10, fontWeight:700, letterSpacing:0.5 }}>10 MIN • AUDIO BOOK</div>
            </motion.div>
          </div>

          {/* Focus Sessions */}
          <div style={{ marginBottom:16 }}>
            <h3 style={{ color:'#fff', fontSize:18, fontWeight:700, margin:0 }}>Focus Sessions</h3>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:0.45}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:'#333', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {/* Wavy lines icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h16"/><path d="M4 12h16"/><path d="M4 16h16"/></svg>
              </div>
              <div style={{ flexGrow:1 }}>
                <h4 style={{ color:'#fff', fontSize:15, fontWeight:700, margin:'0 0 4px 0' }}>Binaural Study Hub</h4>
                <div style={{ color:'#888', fontSize:12 }}>45:00 • Deep Work</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </motion.div>

            <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:0.5}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:'#333', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {/* Cloud icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
              </div>
              <div style={{ flexGrow:1 }}>
                <h4 style={{ color:'#fff', fontSize:15, fontWeight:700, margin:'0 0 4px 0' }}>Lo-Fi Coding Ambience</h4>
                <div style={{ color:'#888', fontSize:12 }}>60:00 • Productivity</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Mini Player */}
      <motion.div initial={{opacity:0, y:50, x:"-50%"}} animate={{opacity:1, y:0, x:"-50%"}} transition={{delay:0.5}} style={{ position:'fixed', bottom: 90, left:'50%', width:'calc(100% - 40px)', maxWidth:400, background:'#0f172a', borderRadius:30, padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:40, boxShadow:'0 10px 20px rgba(0,0,0,0.5)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:'#0ea5e9', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          </div>
          <div>
            <div style={{ color:'#fff', fontSize:13, fontWeight:700 }}>2-Min Calm Breathing</div>
            <div style={{ color:'#94a3b8', fontSize:9, fontWeight:700, letterSpacing:0.5 }}>BREATHING EXERCISE</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          <div style={{ width:36, height:36, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </div>
      </motion.div>

      {/* Reused Bottom Nav */}
      <StudentDock active="home" />

    </div>
  );
}
