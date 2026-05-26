/**
 * ═══════════════════════════════════════════════════════════════════
 *  InMind — Behavioral Signal Detection Engine
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Pure functions that interpret raw interaction metrics into
 *  behavioral signals. No side effects, no state — just analysis.
 *
 *  Each function returns: { label, icon, level }
 *    - level: 'ok' | 'warn' | 'danger'
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  RESPONSE_TIME,
  HESITATION_TIME,
  RAPID_TAP,
  OPTION_CHANGES,
  IDLE_DURATION,
  DEPTH_POINTS,
  DEPTH_THRESHOLDS,
  ENGAGEMENT,
} from './constants.js';

// ─── Response Time Analysis ──────────────────────────────────────────────────

export function analyzeResponseTime(ms) {
  if (ms < RESPONSE_TIME.RUSHED_THRESHOLD) {
    return { label: 'LIKELY RUSHED / SPAM', icon: '[!!]', level: 'danger' };
  }
  if (ms <= RESPONSE_TIME.HEALTHY_MAX) {
    return { label: 'HEALTHY INTERACTION', icon: '[OK]', level: 'ok' };
  }
  if (ms <= RESPONSE_TIME.SLOW_MAX) {
    return { label: 'SLOW BUT ACCEPTABLE', icon: '[--]', level: 'warn' };
  }
  return { label: 'DISTRACTION / AVOIDANCE', icon: '[!!]', level: 'danger' };
}

// ─── Hesitation Time Analysis ────────────────────────────────────────────────

export function analyzeHesitation(ms) {
  if (ms < HESITATION_TIME.HABITUAL_THRESHOLD) {
    return { label: 'HABITUAL TAPPING', icon: '[>>]', level: 'warn' };
  }
  if (ms <= HESITATION_TIME.NORMAL_MAX) {
    return { label: 'NORMAL', icon: '[OK]', level: 'ok' };
  }
  if (ms <= HESITATION_TIME.MILD_UNCERTAINTY_MAX) {
    return { label: 'MILD UNCERTAINTY', icon: '[--]', level: 'warn' };
  }
  return { label: 'HIGH UNCERTAINTY / CONFLICT', icon: '[!!]', level: 'danger' };
}

// ─── Option Change Analysis ──────────────────────────────────────────────────

export function analyzeOptionChanges(count) {
  if (count === 0) {
    return { label: 'DECISIVE (or disengaged)', icon: '[OK]', level: 'ok' };
  }
  if (count <= OPTION_CHANGES.NORMAL_MAX) {
    return { label: 'NORMAL EXPLORATION', icon: '[OK]', level: 'ok' };
  }
  if (count <= OPTION_CHANGES.MILD_INDECISION_MAX) {
    return { label: 'MILD INDECISION', icon: '[--]', level: 'warn' };
  }
  return { label: 'HIGH INDECISIVENESS / CONFLICT', icon: '[!!]', level: 'danger' };
}

// ─── Idle Duration Analysis ──────────────────────────────────────────────────

export function analyzeIdleDuration(ms) {
  if (ms < IDLE_DURATION.FOCUSED_MAX) {
    return { label: 'FOCUSED', icon: '[OK]', level: 'ok' };
  }
  if (ms <= IDLE_DURATION.BRIEF_PAUSE_MAX) {
    return { label: 'BRIEF PAUSE', icon: '[--]', level: 'ok' };
  }
  if (ms <= IDLE_DURATION.DISTRACTION_MAX) {
    return { label: 'POSSIBLE DISTRACTION', icon: '[!!]', level: 'warn' };
  }
  return { label: 'LIKELY DISTRACTED / AFK', icon: '[!!]', level: 'danger' };
}

// ─── Interaction Depth Score ─────────────────────────────────────────────────

export function analyzeDepthScore(score) {
  if (score <= DEPTH_THRESHOLDS.PASSIVE_MAX) {
    return { label: 'PASSIVE USAGE', icon: '[LO]', level: 'warn' };
  }
  if (score <= DEPTH_THRESHOLDS.FUNCTIONAL_MAX) {
    return { label: 'FUNCTIONAL ENGAGEMENT', icon: '[MD]', level: 'ok' };
  }
  return { label: 'REFLECTIVE ENGAGEMENT', icon: '[HI]', level: 'ok' };
}

// ─── Calculate Interaction Depth Score ────────────────────────────────────────

export function calculateDepthScore({ hasInteracted, optionChanges, hasTextInput, textLength, durationSec }) {
  let score = 0;
  if (hasInteracted) score += DEPTH_POINTS.SCREEN_OPENED;
  if (optionChanges >= 0 && hasInteracted) score += DEPTH_POINTS.OPTION_SELECTED;
  if (optionChanges >= 1) score += DEPTH_POINTS.ANSWER_CHANGED;
  if (hasTextInput && textLength > 0) score += DEPTH_POINTS.TEXT_ENTERED;
  if (durationSec > 5) score += DEPTH_POINTS.TIME_REFLECTING;
  if (textLength > 50) score += DEPTH_POINTS.SUBSTANTIAL_TEXT;
  return Math.min(score, DEPTH_POINTS.MAX_SCORE);
}

// ─── Calculate Session Engagement Score ──────────────────────────────────────

export function calculateEngagementScore(allStepMetadata, totalSteps) {
  if (allStepMetadata.length === 0) return 0;

  const avgDepth = allStepMetadata.reduce((sum, m) => sum + m.interaction_depth_score, 0) / allStepMetadata.length;
  const completionRate = allStepMetadata.length / totalSteps;
  const rushCount = allStepMetadata.filter(m => m.response_time_ms < RESPONSE_TIME.RUSHED_THRESHOLD).length;
  const rushPenalty = (rushCount / allStepMetadata.length) * ENGAGEMENT.RUSH_PENALTY_PER_STEP;
  const totalRapidTaps = allStepMetadata.reduce((sum, m) => sum + m.rapid_tap_count, 0);
  const rapidTapPenalty = Math.min(totalRapidTaps * ENGAGEMENT.RAPID_TAP_PENALTY, ENGAGEMENT.RAPID_TAP_PENALTY_MAX);

  const score = Math.max(0, Math.min(100, Math.round(
    (avgDepth / DEPTH_POINTS.MAX_SCORE) * ENGAGEMENT.DEPTH_WEIGHT +
    completionRate * ENGAGEMENT.COMPLETION_WEIGHT +
    ENGAGEMENT.BASE_SCORE -
    rushPenalty -
    rapidTapPenalty
  )));

  return score;
}

export function interpretEngagementScore(score) {
  if (score <= ENGAGEMENT.LOW_MAX) return 'LOW ENGAGEMENT';
  if (score <= ENGAGEMENT.MODERATE_MAX) return 'MODERATE ENGAGEMENT';
  return 'STRONG ENGAGEMENT';
}

// ─── Collect All Flags from Metadata ─────────────────────────────────────────

export function collectFlags(metadata) {
  const flags = [];

  const responseInterp = analyzeResponseTime(metadata.response_time_ms);
  if (responseInterp.level === 'danger') flags.push(`Response: ${responseInterp.label}`);

  if (metadata.hesitation_time_ms !== null) {
    const hesitationInterp = analyzeHesitation(metadata.hesitation_time_ms);
    if (hesitationInterp.level === 'danger') flags.push(`Hesitation: ${hesitationInterp.label}`);
  }

  const optionInterp = analyzeOptionChanges(metadata.option_change_count);
  if (optionInterp.level === 'danger') flags.push(`Options: ${optionInterp.label}`);

  if (metadata.rapid_tap_count > RAPID_TAP.SPAM_COUNT_THRESHOLD) {
    flags.push(`Rapid Taps: ${metadata.rapid_tap_count} detected`);
  }

  const idleInterp = analyzeIdleDuration(metadata.idle_duration_ms);
  if (idleInterp.level === 'danger') flags.push(`Idle: ${idleInterp.label}`);

  return flags;
}

// ─── Collect Session-Level Flags ─────────────────────────────────────────────

export function collectSessionFlags(allStepMetadata, stepNames) {
  const allFlags = [];
  allStepMetadata.forEach((m, i) => {
    const name = stepNames[i] || `Step ${i + 1}`;
    if (m.response_time_ms < RESPONSE_TIME.RUSHED_THRESHOLD) {
      allFlags.push(`Step ${i + 1} (${name}): Rushed`);
    }
    if (m.rapid_tap_count > RAPID_TAP.SPAM_COUNT_THRESHOLD) {
      allFlags.push(`Step ${i + 1} (${name}): ${m.rapid_tap_count} rapid taps`);
    }
    if (m.idle_duration_ms > IDLE_DURATION.AFK_THRESHOLD) {
      allFlags.push(`Step ${i + 1} (${name}): Distracted (${(m.idle_duration_ms / 1000).toFixed(0)}s idle)`);
    }
  });
  return allFlags;
}
