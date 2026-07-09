import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WEEKS } from '../challenges/weeklyData';

import { MomentCardStep } from './MomentCardStep';
import { ContextNarrowingStep } from './ContextNarrowingStep';
import { MentalReplayStep } from './MentalReplayStep';
import { StoryStartStep } from './StoryStartStep';
import { ImmediateConsequenceStep } from './ImmediateConsequenceStep';
import { WhatHappensNextStep } from './WhatHappensNextStep';
import { HaveYouSeenBeforeStep } from './HaveYouSeenBeforeStep';
import { OptionalReflectionStep } from './OptionalReflectionStep';
import { BehaviourInsightStep } from './BehaviourInsightStep';
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
  loadSessionState,
  FLOW_CONFIG,
} from '../../../lib/behavioral';
import { getDailyFlowScreen, submitScreenResponse } from '../../../lib/api';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  Dynamic Flow — 12 Steps (Partial Integration)
 * ═══════════════════════════════════════════════════════════════════
 */

// Temporarily mixing new steps with old steps to keep flow working while we build
const STEPS = [
  { id: 0, color: '#facc15', name: 'MomentCard' },
  { id: 1, color: '#f59e0b', name: 'ContextNarrowing' },
  { id: 2, color: '#10b981', name: 'MentalReplay' },
  { id: 3, color: '#8b5cf6', name: 'StoryStart' },
  { id: 4, color: '#ec4899', name: 'ImmediateConsequence' },
  { id: 5, color: '#0ea5e9', name: 'WhatHappensNext' },
  { id: 6, color: '#f59e0b', name: 'HaveYouSeenBefore' },
  { id: 7, color: '#d1d5db', name: 'OptionalReflection' },
  { id: 8, color: '#f59e0b', name: 'BehaviourInsight' },
  { id: 9, color: '#a8dadc', name: 'Challenge' },
  { id: 10, color: '#10b981', name: 'Completion' },
];

const STEP_TO_SCREEN_TYPE = {
  0: 'moment_card',
  1: 'context_narrowing',
  2: 'mental_replay',
  3: 'story_start',
  4: 'immediate_consequence',
  5: 'what_happens_next',
  6: 'have_you_seen_before',
  7: 'optional_reflection',
  8: 'behaviour_insight',
  9: 'challenge',
  10: 'completion',
};

