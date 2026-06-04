import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';

export function ImmediateConsequenceStep({ storySelection, onNext }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [inputText, setInputText] = useState('');

  const messages = [
    { id: 1, sender: 'user', text: "Hey, can we talk for a minute?", time: "8:45 PM" },
    { id: 2, sender: 'system', text: "Yeah sure, what's up?", time: "8:46 PM" },
    { id: 3, sender: 'user', text: "I feel like things have been really different lately.", time: "8:47 PM" },
    { id: 4, sender: 'system', text: "I've been feeling off too.", time: "8:47 PM" },
    { id: 5, sender: 'user', text: "Do you want to tell me what's been going on?", time: "8:48 PM" },
    { id: 6, sender: 'system', text: "...", isTyping: true, time: "" }
  ];

  // Animate messages appearing one by one if it's the 'ask' flow
  useEffect(() => {
    if (storySelection === 'ask' && visibleCount < messages.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, visibleCount === 0 ? 500 : 1500);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, messages.length, storySelection]);

  const handleSend = () => {
    if (storySelection === 'ask' && visibleCount === messages.length) {
      onNext({ consequenceResponse: inputText });
    } else if (storySelection !== 'ask') {
      onNext({ consequenceResponse: 'cinematic_continued' });
    }
  };

  // ─── Cinematic UI for other options ───
  if (storySelection !== 'ask') {
    let title = null;
    if (storySelection === 'wait') {
      title = <>You <span className="text-yellow-400">wait</span> and<br/>observe</>;
    } else if (storySelection === 'overthink') {
      title = <>You <span className="text-yellow-400">replay</span> the situation<br/>in your head.</>;
    } else if (storySelection === 'avoid') {
      title = <>You decide <span className="text-yellow-400">not to deal</span><br/>with it right now.</>;
    } else {
      title = <>You <span className="text-yellow-400">wait</span> and observe</>;
    }

    return (
      <div className="flex-1 flex flex-col px-6 pt-24 pb-6 relative z-10 h-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <h2 className="text-[28px] font-semibold text-white leading-snug">
            {title}
          </h2>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }}
          onClick={handleSend}
          className="mt-auto ml-auto mb-6 w-24 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-3xl flex items-center justify-center transition-colors active:scale-95"
        >
          <ArrowRight className="w-6 h-6 text-black" />
        </motion.button>
      </div>
    );
  }

  // ─── Chat UI for 'ask' option ───
  return (
    <div className="flex-1 flex flex-col px-4 pt-8 pb-4 relative z-10 h-full">
      
      {/* Heading */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
        className="mb-8 pl-2"
      >
        <h2 className="text-[26px] font-semibold text-white leading-tight">
          You decided <br/>
          to <span className="text-yellow-400">reach out</span>
        </h2>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-4 pb-20">
        <AnimatePresence>
          {messages.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end pl-12' : 'justify-start pr-12'}`}
            >
              <div 
                className={`relative p-3 px-5 text-[15px] shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-[#3a1d75] text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-[#1e1c22] text-[#d1d1d1] rounded-2xl rounded-tl-sm border border-white/5'
                  }
                `}
              >
                {msg.isTyping ? (
                  <div className="flex gap-1 items-center h-4 px-1">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                ) : (
                  <>
                    <p className="mb-1 leading-snug">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-[10px] ${msg.sender === 'user' ? 'text-purple-200/60' : 'text-gray-500'}`}>{msg.time}</span>
                      {msg.sender === 'user' && (
                        <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Bottom Bar */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div className="bg-[#1e1c22] rounded-full p-1.5 pl-4 flex items-center border border-white/10 shadow-2xl">
          <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center shrink-0 mr-3">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mb-1 mx-[1px]" />
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mb-1 mx-[1px]" />
            <div className="w-3 h-1 border-b-2 border-purple-500 rounded-full absolute mt-2" />
          </div>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Continue..."
            className="flex-1 bg-transparent text-white text-[15px] focus:outline-none placeholder:text-gray-500"
          />
          <button 
            onClick={handleSend}
            disabled={visibleCount < messages.length}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${visibleCount === messages.length ? 'bg-[#5b21b6] text-white hover:bg-purple-600' : 'bg-gray-800 text-gray-600'}`}
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </div>
      </motion.div>

    </div>
  );
}
