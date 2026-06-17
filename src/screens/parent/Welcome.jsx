import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ParentWelcome() {
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
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col flex-1 px-8 pt-[120px] pb-12 justify-start items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img src="/parent/logo.png" alt="InMind Logo" className="h-14 object-contain" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-[44px] leading-tight mb-4 tracking-wide"
        >
          InMind
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[18px] text-white/90 max-w-[280px] leading-relaxed"
        >
          Support your child's emotional growth with confidence.
        </motion.p>
      </div>

      <div className="relative z-10 px-8 pb-12 w-full flex flex-col gap-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/parent/signup')}
          className="w-full bg-[#f4f4f5] text-black font-serif text-[22px] tracking-wide py-[14px] rounded-[14px] shadow-lg transition-transform"
        >
          Create Account
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/parent/login')}
          className="w-full text-white font-serif text-[18px] tracking-wide py-2"
        >
          SignIn
        </motion.button>
      </div>
    </div>
  );
}