export default function DynamicFlow({ week, dayIndex, onBack, onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState(null); // 'friends', 'school', or 'myself'
  const [narrowSelection, setNarrowSelection] = useState(null); // 'ignored', 'studies', etc.
  const [storySelection, setStorySelection] = useState(null); // 'ask', 'wait', 'overthink', 'avoid'

  const activeWeek = week || WEEKS[0];
  const activeDayIndex = dayIndex !== undefined ? dayIndex : 3;
  const content = activeWeek?.days?.[activeDayIndex]?.content || {};

  // ─── Session & Tracking ───────────────────────────────────────
  const sessionRef = useRef(createSessionState('dynamic'));
  const allMetadataRef = useRef([]);

  useEffect(() => {
    const initSession = async () => {
      try {
        const data = await getDailyFlowScreen();
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
    // Gather all responses from the session
    const sessionState = loadSessionState('dynamic');
    const allResponses = sessionState?.responses || {};

    logSessionSummary('dynamic', sessionRef.current.active_session_id, allMetadataRef.current, allResponses);
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
    if (step < 10) {
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
        {step === 0 && <BackgroundImage key="momentcard" src="/dynamicflow/momentcard.jpeg" />}
        {step === 1 && selection === 'friends' && <BackgroundImage key="context_friends" src="/dynamicflow/contextnarrow_friends.png" />}
        {step === 1 && selection === 'school' && <BackgroundImage key="context_school" src="/dynamicflow/contextnarrow_school.png" />}
        {step === 1 && selection === 'myself' && <BackgroundImage key="context_myself" src="/dynamicflow/contextnarrow_myself.png" />}
        {step === 1 && selection === 'family' && <BackgroundImage key="context_family" src="/dynamicflow/contextnarrow_parent.png" />}
        {step === 1 && selection === 'future' && <BackgroundImage key="context_future" src="/dynamicflow/contextnarrow_future.png" />}
        {step === 1 && !selection && <BackgroundImage key="context_fallback" src="/dynamicflow/contextnarrow_friends.png" />}
        
        {step === 2 && <BackgroundImage key="mental_replay" src="/dynamicflow/mentalreplay.png" />}
        {step === 3 && <BackgroundImage key="story_start" src="" />} {/* Black background for chat */}
        
        {step === 4 && storySelection === 'ask' && <BackgroundImage key="consequence_ask" src="" />}
        {step === 4 && storySelection === 'wait' && <BackgroundImage key="consequence_wait" src="/dynamicflow/ifwait.png" />}
        {step === 4 && storySelection === 'overthink' && <BackgroundImage key="consequence_overthink" src="/dynamicflow/ifoverthink.png" />}
        {step === 4 && storySelection === 'avoid' && <BackgroundImage key="consequence_avoid" src="/dynamicflow/ifavoid.png" />}
        
        {step === 5 && <BackgroundImage key="prediction" src="/dynamicflow/predictionscreen.png" />}
        {step === 6 && <BackgroundImage key="seen_before" src="/dynamicflow/haveyoueverseen.png" />}
        {/* step 7: optional reflection - solid black bg */}
        {step === 8 && <BackgroundImage key="behaviour_insight" src="/dynamicflow/behaviourinsight.png" />}
        {step === 9 && <BackgroundImage key="challenge" src="/dynamicflow/missionscreen.png" />}
        {step === 10 && <BackgroundImage key="completion" src="/dynamicflow/completion.png" />}
      </AnimatePresence>

      {/* Dark overlay for readability */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${[3].includes(step) || (step === 4 && storySelection === 'ask') ? 'bg-[#0d0d12]' : 'bg-black/50'}`} />

      {/* ───── Top Navigation ───── */}
      {step > 0 && step < 10 && (
        <div className="relative z-10 flex items-center px-6 pt-safe pt-8 pb-4">
          <button
            onClick={prevStep}
            className="text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Progress Bar */}
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

          {/* Step 0: Moment Card */}
          {step === 0 && (
            <motion.div key="0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col pt-safe pt-8">
              <MomentCardStep
                onSelect={(selectedContext) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  setSelection(selectedContext);
                  submitCurrentStep({ selection: selectedContext });
                  nextStep();
                }}
              />
            </motion.div>
          )}

          {/* Step 1: Context Narrowing */}
          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <ContextNarrowingStep
                selection={selection}
                onSelect={(narrowId, narrowTitle) => {
                  tracker.trackTap();
                  setNarrowSelection(narrowId);
                  handleStepSubmitAndNext({ narrowSelection: narrowId, narrowTitle });
                }}
              />
            </motion.div>
          )}

          {/* Step 2: Mental Replay */}
          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <MentalReplayStep
                onNext={(replayData) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext(replayData);
                }}
              />
            </motion.div>
          )}

          {/* Step 3: Story Start */}
          {step === 3 && (
            <motion.div key="3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col h-full">
              <StoryStartStep
                selection={selection}
                onNext={(storyData) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  setStorySelection(storyData.storyStartOption);
                  handleStepSubmitAndNext(storyData);
                }}
              />
            </motion.div>
          )}

          {/* Step 4: Immediate Consequence */}
          {step === 4 && (
            <motion.div key="4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col h-full">
              <ImmediateConsequenceStep
                storySelection={storySelection}
                onNext={(data) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext(data);
                }}
              />
            </motion.div>
          )}

          {/* Step 5: What Happens Next */}
          {step === 5 && (
            <motion.div key="5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
              <WhatHappensNextStep
                onSelect={(predictionId) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext({ prediction: predictionId });
                }}
              />
            </motion.div>
          )}
          {/* Step 6: Have You Seen Before */}
          {step === 6 && (
            <motion.div key="6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col h-full">
              <HaveYouSeenBeforeStep
                onSelect={(historyId) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext({ seenBefore: historyId });
                }}
              />
            </motion.div>
          )}

          {/* Step 7: Optional Reflection */}
          {step === 7 && (
            <motion.div key="7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col h-full">
              <OptionalReflectionStep
                onNext={(data) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext(data);
                }}
              />
            </motion.div>
          )}

          {/* Step 8: Behaviour Insight */}
          {step === 8 && (
            <motion.div key="8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col h-full">
              <BehaviourInsightStep
                selection={selection}
                onNext={(data) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext(data);
                }}
              />
            </motion.div>
          )}

          {/* Step 9: Challenge */}
          {step === 9 && (
            <motion.div key="9" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col h-full">
              <ChallengeStep
                onNext={(challengeData) => {
                  tracker.trackTap();
                  tracker.trackFirstInteraction();
                  handleStepSubmitAndNext(challengeData);
                }}
              />
            </motion.div>
          )}

          {/* Step 10: Completion */}
          {step === 10 && (
            <motion.div key="10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col">
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
