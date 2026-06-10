import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_CARDS = [
  { id: 'plant', name: 'Plant', image: '/mindlab/brainthread/plant.jpeg', isConcept: true },
  { id: 'sunlight_co2', name: 'Sunlight +\nCarbon Dioxide', image: '/mindlab/brainthread/sunlight+co2.png', isConcept: true },
  { id: 'photosynthesis', name: 'Photosynthesis', image: '/mindlab/brainthread/photosynthesis.png', isConcept: true },
  { id: 'moonlight', name: 'Moonlight', image: '/mindlab/brainthread/moonlight.jpeg', isConcept: false },
  { id: 'roots', name: 'Roots', image: '/mindlab/brainthread/roots.jpeg', isConcept: false },
  { id: 'oxygen', name: 'Oxygen', image: '/mindlab/brainthread/o2.png', isConcept: false },
  { id: 'mountains', name: 'Mountains', image: '/mindlab/brainthread/mountains.jpeg', isConcept: false },
  { id: 'clouds', name: 'Clouds', image: '/mindlab/brainthread/clouds.jpeg', isConcept: false },
  { id: 'wind', name: 'Wind', image: '/mindlab/brainthread/wind.jpeg', isConcept: false },
];

const CONCEPT_CARDS_ORDER = ['plant', 'sunlight_co2', 'photosynthesis'];

