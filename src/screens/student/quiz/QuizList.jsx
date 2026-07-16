import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QUIZZES = [
  {
    id: 1,
    teacher: 'Ms. Sarah',
    avatar: 'https://i.pravatar.cc/150?u=sarah2',
    subject: 'Environmental Awareness',
    title: 'Save Our Planet',
    duration: '15 mins',
    date: '29th May 2026',
    questions: '10 Questions',
    color: '#7b5eea',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#93c5fd]">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    iconBg: '#312e81'
  },
  {
    id: 2,
    teacher: 'Ms. Sarah',
    avatar: 'https://i.pravatar.cc/150?u=sarah2',
    subject: 'Environmental Awareness',
    title: 'Save Our Planet',
    duration: '15 mins',
    date: '29th May 2026',
    questions: '10 Questions',
    color: '#d946ef',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#93c5fd]">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    iconBg: '#312e81'
  }
];

export function QuizList() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#222222] text-white">
      {/* Header */}
      <div className="flex flex-col px-6 pt-safe pt-8 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-80 transition w-8 h-8 mb-6 mt-4"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-[42px] font-bold tracking-tight">Quiz</h1>
      </div>

      {/* Carousel */}
      <div className="flex-1 overflow-x-auto px-6 pb-12 pt-4 snap-x snap-mandatory flex gap-6 hide-scrollbar">
        {QUIZZES.map((quiz) => (
          <div 
            key={quiz.id} 
            className="shrink-0 w-[85%] snap-center rounded-[24px] bg-black p-6 flex flex-col relative"
            style={{ 
              boxShadow: `-5px 0px 0px ${quiz.color}, 0px 5px 0px ${quiz.color}, -5px 5px 0px ${quiz.color}`,
            }}
          >
            {/* Teacher Info */}
            <div className="flex items-center gap-4 mb-8 mt-2">
              <img src={quiz.avatar} alt={quiz.teacher} className="w-14 h-14 rounded-full border-[2.5px] border-white object-cover" />
              <div>
                <h3 className="text-white font-semibold text-[20px] tracking-wide">{quiz.teacher}</h3>
                <p className="text-white/60 text-[13px] font-medium">{quiz.subject}</p>
              </div>
            </div>

            {/* Main Icon */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-20 h-20 rounded-[24px] flex items-center justify-center"
                style={{ backgroundColor: quiz.iconBg }}
              >
                {quiz.icon}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-white text-[20px] font-bold mb-8">
              {quiz.title}
            </h2>

            {/* Details */}
            <div className="flex flex-col gap-3 mb-10 pl-[10%]">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-white text-[14px] font-medium tracking-wide">{quiz.duration}</span>
              </div>
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-white text-[14px] font-medium tracking-wide">{quiz.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <circle cx="12" cy="14" r="1" fill="currentColor"/>
                  <path d="M12 12v-1a2 2 0 0 1 4 0c0 1.5-2 2.5-2 2.5" />
                </svg>
                <span className="text-white text-[14px] font-medium tracking-wide">{quiz.questions}</span>
              </div>
            </div>

            {/* Start Button */}
            <div className="mt-auto flex justify-center pb-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/student/quiz/take')}
                className="w-full max-w-[220px] py-3.5 rounded-[12px] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition hover:opacity-90 shadow-lg"
                style={{ backgroundColor: quiz.color }}
              >
                Start Quiz
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
