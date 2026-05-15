import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEP_LABELS = ['Daily Prompt','Scenario','Micro Feedback','Reflection','Insight','Challenge','Completed'];
const EMOJIS = ['😣','😟','🙂','😄'];
const DAYS = ['M','T','W','T','F','S','S'];
const THEMES = [
  { accent:'#22c55e', bar:'#22c55e', btn:'#22c55e', btnT:'#fff' },
  { accent:'#ef4444', bar:'#ef4444', btn:'#ef4444', btnT:'#fff' },
  { accent:'#3b82f6', bar:'#3b82f6', btn:'#3b82f6', btnT:'#fff' },
  { accent:'#22c55e', bar:'#22c55e', btn:'#22c55e', btnT:'#fff' },
  { accent:'#f97316', bar:'#22c55e', btn:'#22c55e', btnT:'#fff' },
  { accent:'#a855f7', bar:'#22c55e', btn:'#a855f7', btnT:'#fff' },
  { accent:'#f59e0b', bar:'#f59e0b', btn:'#f59e0b', btnT:'#1a1a1a' },
];

const slide = {
  enter:(d)=>({x:d>0?120:-120,opacity:0}),
  center:{x:0,opacity:1},
  exit:(d)=>({x:d>0?-120:120,opacity:0}),
};

export function DailyActivity({ week, dayIndex, onBack, onComplete }) {
  const day = week.days[dayIndex];
  const c = day.content;
  const [step,setStep] = useState(0);
  const [dir,setDir] = useState(1);
  const [promptAns,setPromptAns] = useState('');
  const [sel,setSel] = useState(null);
  const [emoji,setEmoji] = useState(2);
  const [fbText,setFbText] = useState('');
  const [refText,setRefText] = useState('');
  const [ben,setBen] = useState('');
  const [con,setCon] = useState('');

  const t = THEMES[step];
  const progress = ((step+1)/7)*100;

  const next = () => { if(step===6){onComplete();return;} setDir(1); setStep(s=>s+1); };
  const back = () => { if(step===0){onBack();return;} setDir(-1); setStep(s=>s-1); };

  const btnLabel = step===0?"Let's Reflect →":step===5?'Completed →':step===6?'Finish →':'Next →';

  return (
    <section className="relative mx-auto flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans">
      <div className="absolute -right-16 top-16 size-40 rounded-full blur-[80px] opacity-25 pointer-events-none" style={{background:t.accent}}/>
      <div className="absolute -left-12 bottom-32 size-32 rounded-full blur-[60px] opacity-15 pointer-events-none" style={{background:t.accent}}/>

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-6">
        <div className="flex items-center gap-3 mb-3">
          <button type="button" onClick={back} className="text-white p-1 hover:opacity-70 transition">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h2 className="flex-1 text-center text-[18px] font-extrabold text-white">{STEP_LABELS[step]}</h2>
          <span className="text-[12px] text-white/40 font-bold tabular-nums w-8 text-right">{step+1}/7</span>
        </div>
        <div className="h-[4px] rounded-full bg-[#333] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{background:t.bar}} animate={{width:`${progress}%`}} transition={{duration:0.4}}/>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-5 pb-4 overflow-y-auto min-h-0 no-scrollbar">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{duration:0.25}} className="flex-1 flex flex-col">
            {step===0 && <PromptStep c={c} t={t} v={promptAns} set={setPromptAns}/>}
            {step===1 && <ScenarioStep c={c} t={t} v={sel} set={setSel}/>}
            {step===2 && <FeedbackStep t={t} emoji={emoji} setEmoji={setEmoji} text={fbText} setText={setFbText}/>}
            {step===3 && <ReflectionStep c={c} t={t} v={refText} set={setRefText}/>}
            {step===4 && <InsightStep c={c} t={t} di={dayIndex}/>}
            {step===5 && <ChallengeStep c={c} t={t} ben={ben} setBen={setBen} con={con} setCon={setCon}/>}
            {step===6 && <CompleteStep week={week} di={dayIndex}/>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Bottom Button */}
      <div className="relative z-10 px-6 pb-6 pt-3 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a] to-transparent">
        <motion.button type="button" onClick={next} whileTap={{scale:0.96}} whileHover={{scale:1.02}}
          className="w-full rounded-full py-3.5 text-[15px] font-bold shadow-lg transition"
          style={{background:t.btn, color:t.btnT, boxShadow:`0 8px 24px ${t.btn}33`}}>
          {btnLabel}
        </motion.button>
      </div>
    </section>
  );
}

