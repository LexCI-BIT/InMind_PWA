import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WEEKS } from '../mindlab/weeklyData';

import { DailyContextStep } from './DailyContextStep';
import { ScenarioStep } from './ScenarioStep';
import { MicroFeedbackStep } from './MicroFeedbackStep';
import { ReflectionStep } from './ReflectionStep';
import { InsightStep } from './InsightStep';
import { ChallengeStep } from './ChallengeStep';
import { CompletionStep } from './CompletionStep';

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
import { getDailyFlowScreen, submitScreenResponse } from '../../../lib/api';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  Dynamic Flow — 7 Steps
 * ═══════════════════════════════════════════════════════════════════
 */

const STEPS = [
  { id: 0, color: '#9d4edd', name: 'DailyContext' },
  { id: 1, color: '#f59e0b', name: 'MicroFeedback' },
  { id: 2, color: '#4361ee', name: 'Scenario' },
  { id: 3, color: '#e63946', name: 'Reflection' },
  { id: 4, color: '#2a9d8f', name: 'Insight' },
  { id: 5, color: '#a8dadc', name: 'Challenge' },
  { id: 6, color: '#10b981', name: 'Completion' },
];

const STEP_TO_SCREEN_TYPE = {
  0: 'context_warmup',
  1: 'daily_prompt',
  2: 'scenario',
  3: 'reflection',
  4: 'insight',
  5: 'challenge',
  6: 'completion',
};

