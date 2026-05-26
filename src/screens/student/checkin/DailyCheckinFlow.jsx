import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { ContextStep } from './ContextStep';
import { EnergyStep } from './EnergyStep';
import { EmotionStep } from './EmotionStep';
import { ReasonStep } from './ReasonStep';
import { BodyMapStep } from './BodyMapStep';
import { SensationStep } from './SensationStep';

import {
  useInteractionTracker,
  logSessionSummary,
  createSessionState,
  addStepMetadata,
  updateResponse,
  updateCurrentStep,
  clearSessionState,
  FLOW_CONFIG,
} from '../../../lib/behavioral';
import { getDailyFlowScreen, submitScreenResponse, submitBodyMap } from '../../../lib/api';

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

const STEP_TO_SCREEN_TYPE = {
  1: 'context_warmup',
  2: 'energy_check',
  3: 'emotion_check',
  4: 'reason_step',
  5: 'body_map',
  6: 'sensation_step',
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

  // ─── Session & Tracking ───────────────────────────────────────
  const sessionRef = useRef(createSessionState('static'));
  const allMetadataRef = useRef([]);

  // Initialize session on backend
  useEffect(() => {
    const initSession = async () => {
      try {
        const data = await getDailyFlowScreen();
        if (data && data.session_id) {
          sessionRef.current.active_session_id = data.session_id;
        }
      } catch (err) {
        console.error("Failed to initialize daily flow session:", err);
      }
    };
    initSession();
  }, []);

  // Current step tracker
  const tracker = useInteractionTracker(
    FLOW_CONFIG.STATIC_STEP_NAMES[step - 1] || `Step ${step}`,
    step,
    'static'
  );

  const submitCurrentStep = useCallback(async (responseData = {}) => {
    const metadata = tracker.submitResponse(responseData);
    allMetadataRef.current.push(metadata);
    addStepMetadata('static', metadata);
    updateResponse('static', step, responseData);

    // Send telemetry and response to backend
    if (sessionRef.current.active_session_id) {
      try {
        await submitScreenResponse({
          session_id: sessionRef.current.active_session_id,
          screen_type: STEP_TO_SCREEN_TYPE[step] || `step_${step}`,
          response_data: responseData,
          response_time_ms: metadata.response_time_ms,
          hesitation_time_ms: metadata.hesitation_time_ms,
          option_change_count: metadata.option_change_count,
        });
      } catch (e) {
        console.error("Failed to submit step response:", e);
      }
    }
  }, [tracker, step]);

  const completeFlow = useCallback(async () => {
    logSessionSummary('static', sessionRef.current.active_session_id, allMetadataRef.current);
    
    // Advance backend session to step 7
    if (sessionRef.current.active_session_id) {
      try {
        await getDailyFlowScreen(sessionRef.current.active_session_id);
      } catch (e) {
        console.error("Failed to advance backend session:", e);
      }
    }

    clearSessionState('static');
    navigate('/student/home');
  }, [navigate]);

  const nextStep = () => {
    if (step === 1 && !context) return;
    if (step === 3 && !primaryEmotion) return;
    if (step === 4 && !reason) return;

    // Submit behavioral data for current step
    const responseMap = {
      1: { selected_context: context },
      2: { energy_value: energy },
      3: { primary_emotion: primaryEmotion, sub_emotion: secondaryReasons[0] || null },
      4: { primary_reason: reason, secondary_feelings: secondaryReasons },
      5: { body_zone: activeBodyArea }
    };
    if (responseMap[step]) {
      submitCurrentStep(responseMap[step]);
    }

    setDirection(1);
    if (step < 6) {
      const nextS = step + 1;
      setStep(nextS);
      updateCurrentStep('static', nextS);
    } else {
      // Step 6 gets submitted when 'onSave' is called in SensationStep
      completeFlow();
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
    switch (s) {
      case 1: return '#d946ef';
      case 2: return '#22c55e';
      case 3: return '#eab308';
      case 4: return '#3b82f6';
      case 5: return '#ec4899';
      case 6: return '#f97316';
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
                    <span className="text-[20px] font-bold" style={{ color: '#fff' }}>
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
              <ContextStep
                context={context}
                setContext={(val) => {
                  tracker.trackTap();
                  if (context !== null) tracker.trackOptionChange(context, val);
                  else tracker.trackFirstInteraction();
                  setContext(val);
                }}
              />
            )}
            {step === 2 && (
              <EnergyStep
                energy={energy}
                setEnergy={(val) => {
                  tracker.trackFirstInteraction();
                  if (Math.abs(val - energy) > 5) tracker.trackOptionChange(energy, val);
                  setEnergy(val);
                }}
              />
            )}
            {step === 3 && (
              <EmotionStep
                primaryEmotion={primaryEmotion}
                setPrimaryEmotion={(val) => {
                  tracker.trackTap();
                  if (primaryEmotion !== null) tracker.trackOptionChange(primaryEmotion, val);
                  else tracker.trackFirstInteraction();
                  setPrimaryEmotion(val);
                }}
              />
            )}
            {step === 4 && (
              <ReasonStep
                primaryEmotion={primaryEmotion}
                reason={reason}
                setReason={(val) => {
                  tracker.trackTap();
                  if (reason !== null) tracker.trackOptionChange(reason, val);
                  else tracker.trackFirstInteraction();
                  setReason(val);
                }}
                secondaryReasons={secondaryReasons}
                setSecondaryReasons={(updater) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  setSecondaryReasons(updater);
                }}
              />
            )}
            {step === 5 && (
              <BodyMapStep onAreaSelect={(area) => {
                tracker.trackTap();
                tracker.trackFirstInteraction();
                submitCurrentStep({ bodyArea: area });
                setActiveBodyArea(area);
                setDirection(1);
                setStep(6);
                updateCurrentStep('static', 6);
              }} stepColor={getStepColor(step)} />
            )}
            {step === 6 && (
              <SensationStep
                area={activeBodyArea}
                currentSensation={bodySensations[activeBodyArea]}
                onSave={async (sensation) => {
                  setBodySensations(prev => ({ ...prev, [activeBodyArea]: sensation }));
                  
                  // Submit step response
                  await submitCurrentStep({ 
                    sensation_type: sensation.sensation, 
                    intensity: sensation.intensity 
                  });
                  
                  // Submit body map telemetry
                  if (sessionRef.current.active_session_id) {
                    try {
                      await submitBodyMap({
                        session_id: sessionRef.current.active_session_id,
                        body_zone: activeBodyArea,
                        sensation_type: sensation.sensation,
                        intensity: sensation.intensity || 50
                      });
                    } catch (e) {
                      console.error("Failed to submit body map telemetry:", e);
                    }
                  }

                  completeFlow();
                }}
                onTrackTap={tracker.trackTap}
                onTrackOptionChange={tracker.trackOptionChange}
                onTrackFirstInteraction={tracker.trackFirstInteraction}
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
