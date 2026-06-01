import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const MENTORS = [
  {
    id: 'arjun-mehta',
    name: 'Mr. Arjun Mehta',
    role: 'Math Expert',
    experience: '8+ Years Experience',
    description: 'Build strong concepts and confidence in problem solving, Specializes in algebra,Geometry',
    subjects: ['Algebra', 'Geometry', 'Calculus'],
    availability: 'Available: 4:00 pm to 8:00 pm',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop', // portrait
    bgColor: '#0f0826', // dark blue card bg
    accentColor: '#7c3aed',
  },
  {
    id: 'sneha-rao',
    name: 'Ms. Sneha Rao',
    role: 'Math Expert',
    experience: '8+ Years Experience',
    description: 'Build strong concepts and confidence in problem solving, Specializes in arithmetic',
    subjects: ['Algebra', 'Arithmetic'],
    availability: 'Available: 5:00 pm to 9:00 pm',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
    bgColor: '#0f0826',
    accentColor: '#7c3aed',
  }
];

export function MentorCategory() {
  const navigate = useNavigate();
  const { category } = useParams(); // e.g. 'math'

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
      <div className="px-6 mb-12">
        <div className="w-12 h-12 rounded-xl bg-indigo-900/50 flex items-center justify-center mb-4 border border-indigo-500/20 shadow-lg">
          <span className="text-indigo-400 font-serif italic text-xl">√x</span>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[28px] font-bold text-white mb-2 leading-tight"
        >
          Mathematics Expert
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-[13px] leading-snug pr-4"
        >
          Connect with experienced and get the guidance you need to grow
        </motion.p>
      </div>

      {/* ───── Mentors Carousel ───── */}
      <div className="flex-1 px-6 pb-10 overflow-x-auto flex gap-5 snap-x snap-mandatory hide-scrollbar">
        {MENTORS.map((mentor, idx) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="shrink-0 w-[280px] rounded-2xl flex flex-col snap-start border border-white/10 relative mt-16 shadow-2xl"
            style={{ backgroundColor: mentor.bgColor }}
          >
            {/* Overlapping Profile Picture */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-4 border-[#1e1e1e] overflow-hidden bg-gray-800 shadow-xl">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-16 pb-6 px-5 flex flex-col items-center h-full">
              {/* Header Info */}
              <h3 className="text-lg font-bold text-white text-center mb-1">{mentor.name}</h3>
              <p className="font-semibold text-sm mb-1" style={{ color: mentor.accentColor }}>{mentor.role}</p>
              <p className="text-gray-300 text-xs mb-4">{mentor.experience}</p>

              {/* Separator */}
              <div className="w-full h-[1px] bg-white/10 mb-4" />

              {/* Description */}
              <p className="text-gray-200 text-xs leading-relaxed text-center mb-5 line-clamp-3">
                {mentor.description}
              </p>

              {/* Subject Pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 w-full">
                {mentor.subjects.map(sub => (
                  <span 
                    key={sub} 
                    className="px-3 py-1 rounded-full text-[10px] font-semibold text-white/90 bg-white/10"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Spacer to push button to bottom */}
              <div className="mt-auto w-full flex flex-col items-center gap-4">
                <p className="text-emerald-400 font-medium text-xs">
                  {mentor.availability}
                </p>

                <button 
                  onClick={() => navigate(`/student/academic/mentor/profile/${mentor.id}`)}
                  className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-white font-semibold text-sm transition-transform active:scale-95"
                  style={{ backgroundColor: mentor.accentColor }}
                >
                  View Profile <ArrowRight className="w-4 h-4" />
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
