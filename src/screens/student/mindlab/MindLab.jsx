import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MindLab() {
  const navigate = useNavigate();

  return (
    <section 
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818]"
      style={{
        backgroundImage: `url('/gamification/page1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate('/student/home')}
        className="absolute top-6 left-5 z-30 flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md border border-white/10 transition-all shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 pr-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Invisible button over the golden circle and "TAP TO ENTER" area */}
      <button
        type="button"
        onClick={() => navigate('/student/mindlab/progress')}
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[70%] h-[200px] z-10 cursor-pointer outline-none"
        aria-label="Tap the circle or text to Enter"
      />
    </section>
  );
}
