/**
 * ═══════════════════════════════════════════════════════════════════
 *  InMind — Session State Manager
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Manages the full session state for both Static and Dynamic flows.
 *  Persists to sessionStorage for crash/refresh recovery.
 * ═══════════════════════════════════════════════════════════════════
 */

import { STORAGE_KEYS, FLOW_CONFIG } from './constants.js';

// ─── Generate session ID ─────────────────────────────────────────────────────

export function generateSessionId(flowType) {
  const rand = Math.random().toString(36).substring(2, 14);
  return `${flowType}_sess_${rand}_${Date.now()}`;
}

// ─── Storage helpers ─────────────────────────────────────────────────────────

function getStorageKey(flowType) {
  return flowType === 'static' ? STORAGE_KEYS.STATIC_SESSION : STORAGE_KEYS.DYNAMIC_SESSION;
}

export function saveSessionState(flowType, state) {
  try {
    sessionStorage.setItem(getStorageKey(flowType), JSON.stringify(state));
  } catch {
    // sessionStorage unavailable
  }
}

export function loadSessionState(flowType) {
  try {
    const raw = sessionStorage.getItem(getStorageKey(flowType));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSessionState(flowType) {
  try {
    sessionStorage.removeItem(getStorageKey(flowType));
  } catch {
    // ignore
  }
}

// ─── Session state factory ───────────────────────────────────────────────────

export function createSessionState(flowType) {
  const sessionId = generateSessionId(flowType);
  const totalSteps = flowType === 'static' ? FLOW_CONFIG.STATIC_STEPS : FLOW_CONFIG.DYNAMIC_STEPS;
  const state = {
    active_session_id: sessionId,
    flow_type: flowType,
    current_step: flowType === 'static' ? 1 : 0,
    current_screen_state: null,
    unsaved_response_state: null,
    flow_progress_state: {
      total_steps: totalSteps,
      completed_steps: [],
    },
    challenge_state: {
      accepted: false,
      reminder: false,
    },
    retry_state: null,
    offline_recovery_state: null,
    session_engagement_score: 0,
    all_step_metadata: [],
    responses: {},
    started_at: new Date().toISOString(),
  };

  saveSessionState(flowType, state);
  return state;
}

// ─── Update helpers ──────────────────────────────────────────────────────────

export function addStepMetadata(flowType, metadata) {
  const state = loadSessionState(flowType);
  if (!state) return null;
  state.all_step_metadata.push(metadata);
  state.flow_progress_state.completed_steps.push(metadata.step_number);
  saveSessionState(flowType, state);
  return state;
}

export function updateResponse(flowType, stepNumber, responseData) {
  const state = loadSessionState(flowType);
  if (!state) return null;
  state.responses[`step_${stepNumber}`] = responseData;
  state.unsaved_response_state = null;
  saveSessionState(flowType, state);
  return state;
}

export function updateCurrentStep(flowType, step) {
  const state = loadSessionState(flowType);
  if (!state) return null;
  state.current_step = step;
  saveSessionState(flowType, state);
  return state;
}

export function setUnsavedResponse(flowType, data) {
  const state = loadSessionState(flowType);
  if (!state) return null;
  state.unsaved_response_state = data;
  saveSessionState(flowType, state);
  return state;
}

export function updateChallengeState(flowType, challengeData) {
  const state = loadSessionState(flowType);
  if (!state) return null;
  state.challenge_state = { ...state.challenge_state, ...challengeData };
  saveSessionState(flowType, state);
  return state;
}

export function updateEngagementScore(flowType, score) {
  const state = loadSessionState(flowType);
  if (!state) return null;
  state.session_engagement_score = score;
  saveSessionState(flowType, state);
  return state;
}
