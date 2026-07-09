import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createThought } from '../../../lib/api';

/**
 * ShareThought — three-step flow opened from the home "Share a Thought" tile.
 *
 *   Step 1 (intro):     yellow header w/ cloud mascot + 3 reassurance bullets
 *                       + green "Okay" CTA.
 *   Step 2 (form):      "Share a thought" headline, light-blue prompt card with
 *                       textarea, identity radio (Anonymous default / With Name),
 *                       green Submit CTA.
 *   Step 3 (submitted): "Reflection Submitted" header, blue heart, "Thanks for
 *                       sharing" + insight quote + identity pill, green Home
 *                       button, "Edit Response" text link to return to the form.
 *
 * The whole flow lives at `/student/share`; back from the intro returns to the
 * previous page (typically /home).
 */
export function ShareThought() {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro');
  const [text, setText] = useState('');
  const [identity, setIdentity] = useState('anonymous'); // 'anonymous' | 'named'
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!text.trim() || submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await createThought({ content: text.trim(), is_anonymous: identity === 'anonymous' });
      setStep('submitted');
    } catch (e) {
      setError(e.message || 'Could not share your thought. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818] text-white">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <Intro
              onBack={() => navigate(-1)}
              onOkay={() => setStep('form')}
            />
          </motion.div>
        )}

        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <Form
              text={text}
              setText={setText}
              identity={identity}
              setIdentity={setIdentity}
              onBack={() => navigate(-1)}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={error}
            />
          </motion.div>
        )}

        {step === 'submitted' && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-1 flex-col"
          >
            <Submitted
              identity={identity}
              onHome={() => navigate('/student/home')}
              onEdit={() => setStep('form')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Intro view ─── */

function Intro({ onBack, onOkay }) {
  return (
    <>
      {/* Yellow header card with concave-bottom scoop */}
      <div className="relative bg-amber-400">
        <div className="px-6 pt-safe pt-10">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="grid size-9 place-items-center rounded-full text-[#1f1f1f] transition hover:bg-black/5"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
          <h1 className="mt-4 text-center text-[26px] font-bold text-[#1f1f1f]">
            Share a thought
          </h1>
        </div>

        {/* Cloud mascot */}
        <div className="mx-auto mt-3 mb-12 flex justify-center">
          <CloudMascot />
        </div>

        {/* Dark "scoop" that eats up into the bottom of the yellow card */}
        <svg
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          className="absolute -bottom-px left-0 right-0 block w-full"
          style={{ height: 50 }}
          aria-hidden="true"
        >
          <path d="M0 60 L0 25 Q200 -20 400 25 L400 60 Z" fill="#181818" />
        </svg>
      </div>

      {/* Bullets */}
      <div className="flex-1 px-7 pt-2">
        <ul className="flex flex-col gap-3 text-[14px] leading-relaxed text-white/80">
          <Bullet>This is a quiet way to share something that could help your class.</Bullet>
          <Bullet>Your name won't be shared.</Bullet>
          <Bullet>Your teacher will see this as part of class feedback.</Bullet>
        </ul>
      </div>

      {/* Okay CTA */}
      <div className="px-7 pb-safe pb-8 pt-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onOkay}
          className="w-full rounded-full bg-emerald-400 py-3.5 text-[15px] font-bold text-[#0a2a1a] shadow-md shadow-emerald-400/25 transition hover:bg-emerald-300"
        >
          Okay
        </motion.button>
      </div>
    </>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/55" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

/* ─── Form view ─── */

function Form({ text, setText, identity, setIdentity, onBack, onSubmit, submitting, error }) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header row */}
      <div className="px-5 pt-safe pt-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="grid size-10 place-items-center rounded-full text-white/85 transition hover:bg-white/[0.06]"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>
      </div>

      {/* Title block */}
      <div className="px-7 pt-3">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[34px] font-bold leading-tight text-white"
        >
          Share a thought
        </motion.h1>
        <p className="mt-1 text-[13.5px] text-sky-300/85">
          a small reflection that can help your class
        </p>
      </div>

      {/* Prompt card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4 }}
        className="mx-7 mt-5 rounded-[24px] bg-[#a9c8e8] p-4 shadow-lg shadow-black/20"
      >
        <p className="text-[15px] font-bold leading-snug text-[#0a1a2e]">
          One thing that would help me focus better in class is…
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="type here…"
          rows={5}
          className="mt-3 w-full resize-none rounded-2xl bg-white p-4 text-[14px] text-[#1f1f1f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        />
      </motion.div>

      {/* Identity options */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.4 }}
        className="px-7 pt-6"
      >
        <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/55">
          Identity Options
        </p>

        <div className="mt-3 flex flex-col gap-2.5">
          <IdentityRow
            id="anonymous"
            active={identity === 'anonymous'}
            onSelect={setIdentity}
            Icon={EyeOffIcon}
            label="Share Anonymously"
          />
          <IdentityRow
            id="named"
            active={identity === 'named'}
            onSelect={setIdentity}
            Icon={UserIcon}
            label="Share with Name"
          />
        </div>
      </motion.div>

      {/* Submit */}
      <div className="mt-auto px-7 pb-safe pb-8 pt-6">
        {error && (
          <p className="mb-3 text-center text-[12px] font-semibold text-red-400">{error}</p>
        )}
        <motion.button
          type="button"
          onClick={onSubmit}
          whileTap={{ scale: 0.97 }}
          disabled={text.trim().length === 0 || submitting}
          className={[
            'w-full rounded-full py-4 text-[15.5px] font-bold transition',
            text.trim().length === 0 || submitting
              ? 'cursor-not-allowed bg-emerald-500/30 text-white/55'
              : 'bg-emerald-400 text-[#0a2a1a] shadow-md shadow-emerald-400/25 hover:bg-emerald-300',
          ].join(' ')}
        >
          {submitting ? 'Sharing…' : 'Submit'}
        </motion.button>
      </div>
    </div>
  );
}

