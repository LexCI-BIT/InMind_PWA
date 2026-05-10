import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MorningLandscape, EveningLandscape, ValleyLandscape } from './landscapes';

/**
 * JournalEntry — single-prompt journaling screen.
 *
 *   • Back chevron + (optional) menu in the header row
 *   • Landscape "header card" with date + title overlaid in the corner
 *   • Either a SMALL single-line prompt (career/tried/etc.) or a bold
 *     "WHAT'S ON YOUR MIND?" header (evening/future-self)
 *   • Big freeform textarea
 *   • Optional QUICK TAGS pill grid
 *   • Save Entry CTA pill
 *
 * Routed as /student/journal/:id. The id selects which preset to render.
 */

const Landscape = {
  morning: MorningLandscape,
  evening: EveningLandscape,
  valley:  ValleyLandscape,
};

const PRESETS = {
  'start-day': {
    title: 'Start your Day',
    landscape: 'morning',
    promptStyle: 'small',
    prompt: "what's the one thing you did well today?",
    placeholder: 'write your thoughts...',
    showTags: true,
    showMenu: false,
  },
  evening: {
    title: 'Evening Reflection',
    landscape: 'evening',
    promptStyle: 'caps',
    prompt: "what's on your mind?",
    placeholder: 'write your thoughts...',
    showTags: true,
    showMenu: true,
  },
  career: {
    title: 'Start your Day',
    landscape: 'morning',
    promptStyle: 'small',
    prompt: "what's the one thing you did well today?",
    placeholder: 'write your thoughts...',
    showTags: true,
    showMenu: false,
  },
  tried: {
    title: 'Start your Day',
    landscape: 'morning',
    promptStyle: 'small',
    prompt: "what's the one thing you tried even it was difficult today?",
    placeholder: 'write your thoughts...',
    showTags: true,
    showMenu: false,
  },
  differently: {
    title: 'Reflect Tomorrow',
    landscape: 'evening',
    promptStyle: 'small',
    prompt: 'what will you do differently tomorrow?',
    placeholder: 'write your thoughts...',
    showTags: true,
    showMenu: false,
  },
  controlled: {
    title: 'A Moment of Control',
    landscape: 'evening',
    promptStyle: 'small',
    prompt: 'was there a moment you controlled yourself today?',
    placeholder: 'write your thoughts...',
    showTags: true,
    showMenu: false,
  },
  'future-self': {
    title: 'Your Future Self at Work',
    landscape: 'valley',
    promptStyle: 'caps',
    prompt: "what's on your mind?",
    placeholder: 'picture yourself running your dream business, happy and fulfilled...',
    showTags: false,
    showMenu: true,
  },
};

const TAGS = ['Stressed', 'Happy', 'Excited', 'Tired', 'Anxious', 'Focus', 'Tired', 'Anxious', 'Focus'];

export function JournalEntry() {
  const navigate = useNavigate();
  const { id } = useParams();
  const preset = PRESETS[id] || PRESETS['start-day'];

  const [text, setText] = useState('');
  // Pre-select two tags (matching the Figma) — Stressed + Anxious.
  const [activeTags, setActiveTags] = useState(new Set([0, 4]));

  const toggle = (i) => {
    const next = new Set(activeTags);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setActiveTags(next);
  };

  const handleSave = () => {
    // TODO: persist entry. For now just bounce back to the journal index.
    navigate('/student/journal');
  };

  const Bg = Landscape[preset.landscape] || MorningLandscape;
  const today = new Date();
  const dateLabel = today
    .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    .toUpperCase();
  const [dayName, rest] = dateLabel.split(', ');

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818]">
      <div className="flex-1 overflow-y-auto pb-10">
        {/* Header row */}
        <div className="flex items-center justify-between px-5 pt-safe pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white/85 transition hover:bg-white/10"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>

          {preset.showMenu && (
            <button
              type="button"
              aria-label="More"
              className="grid size-10 place-items-center text-white/85 transition hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          )}
        </div>

        {/* Landscape header card */}
        <div className="mx-5 mt-4 overflow-hidden rounded-[20px] shadow-lg shadow-black/30">
          <div className="relative h-[140px] w-full">
            <Bg className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                <span className="text-amber-400">{dayName}</span>
                <span className="text-white">, {rest}</span>
              </p>
              <h1 className="mt-1 text-[26px] font-bold leading-tight text-white drop-shadow">
                {preset.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Prompt + textarea */}
        <div className="mx-5 mt-5 rounded-[20px] bg-[#262626] p-4">
          {preset.promptStyle === 'caps' ? (
            <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-white">
              What's on your{' '}
              <span className="text-amber-400">mind?</span>
            </h2>
          ) : (
            <p className="text-[14px] text-white/85">{preset.prompt}</p>
          )}

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={preset.placeholder}
            rows={6}
            className="mt-3 w-full resize-none rounded-2xl bg-[#3a3a3a]/60 p-4 text-[14px] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          />

          {preset.showTags && (
            <>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
                Quick Tags
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {TAGS.map((label, i) => {
                  const on = activeTags.has(i);
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => toggle(i)}
                      whileTap={{ scale: 0.94 }}
                      className={[
                        'rounded-full px-3 py-2 text-[12.5px] font-bold transition-colors',
                        on
                          ? 'bg-amber-400 text-[#1f1f1f]'
                          : 'bg-[#3a3a3a] text-white/65 hover:text-white',
                      ].join(' ')}
                      aria-pressed={on}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}

          <motion.button
            type="button"
            onClick={handleSave}
            whileTap={{ scale: 0.97 }}
            className="mt-7 w-full rounded-full bg-amber-400 py-3.5 text-[15px] font-bold text-[#1f1f1f] shadow-md shadow-amber-400/25 transition hover:bg-amber-300"
          >
            Save Entry
          </motion.button>
        </div>
      </div>
    </section>
  );
}
