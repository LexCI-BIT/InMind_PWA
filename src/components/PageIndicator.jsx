/**
 * Three-dot page indicator that mirrors the Figma onboarding pattern:
 * one elongated active dot (gold) + two circular inactive dots (white).
 *
 * Props:
 *   - count: total number of dots (default 3)
 *   - active: zero-based index of the current step
 */
export function PageIndicator({ count = 3, active = 0 }) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Step ${active + 1} of ${count}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <span
            key={i}
            className={
              isActive
                ? 'h-2 w-[17px] rounded-full bg-accent-400'
                : 'h-2 w-2 rounded-full bg-white/90'
            }
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
