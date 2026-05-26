/**
 * ═══════════════════════════════════════════════════════════════════
 *  InMind — Console Logger for Behavioral Signals
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Handles all console.log formatting for behavioral tracking.
 *  Provides rich, color-coded, grouped output in browser DevTools.
 *
 *  This is the ONLY module that calls console.log/group/groupEnd.
 *  All other modules stay pure.
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  analyzeResponseTime,
  analyzeHesitation,
  analyzeOptionChanges,
  analyzeDepthScore,
  analyzeIdleDuration,
  calculateEngagementScore,
  interpretEngagementScore,
  collectSessionFlags,
} from './signals.js';
import { FLOW_CONFIG } from './constants.js';

// ─── Console Styles ──────────────────────────────────────────────────────────

const S = {
  header:    'background:#1a1a2e;color:#e94560;font-size:14px;font-weight:bold;padding:4px 12px;border-radius:4px',
  subheader: 'background:#16213e;color:#a8dadc;font-size:12px;font-weight:bold;padding:2px 8px;border-radius:3px',
  ok:        'color:#22c55e;font-weight:bold',
  warn:      'color:#eab308;font-weight:bold',
  danger:    'color:#ef4444;font-weight:bold',
  info:      'color:#3b82f6',
  muted:     'color:#6b7280',
  bold:      'font-weight:bold;color:#e5e7eb',
  accent:    'color:#c084fc;font-weight:bold',
};

// ─── Screen-Level Logging ────────────────────────────────────────────────────

export function logScreenOpened(screenName, stepNumber, flowType) {
  console.log(
    `%c[SCREEN OPENED] ${screenName} (Step ${stepNumber}) [${flowType.toUpperCase()} FLOW]`,
    S.header
  );
}

export function logFirstInteraction(screenName, hesitationMs) {
  const interp = analyzeHesitation(hesitationMs);
  console.log(
    `%c${interp.icon} First Interaction on "${screenName}" -- Hesitation: ${(hesitationMs / 1000).toFixed(2)}s -> ${interp.label}`,
    S[interp.level]
  );
}

export function logOptionChange(screenName, fromValue, toValue, changeCount) {
  console.log(
    `%c[CHANGE] Option Changed on "${screenName}": ${fromValue ?? '(none)'} -> ${toValue} (change #${changeCount})`,
    S.info
  );
}

export function logRapidTap(screenName, gapMs, count) {
  console.log(
    `%c[RAPID TAP] DETECTED on "${screenName}" -- ${gapMs}ms gap (tap #${count})`,
    S.danger
  );
}

export function logTextInput(screenName, charCount) {
  console.log(
    `%c[TEXT] Input on "${screenName}" -- ${charCount} characters`,
    S.muted
  );
}

// ─── Step Response Logging ───────────────────────────────────────────────────

export function logStepResponse(metadata, responseData = {}) {
  const responseInterp = analyzeResponseTime(metadata.response_time_ms);
  const hesitationInterp = metadata.hesitation_time_ms !== null
    ? analyzeHesitation(metadata.hesitation_time_ms)
    : { label: 'NO INTERACTION', icon: '[X]', level: 'warn' };
  const optionInterp = analyzeOptionChanges(metadata.option_change_count);
  const depthInterp = analyzeDepthScore(metadata.interaction_depth_score);
  const idleInterp = analyzeIdleDuration(metadata.idle_duration_ms);

  console.groupCollapsed(
    `%c[STEP ${metadata.step_number} RESPONSE] ${metadata.screen_name} [${metadata.flow_type.toUpperCase()}]`,
    S.header
  );

  console.log(`%c  Response Time:     ${(metadata.response_time_ms / 1000).toFixed(2)}s  ->  ${responseInterp.icon} ${responseInterp.label}`, S[responseInterp.level]);
  console.log(`%c  Hesitation Time:   ${metadata.hesitation_time_ms !== null ? (metadata.hesitation_time_ms / 1000).toFixed(2) + 's' : 'N/A'}  ->  ${hesitationInterp.icon} ${hesitationInterp.label}`, S[hesitationInterp.level]);
  console.log(`%c  Option Changes:    ${metadata.option_change_count}  ->  ${optionInterp.icon} ${optionInterp.label}`, S[optionInterp.level]);
  console.log(`%c  Rapid Taps:        ${metadata.rapid_tap_count}${metadata.rapid_tap_count > 0 ? '  ->  [!!] SPAM INDICATOR' : ''}`, metadata.rapid_tap_count > 0 ? S.danger : S.ok);
  console.log(`%c  Max Idle:          ${(metadata.idle_duration_ms / 1000).toFixed(1)}s  ->  ${idleInterp.icon} ${idleInterp.label}`, S[idleInterp.level]);
  console.log(`%c  Depth Score:       ${metadata.interaction_depth_score}/10  ->  ${depthInterp.icon} ${depthInterp.label}`, S[depthInterp.level]);
  console.log(`%c  Screen Duration:   ${(metadata.completion_duration_ms / 1000).toFixed(2)}s`, S.info);
  console.log(`%c  Total Taps:        ${metadata.total_taps}`, S.muted);

  if (Object.keys(responseData).length > 0) {
    console.log('%c  Response Data:', S.bold, responseData);
  }

  // Flag summary
  const flags = [];
  if (responseInterp.level === 'danger') flags.push(`Response: ${responseInterp.label}`);
  if (hesitationInterp.level === 'danger') flags.push(`Hesitation: ${hesitationInterp.label}`);
  if (optionInterp.level === 'danger') flags.push(`Options: ${optionInterp.label}`);
  if (metadata.rapid_tap_count > 2) flags.push(`Rapid Taps: ${metadata.rapid_tap_count} detected`);
  if (idleInterp.level === 'danger') flags.push(`Idle: ${idleInterp.label}`);

  if (flags.length > 0) {
    console.log(`%c  [FLAGS] ${flags.join(' | ')}`, S.danger);
  } else {
    console.log('%c  [OK] No behavioral flags detected', S.ok);
  }

  console.groupEnd();
}

// ─── Full Session Summary Logging ────────────────────────────────────────────

export function logSessionSummary(flowType, sessionId, allStepMetadata) {
  const totalSteps = flowType === 'static' ? FLOW_CONFIG.STATIC_STEPS : FLOW_CONFIG.DYNAMIC_STEPS;
  const stepNames = flowType === 'static' ? FLOW_CONFIG.STATIC_STEP_NAMES : FLOW_CONFIG.DYNAMIC_STEP_NAMES;

  const totalDurationMs = allStepMetadata.reduce((sum, m) => sum + (m.completion_duration_ms || 0), 0);
  const totalDurationMin = Math.floor(totalDurationMs / 60000);
  const totalDurationSec = Math.round((totalDurationMs % 60000) / 1000);

  const engagementScore = calculateEngagementScore(allStepMetadata, totalSteps);
  const engagementLabel = interpretEngagementScore(engagementScore);

  const divider = '='.repeat(55);

  console.log(`\n%c${divider}`, S.header);
  console.log(`%c ${flowType.toUpperCase()} FLOW SESSION COMPLETE`, S.header);
  console.log(`%c${divider}`, S.header);
  console.log(`%cSession ID:        ${sessionId}`, S.bold);
  console.log(`%cTotal Duration:    ${totalDurationMin}m ${totalDurationSec}s`, S.bold);
  console.log(`%cSteps Completed:   ${allStepMetadata.length}/${totalSteps}`, S.bold);
  console.log(`%cEngagement Score:  ${engagementScore}/100  ->  ${engagementLabel}`, S.bold);
  console.log('');

  console.log('%cPer-Step Breakdown:', S.subheader);
  allStepMetadata.forEach((m, i) => {
    const name = stepNames[i] || `Step ${i + 1}`;
    const sec = (m.response_time_ms / 1000).toFixed(1);
    const interp = analyzeResponseTime(m.response_time_ms);
    const depthInterp = analyzeDepthScore(m.interaction_depth_score);
    const padName = name.padEnd(14);
    console.log(
      `%c  Step ${i + 1} (${padName}): ${sec.padStart(5)}s  ${interp.icon} ${interp.label.padEnd(22)} | Depth: ${m.interaction_depth_score}/10 ${depthInterp.icon}`,
      S[interp.level]
    );
  });

  // Overall flags
  const allFlags = collectSessionFlags(allStepMetadata, stepNames);

  console.log('');
  if (allFlags.length > 0) {
    console.log(`%c[FLAGS]:`, S.danger);
    allFlags.forEach(f => console.log(`%c  - ${f}`, S.warn));
  } else {
    console.log(`%c[OK] No behavioral flags -- session looks genuine`, S.ok);
  }

  // ═══════════════════════════════════════════════════════════════
  //  BACKEND PAYLOAD — This is what you send to the database
  // ═══════════════════════════════════════════════════════════════

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
      flags: allFlags,
      is_genuine: allFlags.length === 0,
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
    })),
    behavioral_signals: allStepMetadata.map((m, i) => {
      const signals = [];
      if (m.response_time_ms < 2000) signals.push({ type: 'rapid_response', value: m.response_time_ms, severity: 'high' });
      if (m.response_time_ms > 20000) signals.push({ type: 'distraction', value: m.response_time_ms, severity: 'medium' });
      if (m.hesitation_time_ms !== null && m.hesitation_time_ms > 5000) signals.push({ type: 'high_hesitation', value: m.hesitation_time_ms, severity: 'medium' });
      if (m.hesitation_time_ms !== null && m.hesitation_time_ms < 500) signals.push({ type: 'habitual_tap', value: m.hesitation_time_ms, severity: 'low' });
      if (m.option_change_count >= 5) signals.push({ type: 'indecisiveness', value: m.option_change_count, severity: 'medium' });
      if (m.rapid_tap_count > 0) signals.push({ type: 'rapid_tap', value: m.rapid_tap_count, severity: m.rapid_tap_count > 3 ? 'high' : 'low' });
      if (m.idle_duration_ms > 30000) signals.push({ type: 'afk_detected', value: m.idle_duration_ms, severity: 'medium' });
      return {
        step_number: m.step_number,
        screen_name: m.screen_name,
        signals,
      };
    }).filter(s => s.signals.length > 0),
  };

  console.log('');
  console.log(`%c${'─'.repeat(55)}`, S.accent);
  console.log('%c[BACKEND PAYLOAD] Ready to send to database:', S.accent);
  console.log(`%c${'─'.repeat(55)}`, S.accent);
  console.log('');

  // Expandable object view
  console.log('%cSession:', S.bold);
  console.table(backendPayload.session);

  console.log('%cStep Metadata (responses table):', S.bold);
  console.table(backendPayload.steps);

  if (backendPayload.behavioral_signals.length > 0) {
    console.log('%c[SIGNALS] Behavioral Signals (behavioural_signals table):', S.bold);
    backendPayload.behavioral_signals.forEach(s => {
      console.log(`%c  Step ${s.step_number} (${s.screen_name}):`, S.info);
      s.signals.forEach(sig => {
        const marker = sig.severity === 'high' ? '[HIGH]' : sig.severity === 'medium' ? '[MED]' : '[LOW]';
        console.log(`%c    ${marker} ${sig.type}: ${sig.value}${typeof sig.value === 'number' && sig.type !== 'indecisiveness' && sig.type !== 'rapid_tap' ? 'ms' : ''}`, S[sig.severity === 'high' ? 'danger' : sig.severity === 'medium' ? 'warn' : 'ok']);
      });
    });
  } else {
    console.log('%c[CLEAN] No behavioral signals detected -- clean session', S.ok);
  }

  console.log('');
  console.log('%cFull Payload (copy this JSON for backend):', S.accent);
  console.log(JSON.stringify(backendPayload, null, 2));

  console.log('');
  console.log('%cTo send to backend, use:', S.muted);
  console.log(`%c   fetch('/api/responses/session', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })`, S.info);

  console.log(`%c${divider}\n`, S.header);

  return { engagementScore, totalDurationMs, flags: allFlags, backendPayload };
}
