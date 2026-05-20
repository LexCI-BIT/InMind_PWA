import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { ContextStep } from './ContextStep';
import { EnergyStep } from './EnergyStep';
import { EmotionStep } from './EmotionStep';
import { ReasonStep } from './ReasonStep';
import { BodyMapStep } from './BodyMapStep';
import { SensationStep } from './SensationStep';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
};

export default function DailyCheckinFlow() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const [context, setContext] = useState(null);
  const [energy, setEnergy] = useState(65);
  const [primaryEmotion, setPrimaryEmotion] = useState(null);
  const [reason, setReason] = useState(null);
  const [secondaryReasons, setSecondaryReasons] = useState([]);
  
  // Body Map
  const [activeBodyArea, setActiveBodyArea] = useState(null);
  const [bodySensations, setBodySensations] = useState({});

  const nextStep = () => {
    if (step === 1 && !context) return;
    if (step === 3 && !primaryEmotion) return;
    if (step === 4 && !reason) return;
    
    setDirection(1);
    if (step < 6) {
      setStep(s => s + 1);
    } else {
      // Completed flow, go to home
      navigate('/student/home');
    }
  };

  const prevStep = () => {
    setDirection(-1);
    if (activeBodyArea) {
      setActiveBodyArea(null);
    } else if (step > 1) {
      setStep(s => s - 1);
    } else {
      navigate(-1);
    }
  };

  const getStepColor = (s) => {
    switch(s) {
      case 1: return '#d946ef'; // Fuchsia
      case 2: return '#22c55e'; // Green
      case 3: return '#eab308'; // Yellow
      case 4: return '#3b82f6'; // Blue
      case 5: return '#ec4899'; // Pink
      case 6: return '#f97316'; // Orange
      default: return '#d946ef';
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#0d0d12] text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-6 pt-safe pt-6 pb-4">
        <button onClick={prevStep} className="p-2 -ml-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col relative w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step + (activeBodyArea ? '-detail' : '')}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 px-6 flex flex-col"
          >
            {/* Header Content */}
            {(
              <div className="flex flex-col items-center mb-6">
                <div className="w-full flex items-center justify-between mb-2 mt-4">
                  <div className="flex-1 flex justify-center">
                    <span className="text-[20px] font-bold" style={{color: '#fff'}}>
                      {step === 1 ? 'Context Warm-Up' : step === 2 ? 'Energy Check-In' : step === 3 ? '' : step === 4 ? 'Why?' : step === 5 ? 'Body Map' : 'Sensation'}
                    </span>
                  </div>
                  <span className="text-[14px] font-bold text-white/80 absolute right-6">{step}/6</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-2 relative">
                  <motion.div 
                    className="h-full rounded-full absolute left-0 top-0"
                    style={{ backgroundColor: getStepColor(step) }}
                    initial={{ width: `${((step - 1) / 6) * 100}%` }}
                    animate={{ width: `${(step / 6) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <ContextStep context={context} setContext={setContext} />
            )}
            {step === 2 && (
              <EnergyStep energy={energy} setEnergy={setEnergy} />
            )}
            {step === 3 && (
              <EmotionStep 
                primaryEmotion={primaryEmotion} 
                setPrimaryEmotion={setPrimaryEmotion}
              />
            )}
            {step === 4 && (
              <ReasonStep
                primaryEmotion={primaryEmotion}
                reason={reason}
                setReason={setReason}
                secondaryReasons={secondaryReasons}
                setSecondaryReasons={setSecondaryReasons}
              />
            )}
            {step === 5 && (
              <BodyMapStep onAreaSelect={(area) => {
                setActiveBodyArea(area);
                setDirection(1);
                setStep(6);
              }} stepColor={getStepColor(step)} />
            )}
            {step === 6 && (
              <SensationStep 
                area={activeBodyArea}
                currentSensation={bodySensations[activeBodyArea]}
                onSave={(sensation) => {
                  setBodySensations(prev => ({...prev, [activeBodyArea]: sensation}));
                  navigate('/student/home');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      {step !== 5 && step !== 6 && (
        <div className={`px-6 pb-8 pt-4 z-10 ${step === 3 ? 'bg-transparent absolute bottom-0 w-full' : 'bg-[#0d0d12]'}`}>
          <button 
            onClick={nextStep}
            className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
            style={{ 
              backgroundColor: step === 3 ? '#242424' : getStepColor(step),
              color: '#fff',
              opacity: (step === 1 && !context) || (step === 3 && !primaryEmotion) || (step === 4 && !reason) ? 0.5 : 1
            }}
          >
            {step === 5 ? 'Complete' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}
