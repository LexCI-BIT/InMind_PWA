import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function WeeklyChallenges() {
  const navigate = useNavigate();

  return (
    <section 
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-x-hidden overflow-y-auto bg-[#181818]"
    >
      {/* Back Button (Fixed to viewport) */}
      <div className="fixed top-0 left-0 w-full max-w-[440px] mx-auto z-30 px-5 pt-6 pointer-events-none">
        <button
          type="button"
          onClick={() => navigate('/student/home')}
          className="flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md border border-white/10 transition-all shadow-lg pointer-events-auto"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 pr-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Image Container */}
      <div className="relative w-full flex-1 flex flex-col justify-center">
        <img 
          src="/gamification/page1.png" 
          alt="Your Journey Awaits" 
          className="w-full h-auto block"
        />

        {/* Invisible button over the golden circle and text area (covers bottom half of the image) */}
        <button
          type="button"
          onClick={() => navigate('/student/challenges/progress')}
          className="absolute bottom-0 left-0 w-full h-[45%] z-10 cursor-pointer outline-none"
          aria-label="Tap to Enter"
        />
      </div>
    </section>
  );
}
