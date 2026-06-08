import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Word bank (emotional-intelligence themed) ─── */
const WORD_DATA = [
  {
    word: 'EMPATHY',
    clue: "The ability to understand and share another person's feelings.",
    extras: ['Z', 'B', 'C'],
  },
  {
    word: 'COURAGE',
    clue: 'The strength to face fear, pain, or difficulty.',
    extras: ['Z', 'X', 'K'],
  },
  {
    word: 'RESPECT',
    clue: 'Treating others with consideration and honor.',
    extras: ['Z', 'X', 'K'],
  },
  {
    word: 'BELIEVE',
    clue: 'To have confidence or faith in something or someone.',
    extras: ['Z', 'X', 'K'],
  },
  {
    word: 'HONESTY',
    clue: 'The quality of being truthful and sincere.',
    extras: ['Z', 'X', 'K'],
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── 9 positions on the wooden wheel (Custom tuned layout) ─── */
const WHEEL_SLOTS = [
  { top: '18.0%', left: '44.0%' }, // 0: Top
  { top: '25.3%', left: '61.5%' }, // 1: Top-Right
  { top: '42.8%', left: '70.6%' }, // 2: Right
  { top: '61.6%', left: '67.5%' }, // 3: Bottom-Right
  { top: '73.7%', left: '52.9%' }, // 4: Bottom-Mid-Right
  { top: '72.97%', left: '33.5%' }, // 5: Bottom-Mid-Left
  { top: '62.0%', left: '19.5%' }, // 6: Bottom-Left
  { top: '43.0%', left: '15.9%' }, // 7: Left
  { top: '25.3%', left: '26.0%' }, // 8: Top-Left (Fixed)
];

function getInitialState(wordData) {
  const pool = [...wordData.word.split(''), ...wordData.extras];
  const lettersArr = pool.map((char, i) => ({ id: `${char}-${i}-${Date.now()}`, char, onWheel: true }));
  const shuffled = shuffleArray(lettersArr);

  const firstChar = wordData.word[0];
  const hintLetter = shuffled.find((l) => l.char === firstChar);
  if (hintLetter) {
    hintLetter.onWheel = false;
  }

  const initSlots = Array(wordData.word.length).fill(null);
  if (hintLetter) {
    initSlots[0] = hintLetter.id;
  }

  return { letters: shuffled, slots: initSlots };
}

/* ═══════════════════════════════════════════════════════════ */

export function WordQuestGame() {
  const navigate = useNavigate();

  /* level / score */
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const current = WORD_DATA[levelIndex % WORD_DATA.length];

  /* letters & slots */
  const initRef = useRef(null);
  if (!initRef.current) {
    initRef.current = getInitialState(current);
  }
  const [letters, setLetters] = useState(initRef.current.letters);
  const [slots, setSlots] = useState(initRef.current.slots);

  /* game phase: playing | checking | correct | wrong */
  const [phase, setPhase] = useState('playing');

  /* ── Place a letter into the next empty answer slot ── */
  const placeLetter = useCallback(
    (letterId) => {
      if (phase !== 'playing') return;
      const emptyIdx = slots.indexOf(null);
      if (emptyIdx === -1) return;

      setLetters((p) => p.map((l) => (l.id === letterId ? { ...l, onWheel: false } : l)));
      setSlots((p) => {
        const n = [...p];
        n[emptyIdx] = letterId;
        return n;
      });
    },
    [slots, phase]
  );

  /* ── Remove a letter from an answer slot back to wheel ── */
  const removeFromSlot = useCallback(
    (idx) => {
      if (phase !== 'playing') return;
      const letterId = slots[idx];
      if (!letterId) return;

      setLetters((p) => p.map((l) => (l.id === letterId ? { ...l, onWheel: true } : l)));
      setSlots((p) => {
        const n = [...p];
        n[idx] = null;
        return n;
      });
    },
    [slots, phase]
  );

  /* ── Check answer ── */
  const checkWord = useCallback(() => {
    setPhase('checking');
    const attempt = slots.map((id) => letters.find((l) => l.id === id)?.char ?? '').join('');

    setTimeout(() => {
      if (attempt === current.word) {
        setPhase('correct');
        setScore((s) => s + 1);
      } else {
        setPhase('wrong');
        setTimeout(() => setPhase('playing'), 1000);
      }
    }, 600);
  }, [slots, letters, current]);

  /* ── Next word ── */
  const nextWord = useCallback(() => {
    if (levelIndex >= 2) {
      // Quest complete after 3 words!
      navigate('/student/mindlab');
      return;
    }

    const ni = levelIndex + 1;
    const nw = WORD_DATA[ni];
    setLevelIndex(ni);

    const newState = getInitialState(nw);
    setLetters(newState.letters);
    setSlots(newState.slots);

    setPhase('playing');
  }, [levelIndex, navigate]);

  const allFilled = slots.every((s) => s !== null);
  const wheelLetters = letters.filter((l) => l.onWheel);

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <section className="relative mx-auto flex h-[100dvh] w-full items-center justify-center bg-[#0a0f14] select-none overflow-hidden">
      <div
        className="relative shadow-2xl overflow-hidden w-full h-full"
        style={{
          maxWidth: 'min(100vw, calc(100dvh * (9 / 19.5)))',
          maxHeight: 'min(100dvh, calc(100vw * (19.5 / 9)))',
          aspectRatio: '9/19.5'
        }}
      >
        {/* ── Full-screen background ── */}
        <img
          src={phase === 'correct' ? "/mindlab/wordquest/characterbg.png" : "/mindlab/wordquest/boardbg.png"}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-500"
        />

        {/* ── Back button ── */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-6 z-30 grid size-9 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          aria-label="Go back"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* ── WORD QUEST title ── */}
        <AnimatePresence>
          {phase !== 'correct' && (
            <motion.h1
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="absolute top-[8%] left-0 right-0 z-10 text-center leading-[0.92]"
              style={{
                fontFamily: "'Titan One', 'Impact', 'Arial Black', sans-serif",
                fontSize: 'clamp(40px, 11vw, 56px)',
                color: '#ffffff',
                textShadow: '3px 4px 0px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.15)',
                WebkitTextStroke: '1px rgba(0,0,0,0.12)',
              }}
            >
              WORD
              <br />
              QUEST
            </motion.h1>
          )}
        </AnimatePresence>

        {/* ── Score badge ── */}
        <div className="absolute right-4 top-6 z-30 rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-bold text-[#3a1800] shadow-lg backdrop-blur-sm">
          ⭐ {score}
        </div>

        {/* ── Speech bubble ── */}
        <AnimatePresence>
          {phase !== 'correct' && (
            <motion.div
              key={current.clue}
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[23%] right-[5%] z-10 w-[58%] max-w-[240px]"
            >
              <div 
                className="relative rounded-[16px] px-4 py-3.5 shadow-lg"
                style={{
                  background: '#f8f8f8',
                  border: '1.5px solid #333',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                }}
              >
                <p
                  className="mb-1 text-[13.5px] font-bold text-center"
                  style={{ color: '#b28912' }}
                >
                  Quest Clue:
                </p>
                <p className="text-center text-[12.5px] font-medium leading-relaxed text-[#333]">
                  {current.clue}
                </p>

                {/* Bubble tail pointing left */}
                <div
                  className="absolute -left-[7px] top-[30%] h-[12px] w-[12px] -rotate-45"
                  style={{
                    background: '#f8f8f8',
                    borderLeft: '1.5px solid #333',
                    borderTop: '1.5px solid #333',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Wooden wheel area ── */}
        <AnimatePresence>
          {phase !== 'correct' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[49.5%] left-1/2 z-10 aspect-square w-[76%] -translate-x-1/2"
            >
              {/* Letter tiles on the wheel */}
              <AnimatePresence>
                {wheelLetters.map((letter, idx) => {
                  const slot = WHEEL_SLOTS[idx % WHEEL_SLOTS.length];
                  return (
                    <motion.button
                      key={letter.id}
                      type="button"
                      layout
                      drag
                      dragConstraints={{ left: -150, right: 150, top: -150, bottom: 250 }}
                      dragElastic={0.2}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => placeLetter(letter.id)}
                      className="absolute flex items-center justify-center rounded-[10px] font-bold shadow-xl cursor-grab active:cursor-grabbing"
                      style={{
                        top: slot.top,
                        left: slot.left,
                        width: '12.5%',
                        height: '12.5%',
                        transform: 'translate(-50%, -50%)',
                        background: 'linear-gradient(180deg, #462512 0%, #2a1608 100%)',
                        border: '1.5px solid #6b3e1e',
                        color: '#f0c070',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 'clamp(18px, 5.5vw, 24px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.05)',
                      }}
                    >
                      {letter.char}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Success Overlay ── */}
        <AnimatePresence>
          {phase === 'correct' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[16%] left-0 right-0 z-20 flex flex-col items-center"
            >
              {/* WORD FOUND! Title */}
              <div className="flex flex-col items-center mb-6">
                <span 
                  className="text-white font-black leading-none"
                  style={{
                    fontFamily: "'Titan One', 'Impact', sans-serif",
                    fontSize: 'clamp(48px, 13vw, 64px)',
                    WebkitTextStroke: '2px #1a2c3f',
                    textShadow: '0 6px 10px rgba(0,0,0,0.4)',
                  }}
                >
                  WORD
                </span>
                <span 
                  className="font-black leading-none -mt-3"
                  style={{
                    fontFamily: "'Titan One', 'Impact', sans-serif",
                    fontSize: 'clamp(52px, 14vw, 72px)',
                    background: 'linear-gradient(180deg, #ffdf00 0%, #f09000 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStroke: '2px #4a2105',
                    filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.4))',
                  }}
                >
                  FOUND!
                </span>
              </div>

              {/* 3 Stars */}
              <div className="flex items-center justify-center gap-[4px] mb-6 relative">
                {/* Glow behind stars */}
                <div className="absolute inset-0 bg-yellow-200/40 blur-3xl rounded-full scale-[2]" />
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: i === 1 ? 1.25 : 1, rotate: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    className="relative z-10"
                    style={{ transform: i === 1 ? 'translateY(-12px)' : 'none' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-[18vw] max-w-[70px] h-[18vw] max-h-[70px]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>
                      <path 
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                        fill="url(#star-grad)" 
                        stroke="#b45f06" 
                        strokeWidth="1.5" 
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="star-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ffeb3b" />
                          <stop offset="50%" stopColor="#ffb300" />
                          <stop offset="100%" stopColor="#e65100" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                ))}
              </div>

              {/* Points Plaque */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative px-8 py-2.5 rounded-[12px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, #4e2912 0%, #2f1506 100%)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.6), inset 0 2px 0px rgba(255,255,255,0.1)',
                  border: '2px solid #85481d',
                }}
              >
                <span 
                  className="font-black text-[clamp(18px,5vw,24px)] tracking-wide"
                  style={{
                    color: '#ffb300',
                    textShadow: '1px 2px 2px rgba(0,0,0,0.8)',
                    fontFamily: "'Titan One', 'Impact', sans-serif"
                  }}
                >
                  +20 POINTS
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Answer boxes & Button Wrapper ── */}
        <div className="absolute left-0 w-full z-10" style={{ bottom: '1.2%' }}>
          <div className="flex justify-center flex-nowrap" style={{ gap: '0.1%', transform: 'translateX(0.8%)' }}>
            {slots.map((letterId, idx) => {
              const letter = letters.find((l) => l.id === letterId);
              const isEmpty = !letter;
              return (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => removeFromSlot(idx)}
                  animate={
                    phase === 'wrong'
                      ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
                      : phase === 'correct'
                        ? { scale: [1, 1.1, 1], transition: { delay: idx * 0.06 } }
                        : {}
                  }
                  transition={phase === 'wrong' ? { duration: 0.45 } : {}}
                  className="flex items-center justify-center rounded-[10px] font-bold shadow-xl transition-all duration-200"
                  style={{
                    width: '12%',
                    aspectRatio: '42/46',
                    flexShrink: 0,
                    background: isEmpty
                      ? 'rgba(42, 22, 8, 0.4)'
                      : 'linear-gradient(180deg, #462512 0%, #2a1608 100%)',
                    border: isEmpty
                      ? '1.5px solid rgba(107, 62, 30, 0.3)'
                      : phase === 'wrong'
                        ? '2px solid #ef4444'
                        : '1.5px solid #6b3e1e',
                    boxShadow: isEmpty
                      ? 'inset 0 4px 6px rgba(0,0,0,0.5)'
                      : '0 4px 8px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.05)',
                    color: '#f0c070',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(18px, 5.5vw, 24px)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {letter && (
                      <motion.span
                        key={letter.id}
                        initial={{ scale: 0, y: -30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0, y: 30, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        {letter.char}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* ── CHECK / NEXT button ── */}
          <div className="mt-3 flex justify-center min-h-[48px]">
            <AnimatePresence mode="wait">
              {allFilled && phase === 'playing' && (
                <motion.button
                  key="check"
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={checkWord}
                  className="rounded-full px-10 py-3 text-[15px] font-extrabold uppercase tracking-[0.18em] shadow-xl"
                  style={{
                    background: 'linear-gradient(180deg, #ffd54f 0%, #f9a825 50%, #e65100 100%)',
                    color: '#3a2200',
                    boxShadow: '0 6px 22px rgba(249,168,37,0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                >
                  CHECK
                </motion.button>
              )}

              {phase === 'checking' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-[14px] font-bold text-amber-300"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                  Checking…
                </motion.div>
              )}

              {phase === 'correct' && (
                <motion.button
                  key="next"
                  type="button"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={nextWord}
                  className="rounded-[10px] px-14 py-2.5 text-[18px] font-bold shadow-xl transition"
                  style={{
                    background: 'linear-gradient(180deg, #d39641 0%, #a66a1e 100%)',
                    border: '2px solid #633a0c',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.2)',
                    color: '#3a1f04',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {levelIndex >= 2 ? 'Done' : 'Next'}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Celebration overlay ── */}
        <AnimatePresence>
          {phase === 'correct' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            >
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 300,
                    y: (Math.random() - 0.5) * 400,
                    scale: [0, 1.2, 0.8],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.4, delay: i * 0.05 }}
                >
                  {['✨', '🌟', '⭐', '🎉', '💫'][i % 5]}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
