import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Screen } from '../components/Screen';

/**
 * SplashWordmark — second splash, shows the "INMIND" wordmark with a yellow
 * dot-+-circle bullet on the left and large quarter-circle accents in the
 * top-right and bottom-left corners of the screen. Auto-advances to /onboarding.
 */
export function SplashWordmark() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding', { replace: true }), 1600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Screen>
      {/* top-right quarter circle */}
      <motion.div
        initial={{ x: 80, y: -80, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-0 top-0 -translate-y-1/3 translate-x-1/3"
      >
        <div className="size-56 rounded-full bg-accent-400" />
      </motion.div>

      {/* bottom-left quarter circle */}
      <motion.div
        initial={{ x: -80, y: 80, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className="pointer-events-none absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3"
      >
        <div className="size-56 rounded-full bg-accent-400" />
      </motion.div>

      {/* wordmark, vertically centered */}
      <div className="relative flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="flex items-center gap-3"
        >
          {/* bullet — small disc above + large disc below */}
          <div className="flex flex-col items-center gap-1">
            <span className="block size-3 rounded-full bg-accent-400" />
            <span className="block size-7 rounded-full bg-accent-400" />
          </div>
          <span className="text-[44px] font-bold tracking-tight text-accent-400">
            INMIND
          </span>
        </motion.div>
      </div>
    </Screen>
  );
}
