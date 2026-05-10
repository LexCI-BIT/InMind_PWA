import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen } from '../components/Screen';
import { PageIndicator } from '../components/PageIndicator';
import { NextButton } from '../components/NextButton';

/**
 * Three-step onboarding paged carousel.
 *
 * Step 1 — Every Mind Matters
 * Step 2 — Early Awareness, Better Outcomes
 * Step 3 — Empowering Educators & Students
 *
 * Skip jumps straight to /role. Pressing Next on the last step also goes to
 * /role. AnimatePresence handles per-step slide animations.
 */
const STEPS = [
  {
    title: 'Every Mind Matters.',
    body: 'Inmind helps schools identify emotional needs early and build supportive learning environments.',
    image: '/illustrations/onboarding-meditate.png',
    alt: 'Person meditating peacefully on a yellow mat with floating UI elements',
  },
  {
    title: 'Early Awareness, Better Outcomes',
    body: 'Track well-being indicators, detect concerns early, and take structured action with confidence.',
    image: '/illustrations/onboarding-reading.png',
    alt: 'Student reading a book surrounded by science and education icons',
  },
  {
    title: 'Empowering Educators & Students',
    body: 'Create psychologically safe classrooms where students feel heard, supported, and understood.',
    image: '/illustrations/onboarding-superhero.png',
    alt: 'Person standing heroically with a yellow cape among clouds',
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const goRole = () => navigate('/role');
  const next = () => (step === STEPS.length - 1 ? goRole() : setStep(step + 1));

  const { title, body, image, alt } = STEPS[step];

  return (
    <Screen>
      {/* ───── Top bar: Skip ───── */}
      <header className="flex items-center justify-between px-7 pt-safe pt-12">
        <button
          type="button"
          onClick={goRole}
          className="text-[15.9px] font-normal text-white/90 transition hover:text-white"
        >
          Skip
        </button>
        <span aria-hidden="true" className="size-6" />
      </header>

      {/* ───── Animated illustration + copy ───── */}
      <div className="relative flex flex-1 flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="flex flex-1 flex-col items-center justify-center px-6"
          >
            <div className="mx-auto h-64 w-64 sm:h-72 sm:w-72">
              <img
                src={image}
                alt={alt}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
            <h1 className="mt-6 text-center text-[24px] font-semibold leading-tight text-white">
              {title}
            </h1>
            <p className="mt-3 max-w-[330px] text-center text-[15.5px] leading-relaxed text-white/75">
              {body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ───── Bottom bar: indicator + next ───── */}
      <footer className="flex items-center justify-between px-7 pb-safe pb-10">
        <PageIndicator count={STEPS.length} active={step} />
        <NextButton
          onClick={next}
          ariaLabel={step === STEPS.length - 1 ? 'Get started' : 'Next'}
        />
      </footer>
    </Screen>
  );
}