function IdentityRow({ id, active, onSelect, Icon, label }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(id)}
      aria-pressed={active}
      className="flex items-center gap-3 rounded-2xl bg-[#262626] px-4 py-3.5 text-left transition hover:bg-[#2c2c2c]"
    >
      <span
        className={[
          'grid size-8 place-items-center rounded-full',
          active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.08] text-white/55',
        ].join(' ')}
      >
        <Icon />
      </span>
      <span className="flex-1 text-[14px] font-semibold text-white">{label}</span>

      {/* extra hint icon (only on the active row, matching Figma) */}
      {active && (
        <span className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
            <path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1.5-7c-.6.6-1.2 1-1.5 1.7v.8h-1v-.9c0-1 .6-1.5 1.2-2.1.5-.5.8-.8.8-1.4a1.5 1.5 0 1 0-3 0H7a2.5 2.5 0 0 1 5 0c0 .9-.4 1.4-1 2z" />
          </svg>
        </span>
      )}

      {/* Radio dot */}
      <span
        className={[
          'grid size-4 place-items-center rounded-full',
          active ? 'bg-emerald-400' : 'border border-white/30 bg-transparent',
        ].join(' ')}
      >
        {active && <span className="size-1.5 rounded-full bg-white" />}
      </span>
    </motion.button>
  );
}

/* ─── Submitted view (post-Submit confirmation) ─── */

function Submitted({ identity, onHome, onEdit }) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Top bar: small check + "Reflection Submitted" + divider */}
      <div className="px-5 pt-safe pt-6">
        <div className="flex items-center justify-center gap-2">
          <span className="grid size-5 place-items-center rounded-full bg-sky-500/15 text-sky-400">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M5 8l2 2 4-4" />
            </svg>
          </span>
          <p className="text-[14px] font-bold text-white">Reflection Submitted</p>
        </div>
        <div className="mt-3 h-px w-full bg-white/[0.08]" />
      </div>

      {/* Heart medallion + thanks copy */}
      <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.1 }}
          className="grid size-16 place-items-center rounded-full bg-sky-500/12 ring-1 ring-sky-500/20"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#3b82f6">
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6 text-[26px] font-bold leading-tight"
        >
          Thanks for sharing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.4 }}
          className="mt-1 text-[13.5px] text-white/55"
        >
          Your thought has been received
        </motion.p>

        {/* Insight quote card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.4 }}
          className="mt-7 w-full rounded-2xl border border-white/[0.06] bg-[#1f1f1f] p-4"
        >
          <p className="text-center text-[13px] leading-relaxed text-white/70">
            "Sharing your thoughts helps you understand yourself better"
          </p>
        </motion.div>

        {/* Identity pill */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.4 }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white/60"
        >
          {identity === 'anonymous' ? (
            <>
              <LockGlyph />
              Shared Anonymously
            </>
          ) : (
            <>
              <UserIcon />
              Shared with Name
            </>
          )}
        </motion.span>
      </div>

      {/* Home + edit response */}
      <div className="px-7 pb-safe pb-8 pt-2">
        <motion.button
          type="button"
          onClick={onHome}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-emerald-400 py-3.5 text-[15px] font-bold text-[#0a2a1a] shadow-md shadow-emerald-400/25 transition hover:bg-emerald-300"
        >
          Home
        </motion.button>
        <button
          type="button"
          onClick={onEdit}
          className="mt-3 w-full text-center text-[13px] font-semibold text-white/55 transition hover:text-white"
        >
          Edit Response
        </button>
      </div>
    </div>
  );
}

function LockGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

/* ─── Cloud mascot ─── */

function CloudMascot() {
  return (
    <svg viewBox="0 0 200 200" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe5f5" />
          <stop offset="100%" stopColor="#a4c8e0" />
        </linearGradient>
      </defs>
      {/* Cloud body */}
      <g fill="url(#cloudFill)" stroke="#7fa8c2" strokeWidth="2.2">
        <ellipse cx="60"  cy="100" rx="34" ry="32" />
        <ellipse cx="100" cy="80"  rx="40" ry="38" />
        <ellipse cx="142" cy="100" rx="34" ry="32" />
        <ellipse cx="80"  cy="120" rx="32" ry="28" />
        <ellipse cx="124" cy="120" rx="32" ry="28" />
      </g>
      {/* Soft inner lift (so the cloud looks rounded, not lumpy) */}
      <ellipse cx="100" cy="105" rx="68" ry="42" fill="#bfdbeb" opacity="0.85" />
      <ellipse cx="100" cy="98"  rx="60" ry="36" fill="#cfe5f5" opacity="0.85" />

      {/* Closed-eye smiles */}
      <path d="M84 102 Q 89 108 94 102"  stroke="#1f2937" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M106 102 Q 111 108 116 102" stroke="#1f2937" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* Tiny smile */}
      <path d="M95 116 Q 100 119 105 116" stroke="#1f2937" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Stick legs + feet */}
      <line x1="86"  y1="148" x2="86"  y2="170" stroke="#1f2937" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="114" y1="148" x2="114" y2="170" stroke="#1f2937" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="80"  y1="170" x2="92"  y2="170" stroke="#1f2937" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="108" y1="170" x2="120" y2="170" stroke="#1f2937" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/* ─── tiny inline icons ─── */

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.7 6.2a9 9 0 0 1 10.3 5.8 14 14 0 0 1-3 4M6.5 7.5A14 14 0 0 0 3 12a9 9 0 0 0 12.7 4.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
