import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'math',
    title: 'Mathematics',
    description: 'Build strong concepts and confidence in problem solving',
    bgColor: '#17122b', // darker blue from target design
    accentColor: '#7c3aed', // purple
    imgSrc: '/academics/mentor/math.png',
    avatars: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    ],
    count: '+5'
  },
  {
    id: 'english',
    title: 'English',
    description: 'Build strong concepts and confidence in problem solving', // matching screenshot text
    bgColor: '#660b49', // darker magenta from target design
    accentColor: '#d946ef', // pink
    imgSrc: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop', // english related placeholder
    avatars: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    ],
    count: '+2'
  }
];

export function ExpertMentors() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#1e1e1e] font-sans">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-white p-2 -ml-2 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full bg-cyan-300 border-2 border-black flex items-center justify-center">
          <span className="text-black font-bold text-lg mb-1">._.</span>
        </div>
      </div>

      {/* ───── Title Section ───── */}
      <div className="px-6 mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Expert Mentors
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-sm leading-snug pr-4"
        >
          Connect with experienced and get the guidance you need to grow
        </motion.p>
      </div>

      {/* ───── Category Cards Carousel ───── */}
      <div className="flex-1 px-6 pb-10 overflow-x-auto flex gap-5 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="shrink-0 w-[310px] rounded-[28px] overflow-hidden flex flex-col snap-start shadow-2xl border border-white"
            style={{ backgroundColor: cat.bgColor }}
          >
            {/* Top Image Area */}
            <div className="h-[210px] w-full relative border-b border-white">
              <img 
                src={cat.imgSrc} 
                alt={cat.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-[26px] font-bold text-white mb-2">{cat.title}</h3>
                <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: cat.accentColor }} />
                <p className="text-white/95 text-[15px] leading-relaxed pr-4">
                  {cat.description}
                </p>
              </div>

              {/* Footer: Avatars + Button */}
              <div className="flex items-center justify-between mt-12">
                <div className="flex items-center -space-x-3">
                  {cat.avatars.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      className="w-[46px] h-[46px] rounded-full border-2 border-white object-cover" 
                      alt="Mentor avatar" 
                    />
                  ))}
                  <div 
                    className="w-[46px] h-[46px] rounded-full border-2 border-white flex items-center justify-center text-white text-[15px] font-bold z-10"
                    style={{ backgroundColor: cat.accentColor }}
                  >
                    {cat.count}
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/student/academic/mentor/${cat.id}`)}
                  className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-white transition-transform active:scale-95"
                  style={{ backgroundColor: cat.accentColor }}
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {/* Spacer for end of scroll */}
        <div className="shrink-0 w-2" />
      </div>

    </section>
  );
}
