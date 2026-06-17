import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function StudentWelcome() {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col min-h-[100dvh] relative text-white font-serif"
      style={{
        backgroundImage: `url('/auth.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional dark overlay if text is hard to read against the bg */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 px-6 pt-24 pb-12 items-center justify-between">
        
        {/* Top Section: Logo & Text */}
        <div className="flex flex-col items-center mt-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Brain Logo */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-16 h-16 text-white mb-6"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
              <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
              <path d="M6 18a4 4 0 0 1-1.967-.516" />
              <path d="M19.967 17.484A4 4 0 0 1 18 18" />
            </svg>

            <h1 className="text-4xl tracking-tight text-white mb-3 shadow-black drop-shadow-md">
              InMind
            </h1>
            <p className="text-center text-[17px] leading-relaxed text-white/90 max-w-[240px] drop-shadow-sm">
              Understands yourself grow with confidence
            </p>
          </motion.div>
        </div>

        {/* Bottom Section: Buttons */}
        <div className="flex flex-col items-center w-full mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/student/signup')}
            className="w-full max-w-[300px] bg-[#f4f4f4] text-black font-serif text-[20px] tracking-wide py-4 rounded-xl mb-6 shadow-lg"
          >
            Continue
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => navigate('/student/login')}
            className="text-white/80 font-serif text-[15px] tracking-wide hover:text-white transition-colors pb-2"
          >
            SignIn
          </motion.button>
        </div>

      </div>
    </div>
  );
}
