import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MindLab() {
  const navigate = useNavigate();

  return (
    <section 
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818]"
      style={{
        backgroundImage: `url('/gamification/page1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Invisible button over the "TAP TO ENTER" area */}
      <button
        type="button"
        onClick={() => navigate('/student/mindlab/progress')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[250px] h-[80px] outline-none"
        aria-label="Tap to enter"
      />
    </section>
  );
}
