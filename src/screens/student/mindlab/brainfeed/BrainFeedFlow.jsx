import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BrainFeedIntro from './BrainFeedIntro';
import BrainFeedReels from './BrainFeedReels';
import BrainFeedQuiz from './BrainFeedQuiz';

export default function BrainFeedFlow() {
  const [phase, setPhase] = useState('intro'); // 'intro', 'reels', 'quiz'

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <BrainFeedIntro key="intro" onStart={() => setPhase('reels')} />
        )}
        {phase === 'reels' && (
          <BrainFeedReels key="reels" onComplete={() => setPhase('quiz')} />
        )}
        {phase === 'quiz' && (
          <BrainFeedQuiz key="quiz" />
        )}
      </AnimatePresence>
    </div>
  );
}
