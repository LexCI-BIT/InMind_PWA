/**
 * audioApi.js — Frontend helpers for the Audio Space feature.
 *
 * Wraps the /api/audio/* backend endpoints using the shared apiRequest() helper
 * so JWTs and token refresh are handled automatically.
 */
import { getAuthToken } from './api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function audioRequest(path, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const resp = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!resp.ok) {
    const msg = await resp.text().catch(() => resp.statusText);
    throw new Error(msg || `Request failed (${resp.status})`);
  }
  return resp.json();
}

/** List all published tracks. Optionally filter by category ('audiobook' | 'clip' | 'focus'). */
export function fetchTracks(category) {
  const qs = category ? `?category=${encodeURIComponent(category)}` : '';
  return audioRequest(`/api/audio/tracks${qs}`);
}

/** Get a single track by ID. */
export function fetchTrack(id) {
  return audioRequest(`/api/audio/tracks/${id}`);
}

/** Get the current user's playback progress for all tracks. */
export function getProgress() {
  return audioRequest('/api/audio/progress');
}

/** Save/update playback position for a track. */
export function saveProgress(trackId, positionSeconds, completed = false) {
  return audioRequest('/api/audio/progress', {
    method: 'POST',
    body: JSON.stringify({
      track_id: trackId,
      position_seconds: positionSeconds,
      completed,
    }),
  });
}
