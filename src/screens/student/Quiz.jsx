import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Mock questions
const QUESTIONS = [
  {
    id: 1,
    category: 'General knowledge',
    question: "Who among the following doesn't have the record of playing the most World cup?",
    options: ['Lionel Messi', 'Cristiano Ronaldo', 'Antonio', 'Rafael Marquez'],
    correctAnswer: 2, // 'Antonio'
  },
  {
    id: 2,
    category: 'Science',
    question: "What is the powerhouse of the cell?",
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'],
    correctAnswer: 1,
  },
  {
    id: 3,
    category: 'History',
    question: "In which year did the Titanic sink?",
    options: ['1910', '1912', '1914', '1920'],
    correctAnswer: 1,
  }
];

export function Quiz() {
  const nav = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(190); // 3:10 in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setSelectedOption(null);
      setCurrentIndex(prev => prev + 1);
    } else {
      nav('/student/home'); // Finish quiz
    }
  };

  const q = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / 10) * 100; // Hardcoded to 10 total questions for the UI

  return (
    <div style={{ position:'relative', width:'100%', maxWidth:440, margin:'0 auto', minHeight:'100dvh', background:'#1c1c1e', display:'flex', flexDirection:'column', overflow:'hidden', fontFamily:"'Poppins',sans-serif" }}>
      
      {/* Background Decor Circles */}
      <div style={{ position:'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius:'50%', background:'rgba(50,40,70,0.5)', filter:'blur(40px)', zIndex:0 }}/>
      <div style={{ position:'absolute', top: 300, right: -80, width: 250, height: 250, borderRadius:'50%', background:'rgba(80,50,90,0.4)', filter:'blur(50px)', zIndex:0 }}/>
      <div style={{ position:'absolute', bottom: 100, left: -20, width: 150, height: 150, borderRadius:'50%', background:'rgba(60,40,80,0.5)', filter:'blur(40px)', zIndex:0 }}/>

      {/* ──── Header ──── */}
      <div style={{ padding:'48px 24px 20px', position:'relative', zIndex:10 }}>
        {/* Top bar with back button */}
        <div style={{ display:'flex', alignItems:'center', marginBottom:32 }}>
          <button type="button" onClick={() => nav(-1)} style={{ width:40, height:40, background:'rgba(255,255,255,0.08)', borderRadius:'50%', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
          </button>
        </div>

        {/* Info bar: 02 of 10 | Timer */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, padding:'0 10px' }}>
          <div style={{ color:'#fff', fontSize:15, fontWeight:600 }}>
            {String(currentIndex + 1).padStart(2, '0')} of 10
          </div>
          <div style={{ background:'#22c55e', padding:'4px 12px', borderRadius:20, display:'flex', alignItems:'center', gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span style={{ color:'#fff', fontSize:13, fontWeight:700 }}>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width:'100%', height:8, background:'#ffffff', borderRadius:4, overflow:'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ height:'100%', background:'#22c55e', borderRadius:4 }}
          />
        </div>
      </div>

      {/* ──── Card Area ──── */}
      <div style={{ flexGrow:1, position:'relative', display:'flex', justifyContent:'center', marginTop:20, zIndex:10 }}>
        
        {/* Stacked Shadow Cards */}
        <div style={{ position:'absolute', top: 20, width:'82%', height:'90%', background:'#242424', borderRadius:24, zIndex:1, boxShadow:'0 10px 30px rgba(0,0,0,0.5)' }}/>
        <div style={{ position:'absolute', top: 10, width:'88%', height:'90%', background:'#333333', borderRadius:24, zIndex:2, boxShadow:'0 10px 30px rgba(0,0,0,0.4)' }}/>

        {/* Main Card with AnimatePresence for swiping */}
        <div style={{ position:'absolute', top:0, width:'94%', height:'90%', zIndex:3 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ x: 100, opacity: 0, rotate: 5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -100, opacity: 0, rotate: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ width:'100%', height:'100%', background:'#bba4e5', borderRadius:24, padding:'32px 24px', display:'flex', flexDirection:'column', boxShadow:'0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <div style={{ color:'rgba(255,255,255,0.8)', fontSize:13, fontWeight:600, marginBottom:12 }}>
                {q.category}
              </div>
              <h2 style={{ color:'#1a1a1a', fontSize:20, fontWeight:700, lineHeight:1.3, marginBottom:32 }}>
                {q.question}
              </h2>

              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {q.options.map((opt, idx) => {
                  
                  let bgColor = '#ffffff';
                  let borderColor = 'transparent';
                  
                  if (selectedOption !== null) {
                    if (idx === q.correctAnswer) {
                      bgColor = '#dcfce7'; // Light green
                      borderColor = '#86efac';
                    } else if (idx === selectedOption) {
                      bgColor = '#fee2e2'; // Light red
                      borderColor = '#fca5a5';
                    }
                  }

                  const isSelected = selectedOption === idx;

                  return (
                    <motion.button
                      key={idx}
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                      onClick={() => {
                        if (selectedOption === null) setSelectedOption(idx);
                      }}
                      style={{
                        background: bgColor,
                        border: `1px solid ${borderColor}`,
                        padding: '18px 24px',
                        borderRadius: 20,
                        textAlign: 'left',
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#1a1a1a',
                        cursor: selectedOption === null ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ──── Footer ──── */}
      <div style={{ padding:'24px', position:'relative', zIndex:10, display:'flex', justifyContent:'center' }}>
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.95 }}
          style={{
            background:'#76de80',
            color:'#1a1a1a',
            border:'none',
            padding:'16px 64px',
            borderRadius:32,
            fontSize:18,
            fontWeight:700,
            cursor:'pointer',
            boxShadow:'0 8px 20px rgba(118,222,128,0.3)',
            fontFamily:"'Poppins',sans-serif",
            opacity: selectedOption !== null ? 1 : 0.5
          }}
          disabled={selectedOption === null}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}
