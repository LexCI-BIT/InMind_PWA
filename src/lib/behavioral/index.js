/**
 * ═══════════════════════════════════════════════════════════════════
 *  InMind — Behavioral Module Barrel Export
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Clean public API for the behavioral tracking system.
 *  Import from 'lib/behavioral' to access everything.
 *
 *  Usage:
 *    import { useInteractionTracker, logSessionSummary } from '@/lib/behavioral';
 * ═══════════════════════════════════════════════════════════════════
 */

// ─── React Hook ──────────────────────────────────────────────────────────────
export { useInteractionTracker } from './useInteractionTracker.js';

// ─── Session State Management ────────────────────────────────────────────────
export {
  createSessionState,
  addStepMetadata,
  updateResponse,
  updateCurrentStep,
  clearSessionState,
  loadSessionState,
  updateChallengeState,
  updateEngagementScore,
  setUnsavedResponse,
} from './sessionState.js';

// ─── Console Logging ─────────────────────────────────────────────────────────
export { logSessionSummary } from './logger.js';

// ─── Signal Analysis (for advanced usage) ────────────────────────────────────
export {
  analyzeResponseTime,
  analyzeHesitation,
  analyzeOptionChanges,
  analyzeDepthScore,
  analyzeIdleDuration,
  calculateDepthScore,
  calculateEngagementScore,
} from './signals.js';

// ─── Constants (for configuration) ───────────────────────────────────────────
export {
  RESPONSE_TIME,
  HESITATION_TIME,
  RAPID_TAP,
  OPTION_CHANGES,
  IDLE_DURATION,
  DEPTH_POINTS,
  ENGAGEMENT,
  FLOW_CONFIG,
} from './constants.js';
