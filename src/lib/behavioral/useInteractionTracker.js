/**
 * ═══════════════════════════════════════════════════════════════════
 *  InMind — Interaction Tracker Hook
 * ═══════════════════════════════════════════════════════════════════
 *
 *  React hook that attaches to every flow screen to track
 *  user interactions and generate behavioral metadata.
 *
 *  Usage:
 *    const tracker = useInteractionTracker('ContextStep', 1, 'static');
 *    tracker.trackTap();
 *    tracker.trackFirstInteraction();
 *    tracker.trackOptionChange('home', 'school');
 *    tracker.trackTextInput('I feel calm today');
 *    const metadata = tracker.submitResponse({ context: 'school' });
 * ═══════════════════════════════════════════════════════════════════
 */

import { useRef, useCallback, useEffect } from 'react';
import { RAPID_TAP } from './constants.js';
import { calculateDepthScore } from './signals.js';
import {
  logScreenOpened,
  logFirstInteraction,
  logOptionChange,
  logRapidTap,
  logStepResponse,
} from './logger.js';

export function useInteractionTracker(screenName, stepNumber, flowType = 'static') {
  const renderTimestamp = useRef(Date.now());
  const firstInteractionTimestamp = useRef(null);
  const lastTapTimestamp = useRef(null);
  const optionChangeCount = useRef(0);
  const rapidTapCount = useRef(0);
  const tapTimestamps = useRef([]);
  const hasInteracted = useRef(false);
  const hasTextInput = useRef(false);
  const textLength = useRef(0);
  const maxIdleDuration = useRef(0);
  const lastActivityTimestamp = useRef(Date.now());
  const submitted = useRef(false);

  // Reset on mount (new screen)
  useEffect(() => {
    renderTimestamp.current = Date.now();
    firstInteractionTimestamp.current = null;
    lastTapTimestamp.current = null;
    optionChangeCount.current = 0;
    rapidTapCount.current = 0;
    tapTimestamps.current = [];
    hasInteracted.current = false;
    hasTextInput.current = false;
    textLength.current = 0;
    maxIdleDuration.current = 0;
    lastActivityTimestamp.current = Date.now();
    submitted.current = false;

    logScreenOpened(screenName, stepNumber, flowType);

    // Idle tracker interval
    const idleInterval = setInterval(() => {
      const idleMs = Date.now() - lastActivityTimestamp.current;
      if (idleMs > maxIdleDuration.current) {
        maxIdleDuration.current = idleMs;
      }
    }, 1000);

    return () => clearInterval(idleInterval);
  }, [screenName, stepNumber, flowType]);

  // Track first interaction
  const trackFirstInteraction = useCallback(() => {
    lastActivityTimestamp.current = Date.now();
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      firstInteractionTimestamp.current = Date.now();
      const hesitationMs = firstInteractionTimestamp.current - renderTimestamp.current;
      logFirstInteraction(screenName, hesitationMs);
    }
  }, [screenName]);

  // Track option/answer changes
  const trackOptionChange = useCallback((fromValue, toValue) => {
    lastActivityTimestamp.current = Date.now();
    trackFirstInteraction();
    optionChangeCount.current += 1;
    logOptionChange(screenName, fromValue, toValue, optionChangeCount.current);
  }, [screenName, trackFirstInteraction]);

  // Track taps (for rapid-tap detection)
  const trackTap = useCallback(() => {
    const now = Date.now();
    lastActivityTimestamp.current = now;
    trackFirstInteraction();

    if (lastTapTimestamp.current) {
      const gap = now - lastTapTimestamp.current;
      if (gap < RAPID_TAP.GAP_THRESHOLD) {
        rapidTapCount.current += 1;
        logRapidTap(screenName, gap, rapidTapCount.current);
      }
    }

    lastTapTimestamp.current = now;
    tapTimestamps.current.push(now);
  }, [screenName, trackFirstInteraction]);

  // Track text input
  const trackTextInput = useCallback((text) => {
    lastActivityTimestamp.current = Date.now();
    trackFirstInteraction();
    hasTextInput.current = true;
    textLength.current = (text || '').length;
  }, [trackFirstInteraction]);

  // Get full metadata object
  const getMetadata = useCallback(() => {
    const now = Date.now();
    const responseTimeMs = now - renderTimestamp.current;
    const hesitationMs = firstInteractionTimestamp.current
      ? firstInteractionTimestamp.current - renderTimestamp.current
      : null;
    const durationSec = responseTimeMs / 1000;

    const depthScore = calculateDepthScore({
      hasInteracted: hasInteracted.current,
      optionChanges: optionChangeCount.current,
      hasTextInput: hasTextInput.current,
      textLength: textLength.current,
      durationSec,
    });

    return {
      screen_name: screenName,
      step_number: stepNumber,
      flow_type: flowType,
      screen_rendered_at: new Date(renderTimestamp.current).toISOString(),
      first_interaction_time: firstInteractionTimestamp.current
        ? new Date(firstInteractionTimestamp.current).toISOString()
        : null,
      response_submitted_at: new Date(now).toISOString(),
      response_time_ms: responseTimeMs,
      hesitation_time_ms: hesitationMs,
      option_change_count: optionChangeCount.current,
      rapid_tap_count: rapidTapCount.current,
      idle_duration_ms: maxIdleDuration.current,
      completion_duration_ms: responseTimeMs,
      interaction_depth_score: depthScore,
      has_text_input: hasTextInput.current,
      text_length: textLength.current,
      total_taps: tapTimestamps.current.length,
    };
  }, [screenName, stepNumber, flowType]);

  // Submit response — logs everything to console
  const submitResponse = useCallback((responseData = {}) => {
    if (submitted.current) return getMetadata();
    submitted.current = true;

    const metadata = getMetadata();
    logStepResponse(metadata, responseData);
    return metadata;
  }, [getMetadata]);

  return {
    trackFirstInteraction,
    trackOptionChange,
    trackTap,
    trackTextInput,
    submitResponse,
    getMetadata,
  };
}
