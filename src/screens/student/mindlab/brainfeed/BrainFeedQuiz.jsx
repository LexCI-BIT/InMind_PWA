import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const QUIZ_DATA = {
  question: "Which country is known as the land of the rising sun?",
  options: [
    { id: 'A', label: "China" },
    { id: 'B', label: "Japan" },
    { id: 'C', label: "South Korea" },
    { id: 'D', label: "Thailand" }
  ],
  correct: 'B'
};

export default function BrainFeedQuiz() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (id) => {
    if (isSubmitted) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    // Auto-return to MindLab after a brief delay
    setTimeout(() => {
      navigate('/student/mindlab');
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex h-full w-full flex-col bg-[#050505] overflow-hidden"
    >
      {/* Background glowing question marks */}
      <div className="absolute top-10 -left-6 opacity-30 select-none pointer-events-none text-orange-500 blur-[2px] transform -rotate-12">
        <span className="text-[140px] font-black" style={{ textShadow: '0 0 40px #f97316' }}>?</span>
      </div>
      <div className="absolute top-20 right-6 opacity-20 select-none pointer-events-none text-orange-500 blur-[1px] transform rotate-12">
        <span className="text-[80px] font-black" style={{ textShadow: '0 0 30px #f97316' }}>?</span>
      </div>
      <div className="absolute -bottom-10 -right-6 opacity-40 select-none pointer-events-none text-orange-500 blur-[3px] transform rotate-12">
        <span className="text-[180px] font-black" style={{ textShadow: '0 0 50px #f97316' }}>?</span>
      </div>
      <div className="absolute bottom-10 left-6 opacity-20 select-none pointer-events-none text-orange-500 blur-[2px] transform -rotate-12">
        <span className="text-[90px] font-black" style={{ textShadow: '0 0 30px #f97316' }}>?</span>
      </div>

      {/* Decorative side lines */}
      <div className="absolute top-1/4 bottom-1/4 left-4 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-50 rounded-full" />
      <div className="absolute top-1/4 bottom-1/4 right-4 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-50 rounded-full" />

      {/* Top Header */}
      <div className="relative z-10 flex w-full items-center p-6 pt-safe">
        <button onClick={() => navigate('/student/mindlab')} className="text-white hover:opacity-70">
          <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col px-10 pt-10">
        
        <h1 className="text-center text-4xl font-black text-white tracking-wide mb-8 drop-shadow-md" style={{ fontFamily: 'Impact, sans-serif' }}>
          QUIZ TIME
        </h1>
        
        <p className="text-center text-[18px] font-medium leading-relaxed text-gray-200 mb-10">
          {QUIZ_DATA.question}
        </p>

        <div className="flex flex-col gap-3.5">
          {QUIZ_DATA.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            let bgColor = "bg-[#2a1a05] border-[#4a2e0a]";
            
            if (isSubmitted) {
              if (opt.id === QUIZ_DATA.correct) bgColor = "bg-green-600/20 border-green-500";
              else if (isSelected) bgColor = "bg-red-600/20 border-red-500";
            } else if (isSelected) {
              bgColor = "bg-[#3f2505] border-[#f97316]/50";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`flex items-center gap-4 rounded-[14px] border border-transparent px-5 py-4 transition-all duration-300 ${bgColor}`}
              >
                {/* Custom Radio Button */}
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${isSelected ? 'border-orange-500' : 'border-orange-500/40'}`}>
                  {isSelected && (
                    <motion.div 
                      layoutId="radio-fill"
                      className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_#f97316]"
                    />
                  )}
                </div>
                <span className="text-[16px] text-gray-200">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedOption && !isSubmitted ? 1 : 0 }}
        >
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || isSubmitted}
            className="w-full max-w-[200px] rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            Submit Answer
          </button>
        </motion.div>

        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className={`text-lg font-bold ${selectedOption === QUIZ_DATA.correct ? 'text-green-400' : 'text-red-400'}`}>
              {selectedOption === QUIZ_DATA.correct ? 'Correct! Brilliant.' : 'Incorrect! Better luck next time.'}
            </p>
            <p className="text-gray-400 text-sm mt-2">Returning to MindLab...</p>
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}
