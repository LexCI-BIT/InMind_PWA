import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, MessageCircle, Send, Music } from 'lucide-react';

// Placeholder data for the feed since no raw videos were provided.
// Using high-quality educational/inspirational vertical images to simulate the screenshots.
const REELS_DATA = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop', // Books
    author: 'MotivationalSpeaker',
    track: 'Tretyujkila',
    caption: 'These are the motivational books preferred by top performers. Expanding your knowledge every day is the key to success...',
    likes: '1M',
    comments: '324k',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop', // Library/Books
    author: 'KnowledgeHub',
    track: 'Original Audio',
    caption: 'Did you know? Reading for just 5 minutes a day can significantly improve your focus and reduce stress.',
    likes: '850k',
    comments: '120k',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', // Study
    author: 'StudyHacks',
    track: 'Lofi Chill Beat',
    caption: 'The ultimate guide to building a ladder of wisdom. Challenge yourself to reach new heights!',
    likes: '2.1M',
    comments: '400k',
  }
];

// Target time in seconds (5 minutes = 300s)
// Set lower for rapid testing, but the requirement states 5 mins.
const WATCH_REQUIREMENT_SECONDS = 300; 

export default function BrainFeedReels({ onComplete }) {
  const navigate = useNavigate();
  const [activeReel, setActiveReel] = useState(0);
  const [secondsWatched, setSecondsWatched] = useState(0);
  const containerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsWatched((prev) => {
        const next = prev + 1;
        if (next >= WATCH_REQUIREMENT_SECONDS) {
          clearInterval(interval);
          onComplete(); // Transition to quiz after 5 mins
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Handle scroll snapping detection
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeReel) {
      setActiveReel(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full bg-black overflow-hidden"
    >
      {/* Top Header Overlay */}
      <div className="absolute left-0 top-0 z-50 flex w-full items-center justify-between p-6 pt-safe">
        <button onClick={() => navigate(-1)} className="text-white drop-shadow-md">
          <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
        </button>
        
        {/* Progress Bar for the 5 mins requirement */}
        <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-1000 ease-linear"
            style={{ width: `${(secondsWatched / WATCH_REQUIREMENT_SECONDS) * 100}%` }}
          />
        </div>
      </div>

      {/* Development shortcut button to skip the 5 min wait during testing */}
      <button 
        onClick={onComplete}
        className="absolute top-20 right-4 z-50 bg-white/10 backdrop-blur text-xs px-2 py-1 rounded text-white/50"
      >
        Skip Timer (Dev)
      </button>

      {/* Feed Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar"
      >
        {REELS_DATA.map((reel, index) => (
          <div key={reel.id} className="relative h-full w-full snap-start snap-always bg-neutral-900">
            {/* Main Media (Using Image to simulate video) */}
            <img 
              src={reel.url} 
              alt="Reel content" 
              className="absolute inset-0 h-full w-full object-cover"
            />
            
            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

            {/* Right Sidebar Interactions */}
            <div className="absolute bottom-24 right-4 flex flex-col items-center gap-6 z-20 text-white">
              <button className="flex flex-col items-center gap-1 group">
                <div className="rounded-full bg-black/20 p-2 backdrop-blur-sm transition group-active:scale-90">
                  <Heart className="h-7 w-7" strokeWidth={2} />
                </div>
                <span className="text-[11px] font-medium drop-shadow-md">{reel.likes}</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 group">
                <div className="rounded-full bg-black/20 p-2 backdrop-blur-sm transition group-active:scale-90">
                  <MessageCircle className="h-7 w-7" strokeWidth={2} />
                </div>
                <span className="text-[11px] font-medium drop-shadow-md">{reel.comments}</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 group">
                <div className="rounded-full bg-black/20 p-2 backdrop-blur-sm transition group-active:scale-90">
                  <Send className="h-7 w-7" strokeWidth={2} />
                </div>
                <span className="text-[11px] font-medium drop-shadow-md">Share</span>
              </button>
            </div>

            {/* Bottom Left Info */}
            <div className="absolute bottom-8 left-4 right-20 z-20 flex flex-col gap-3 text-white">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden rounded-full border border-white/40 shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reel.author}`} alt="avatar" className="w-full h-full bg-black" />
                </div>
                <span className="font-semibold text-sm drop-shadow-md">{reel.author}</span>
              </div>
              
              <p className="text-[13px] leading-snug text-gray-100 drop-shadow-md line-clamp-2">
                {reel.caption}
              </p>
              
              <div className="flex items-center gap-2 mt-1">
                <Music className="h-3 w-3 text-white animate-spin-slow" />
                <span className="text-xs text-white/80 drop-shadow-md">{reel.track}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
      `}} />
    </motion.div>
  );
}
