import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Clock, CloudRain, XCircle, Send, Heart, Users } from 'lucide-react';

export function StoryStartStep({ selection, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [inputText, setInputText] = useState('');

  const options = [
    { id: 'ask', text: 'Ask directly', icon: <MessageSquare className="w-5 h-5 text-purple-400" />, feedback: "That's a thoughtful way to handle it." },
    { id: 'wait', text: 'Wait for them to talk', icon: <Clock className="w-5 h-5 text-purple-400" />, feedback: "That's okay, but sometimes it's better to check in rather than wait." },
    { id: 'overthink', text: 'Overthink it', icon: <CloudRain className="w-5 h-5 text-purple-400" />, feedback: "Overthinking can make things heavier. Clarity comes from action." },
    { id: 'avoid', text: 'Avoid it', icon: <XCircle className="w-5 h-5 text-purple-400" />, feedback: "Avoiding might seem easy now, but it can create more distance." }
  ];

  const handleSelect = (opt) => {
    setSelectedOption(opt);
    setTimeout(() => {
      setShowFeedback(true);
    }, 800);
  };

  const handleSend = () => {
    if (selectedOption && showFeedback) {
      onNext({ storyStartOption: selectedOption.id, storyStartText: inputText });
    }
  };

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex-1 flex flex-col px-4 pt-8 pb-4 relative z-10 h-full">
      
      {/* Heading */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
        className="flex justify-center mb-8"
      >
        <h2 className="text-[26px] font-serif text-white">
          Imagine <span className="text-purple-400">This</span>
          <div className="h-[2px] w-16 bg-purple-500/50 mt-1" />
        </h2>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-6 pb-20">
        
        {/* System Message */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-2">
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="bg-[#1e1c22] rounded-2xl rounded-tl-sm p-4 text-[#d1d1d1] text-[15px] leading-relaxed shadow-lg border border-white/5 relative">
            <p className="mb-4">Your friend suddenly becomes distant after a group conversation.</p>
            <p>How will you approach them?</p>
            <span className="text-[10px] text-gray-500 absolute bottom-2 right-3">{currentTime}</span>
          </div>
        </motion.div>

        {/* Options List */}
        <AnimatePresence>
          {!selectedOption && (
            <motion.div 
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="flex flex-col gap-3 pl-11 pr-2"
            >
              {options.map((opt, i) => (
                <motion.button
                  key={opt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  onClick={() => handleSelect(opt)}
                  className="flex items-center justify-between p-4 rounded-full bg-[#1e1c22] border border-white/5 active:scale-95 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    {opt.icon}
                    <span className="text-gray-200 font-medium text-[15px]">{opt.text}</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                    {/* Empty circle */}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Selected Message */}
        <AnimatePresence>
          {selectedOption && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              className="flex justify-end pl-12 pr-2"
            >
              <div className="bg-[#3a1d75] rounded-2xl rounded-tr-sm p-3 px-5 text-white text-[15px] shadow-lg relative min-w-[120px]">
                <p className="mb-2">{selectedOption.text}</p>
                <div className="flex justify-end items-center gap-1">
                  <span className="text-[10px] text-purple-200/60">{currentTime}</span>
                  <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Feedback Message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
              className="flex gap-3 pr-12"
            >
              <div className="w-8 h-8 rounded-full shrink-0 mt-2" /> {/* Spacer */}
              <div className="bg-[#1e1c22] rounded-2xl rounded-tl-sm p-4 text-[#d1d1d1] text-[15px] leading-relaxed shadow-lg border border-white/5 relative w-full">
                <p className="mb-4 pr-2">{selectedOption.feedback}</p>
                <div className="flex justify-between items-center mt-1">
                  <Heart className="w-4 h-4 text-purple-500" />
                  <span className="text-[10px] text-gray-500">{currentTime}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Input Bottom Bar */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
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
            disabled={!showFeedback}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${showFeedback ? 'bg-[#5b21b6] text-white hover:bg-purple-600' : 'bg-gray-800 text-gray-600'}`}
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </div>
      </motion.div>

    </div>
  );
}
