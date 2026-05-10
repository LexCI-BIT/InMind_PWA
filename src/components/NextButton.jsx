/**
 * Circular next/CTA button — gold ring, dark interior, arrow icon.
 * Matches the floating action button at the bottom of the Figma onboarding screen.
 *
 * Props:
 *   - onClick: click handler
 *   - ariaLabel: accessible label (default "Continue")
 */
export function NextButton({ onClick, ariaLabel = 'Continue' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative grid size-[54px] place-items-center rounded-full bg-accent-400 transition-transform duration-150 ease-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      {/* inner dark disk */}
      <span className="absolute inset-1 rounded-full bg-ink" aria-hidden="true" />
      <svg
        className="relative h-[19px] w-[22px] text-accent-400"
        viewBox="0 0 22 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 9.5h17" />
        <path d="M12 2.5l7 7-7 7" />
      </svg>
    </button>
  );
}
