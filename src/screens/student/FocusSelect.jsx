import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * FocusSelect — "Choose your focus" picker shown after Login.
 *
 *   Academic     →  /student/academic
 *   Non-Academic →  /student/home
 *
 * Cream background, two soft cards with a coloured icon + label + chevron.
 */
export function FocusSelect() {
  const navigate = useNavigate();

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col"
      style={{ backgroundColor: '#f7f3ee', fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex flex-1 flex-col px-6 pt-safe pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <h1 className="text-[26px] font-bold tracking-tight text-[#111]">
            Choose your focus
          </h1>
          <p className="mt-2 text-[14px] text-[#6e6862]">
            Select the path for your InMind journey today
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-4">
          <FocusCard
            label="Academic"
            sub="Study materials and learning"
            iconBg="#dbe7ff"
            iconColor="#3b82f6"
            delay={0.1}
            onClick={() => navigate('/student/academic')}
            Icon={BookIcon}
          />
          <FocusCard
            label="Non-Academic"
            sub="Wellbeing and personal growth"
            iconBg="#ece4ff"
            iconColor="#7c3aed"
            delay={0.18}
            onClick={() => navigate('/student/home')}
            Icon={LotusIcon}
          />
        </div>
      </div>
    </section>
  );
}

function FocusCard({ label, sub, iconBg, iconColor, Icon, onClick, delay }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-4 rounded-3xl border border-[#e8e2d9] bg-white px-5 py-4 text-left shadow-sm transition hover:shadow-md"
    >
      <div
        className="grid size-12 shrink-0 place-items-center rounded-2xl"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        <Icon />
      </div>
      <div className="flex-1">
        <div className="text-[17px] font-bold text-[#111]">{label}</div>
        <div className="mt-0.5 text-[13px] leading-snug text-[#6e6862]">{sub}</div>
      </div>
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-[#bdb6ad]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4l6 6-6 6" />
      </svg>
    </motion.button>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="2" />
      <path d="M6 18c0-3 2.7-6 6-6s6 3 6 6" />
      <path d="M3 18h18" />
      <path d="M9 14c-2 0-4 1.5-4 4M15 14c2 0 4 1.5 4 4" />
    </svg>
  );
}
