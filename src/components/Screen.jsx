import { motion } from 'framer-motion';

/**
 * Responsive screen container.
 *
 *  • On real phones / mobile widths the screen fills the viewport (100dvh)
 *    edge-to-edge — no fixed pixel dimensions.
 *  • On tablet+/desktop it caps at 440px wide and centers, so the layout
 *    stays "phone-shaped" instead of stretching.
 *  • Optional `tone` prop swaps between dark (default) and light themes
 *    so light screens like RoleSelect can reuse the wrapper.
 */
const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: 'easeOut' },
};

export function Screen({ children, tone = 'dark', className = '' }) {
  const bg =
    tone === 'light'
      ? 'bg-brand-cream text-ink'
      : tone === 'purple'
      ? 'bg-brand-purple-soft text-ink'
      : 'bg-ink text-white';

  return (
    <motion.section
      {...fade}
      className={`relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden ${bg} ${className}`}
    >
      {children}
    </motion.section>
  );
}
