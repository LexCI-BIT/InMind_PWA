import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Users, Zap, BookOpen, Calendar, Leaf, CheckCircle, Heart, ChevronRight, RefreshCcw, Target, Briefcase, CircleHelp, CalendarDays } from 'lucide-react';

const FamilyConflictIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-red-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 10l-4 5h5l-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CareAboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-pink-400">
    <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 22C17 19.2386 14.7614 17 12 17C9.23858 17 7 19.2386 7 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 15C7.32843 15 8 14.3284 8 13.5C8 12.6716 7.32843 12 6.5 12C5.67157 12 5 12.6716 5 13.5C5 14.3284 5.67157 15 6.5 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 22C2 20.3431 3.34315 19 5 19C5.82843 19 6.57843 19.3358 7.12132 19.8787" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 15C18.3284 15 19 14.3284 19 13.5C19 12.6716 18.3284 12 17.5 12C16.6716 12 16 12.6716 16 13.5C16 14.3284 16.6716 15 17.5 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 22C22 20.3431 20.6569 19 19 19C18.1716 19 17.4216 19.3358 16.8787 19.8787" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7.5C12 7.5 10 5.5 10 4C10 3.17157 10.6716 2.5 11.5 2.5C12 2.5 12 3 12 3C12 3 12 2.5 12.5 2.5C13.3284 2.5 14 3.17157 14 4C14 5.5 12 7.5 12 7.5Z" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1"/>
  </svg>
);

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
    },
    family: {
      title: <>What stayed on<br/>your <span className="text-yellow-500 font-bold">mind</span>?</>,
      subtitle: 'Choose what feels closest?',
      options: [
        { id: 'family_conflict', title: 'Family Conflict', desc: 'Arguments, misunderstandings, or tension at home.', icon: <FamilyConflictIcon /> },
        { id: 'family_care', title: 'Someone I Care About', desc: 'Thoughts about a parent, sibling, child, or loved one.', icon: <CareAboutIcon /> },
        { id: 'family_resp', title: 'Family Responsibility', desc: 'Pressure, duties, expectations, or supporting others.', icon: <Users className="w-6 h-6 text-yellow-500" /> },
        { id: 'family_change', title: 'Family Change', desc: 'A major change, transition, or uncertainty within the family.', icon: <RefreshCcw className="w-6 h-6 text-green-400" /> }
      ]
    },
    future: {
      title: <>Scared about the<br/><span className="text-yellow-500 font-bold">future</span>?</>,
      subtitle: 'Choose what feels closest?',
      options: [
        { id: 'future_uncertain', title: 'Uncertain About What\'s Next', desc: 'Not sure what the future holds or which direction to take.', icon: <CalendarDays className="w-6 h-6 text-purple-400" /> },
        { id: 'future_goals', title: 'Worried About Goals', desc: 'Concerned about achieving my goals or meeting my expectations.', icon: <Target className="w-6 h-6 text-blue-400" /> },
        { id: 'future_career', title: 'Career & Financial Worries', desc: 'Stressed about my job, finances, or long-term stability.', icon: <Briefcase className="w-6 h-6 text-yellow-500" /> },
        { id: 'future_unknown', title: 'Afraid of the Unknown', desc: 'Anxious about things I can\'t control or predict.', icon: <CircleHelp className="w-6 h-6 text-teal-400" /> }
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
