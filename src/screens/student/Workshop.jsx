import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';

export function Workshop() {
  const nav = useNavigate();

  return (
    <div style={{ position:'relative', width:'100%', maxWidth:440, margin:'0 auto', minHeight:'100dvh', background:'#1c1c1e', display:'flex', flexDirection:'column', fontFamily:"'Poppins',sans-serif", overflow:'hidden' }}>
      
      {/* Scrollable Content */}
      <div style={{ flexGrow:1, overflowY:'auto', paddingBottom: 100, padding:'48px 20px 24px' }}>
        
        {/* Header */}
        <div style={{ display:'flex', flexDirection:'column', marginBottom: 24 }}>
          <button type="button" onClick={() => nav(-1)} style={{ width:40, height:40, background:'transparent', border:'none', display:'flex', alignItems:'center', justifyContent:'flex-start', cursor:'pointer', padding:0, marginBottom:8 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
          </button>
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} style={{ color:'#fff', fontSize:26, fontWeight:700, margin:0, letterSpacing:'-0.5px' }}>
            My Workshop
          </motion.h1>
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}} style={{ color:'#888', fontSize:13, margin:'4px 0 0 0' }}>
            Grow your skills every day
          </motion.p>
        </div>

        {/* Progress Card */}
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.15}} style={{ background:'#262626', borderRadius:24, padding:'24px', display:'flex', flexDirection:'column', marginBottom:20 }}>
          <div style={{ color:'#999', fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:16 }}>YOUR PROGRESS</div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            {/* Circular Progress */}
            <div style={{ position:'relative', width:64, height:64 }}>
              <svg width="64" height="64" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="251" strokeDashoffset="50" strokeLinecap="round" transform="rotate(-90 50 50)" />
              </svg>
              <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, fontWeight:700 }}>
                80%
              </div>
            </div>
            <div>
              <div style={{ color:'#fff', fontSize:24, fontWeight:700, lineHeight:1.2 }}>8/10</div>
              <div style={{ color:'#ccc', fontSize:13 }}>Workshops Completed</div>
            </div>
          </div>
        </motion.div>

        {/* Featured Masterclass Card */}
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} style={{ background:'#e5e5e5', borderRadius:24, padding:'24px', position:'relative', overflow:'hidden', marginBottom:24 }}>
          {/* Subtle Background Graphic */}
          <svg style={{ position:'absolute', bottom:-10, left:0, width:'100%', height:'50%', opacity:0.15, pointerEvents:'none' }} viewBox="0 0 400 100" preserveAspectRatio="none">
            <path d="M 0,100 C 50,80 100,100 150,60 C 200,20 250,80 300,50 C 350,20 400,60 400,60 L 400,100 Z" fill="#000"/>
            <path d="M 0,100 C 60,60 120,40 180,70 C 240,100 300,30 360,60 L 400,50 L 400,100 Z" fill="#333"/>
          </svg>

          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ background:'#ffc800', color:'#1a1a1a', fontSize:10, fontWeight:800, padding:'4px 10px', borderRadius:12, display:'inline-block', marginBottom:12, letterSpacing:0.5 }}>
              FEATURED
            </div>
            <h2 style={{ color:'#1a1a1a', fontSize:20, fontWeight:700, lineHeight:1.2, margin:'0 0 6px 0', maxWidth:'80%' }}>
              Third Eye Opening Master Class
            </h2>
            <p style={{ color:'#555', fontSize:12, margin:'0 0 20px 0', maxWidth:'80%' }}>
              Join Dr. Aris for an exclusive masterclass.
            </p>
            <button style={{ background:'#ffc800', color:'#1a1a1a', border:'none', padding:'12px 24px', borderRadius:20, fontSize:14, fontWeight:700, cursor:'pointer' }}>
              Enroll Now
            </button>
          </div>
        </motion.div>

        {/* Upcoming Sessions Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <h3 style={{ color:'#fff', fontSize:16, fontWeight:700, margin:0 }}>Upcoming Sessions</h3>
          <button style={{ background:'none', border:'none', color:'#22c55e', fontSize:13, fontWeight:600, cursor:'pointer' }}>View all</button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', background:'#262626', borderRadius:12, padding:4, marginBottom:20 }}>
          <button style={{ flex:1, background:'#e5e5e5', color:'#1a1a1a', border:'none', padding:'10px 0', borderRadius:8, fontSize:13, fontWeight:600 }}>Online</button>
          <button style={{ flex:1, background:'transparent', color:'#ccc', border:'none', padding:'10px 0', borderRadius:8, fontSize:13, fontWeight:600 }}>Offline</button>
        </div>

        {/* Sessions List */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          
          {/* Card 1 */}
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', gap:16 }}>
              {/* Date Block */}
              <div style={{ background:'#404040', borderRadius:12, width:64, height:64, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ color:'#ccc', fontSize:11, fontWeight:700 }}>OCT</span>
                <span style={{ color:'#fff', fontSize:22, fontWeight:700, lineHeight:1 }}>12</span>
              </div>
              {/* Details */}
              <div style={{ flexGrow:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                  <span style={{ color:'#eab308', fontSize:9, fontWeight:700, letterSpacing:0.5 }}>ONLINE 2:00 PM</span>
                </div>
                <h4 style={{ color:'#fff', fontSize:14, fontWeight:600, margin:'0 0 6px 0', lineHeight:1.2 }}>Effective UI/UX Fundamentals</h4>
                <p style={{ color:'#888', fontSize:11, margin:0, lineHeight:1.4 }}>Learn the core principles of designing intuitive digital interface</p>
              </div>
            </div>
            <button style={{ background:'#ffc800', color:'#1a1a1a', border:'none', padding:'12px 0', borderRadius:12, fontSize:14, fontWeight:700, marginTop:16, width:'100%', cursor:'pointer' }}>
              Register
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', gap:16 }}>
              {/* Date Block */}
              <div style={{ background:'#404040', borderRadius:12, width:64, height:64, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ color:'#ccc', fontSize:11, fontWeight:700 }}>SEP</span>
                <span style={{ color:'#fff', fontSize:22, fontWeight:700, lineHeight:1 }}>10</span>
              </div>
              {/* Details */}
              <div style={{ flexGrow:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                  <span style={{ color:'#eab308', fontSize:9, fontWeight:700, letterSpacing:0.5 }}>ONLINE 2:00 PM</span>
                </div>
                <h4 style={{ color:'#fff', fontSize:14, fontWeight:600, margin:'0 0 6px 0', lineHeight:1.2 }}>Effective UI/UX Fundamentals</h4>
                <p style={{ color:'#888', fontSize:11, margin:0, lineHeight:1.4 }}>Learn the core principles of designing intuitive digital interface</p>
              </div>
            </div>
            <button style={{ background:'#854d0e', border:'1px solid #eab308', color:'#fff', padding:'12px 0', borderRadius:12, fontSize:14, fontWeight:600, marginTop:16, width:'100%', cursor:'pointer' }}>
              Join Session
            </button>
          </motion.div>

          {/* Card 3 */}
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.5}} style={{ background:'#262626', borderRadius:20, padding:'16px', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', gap:16 }}>
              {/* Date Block */}
              <div style={{ background:'#404040', borderRadius:12, width:64, height:64, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ color:'#ccc', fontSize:11, fontWeight:700 }}>Aug</span>
                <span style={{ color:'#fff', fontSize:22, fontWeight:700, lineHeight:1 }}>17</span>
              </div>
              {/* Details */}
              <div style={{ flexGrow:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                  <span style={{ color:'#eab308', fontSize:9, fontWeight:700, letterSpacing:0.5 }}>ONLINE 2:00 PM</span>
                </div>
                <h4 style={{ color:'#fff', fontSize:14, fontWeight:600, margin:'0 0 6px 0', lineHeight:1.2 }}>Effective UI/UX Fundamentals</h4>
                <p style={{ color:'#888', fontSize:11, margin:0, lineHeight:1.4 }}>Learn the core principles of designing intuitive digital interface</p>
              </div>
            </div>
            <button style={{ background:'#854d0e', border:'none', color:'#fff', padding:'12px 0', borderRadius:12, fontSize:14, fontWeight:600, marginTop:16, width:'100%', cursor:'pointer' }}>
              Apply
            </button>
          </motion.div>

        </div>
      </div>

      {/* Reused Bottom Nav */}
      <StudentDock active="home" />

    </div>
  );
}
