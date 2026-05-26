/**
 * ═══════════════════════════════════════════════════════════════════
 *  InMind — Behavioral Signal Constants
 * ═══════════════════════════════════════════════════════════════════
 *
 *  All threshold values and configuration for behavioral detection.
 *  Adjust these values to fine-tune spam/fake detection sensitivity.
 *
 *  IMPORTANT: These are behavioral INDICATORS, not conclusions.
 *  They should be used for pattern detection, not judgment.
 * ═══════════════════════════════════════════════════════════════════
 */

// ─── Response Time Thresholds (milliseconds) ─────────────────────────────────
export const RESPONSE_TIME = {
  RUSHED_THRESHOLD: 2000,       // < 2s = likely rushed/spam
  HEALTHY_MIN: 2000,            // 2-8s = healthy interaction
  HEALTHY_MAX: 8000,
  SLOW_MAX: 20000,              // 8-20s = slow but acceptable
  DISTRACTED_THRESHOLD: 20000,  // > 20s = distraction/avoidance
};

// ─── Hesitation Time Thresholds (milliseconds) ───────────────────────────────
export const HESITATION_TIME = {
  HABITUAL_THRESHOLD: 500,      // < 0.5s = habitual tapping
  NORMAL_MIN: 500,              // 0.5-3s = normal
  NORMAL_MAX: 3000,
  MILD_UNCERTAINTY_MAX: 5000,   // 3-5s = mild uncertainty
  HIGH_UNCERTAINTY: 5000,       // > 5s = high uncertainty/conflict
};

// ─── Rapid Tap Detection ─────────────────────────────────────────────────────
export const RAPID_TAP = {
  GAP_THRESHOLD: 300,           // < 300ms between taps = rapid
  SPAM_COUNT_THRESHOLD: 3,      // >= 3 rapid taps = spam indicator
};

// ─── Option Change Detection ─────────────────────────────────────────────────
export const OPTION_CHANGES = {
  NORMAL_MAX: 2,                // 0-2 = normal exploration
  MILD_INDECISION_MAX: 4,      // 3-4 = mild indecision
  HIGH_INDECISION: 5,           // >= 5 = high indecisiveness
};

// ─── Idle Duration Thresholds (milliseconds) ─────────────────────────────────
export const IDLE_DURATION = {
  FOCUSED_MAX: 5000,            // < 5s = focused
  BRIEF_PAUSE_MAX: 15000,      // 5-15s = brief pause
  DISTRACTION_MAX: 30000,      // 15-30s = possible distraction
  AFK_THRESHOLD: 30000,        // > 30s = likely AFK
};

// ─── Interaction Depth Scoring ───────────────────────────────────────────────
export const DEPTH_POINTS = {
  SCREEN_OPENED: 1,             // Opened & interacted
  OPTION_SELECTED: 2,           // Selected an option
  ANSWER_CHANGED: 1,            // Changed answer thoughtfully
  TEXT_ENTERED: 3,              // Entered reflection text
  TIME_REFLECTING: 2,           // Spent >5s reflecting
  SUBSTANTIAL_TEXT: 1,          // Text length > 50 chars
  MAX_SCORE: 10,
};

export const DEPTH_THRESHOLDS = {
  PASSIVE_MAX: 3,               // 0-3 = passive usage
  FUNCTIONAL_MAX: 6,            // 4-6 = functional engagement
  REFLECTIVE_MIN: 7,            // 7-10 = reflective engagement
};

// ─── Session Engagement Score ────────────────────────────────────────────────
export const ENGAGEMENT = {
  LOW_MAX: 30,                  // 0-30 = low engagement
  MODERATE_MAX: 70,             // 31-70 = moderate engagement
  STRONG_MIN: 71,               // 71-100 = strong engagement
  DEPTH_WEIGHT: 40,             // 40% from avg depth
  COMPLETION_WEIGHT: 30,        // 30% from completion rate
  BASE_SCORE: 30,               // 30% base
  RUSH_PENALTY_PER_STEP: 30,    // Penalty scaled by % of rushed steps
  RAPID_TAP_PENALTY: 5,         // Per rapid tap
  RAPID_TAP_PENALTY_MAX: 20,    // Maximum rapid tap penalty
};

// ─── Flow Configuration ──────────────────────────────────────────────────────
export const FLOW_CONFIG = {
  STATIC_STEPS: 6,
  DYNAMIC_STEPS: 7,
  STATIC_STEP_NAMES: [
    'Context Warm-Up',
    'Energy Check-In',
    'Emotion Check',
    'Reason',
    'Body Map',
    'Sensation',
  ],
  DYNAMIC_STEP_NAMES: [
    'DailyContext',
    'Scenario',
    'MicroFeedback',
    'Reflection',
    'Insight',
    'Challenge',
    'Completion',
  ],
};

// ─── Session Storage Keys ────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  STATIC_SESSION: 'inmind_static_session',
  DYNAMIC_SESSION: 'inmind_dynamic_session',
};
