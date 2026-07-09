/**
 * ═══════════════════════════════════════════════════════════════════
 *  InMind — Behavioral Session Summary (silent)
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Builds the backend payload for a completed flow (session + per-step
 *  metrics + behavioral signals + flags) and returns it.
 *
 *  NOTE: This module used to console.log the full payload — including the
 *  student's responses and behavioral data — to the browser DevTools. That
 *  leaked sensitive information to anyone with the console open, so all
 *  logging has been removed. The per-interaction log helpers are kept as
 *  no-ops so existing call sites (useInteractionTracker) keep working.
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  calculateEngagementScore,
  interpretEngagementScore,
  collectSessionFlags,
} from './signals.js';
import { FLOW_CONFIG } from './constants.js';

// ─── Per-interaction log helpers — intentionally silent no-ops ───────────────
export function logScreenOpened() {}
export function logFirstInteraction() {}
export function logOptionChange() {}
export function logRapidTap() {}
export function logTextInput() {}
export function logStepResponse() {}

// ─── Session summary — computes the payload, logs nothing ────────────────────

export function logSessionSummary(flowType, sessionId, allStepMetadata, responses = {}) {
  const totalSteps = flowType === 'static' ? FLOW_CONFIG.STATIC_STEPS : FLOW_CONFIG.DYNAMIC_STEPS;
  const stepNames = flowType === 'static' ? FLOW_CONFIG.STATIC_STEP_NAMES : FLOW_CONFIG.DYNAMIC_STEP_NAMES;

  const totalDurationMs = allStepMetadata.reduce((sum, m) => sum + (m.completion_duration_ms || 0), 0);
  const engagementScore = calculateEngagementScore(allStepMetadata, totalSteps);
  const engagementLabel = interpretEngagementScore(engagementScore);
  const flags = collectSessionFlags(allStepMetadata, stepNames);

  const backendPayload = {
    session: {
      session_id: sessionId,
      flow_type: flowType,
      started_at: allStepMetadata[0]?.screen_rendered_at || new Date().toISOString(),
      completed_at: new Date().toISOString(),
      total_duration_ms: totalDurationMs,
      total_steps: totalSteps,
      steps_completed: allStepMetadata.length,
      engagement_score: engagementScore,
      engagement_label: engagementLabel,
      flags,
      is_genuine: flags.length === 0,
    },
    steps: allStepMetadata.map((m, i) => ({
      step_number: m.step_number,
      screen_name: m.screen_name,
      screen_rendered_at: m.screen_rendered_at,
      first_interaction_time: m.first_interaction_time,
      response_submitted_at: m.response_submitted_at,
      response_time_ms: m.response_time_ms,
      hesitation_time_ms: m.hesitation_time_ms,
      option_change_count: m.option_change_count,
      rapid_tap_count: m.rapid_tap_count,
      idle_duration_ms: m.idle_duration_ms,
      completion_duration_ms: m.completion_duration_ms,
      interaction_depth_score: m.interaction_depth_score,
      has_text_input: m.has_text_input,
      text_length: m.text_length,
      total_taps: m.total_taps,
      response_data: responses[`step_${m.step_number}`] || responses[`step_${i}`] || null,
    })),
    responses,
    behavioral_signals: allStepMetadata
      .map((m) => {
        const signals = [];
        if (m.response_time_ms < 2000) signals.push({ type: 'rapid_response', value: m.response_time_ms, severity: 'high' });
        if (m.response_time_ms > 20000) signals.push({ type: 'distraction', value: m.response_time_ms, severity: 'medium' });
        if (m.hesitation_time_ms !== null && m.hesitation_time_ms > 5000) signals.push({ type: 'high_hesitation', value: m.hesitation_time_ms, severity: 'medium' });
        if (m.hesitation_time_ms !== null && m.hesitation_time_ms < 500) signals.push({ type: 'habitual_tap', value: m.hesitation_time_ms, severity: 'low' });
        if (m.option_change_count >= 5) signals.push({ type: 'indecisiveness', value: m.option_change_count, severity: 'medium' });
        if (m.rapid_tap_count > 0) signals.push({ type: 'rapid_tap', value: m.rapid_tap_count, severity: m.rapid_tap_count > 3 ? 'high' : 'low' });
        if (m.idle_duration_ms > 30000) signals.push({ type: 'afk_detected', value: m.idle_duration_ms, severity: 'medium' });
        return { step_number: m.step_number, screen_name: m.screen_name, signals };
      })
      .filter((s) => s.signals.length > 0),
  };

  return { engagementScore, totalDurationMs, flags, backendPayload };
}
