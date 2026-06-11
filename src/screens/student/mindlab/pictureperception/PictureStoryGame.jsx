import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function PictureStoryGame() {
  const navigate = useNavigate();

  // 'observe', 'write', 'result'
  const [phase, setPhase] = useState('observe');
  
  // Timer logic
  const [observeTime, setObserveTime] = useState(30);
  const [writeTime, setWriteTime] = useState(240); // 4 minutes
  
  // Story state
  const [storyText, setStoryText] = useState('');
  
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Count words
  const wordCount = storyText.trim() === '' ? 0 : storyText.trim().split(/\s+/).length;

  useEffect(() => {
    let interval = null;
    
    if (phase === 'observe' && observeTime > 0) {
      interval = setInterval(() => setObserveTime(prev => prev - 1), 1000);
    } else if (phase === 'observe' && observeTime === 0) {
      setPhase('write');
    } else if (phase === 'write' && writeTime > 0) {
      interval = setInterval(() => setWriteTime(prev => prev - 1), 1000);
    } else if (phase === 'write' && writeTime === 0) {
      // Go to timeup screen when time runs out
      setPhase('timeup');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase, observeTime, writeTime]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSubmit = () => {
    setPhase('result');
  };

  return (
    <section className="relative mx-auto flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#11211c] font-sans">
      <AnimatePresence mode="wait">
        
        {/* ========================================================= */}
        {/* PHASE 1: OBSERVE */}
        {/* ========================================================= */}
        {phase === 'observe' && (
          <motion.div
            key="observe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col bg-[#11211c]"
          >
            {/* Top Bar (Solid) */}
            {!isFullscreen && (
              <div className="w-full px-5 pt-safe-top pb-4 pt-6 flex items-center justify-between bg-[#162722] z-20 shadow-md">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => navigate('/student/mindlab')}
                  className="w-10 h-10 flex items-center justify-start text-white hover:opacity-70"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth="3" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Timer Pill */}
                <div className="flex items-center gap-2 rounded-full border border-[#dca331] bg-[#1a2f29] px-4 py-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#dca331]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8" />
                    <polyline points="12 9 12 13 14 15" />
                    <line x1="3" y1="5" x2="7" y2="2" />
                    <line x1="21" y1="5" x2="17" y2="2" />
                  </svg>
                  <span className="text-[#dca331] font-bold text-[13px] tracking-wide">
                    {formatTime(observeTime)}
                  </span>
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="w-10 h-10 flex items-center justify-end text-white hover:opacity-70"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            )}

            {/* Image Container */}
            <div className={`relative flex-1 ${isFullscreen ? 'absolute inset-0 z-50' : ''}`}>
              <img 
                src="/mindlab/picturepreception/image1.png" 
                alt="Observation Scene" 
                className="w-full h-full object-cover"
              />
              
              {/* Exit Fullscreen Floating Button */}
              {isFullscreen && (
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-8 right-6 z-[100] w-12 h-12 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full text-white shadow-xl hover:bg-black/80 transition"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v3h3M21 8h-3V5M3 16h3v3M16 21v-3h3" />
                  </svg>
                </button>
              )}
            </div>

            {/* Bottom Instruction Card */}
            {!isFullscreen && (
              <div className="absolute bottom-6 left-0 right-0 px-5 z-10">
                <div className="bg-[#11211c]/95 backdrop-blur-md border border-[#1f3b31] rounded-[10px] p-3.5 flex items-center justify-between shadow-2xl">
                  <div className="flex flex-col">
                    <span className="text-white/90 text-[12px] font-semibold leading-tight mb-1">
                      Observe every detail carefully.
                    </span>
                    <span className="text-white/60 text-[11px] font-medium">
                      You will get 30 seconds.
                    </span>
                  </div>
                  <div className="text-white">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M5 12h2" />
                      <path d="M17 12h2" />
                      <path d="M12 5v2" />
                      <path d="M12 17v2" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* PHASE 2: WRITE */}
        {/* ========================================================= */}
        {phase === 'write' && (
          <motion.div
            key="write"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col pt-safe-top"
          >
            {/* Top Bar */}
            <div className="w-full px-5 mt-4 mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/student/mindlab')}
                className="w-8 h-8 flex items-center justify-start text-white hover:opacity-70"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <h2 className="text-[18px] font-bold text-white tracking-wide">Write your story</h2>

              <div className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 bg-[#1a382e]/50">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="13" r="8" />
                  <polyline points="12 9 12 13 14 15" />
                  <line x1="3" y1="5" x2="7" y2="2" />
                  <line x1="21" y1="5" x2="17" y2="2" />
                </svg>
                <span className="text-white/90 font-semibold text-[11px] tracking-wider">
                  {formatTime(writeTime)}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 flex flex-col gap-4">
              
              {/* Prompts */}
              <div className="flex flex-col gap-3">
                <div className="bg-[#0e1c18] border border-[#1a382e] rounded-xl px-4 py-3 shadow-sm">
                  <p className="text-[#8ba39a] text-[12px] font-medium tracking-wide">What happened before this scene?</p>
                </div>
                <div className="bg-[#0e1c18] border border-[#1a382e] rounded-xl px-4 py-3 shadow-sm">
                  <p className="text-[#8ba39a] text-[12px] font-medium tracking-wide">What is happening in this scene?</p>
                </div>
                <div className="bg-[#0e1c18] border border-[#1a382e] rounded-xl px-4 py-3 shadow-sm">
                  <p className="text-[#8ba39a] text-[12px] font-medium tracking-wide">What will happen next?</p>
                </div>
              </div>

              {/* Editor */}
              <div className="mt-2 flex-1 flex flex-col bg-[#1f302b] rounded-2xl border border-white/5 overflow-hidden shadow-md min-h-[300px]">
                {/* Toolbar */}
                <div className="flex items-center gap-4 px-5 py-3 border-b border-white/10">
                  <button className="text-white/80 font-serif font-bold text-[14px] hover:text-white transition">B</button>
                  <button className="text-white/80 font-serif italic text-[14px] hover:text-white transition">I</button>
                  <button className="text-white/80 font-serif underline text-[14px] hover:text-white transition">U</button>
                </div>
                {/* Textarea */}
                <textarea
                  className="flex-1 w-full bg-transparent resize-none p-5 text-white/90 text-[14px] leading-relaxed placeholder:text-white/40 focus:outline-none"
                  placeholder="Write your story here..."
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                />
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-[#11211c] z-20 flex items-center justify-between border-t border-white/5">
              <span className="text-white/90 font-bold text-[13px]">{wordCount} Words</span>
              <button
                onClick={handleSubmit}
                className="bg-[#dfa86a] text-[#2c1c0a] font-bold text-[13px] px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                Submit Story
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* PHASE 3: RESULT */}
        {/* ========================================================= */}
        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col pt-safe-top bg-[#11211c]"
          >
            {/* Header */}
            <div className="w-full px-5 mt-4 mb-4 flex items-center relative">
              <button
                type="button"
                onClick={() => navigate('/student/mindlab')}
                className="absolute left-5 w-8 h-8 flex items-center justify-start text-white hover:opacity-70"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-[18px] font-bold text-white tracking-wide">Your Results</h2>
                <p className="text-white/60 text-[11px] font-medium mt-0.5">Well done! Keep improving.</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24">
              
              {/* Circular Progress */}
              <div className="flex justify-center my-6">
                <div className="relative w-[130px] h-[130px] rounded-full bg-[#182d26] flex items-center justify-center shadow-inner">
                  {/* Fake SVG donut chart matching the gradient */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="65" cy="65" r="55" fill="none" stroke="#254238" strokeWidth="8" />
                    <circle cx="65" cy="65" r="55" fill="none" stroke="url(#score-gradient)" strokeWidth="8" strokeDasharray="345" strokeDashoffset="51" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex flex-col items-center justify-center z-10">
                    <span className="text-[26px] font-bold text-white leading-none">85%</span>
                    <span className="text-[9px] text-white/60 tracking-wider uppercase font-medium mt-1">Overall Score</span>
                  </div>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Observation */}
                <div className="bg-[#22352f] rounded-xl p-4 flex flex-col border border-white/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M5 12h2" />
                      <path d="M17 12h2" />
                    </svg>
                    <span className="text-white/80 text-[11px] font-medium">Observation</span>
                  </div>
                  <span className="text-white font-bold text-[18px]">90%</span>
                </div>

                {/* Content */}
                <div className="bg-[#22352f] rounded-xl p-4 flex flex-col border border-white/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <path d="M14 2v6h6" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                      <path d="M10 9H8" />
                    </svg>
                    <span className="text-white/80 text-[11px] font-medium">Content</span>
                  </div>
                  <span className="text-white font-bold text-[18px]">85%</span>
                </div>

                {/* Structure */}
                <div className="bg-[#22352f] rounded-xl p-4 flex flex-col border border-white/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                    <span className="text-white/80 text-[11px] font-medium">Structure</span>
                  </div>
                  <span className="text-white font-bold text-[18px]">80%</span>
                </div>

                {/* Expression */}
                <div className="bg-[#22352f] rounded-xl p-4 flex flex-col border border-white/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="6" cy="6" r="2" />
                      <circle cx="12" cy="6" r="2" />
                      <circle cx="18" cy="6" r="2" />
                      <circle cx="6" cy="12" r="2" />
                      <circle cx="18" cy="18" r="2" />
                      <path d="M12 12l7 7" />
                      <path d="M19 19l2-2" />
                    </svg>
                    <span className="text-white/80 text-[11px] font-medium">Expression</span>
                  </div>
                  <span className="text-white font-bold text-[18px]">85%</span>
                </div>
              </div>

              {/* Strengths Card */}
              <div className="bg-[#11211c] border border-white/10 rounded-2xl p-5 shadow-sm">
                <h3 className="text-white font-bold text-[16px] mb-4 tracking-wide">Strengths</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#dfa86a] flex items-center justify-center shrink-0 shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-white/90 text-[13px] font-medium">Good observation of the scene.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#dfa86a] flex items-center justify-center shrink-0 shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-white/90 text-[13px] font-medium">Well-structured story.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#dfa86a] flex items-center justify-center shrink-0 shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-white/90 text-[13px] font-medium">Smooth flow of ideas.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-gradient-to-t from-[#11211c] via-[#11211c] to-transparent z-20 flex flex-col gap-3">
              <button
                onClick={() => setPhase('observe')}
                className="w-full h-[52px] rounded-xl bg-[#a67c7e] text-white font-bold text-[16px] shadow-lg transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
              >
                Try Another
              </button>
              <button
                onClick={() => navigate('/student/mindlab')}
                className="w-full h-[52px] rounded-xl border border-white/20 bg-transparent text-white font-semibold text-[15px] transition-colors hover:bg-white/5 active:bg-white/10 flex items-center justify-center"
              >
                Back to home
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* PHASE 4: TIME'S UP */}
        {/* ========================================================= */}
        {phase === 'timeup' && (
          <motion.div
            key="timeup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col pt-safe-top bg-[#11211c]"
          >
            {/* Header */}
            <div className="w-full px-5 mt-4 flex items-center relative">
              <button
                type="button"
                onClick={() => navigate('/student/mindlab')}
                className="absolute left-5 w-8 h-8 flex items-center justify-start text-white hover:opacity-70"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
              
              {/* Time's Up Image */}
              <div className="w-[180px] h-[180px] mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-[#dfa86a]/5 blur-[20px] scale-[1.2]"></div>
                <img 
                  src="/mindlab/picturepreception/timeup.png" 
                  alt="Time's Up Hourglass" 
                  className="w-full h-full object-contain relative z-10"
                />
              </div>

              {/* Text Content */}
              <h1 className="text-[26px] font-bold text-white tracking-wide mb-4 text-center">
                Time's Up!
              </h1>
              
              <p className="text-[15px] text-white/80 leading-relaxed text-center font-medium">
                You couldn't complete the<br/>story this time.<br/>Don't worry, practice more<br/>and you will do great!
              </p>

            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-gradient-to-t from-[#11211c] via-[#11211c] to-transparent z-20 flex flex-col gap-4">
              <button
                onClick={() => {
                  setPhase('observe');
                  setObserveTime(30);
                  setWriteTime(240);
                  setStoryText('');
                }}
                className="w-full h-[52px] rounded-xl bg-[#dfa86a] text-[#2c1c0a] font-bold text-[17px] shadow-lg transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
              >
                Try again
              </button>
              <button
                onClick={() => navigate('/student/mindlab')}
                className="w-full h-[52px] rounded-xl border border-white/20 bg-transparent text-white font-semibold text-[16px] transition-colors hover:bg-white/5 active:bg-white/10 flex items-center justify-center"
              >
                Back to home
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* DEV MODE: Skip Timer Button */}
      {(phase === 'observe' || phase === 'write') && (
        <button
          onClick={() => {
            if (phase === 'observe') setObserveTime(0);
            if (phase === 'write') setWriteTime(0);
          }}
          className="absolute bottom-[100px] right-4 z-[999] bg-red-500/80 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg backdrop-blur-sm"
        >
          DEV SKIP
        </button>
      )}

    </section>
  );
}