const GameCard = ({ card, isSelected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileTap={onClick ? { scale: 0.95 } : {}}
      className={`relative flex items-center justify-center rounded-[12px] shadow-md transition-colors overflow-hidden bg-[#fffdf0] ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        border: isSelected ? '4px solid #10b981' : '3px solid #facc15',
        aspectRatio: '3/4',
        boxShadow: isSelected ? '0 0 15px rgba(16, 185, 129, 0.4)' : '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <img src={card.image} alt={card.name} className="w-full h-full object-cover mix-blend-multiply" />
      
      {isSelected && (
        <div className="absolute top-1.5 right-1.5 bg-[#10b981] rounded-full w-6 h-6 flex items-center justify-center text-white shadow-md border-2 border-white">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default function BrainThreadGame() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('memorize'); // memorize | select | connection | explanation | reward
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedCards, setSelectedCards] = useState([]);
  const [shakeSelect, setShakeSelect] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [wrongPopup, setWrongPopup] = useState(null); // 'retry' | 'failed' | null
  const [showHint, setShowHint] = useState(false);
  const [stars, setStars] = useState(0);

  // Shuffle grid once
  const gridCards = useMemo(() => {
    return [...ALL_CARDS].sort(() => Math.random() - 0.5);
  }, []);

  const conceptCards = useMemo(() => {
    return CONCEPT_CARDS_ORDER.map(id => ALL_CARDS.find(c => c.id === id));
  }, []);

  // Timer logic for memorize phase
  useEffect(() => {
    if (phase === 'memorize' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'memorize' && timeLeft === 0) {
      setPhase('select');
    }
  }, [phase, timeLeft]);

  const toggleCard = (cardId) => {
    if (phase !== 'select') return;
    setSelectedCards(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else {
        if (prev.length < 3) {
          return [...prev, cardId];
        }
        return prev;
      }
    });
  };

  const handleCheck = () => {
    if (selectedCards.length !== 3) {
      setShakeSelect(true);
      setTimeout(() => setShakeSelect(false), 500);
      return;
    }

    const isCorrect = CONCEPT_CARDS_ORDER.every(id => selectedCards.includes(id));
    if (isCorrect) {
      setStars(prev => prev + 20);
      setPhase('connection');
    } else {
      setShakeSelect(true);
      setTimeout(() => setShakeSelect(false), 500);
      
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      
      setTimeout(() => {
        if (newAttempts > 0) {
          setWrongPopup('retry');
        } else {
          setStars(prev => Math.max(0, prev - 10));
          setWrongPopup('failed');
          // Automatically set correct cards so they can see the connection next
          setSelectedCards([...CONCEPT_CARDS_ORDER]);
        }
      }, 600);
    }
  };

  const handleRetry = () => {
    setWrongPopup(null);
    setSelectedCards([]); // clear selection for retry
  };

  const handleFailedContinue = () => {
    setWrongPopup(null);
    navigate('/student/mindlab');
  };

  return (
    <section className="relative mx-auto flex h-[100dvh] w-full items-center justify-center bg-[#0a0f14] select-none overflow-hidden font-sans">
      <div
        className="relative shadow-2xl overflow-hidden w-full h-full"
        style={{
          maxWidth: 'min(100vw, calc(100dvh * (9 / 19.5)))',
          maxHeight: 'min(100dvh, calc(100vw * (19.5 / 9)))',
          aspectRatio: '9/19.5'
        }}
      >
        {/* Full-screen background */}
        <img
          src="/mindlab/brainthread/mainbg.png"
          alt="Jungle Background"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Top Bar */}
        <div className="absolute top-6 left-0 right-0 z-30 px-5 flex justify-between items-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="grid size-9 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2 rounded-lg bg-[#3a1c00]/90 px-3 py-1.5 shadow-lg border border-[#eab308]/40">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-500 fill-current" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-bold text-white text-[14px]">{stars}</span>
          </div>
        </div>

        {/* BRAIN THREAD Title */}
        {!wrongPopup && !showHint && (
          <div className="absolute top-[6%] left-0 right-0 z-20 flex flex-col items-center">
            <h1 
              className="text-center leading-[0.9]"
              style={{
                fontFamily: "'Titan One', 'Impact', sans-serif",
                fontSize: 'clamp(32px, 9vw, 42px)',
                color: '#ffca28',
                textShadow: '0px 4px 0px #cf8e00, 0 4px 15px rgba(0,0,0,0.5)',
                WebkitTextStroke: '1.5px #b27a00',
              }}
            >
              BRAIN<br/>THREAD
            </h1>
          </div>
        )}

        {/* ─── PHASES ─── */}
        <AnimatePresence mode="wait">
          
          {/* Phase 1: Memorize */}
          {phase === 'memorize' && (
            <motion.div
              key="memorize"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-10 flex flex-col items-center pt-[38%]"
            >
              <div className="bg-[#facc15] rounded-xl px-8 py-2 shadow-lg mb-4 border-2 border-[#b45309]">
                <h2 className="text-[20px] font-black text-[#1c1917] tracking-wide">Memorize the cards</h2>
              </div>
              <p className="text-[14px] font-bold text-[#1c1917] bg-white/60 px-4 py-1 rounded-full backdrop-blur-sm mb-6">
                They will disappear soon!
              </p>

              <div className="flex w-full px-4 gap-2 justify-center mb-12">
                {conceptCards.map(card => (
                  <div key={card.id} className="w-1/3 max-w-[110px]">
                    <GameCard card={card} />
                  </div>
                ))}
              </div>

              {/* Timer */}
              <div className="relative w-24 h-24 flex items-center justify-center bg-[#1c1917] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)] border-4 border-[#333]">
                {/* Circular Progress */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#eab308" strokeWidth="6" 
                    strokeDasharray="289" strokeDashoffset={289 - (289 * timeLeft) / 5}
                    style={{ transition: 'stroke-dashoffset 1s linear' }} />
                </svg>
                <span className="text-4xl font-black text-[#facc15] font-['Titan_One'] drop-shadow-md">
                  {timeLeft}
                </span>
              </div>
            </motion.div>
          )}

          {/* Phase 2: Select */}
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center pt-[34%] px-5"
            >
              <div className="bg-[#facc15] rounded-xl px-6 py-2 shadow-lg mb-3 border-2 border-[#b45309]">
                <h2 className="text-[16px] font-black text-[#1c1917] tracking-wide uppercase">Select the correct cards</h2>
              </div>
              <p className="text-[13px] font-bold text-[#1c1917] bg-white/70 px-4 py-1.5 rounded-full backdrop-blur-sm mb-6 shadow-sm">
                Select the cards you saw earlier
              </p>

              <motion.div 
                animate={shakeSelect ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-3 gap-3 w-full max-w-[340px]"
              >
                {gridCards.map(card => (
                  <GameCard 
                    key={card.id} 
                    card={card} 
                    isSelected={selectedCards.includes(card.id)} 
                    onClick={() => toggleCard(card.id)}
                  />
                ))}
              </motion.div>

              {/* Bottom Actions */}
              <div className="absolute bottom-[4%] w-full px-6 flex justify-between items-center z-20">
                <button
                  className="relative rounded-xl px-5 py-2.5 text-[15px] font-bold shadow-xl flex items-center gap-2 bg-gradient-to-b from-[#462512] to-[#2a1608] border-[1.5px] border-[#6b3e1e] text-[#f0c070] active:scale-95 transition-transform"
                  onClick={() => setShowHint(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                  </svg>
                  Hint
                </button>
                <button
                  onClick={handleCheck}
                  disabled={selectedCards.length !== 3}
                  className={`rounded-xl px-8 py-3 text-[16px] font-extrabold shadow-xl uppercase tracking-wider transition-all duration-300 ${
                    selectedCards.length === 3 
                      ? 'bg-gradient-to-b from-[#facc15] to-[#ca8a04] text-[#3e1c00] border-2 border-[#fef08a] hover:scale-105'
                      : 'bg-gradient-to-b from-[#eab308] to-[#a16207] text-[#3e1c00]/60 border-2 border-[#ca8a04] opacity-80'
                  }`}
                >
                  Check
                </button>
              </div>
            </motion.div>
          )}

          {/* Phase 3: Concept Connection */}
          {phase === 'connection' && (
            <motion.div
              key="connection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center pt-[34%] px-4"
            >
              <div className="bg-[#facc15] rounded-xl px-6 py-2 shadow-lg mb-6 border-2 border-[#b45309] w-full text-center">
                <h2 className="text-[16px] font-black text-[#1c1917] uppercase tracking-wide">Concept Connection</h2>
              </div>
              
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <h3 className="text-4xl font-black text-[#047857] drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] font-['Titan_One']">Great Job!</h3>
                <p className="text-[#1c1917] font-bold text-[15px] bg-white/50 px-3 py-1 rounded-full mt-2">You remembered the concept!</p>
              </motion.div>

              <div className="flex items-center justify-center gap-1 w-full max-w-[360px] relative mt-4">
                {/* Connecting Arrows (background) */}
                <div className="absolute inset-0 flex items-center justify-evenly w-full z-0 pointer-events-none">
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 30, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="h-1 bg-[#facc15] relative translate-x-[2px]"
                  >
                    <div className="absolute -right-2 -top-1.5 w-0 h-0 border-y-[8px] border-y-transparent border-l-[10px] border-l-[#facc15]"></div>
                  </motion.div>
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 30, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="h-1 bg-[#facc15] relative -translate-x-[2px]"
                  >
                    <div className="absolute -right-2 -top-1.5 w-0 h-0 border-y-[8px] border-y-transparent border-l-[10px] border-l-[#facc15]"></div>
                  </motion.div>
                </div>

                {/* Cards */}
                {conceptCards.map((card, i) => (
                  <motion.div 
                    key={card.id} 
                    className="z-10 w-1/3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.4) }}
                  >
                    <div 
                      className={`relative flex flex-col items-center justify-between rounded-[12px] p-2 pt-3 shadow-2xl bg-[#fffdf0] border-2 border-[#fbbf24]`}
                      style={{ 
                        aspectRatio: '3/4', 
                        transform: i === 0 ? 'rotate(-6deg)' : i === 2 ? 'rotate(6deg)' : 'none',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                      }}
                    >
                      <div className="flex-1 flex items-center justify-center w-full px-1">
                        <img src={card.image} alt={card.name} className="max-h-full max-w-full object-contain rounded-md mix-blend-multiply" />
                      </div>
                      <div className="mt-2 text-center w-full min-h-[32px] flex items-center justify-center">
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#1a2c3f] leading-tight whitespace-pre-wrap">
                          {card.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                onClick={() => setPhase('explanation')}
                className="absolute bottom-[6%] w-[200px] rounded-xl bg-gradient-to-b from-[#facc15] to-[#ca8a04] px-6 py-3.5 text-[17px] font-bold text-[#3e1c00] shadow-xl border-2 border-[#fef08a] transition hover:scale-105 active:scale-95"
              >
                Continue
              </motion.button>
            </motion.div>
          )}

          {/* Phase 4: Concept Explanation */}
          {phase === 'explanation' && (
            <motion.div
              key="explanation"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center pt-[34%] px-5"
            >
              <div className="bg-[#facc15] rounded-xl px-6 py-2 shadow-lg mb-4 border-2 border-[#b45309] w-full text-center">
                <h2 className="text-[16px] font-black text-[#1c1917] uppercase tracking-wide">Concept Explanation</h2>
              </div>

              <div className="w-full bg-[#fffdf0] rounded-[16px] shadow-2xl border-4 border-[#facc15] p-3 flex flex-col items-center">
                <h3 className="text-[26px] font-bold text-[#1a2c3f] mb-1">Photosynthesis</h3>
                <p className="text-[13px] text-center font-medium text-[#333] px-2 mb-3">
                  Photosynthesis is the process by which plants make their own food using sunlight, water, and carbon dioxide.
                </p>
                <img 
                  src="/mindlab/brainthread/photosynthesis-conpect.png" 
                  alt="Explanation" 
                  className="w-full h-auto object-contain rounded-lg max-h-[36dvh]"
                  onError={(e) => {
                    // Fallback to text if image not found or large
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <button
                onClick={() => setPhase('reward')}
                className="absolute bottom-[5%] w-[200px] rounded-xl bg-gradient-to-b from-[#facc15] to-[#ca8a04] px-6 py-3.5 text-[17px] font-bold text-[#3e1c00] shadow-xl border-2 border-[#fef08a] transition hover:scale-105 active:scale-95"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Phase 5: Reward */}
          {phase === 'reward' && (
            <motion.div
              key="reward"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-10"
            >
              {/* Full screen completion background (contains mascot, confetti, empty board, and ribbon) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center bg-[#0a0f14]">
                <img src="/mindlab/brainthread/completion.png" alt="Completion" className="w-full h-full object-cover" />
              </div>

              {/* Text & Elements Overlay */}
              <div className="absolute top-[32%] left-0 right-0 z-20 flex flex-col items-center px-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[36px] sm:text-[40px] font-black text-[#14532d] mb-3 leading-tight font-['Titan_One'] text-center"
                >
                  Great Job!
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[14px] sm:text-[15.5px] font-semibold text-[#1c1917] text-center leading-snug px-2 mb-5"
                >
                  You've completed this mini lesson. Keep going, you're learning amazing things!
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="flex items-center justify-center gap-2 bg-[#fef08a] rounded-full px-5 py-1.5 shadow-sm border-[1.5px] border-[#eab308] mb-6"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#d97706] fill-current drop-shadow-sm" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-[#92400e] font-black text-[20px] font-['Titan_One'] tracking-wide">+10 XP</span>
                </motion.div>

                {/* Done Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={() => navigate('/student/mindlab')}
                  className="w-[160px] rounded-xl bg-gradient-to-b from-[#facc15] to-[#ca8a04] px-6 py-2.5 text-[17px] font-bold text-[#3e1c00] shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 border-[#fef08a] transition hover:scale-105 active:scale-95"
                >
                  Done
                </motion.button>
              </div>

              {/* 3 Stars perfectly placed over the green ribbon */}
              <div className="absolute bottom-[27%] flex items-center justify-center gap-1 scale-[1.3] w-full left-0 right-0 z-30 pointer-events-none">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: i === 1 ? 1.35 : 1, rotate: 0 }}
                      transition={{ delay: 1 + i * 0.15, type: 'spring', bounce: 0.6 }}
                      className="relative z-10"
                      style={{ transform: i === 1 ? 'translateY(-10px)' : 'none' }}
                    >
                      <svg viewBox="0 0 24 24" className="w-[50px] h-[50px]" style={{ filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.3))' }}>
                        <path 
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="url(#star-grad-brain)" 
                          stroke="#b45f06" 
                          strokeWidth="1" 
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="star-grad-brain" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffeb3b" />
                            <stop offset="50%" stopColor="#ffb300" />
                            <stop offset="100%" stopColor="#e65100" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  ))}
                </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Global Overlays */}
        {/* Wrong Answer Popups Overlay (Moved outside so it covers the Title properly) */}
        <AnimatePresence>
          {wrongPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 pt-4 px-4"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="relative w-full max-w-[360px] bg-[#fff8f6] rounded-[24px] shadow-2xl border-4 border-[#fda4af] pt-12 pb-6 px-4 flex flex-col items-center"
              >
                {/* Close Button */}
                {wrongPopup === 'retry' && (
                  <button onClick={handleRetry} className="absolute top-4 right-4 bg-[#ef4444] text-white rounded-full p-1 border-2 border-white shadow-sm z-30">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                )}

                {/* Top Ribbon */}
                <div className="absolute -top-6 flex flex-col items-center w-full">
                  <div className="relative w-[85%] z-10">
                    <div className="bg-[#ef4444] w-full text-center py-2 rounded shadow-md border-b-[4px] border-[#b91c1c] relative z-10">
                      <span className="text-white font-black text-[22px] tracking-wide font-['Titan_One']">
                        {wrongPopup === 'retry' ? 'OOPS!' : 'Not Quite Right!'}
                      </span>
                    </div>
                    {/* Ribbon ends */}
                    <div className="absolute -left-2 top-2 w-4 h-full bg-[#b91c1c] -z-10 skew-y-[20deg] rounded-l-sm"></div>
                    <div className="absolute -right-2 top-2 w-4 h-full bg-[#b91c1c] -z-10 -skew-y-[20deg] rounded-r-sm"></div>
                  </div>
                </div>

                {wrongPopup === 'retry' ? (
                  <>
                    {/* RETRY POPUP CONTENT */}
                    <p className="text-[16px] font-bold text-[#1c1917] text-center mb-4 leading-tight px-4 mt-2">
                      That's not the correct answer.
                    </p>

                    <div className="bg-[#ffe4e6] rounded-xl p-3 w-full flex justify-center gap-2 border-[1.5px] border-[#fecdd3] mb-6 shadow-inner">
                      {selectedCards.map(cardId => {
                        const card = ALL_CARDS.find(c => c.id === cardId);
                        if (!card) return null;
                        return (
                          <div key={card.id} className="relative w-1/3 max-w-[85px] bg-[#fffdf0] rounded-lg p-1 border-2 border-[#fda4af] shadow-sm flex flex-col items-center">
                            {/* Small red X over the card */}
                            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm z-10">
                              <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </div>
                            <div className="w-full aspect-[3/4] overflow-hidden rounded bg-white">
                              <img src={card.image} className="w-full h-full object-cover mix-blend-multiply opacity-80" alt={card.name} />
                            </div>
                            <span className="text-[9px] font-bold text-[#9f1239] text-center mt-1 leading-tight h-6 flex items-center justify-center whitespace-pre-wrap">
                              {card.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between w-full pl-12 pr-2 mt-2 relative z-10">
                      <div className="flex flex-col items-center text-center flex-1 pr-4">
                        <span className="font-black text-[#1c1917] text-[20px] leading-tight">Try again!</span>
                        <span className="font-semibold text-[#57534e] text-[14px]">{attemptsLeft} attempts left</span>
                      </div>
                      <button 
                        onClick={handleRetry}
                        className="shrink-0 bg-[#166534] hover:bg-[#14532d] active:scale-95 transition text-white p-3 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-b-[4px] border-[#14532d]"
                      >
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.67-5.67"/>
                        </svg>
                      </button>
                    </div>

                    {/* Mascot */}
                    <div className="absolute -bottom-4 -left-6 text-[75px] drop-shadow-lg scale-x-[-1] z-20 pointer-events-none">
                      🐿️
                    </div>
                  </>
                ) : (
                  <>
                    {/* FAILED POPUP CONTENT */}
                    <div className="text-center mb-3 mt-1">
                      <p className="text-[14px] font-black text-[#1c1917] leading-tight">Oops! That's not the correct answer.</p>
                      <p className="text-[12px] font-medium text-[#57534e]">Don't worry, you have more chances!</p>
                    </div>

                    <div className="bg-[#fef3c7] rounded-lg p-2.5 flex items-start gap-2 border-[1px] border-[#fde68a] w-full mb-3 shadow-sm">
                      <div className="text-[20px] leading-none drop-shadow-sm mt-0.5">💡</div>
                      <p className="text-[11px] font-bold text-[#92400e] leading-snug">
                        Tip: Think about what plants need to make their own food.
                      </p>
                    </div>

                    <div className="bg-[#ffedd5] rounded-xl p-3 w-full border-[1px] border-[#fdba74] flex flex-col items-center mb-4 shadow-inner">
                      <span className="text-[#9a3412] font-black text-[12px] mb-0.5">Still not sure?</span>
                      <span className="text-[#c2410c] font-semibold text-[10px] mb-2">We'll show you the correct answer.</span>
                      <img src="/mindlab/brainthread/photosynthesis-conpect.png" className="w-full h-auto object-contain drop-shadow-sm rounded" />
                    </div>

                    <div className="bg-[#fee2e2] rounded-xl p-3 flex items-center gap-3 w-full border border-[#fca5a5] shadow-sm relative overflow-hidden mb-4">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-500 fill-current shrink-0" stroke="#b45f06" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <div className="flex flex-col pr-8">
                        <span className="text-[11px] font-black text-[#7f1d1d] leading-tight">Answer revealed! <span className="text-red-600">10 XP</span> deducted.</span>
                        <span className="text-[10px] font-semibold text-[#991b1b] leading-tight mt-0.5">Keep learning and you'll get it next time!</span>
                      </div>
                      <div className="absolute right-2 w-10 h-10 bg-[#dc2626] rounded-full flex flex-col items-center justify-center text-white border-2 border-white shadow-md transform rotate-12">
                        <span className="font-black text-[12px] leading-none mt-1">-10</span>
                        <span className="font-bold text-[9px] leading-none">XP</span>
                      </div>
                    </div>

                    {/* Continue Button Location Inside Box */}
                    <button
                      onClick={handleFailedContinue}
                      className="w-full rounded-xl bg-gradient-to-b from-[#f59e0b] to-[#d97706] px-6 py-3 text-[16px] font-black text-[#3e1c00] shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 border-[#fcd34d] transition hover:scale-105 active:scale-95 uppercase tracking-wider"
                    >
                      Continue
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint Popup Overlay */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/70 p-4"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="relative w-[350px] flex flex-col items-center mt-6"
              >
                {/* Background Image Frame dictates the size */}
                <img 
                  src="/mindlab/brainthread/hint.png" 
                  alt="Hint Frame" 
                  className="w-full h-auto object-contain pointer-events-none drop-shadow-2xl" 
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center z-10">
                  
                  {/* Glowing Lightbulb */}
                  <div className="absolute -top-[12%] text-[65px] filter drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] pointer-events-none">
                    💡
                  </div>

                  {/* Transparent Close Button mapping to the X on the image */}
                  <button 
                    onClick={() => setShowHint(false)} 
                    className="absolute top-0 right-0 w-[35%] h-[35%] bg-transparent z-50 cursor-pointer"
                  ></button>

                  {/* Ribbon Text: "HINT" */}
                  <div className="absolute top-[10%] w-full text-center pointer-events-none">
                    <span className="text-white font-black text-[26px] tracking-widest font-['Titan_One'] drop-shadow-md">
                      HINT
                    </span>
                  </div>

                  {/* Text and Image wrapper */}
                  <div className="absolute top-[30%] bottom-[10%] left-[8%] right-[8%] flex flex-col items-center justify-start">
                    {/* Hint Content Text */}
                    <p className="text-[15px] font-bold text-[#14532d] text-center leading-[1.3] mb-3 w-[110%] px-1">
                      Think about what plants<br/>need to make their own food.<br/>Consider the sunlight they<br/>get and the gases in the air.
                    </p>

                    {/* Concept Images Box */}
                    <div className="bg-[#edf3d8] rounded-2xl p-2 w-[110%] max-w-[280px] flex-1 min-h-0 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-[#d3e3b5]">
                      <img src="/mindlab/brainthread/sunlight+co2.png" className="w-full h-full object-contain mix-blend-multiply opacity-90" alt="Sunlight and Carbon Dioxide" />
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