/* ── 1. Daily Prompt ── */
function PromptStep({c,t,v,set}) {
  const q = c.prompt.replace(/"([^"]+)"/g, `<span style="color:${t.accent};font-weight:700">$1</span>`);
  const isTyping = v.length > 0;
  
  return (
    <div className="flex-1 flex flex-col">
      {/* Greeting */}
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="flex items-center gap-3 mt-2">
        <h2 className="text-[30px] font-bold text-white tracking-tight">Hey Aryan</h2>
        <motion.div animate={{rotate:[0,15,-5,15,0]}} transition={{duration:1.5, repeat:Infinity, repeatDelay:1}} className="origin-bottom-right">
          <svg className="w-9 h-9 text-[#22c55e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Waving Hand */}
            <path d="M18 11V6a2 2 0 0 0-4 0v4"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14v-2a2 2 0 0 0-4 0v4c0 4.418 3.582 8 8 8h2c4.418 0 8-3.582 8-8v-5a2 2 0 0 0-4 0v3"/>
            {/* Motion Lines */}
            <path d="M3 13a4 4 0 0 1 0-8" strokeWidth="2"/><path d="M6 11a2 2 0 0 1 0-4" strokeWidth="2"/>
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Prompt Text */}
      <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}} 
        className="text-[26px] font-medium text-white/95 mt-5 leading-[1.25]" 
        dangerouslySetInnerHTML={{__html:q}}/>

      {/* Character & Sticky Note Area */}
      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.2,type:'spring'}}
        className="relative flex items-center justify-between mt-10 min-h-[180px]">
        
        {/* Sticky Note */}
        <motion.div animate={{y:[0,-4,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
          className="relative z-20 w-[180px] -rotate-3 ml-2 mt-8">
          {/* Tape */}
          <div className="absolute -top-3 left-6 w-4 h-8 bg-gray-500/80 -rotate-[10deg] z-30 shadow-sm" />
          {/* Note Body */}
          <div className="bg-[#fbbf24] rounded-[16px] px-4 py-3.5 shadow-xl shadow-[#fbbf24]/20 flex items-center gap-3">
            <svg className="w-7 h-7 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight">Think Positive<br/>Think Growth</p>
          </div>
        </motion.div>
        
        {/* Character Image */}
        <div className="absolute right-0 bottom-0 pointer-events-none">
          <motion.img src="/char-pointing.png" alt="" className="h-56 object-contain"
            style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)' }}
            animate={{y:[0,-4,0]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}/>
        </div>
      </motion.div>

      {/* Playful Interactive Input */}
      <motion.div layout className="mt-auto pt-6 relative group z-30">
        <motion.div 
          animate={{ 
            boxShadow: isTyping ? `0 0 20px ${t.accent}40` : '0 0 0px transparent',
            borderColor: isTyping ? t.accent : '#333'
          }}
          className="rounded-3xl bg-[#242424] border-2 transition-all duration-300 overflow-hidden relative"
        >
          {isTyping && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute top-3 right-4 text-xl">
              ✍️
            </motion.div>
          )}
          <textarea value={v} onChange={e=>set(e.target.value)} placeholder="Type Your Answer Here..." rows={4}
            className="w-full bg-transparent p-5 text-[14px] text-white placeholder:text-white/30 resize-none focus:outline-none relative z-10"
          />
          <div className="bg-[#1a1a1a]/50 px-4 py-2 border-t border-[#333] flex justify-between items-center">
             <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Your Space</p>
             <p className={['text-[11px] font-bold transition-colors', v.length > 10 ? 'text-green-400' : 'text-white/40'].join(' ')}>
               {v.length} characters
             </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── 2. Scenario ── */
function ScenarioStep({c,t,v,set}) {
  return (
    <div className="flex-1 flex flex-col">
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center shadow-lg shadow-[#3b82f6]/30">
          <span className="text-xl">📖</span>
        </div>
        <p className="text-[20px] font-extrabold text-white">Daily Scenario</p>
      </motion.div>

      <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
        className="text-[16px] text-white/80 mt-5 leading-relaxed bg-[#242424] p-4 rounded-2xl border border-[#333]">
        {c.scenario}<br/><span className="text-white/50 text-[13px] block mt-1">What will you do?</span>
      </motion.p>

      <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:0.15,type:'spring'}}
        className="relative flex justify-center mt-6 mb-2">
        {/* Glow aura */}
        <div className="absolute inset-0 m-auto w-56 h-56 rounded-full opacity-30 blur-[50px] pointer-events-none" style={{background:'radial-gradient(circle,#ef4444 0%,transparent 70%)'}}/>
        <motion.img src="/char-thinking.png" alt="" className="h-52 object-contain relative z-10"
          style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)' }}
          animate={{y:[0,-8,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}/>
      </motion.div>

      <div className="flex flex-col gap-2.5 mt-auto relative z-20">
        {c.scenarioOptions.map((o,i) => (
          <motion.button key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.2+i*0.1}}
            onClick={()=>set(i)}
            className={['w-full p-4 rounded-2xl text-left text-[14px] font-bold transition-all border-2 relative overflow-hidden',
              v===i?`bg-[#242424] text-white border-[${t.accent}] shadow-[0_0_20px_rgba(0,0,0,0.4)]`
                :'bg-[#242424] text-white/70 border-[#333] hover:bg-[#2a2a2a]'].join(' ')}
            style={v===i?{borderColor:t.accent}:{}}>
            {v===i && <div className="absolute inset-0 opacity-10" style={{backgroundColor:t.accent}} />}
            <span className="relative z-10">{o}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ── 3. Micro Feedback ── */

const AngryIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 9l2 1.5"/><path d="M16 9l-2 1.5"/>
    <circle cx="9" cy="11.5" r="1.5" fill={color} stroke="none"/>
    <circle cx="15" cy="11.5" r="1.5" fill={color} stroke="none"/>
    <path d="M8 16c1.5-1.5 3-2 4-2s2.5.5 4 2"/>
  </svg>
);

const SadIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="9" cy="10" r="1.5" fill={color} stroke="none"/>
    <circle cx="15" cy="10" r="1.5" fill={color} stroke="none"/>
    <path d="M8 16c1.5-2 3-3 4-3s2.5 1 4 3"/>
  </svg>
);

const NeutralIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="9" cy="10" r="1.5" fill={color} stroke="none"/>
    <circle cx="15" cy="10" r="1.5" fill={color} stroke="none"/>
    <line x1="8" y1="15" x2="16" y2="15"/>
  </svg>
);

const HappyIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="10"/>
    <path d="M7 10c0-1.5 1.5-2 2-2s2 .5 2 2"/><path d="M13 10c0-1.5 1.5-2 2-2s2 .5 2 2"/>
    <path d="M8 14s1.5 3 4 3 4-3 4-3"/>
    <path d="M8 14h8"/>
  </svg>
);

function FeedbackStep({t,emoji,setEmoji,text,setText}) {
  const isTyping = text.length > 0;
  
  const MOODS = [
    { Icon: AngryIcon, color: '#ef4444', title: "Oof, that's tough.", subtitle: "Want to talk about it?" },
    { Icon: SadIcon, color: '#f97316', title: "Not quite sure?", subtitle: "What's on your mind?" },
    { Icon: NeutralIcon, color: '#facc15', title: "Alright, cool.", subtitle: "Any specific thoughts?" },
    { Icon: HappyIcon, color: '#10b981', title: "Absolutely awesome!", subtitle: "What made it so great?" }
  ];
  const current = MOODS[emoji];

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="relative z-10 flex flex-col flex-1">
        <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
          className="text-[26px] font-extrabold text-white text-center mt-2 tracking-tight">
          How do you feel about<br/>your choice?
        </motion.p>

        {/* Enhanced Slider Area */}
        <div className="mt-12 px-2">
          <p className="text-[13px] text-white/70 mb-3">Slide to express</p>
          
          {/* Slider */}
          <div className="relative h-6 flex items-center mb-10">
            {/* Custom track background */}
            <div className="absolute w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden shadow-inner">
              {/* Fill track */}
              <motion.div 
                className="h-full rounded-full bg-[#0ea5e9]"
                animate={{ width: `${(emoji/3)*100}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              />
            </div>
            
            {/* Native slider on top (invisible but clickable) */}
            <input type="range" min={0} max={3} value={emoji} onChange={e=>setEmoji(Number(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-20"
            />
            
            {/* Custom Thumb */}
            <motion.div
              animate={{ left: `calc(${(emoji/3)*100}% - 12px)` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="absolute w-6 h-6 bg-[#0ea5e9] rounded-full shadow-md z-10 pointer-events-none"
            />
          </div>

          {/* SVG Icons Row */}
          <div className="flex justify-between items-center px-2">
            {MOODS.map((m, i) => {
              const Icon = m.Icon;
              const isActive = emoji === i;
              return (
                <motion.button 
                  key={i} 
                  type="button"
                  onClick={() => setEmoji(i)}
                  animate={{ 
                    scale: isActive ? 1.3 : 1, 
                    opacity: isActive ? 1 : 0.4
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 transition-colors duration-300"
                >
                  <Icon color={m.color} />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Question */}
        <motion.p 
          key={`q-${emoji}`}
          initial={{opacity:0}} animate={{opacity:1}} 
          className="text-[17px] font-bold text-white text-center mt-12 mb-4">
          Why do you feel that way?
        </motion.p>
        
        {/* Playful Interactive Input */}
        <motion.div layout className="mt-auto relative group z-30">
          <motion.div 
            animate={{ 
              boxShadow: isTyping ? `0 0 20px ${current.color}40` : '0 0 0px transparent',
              borderColor: isTyping ? current.color : '#333'
            }}
            className="rounded-3xl bg-[#242424] border-2 transition-all duration-300 overflow-hidden relative"
          >
            {isTyping && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute top-3 right-4 text-xl">
                💬
              </motion.div>
            )}
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type your thoughts here..." rows={3}
              className="w-full bg-transparent p-5 text-[14px] text-white placeholder:text-white/30 resize-none focus:outline-none relative z-10"
            />
            <div className="bg-[#1a1a1a]/50 px-4 py-2 border-t border-[#333] flex justify-between items-center">
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Reflection</p>
               <p className={['text-[11px] font-bold transition-colors', text.length > 10 ? 'text-green-400' : 'text-white/40'].join(' ')}>
                 {text.length} characters
               </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 4. Reflection ── */
function ReflectionStep({c,t,v,set}) {
  const isTyping = v.length > 0;
  
  return (
    <div className="flex-1 flex flex-col">
      <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
        className="text-[22px] font-extrabold text-white text-center mt-2 leading-snug px-2 tracking-wide">
        {c.reflection}
      </motion.p>

      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.15,type:'spring'}}
        className="relative flex justify-center mt-8 mb-4">
        {/* Glow aura */}
        <div className="absolute inset-0 m-auto w-64 h-64 rounded-full opacity-30 blur-[60px] pointer-events-none" style={{background:`radial-gradient(circle, ${t.accent} 0%, transparent 70%)`}}/>
        <motion.img src="/char-reflection.png" alt="" className="h-56 object-contain relative z-10"
          style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 85%)' }}
          animate={{y:[0,-6,0]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}/>
      </motion.div>

      {/* Playful Interactive Input */}
      <motion.div layout className="mt-auto relative group z-30">
        <motion.div 
          animate={{ 
            boxShadow: isTyping ? `0 0 20px ${t.accent}40` : '0 0 0px transparent',
            borderColor: isTyping ? t.accent : '#333'
          }}
          className="rounded-3xl bg-[#242424] border-2 transition-all duration-300 overflow-hidden relative"
        >
          {isTyping && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute top-3 right-4 text-xl">
              ✍️
            </motion.div>
          )}
          <textarea value={v} onChange={e=>set(e.target.value)} placeholder="Type your reflection here..." rows={4}
            className="w-full bg-transparent p-5 text-[14px] text-white placeholder:text-white/30 resize-none focus:outline-none relative z-10"
          />
          <div className="bg-[#1a1a1a]/50 px-4 py-2 border-t border-[#333] flex justify-between items-center">
             <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Your Space</p>
             <p className={['text-[11px] font-bold transition-colors', v.length > 10 ? 'text-green-400' : 'text-white/40'].join(' ')}>
               {v.length} characters
             </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── 5. Insight ── */
function InsightStep({c,t,di}) {
  const streak = di+1;
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <motion.p initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="text-[22px] font-bold text-white text-center mt-2">
        Daily Insight
      </motion.p>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="text-center text-white/60 text-[14px] mt-1">
        {revealed ? 'Awesome! Keep this in mind today.' : 'Tap the card to reveal your insight!'}
      </motion.p>

      {/* Interactive Flip Card */}
      <div className="relative mt-8 mb-6 mx-auto w-full max-w-[300px] h-[190px]" style={{ perspective: 1000 }} onClick={() => setRevealed(true)}>
        <motion.div 
          className="w-full h-full relative cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 15 }}
          whileHover={{ scale: revealed ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Front of card (Hidden state) */}
          <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-[#f59e0b]/50 bg-[#f59e0b]/10 flex flex-col items-center justify-center p-6 text-center shadow-lg"
               style={{ backfaceVisibility: 'hidden' }}>
            <motion.div animate={{y:[0,-10,0]}} transition={{duration:2, repeat:Infinity, ease:'easeInOut'}} className="text-5xl mb-4">
              ✨
            </motion.div>
            <p className="text-[#f59e0b] font-bold text-[17px] tracking-wide">Tap to Reveal</p>
          </div>

          {/* Back of card (Revealed state) */}
          <div className="absolute inset-0 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl"
               style={{
                 background: 'linear-gradient(135deg, #0f172a 0%, #1e3a4a 100%)',
                 border: '1px solid #38bdf8',
                 backfaceVisibility: 'hidden',
                 transform: 'rotateY(180deg)'
               }}>
            <p className="text-[15px] text-[#bae6fd] font-bold leading-relaxed">{c.insight}</p>
            <div className="flex justify-center mt-5 gap-3">
              <span className="text-2xl">🌟</span><span className="text-2xl">🌟</span>
            </div>
            {/* Celebration particles when revealed */}
            {revealed && [...Array(10)].map((_,i)=>(
              <motion.div key={i}
                initial={{opacity:0, scale:0}}
                animate={{opacity:[0,1,0], scale:[0,1.5,0], x:(Math.random()-0.5)*200, y:(Math.random()-0.5)*200}}
                transition={{duration:1.5, delay:i*0.05, ease: 'easeOut'}}
                className="absolute size-2 bg-yellow-400 rounded-full"
                style={{ top: '50%', left: '50%' }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div initial={{opacity:0, y:20, scale:0.95}} animate={{opacity:1, y:0, scale:1}} transition={{delay:0.3, type: 'spring'}} className="mt-auto">
            <div className="rounded-2xl bg-[#242424] border border-[#333] p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f97316] rounded-full blur-[60px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/3" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="size-12 rounded-full bg-[#f97316]/20 flex items-center justify-center shrink-0">
                  <motion.span animate={{scale:[1,1.2,1]}} transition={{duration:1,repeat:Infinity}} className="text-2xl">🔥</motion.span>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white">Your Growth Streak</p>
                  <p className="text-[13px] text-[#f97316] font-bold mt-0.5">{streak} Day{streak>1?'s':''} Strong!</p>
                </div>
              </div>
              
              <div className="flex justify-between mt-6 relative z-10 px-1">
                {DAYS.map((l,i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-[11px] text-white/50 font-bold">{l}</span>
                    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5+i*0.06,type:'spring'}}
                      className={['size-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300',
                        i<=di?'bg-[#22c55e] text-white shadow-[0_0_12px_rgba(34,197,94,0.4)] scale-110':'bg-[#333] text-white/20'].join(' ')}>
                      {i<=di?'✓':''}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── 6. Challenge ── */
function ChallengeStep({c,t,ben,setBen,con,setCon}) {
  const isTypingBen = ben.length > 0;
  const isTypingCon = con.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="text-[24px] font-extrabold tracking-tight" style={{color:t.accent}}>
        Your Challenge for today
      </motion.p>

      <div className="flex items-center gap-3 mt-6">
        <div className="flex-1">
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}
            className="text-[16px] font-medium text-white/90 leading-relaxed pr-2">{c.challenge}</motion.p>
          <p className="text-[15px] text-white/70 mt-5 leading-relaxed">
            Write one <span style={{color:t.accent}} className="font-bold">benefit</span> and one{' '}
            <span style={{color:t.accent}} className="font-bold">consequence</span>
          </p>
        </div>
        <motion.div className="relative shrink-0" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.15,type:'spring'}}>
          <div className="absolute inset-0 m-auto w-40 h-40 rounded-full opacity-25 blur-[50px] pointer-events-none" style={{background:`radial-gradient(circle, ${t.accent} 0%, transparent 70%)`}}/>
          <motion.img src="/char-thumbsup.png" alt="" className="h-44 object-contain relative z-10"
            style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)' }}
            animate={{y:[0,-5,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}/>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {/* Benefit Input */}
        <div>
          <p className="text-[16px] font-extrabold text-white mb-3">Benefit</p>
          <motion.div layout className="relative group">
            <motion.div 
              animate={{ 
                boxShadow: isTypingBen ? `0 0 15px ${t.accent}30` : '0 0 0px transparent',
                borderColor: isTypingBen ? t.accent : '#333'
              }}
              className="rounded-3xl bg-[#242424] border-2 transition-all duration-300 overflow-hidden relative"
            >
              <textarea value={ben} onChange={e=>setBen(e.target.value)} placeholder="Type Your Answer Here..." rows={3}
                className="w-full bg-transparent p-5 text-[14px] text-white placeholder:text-white/30 resize-none focus:outline-none relative z-10"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Consequence Input */}
        <div>
          <p className="text-[16px] font-extrabold text-white mb-3">Consequence</p>
          <motion.div layout className="relative group">
            <motion.div 
              animate={{ 
                boxShadow: isTypingCon ? `0 0 15px ${t.accent}30` : '0 0 0px transparent',
                borderColor: isTypingCon ? t.accent : '#333'
              }}
              className="rounded-3xl bg-[#242424] border-2 transition-all duration-300 overflow-hidden relative"
            >
              <textarea value={con} onChange={e=>setCon(e.target.value)} placeholder="Type Your Answer Here..." rows={3}
                className="w-full bg-transparent p-5 text-[14px] text-white placeholder:text-white/30 resize-none focus:outline-none relative z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. Completed ── */
function CompleteStep({week,di}) {
  const dayName = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][di];
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <motion.p initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring'}}
        className="text-[24px] font-bold text-[#f59e0b]">Awesome Aryan!</motion.p>
      <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
        className="text-[15px] text-white/80 mt-3 leading-relaxed">
        You have completed<br/>{dayName} of Week {week.id}.
      </motion.p>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
        className="text-[14px] text-white/50 mt-2 leading-relaxed">
        You're one step closer to<br/>becoming the best version<br/>of you!!!
      </motion.p>
      <motion.div initial={{scale:0.3,opacity:0,rotate:-10}} animate={{scale:1,opacity:1,rotate:0}}
        transition={{type:'spring',delay:0.25}} className="relative mt-4">
        {/* Glow aura */}
        <div className="absolute inset-0 m-auto w-64 h-64 rounded-full opacity-30 blur-[60px] pointer-events-none" style={{background:'radial-gradient(circle,#f59e0b 0%,transparent 70%)'}}/>
        <img src="/char-celebrating.png" alt="" className="h-56 object-contain relative z-10" style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)' }} />
      </motion.div>

      {/* Confetti */}
      {[...Array(16)].map((_,i)=>(
        <motion.div key={i}
          initial={{opacity:0,y:20,scale:0}}
          animate={{opacity:[0,1,0],y:[0,-80-Math.random()*60],x:(Math.random()-0.5)*220,scale:[0,1.2,0],rotate:[0,360]}}
          transition={{duration:1.8,delay:0.4+i*0.07,ease:'easeOut'}}
          className="absolute size-2.5 rounded-full"
          style={{background:['#f59e0b','#ef4444','#22c55e','#3b82f6','#a855f7','#ec4899'][i%6],top:'55%',left:'50%'}}/>
      ))}
    </div>
  );
}

export default DailyActivity;
