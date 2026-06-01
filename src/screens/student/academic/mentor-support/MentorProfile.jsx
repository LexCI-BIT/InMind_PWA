import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, BookOpen, Star, Users } from 'lucide-react';

const MENTOR_DATA = {
  id: 'arjun-mehta',
  name: 'Mr. Arjun Mehta',
  role: 'Math Expert',
  experience: '8+ Years Experience',
  about: 'Helping students build strong foundations in mathematics through concept clarity, practice, and real-life applications. Passionate about making math simple, engaging, and enjoyable.',
  subjects: ['Algebra', 'Geometry', 'Calculus', 'Arithmetic', 'Trigonometry', 'Problem-Solving', 'Number Theory'],
  availability: 'Available: 4:00 pm to 8:00 pm',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
  stats: {
    years: '8+',
    sessions: '500+',
    rating: '4.8',
    students: '320+'
  }
};

export function MentorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // In a real app, fetch mentor by id. Using static data for now.
  const mentor = MENTOR_DATA;

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#1e1e1e] font-sans">
      
      {/* ───── Top Blue Header Section ───── */}
      <div className="bg-[#0f0826] rounded-b-[2rem] pb-8 pt-10 px-6 shadow-md relative z-10">
        <div className="flex items-center justify-between mb-8">
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

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5"
        >
          <div className="w-24 h-24 rounded-full border-2 border-white/10 overflow-hidden shrink-0 shadow-lg">
            <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white mb-1">{mentor.name}</h1>
            <p className="text-[#7c3aed] font-semibold text-sm mb-2">{mentor.role}</p>
            <p className="text-gray-300 text-xs">{mentor.experience}</p>
          </div>
        </motion.div>
      </div>

      {/* ───── Scrollable Content ───── */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-24">
        
        {/* About Mentor Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black rounded-3xl p-5 mb-8 flex flex-col relative shadow-xl border border-white/5"
        >
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <h2 className="text-white font-bold text-[15px] mb-2">About Mentor</h2>
              <p className="text-gray-400 text-[10px] leading-relaxed">
                {mentor.about}
              </p>
            </div>
            <div className="w-[100px] h-[70px] rounded-xl overflow-hidden shrink-0 bg-white">
              <img 
                src="/academics/mentor/math.png" 
                alt="Math graphic" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-2xl p-3 flex justify-between items-center shadow-sm">
            <div className="flex flex-col items-center gap-1 w-1/4">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-black font-bold text-[11px]">{mentor.stats.years}</span>
              <span className="text-gray-500 text-[6px] font-semibold uppercase tracking-wider text-center leading-tight">Years<br/>Experience</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center gap-1 w-1/4">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span className="text-black font-bold text-[11px]">{mentor.stats.sessions}</span>
              <span className="text-gray-500 text-[6px] font-semibold uppercase tracking-wider text-center leading-tight">Sessions<br/>Conducted</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center gap-1 w-1/4">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-black font-bold text-[11px]">{mentor.stats.rating}</span>
              <span className="text-gray-500 text-[6px] font-semibold uppercase tracking-wider text-center leading-tight">Average<br/>Rating</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center gap-1 w-1/4">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-black font-bold text-[11px]">{mentor.stats.students}</span>
              <span className="text-gray-500 text-[6px] font-semibold uppercase tracking-wider text-center leading-tight">Students<br/>Mentored</span>
            </div>
          </div>
        </motion.div>

        {/* Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-gray-400 font-bold text-sm mb-4 px-1">Subjects I Teach</h2>
          <div className="flex flex-wrap gap-2.5">
            {mentor.subjects.map(sub => (
              <span 
                key={sub} 
                className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-[11px] shadow-sm active:scale-95 transition-transform"
              >
                {sub}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Availability */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#10b981] font-semibold text-sm px-1"
        >
          {mentor.availability}
        </motion.p>

      </div>

      {/* ───── Fixed Bottom Button ───── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e] to-transparent">
        <button 
          onClick={() => navigate(`/student/academic/mentor/book/${id}`)}
          className="w-full bg-white text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 text-base shadow-lg active:scale-95 transition-transform"
        >
          Book Free Session <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
}