export default function DynamicFlow({ week, dayIndex, onBack, onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState(null);

  const activeWeek = week || WEEKS[0];
  const activeDayIndex = dayIndex !== undefined ? dayIndex : 3;
  const content = activeWeek?.days?.[activeDayIndex]?.content || {};

  // ─── Session & Tracking ───────────────────────────────────────
  const sessionRef = useRef(createSessionState('dynamic'));
  const allMetadataRef = useRef([]);

  // Fetch active session from backend
  useEffect(() => {
    const initSession = async () => {
      try {
        const data = await getDailyFlowScreen();
        // The backend should return the current session ID since step 6 was completed
        if (data && data.session_id) {
          sessionRef.current.active_session_id = data.session_id;
        }
      } catch (err) {
        console.error("Failed to fetch active daily flow session:", err);
      }
    };
    initSession();
  }, []);

  const tracker = useInteractionTracker(
    FLOW_CONFIG.DYNAMIC_STEP_NAMES[step] || `Step ${step}`,
    step,
    'dynamic'
  );

  const submitCurrentStep = useCallback(async (responseData = {}) => {
    const metadata = tracker.submitResponse(responseData);
    allMetadataRef.current.push(metadata);
    addStepMetadata('dynamic', metadata);
    updateResponse('dynamic', step, responseData);

    // Send telemetry to backend
    if (sessionRef.current.active_session_id) {
      try {
        await submitScreenResponse({
          session_id: sessionRef.current.active_session_id,
          screen_type: STEP_TO_SCREEN_TYPE[step] || `dynamic_step_${step}`,
          response_data: responseData,
          response_time_ms: metadata.response_time_ms,
          hesitation_time_ms: metadata.hesitation_time_ms,
          option_change_count: metadata.option_change_count,
        });
      } catch (e) {
        console.error("Failed to submit dynamic step response:", e);
      }
    }
  }, [tracker, step]);

  const completeFlow = useCallback(async () => {
    logSessionSummary('dynamic', sessionRef.current.active_session_id, allMetadataRef.current);
    
    // Call backend to mark as completed
    if (sessionRef.current.active_session_id) {
      try {
        await getDailyFlowScreen(sessionRef.current.active_session_id);
      } catch (e) {
        console.error("Failed to complete dynamic flow:", e);
      }
    }

    clearSessionState('dynamic');
    if (onComplete) onComplete();
    else navigate('/student/home');
  }, [navigate, onComplete]);

  const nextStep = () => {
    if (step < 6) {
      const nextS = step + 1;
      setStep(nextS);
      updateCurrentStep('dynamic', nextS);
    }
  };

  const handleStepSubmitAndNext = async (responseData = {}) => {
    await submitCurrentStep(responseData);
    nextStep();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
    else if (onBack) onBack();
    else navigate('/student/home');
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#0d0d12]">
      
      {/* ───── Background Image ───── */}
      <AnimatePresence mode="wait">
        {step === 0 && <BackgroundImage key="dailycontext" src="/dynamicflow/dailyprompt.png" />}
        {step === 1 && selection === 'friends' && <BackgroundImage key="friends" src="/dynamicflow/friends.png" />}
        {step === 1 && selection === 'school' && <BackgroundImage key="school" src="/dynamicflow/school.png" />}
        {step === 1 && selection === 'myself' && <BackgroundImage key="myself" src="/dynamicflow/myself.png" />}
        {step === 1 && !selection && <BackgroundImage key="feedback" src="/dynamicflow/dailyprompt.png" />}
        {step === 2 && <BackgroundImage key="scenario" src="/dynamicflow/senario.png" />}
        {step === 3 && <BackgroundImage key="reflection" src="/dynamicflow/reflection.png" />}
        {step === 4 && <BackgroundImage key="insight" src="/dynamicflow/insight.png" />}
        {step === 5 && <BackgroundImage key="challenge" src="/dynamicflow/challenge.jpeg" />}
        {step === 6 && <BackgroundImage key="completion" src="/dynamicflow/completion.png" />}
      </AnimatePresence>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      {/* ───── Top Navigation ───── */}
      {step > 0 && step < 6 && (
        <div className="relative z-10 flex items-center px-6 pt-safe pt-8 pb-4">
          <button
            onClick={prevStep}
            className="text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Progress Bar — 7 segments */}
          <div className="ml-4 flex-1 flex items-center gap-1.5">
            {STEPS.map((s) => (
              <div key={s.id} className="h-[4px] flex-1 rounded-full bg-white/20 overflow-hidden">
                {step >= s.id && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───── Content ───── */}
      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">

          {/* Step 0: DailyContext */}
          {step === 0 && (
            <motion.div key="0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col pt-safe pt-8">
              <DailyContextStep
                onSelect={(s) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  setSelection(s);
                  submitCurrentStep({ selection: s });
                  nextStep();
                }}
              />
            </motion.div>
          )}

          {/* Step 1: MicroFeedback */}
          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <MicroFeedbackStep
                selection={selection}
                onNext={(text) => {
                  tracker.trackTextInput(text);
                  handleStepSubmitAndNext({ text, selection });
                }}
                onTextChange={(text) => tracker.trackTextInput(text)}
              />
            </motion.div>
          )}

          {/* Step 2: Scenario */}
          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <ScenarioStep
                onNext={(selectedOption) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext({ selectedOption });
                }}
                data={content}
              />
            </motion.div>
          )}

          {/* Step 3: Reflection */}
          {step === 3 && (
            <motion.div key="3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <ReflectionStep
                onNext={(response) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext(typeof response === 'string' ? { reflectionText: response } : { selectedOption: response });
                }}
                onTextChange={(text) => tracker.trackTextInput(text)}
                data={content}
              />
            </motion.div>
          )}

          {/* Step 4: Insight */}
          {step === 4 && (
            <motion.div key="4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <InsightStep
                onNext={(selectedOption) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext({ selectedOption });
                }}
                data={content}
              />
            </motion.div>
          )}

          {/* Step 5: Challenge */}
          {step === 5 && (
            <motion.div key="5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <ChallengeStep
                onNext={(challengeData) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext(challengeData || {});
                }}
                onTrackTap={tracker.trackTap}
                onTrackOptionChange={tracker.trackOptionChange}
                onTrackFirstInteraction={tracker.trackFirstInteraction}
                data={content}
              />
            </motion.div>
          )}

          {/* Step 6: Completion */}
          {step === 6 && (
            <motion.div key="6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <CompletionStep
                onHome={() => {
                  submitCurrentStep({ completed: true });
                  completeFlow();
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}

function BackgroundImage({ src }) {
  return (
    <motion.img
      src={src}
      alt="background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
  );
}
