import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Users, Zap, BookOpen, Calendar, Leaf, CheckCircle, Heart, ChevronRight } from 'lucide-react';

export function ContextNarrowingStep({ selection, onSelect }) {
  
  // Data for different contexts
  const contextData = {
    friends: {
      title: <>What kind of moment<br/>was it?</>,
      subtitle: 'Choose what feels closest?',
      options: [
        { id: 'comment', title: 'Someone said something', desc: 'A comment, message or conversation stayed with you.', icon: <MessageCircle className="w-6 h-6 text-orange-200" /> },
        { id: 'ignored', title: 'Felt Ignored', desc: 'You felt left out, unnoticed or overlooked.', icon: <User className="w-6 h-6 text-orange-200" /> },
        { id: 'group', title: 'Group Situation', desc: 'Something happened involving multiple friends.', icon: <Users className="w-6 h-6 text-orange-200" /> },
        { id: 'misunderstanding', title: 'Small Misunderstanding', desc: 'A minor conflict or confusion that stayed on your mind.', icon: <Zap className="w-6 h-6 text-orange-200" /> }
      ]
    },
    school: {
      title: <>What was it <span className="text-yellow-400 font-bold">mostly</span><br/>about?</>,
      subtitle: 'Choose what feels closest?',
      options: [
        { id: 'studies', title: 'Studies', desc: 'Related to learning, assignments or topics.', icon: <BookOpen className="w-6 h-6 text-blue-200" /> },
        { id: 'teacher', title: 'Teacher Interaction', desc: 'Something related to a teacher or instruction.', icon: <User className="w-6 h-6 text-blue-200" /> },
        { id: 'classmate', title: 'Classmate', desc: 'Something involving a peer or friend.', icon: <Users className="w-6 h-6 text-blue-200" /> },
        { id: 'exams', title: 'Upcoming Exams', desc: 'Pressure or thoughts about an upcoming test.', icon: <Calendar className="w-6 h-6 text-blue-200" /> }
      ]
    },
    myself: {
      title: <>What stayed on<br/>your <span className="text-yellow-400 font-bold">mind</span>?</>,
      subtitle: 'Choose what feels closest?',
      options: [
        { id: 'confidence', title: 'Confidence', desc: 'How you feel about yourself, your abilities, or your self-worth.', icon: <User className="w-6 h-6 text-green-200" /> },
        { id: 'future', title: 'Future', desc: 'Thoughts about upcoming plans, goals, or uncertainty.', icon: <Leaf className="w-6 h-6 text-green-200" /> },
        { id: 'decision', title: 'Decision I made', desc: 'Something you chose to do and keep thinking about.', icon: <CheckCircle className="w-6 h-6 text-green-200" /> },
        { id: 'regret', title: 'Something I Regret', desc: 'Something you wish had gone differently.', icon: <Heart className="w-6 h-6 text-green-200" /> }
      ]
    }
  };

  const data = contextData[selection] || contextData.friends;

  return (
    <div className="flex-1 flex flex-col px-6 pt-10 pb-6 relative z-10">
      
      {/* Headings */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="mb-10 mt-6"
      >
        <h1 className="text-3xl font-semibold text-white leading-snug mb-3">
          {data.title}
        </h1>
        <p className="text-white/80 text-[15px]">{data.subtitle}</p>
      </motion.div>

      {/* Options */}
      <div className="flex flex-col gap-4 mt-auto mb-10">
        {data.options.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (i * 0.1) }}
            onClick={() => onSelect(opt.id, opt.title)}
            className="flex items-center w-full p-4 rounded-2xl bg-[#2a2626]/80 backdrop-blur-md border border-white/10 active:scale-95 transition-transform text-left"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-white/5`}>
              {opt.icon}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-white font-semibold text-[15px]">{opt.title}</h3>
              <p className="text-white/60 text-[13px] leading-snug mt-1 pr-2">{opt.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50 shrink-0 ml-1" />
          </motion.button>
        ))}
      </div>

    </div>
  );
}
