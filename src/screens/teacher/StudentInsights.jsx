import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStudentsRoster, getStudentInsights } from '../../lib/api';

/**
 * StudentInsights — teacher dashboard built from the static-flow scoring engine.
 *
 * Pick a student → see their wellbeing metrics under caution bands
 * (not raw answers): Daily Readiness, Understanding Emotions, Mind-Body
 * Awareness, Emotional Intensity, Response Confidence, Participation, plus
 * traits, system signals, and session flags.
 */

const CAUTION = {
  attention: { color: '#ef4444', bg: '#fee2e2', label: 'Needs attention' },
  monitor: { color: '#f59e0b', bg: '#fef3c7', label: 'Monitor' },
  healthy: { color: '#10b981', bg: '#d1fae5', label: 'Healthy' },
  info: { color: '#6b7280', bg: '#f3f4f6', label: 'Info' },
};

function fmtDate(iso) {
  if (!iso) return 'No check-in yet';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

function MetricCard({ m }) {
  const c = CAUTION[m.caution] || CAUTION.info;
  const numeric = typeof m.value === 'number';
  return (
    <div className="rounded-[18px] bg-white border border-gray-100 shadow-sm p-4 flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-bold text-gray-500 leading-tight">{m.label}</p>
        <span className="size-2.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: c.color }} />
      </div>
      <p className="mt-2 text-[24px] font-extrabold text-gray-900 leading-none">
        {numeric ? m.value : m.value}
        {numeric && <span className="text-[13px] font-bold text-gray-300"> /100</span>}
      </p>
      {m.band && <p className="mt-1 text-[10.5px] font-semibold text-gray-400">{m.band}</p>}
      <span className="mt-2 inline-block self-start rounded-full px-2 py-[2px] text-[9px] font-extrabold uppercase tracking-wide"
        style={{ backgroundColor: c.bg, color: c.color }}>
        {c.label}
      </span>
    </div>
  );
}

function TraitBar({ name, value }) {
  const color = value >= 70 ? '#10b981' : value >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600">
        <span>{name}</span><span>{value}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function StudentInsights() {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);
  const [loadingRoster, setLoadingRoster] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudentsRoster()
      .then((r) => setRoster(Array.isArray(r) ? r : []))
      .catch((e) => setError(e.message || 'Could not load students.'))
      .finally(() => setLoadingRoster(false));
  }, []);

  function pick(student) {
    setSelected(student);
    setData(null);
    setLoadingData(true);
    getStudentInsights(student.id)
      .then(setData)
      .catch((e) => setError(e.message || 'Could not load insights.'))
      .finally(() => setLoadingData(false));
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f7f7f8] font-sans pb-12">
      {/* Header */}
      <div className="px-6 pt-safe pt-8 flex items-center gap-3">
        <button onClick={() => navigate('/teacher/home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition" aria-label="Back">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div>
          <h1 className="text-[18px] font-extrabold text-gray-900 leading-tight">Wellbeing Insights</h1>
          <p className="text-[11px] text-gray-400 font-medium">Daily check-in signals</p>
        </div>
      </div>

      {/* Roster */}
      <div className="px-6 mt-5">
        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-2">Students</p>
        {loadingRoster ? (
          <div className="flex items-center gap-2 py-3 text-gray-400 text-[12px]"><div className="size-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700" /> Loading…</div>
        ) : roster.length === 0 ? (
          <p className="text-[12px] text-gray-400 py-2">No students found.</p>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {roster.map((s) => {
              const active = selected?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => pick(s)}
                  className={`shrink-0 rounded-2xl border px-3.5 py-2.5 text-left transition ${active ? 'border-[#7c3aed] bg-purple-50' : 'border-gray-100 bg-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`size-1.5 rounded-full ${s.checked_in_today ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <span className="text-[12.5px] font-bold text-gray-900 capitalize whitespace-nowrap">{s.name}</span>
                  </div>
                  <p className="text-[9.5px] text-gray-400 mt-0.5 whitespace-nowrap">{s.checked_in_today ? 'Checked in today' : fmtDate(s.last_checkin)}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="px-6 mt-3 text-[12px] font-semibold text-red-500">{error}</p>}

      {/* Body */}
      <div className="px-6 mt-5 flex-1">
        {!selected && !loadingData && (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-gray-100 text-gray-400">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></svg>
            </div>
            <p className="text-[13px] font-bold text-gray-700">Select a student</p>
            <p className="text-[12px] text-gray-400">Their daily check-in metrics will appear here.</p>
          </div>
        )}

        {loadingData && (
          <div className="flex flex-col items-center gap-3 py-20">
            <div className="size-9 animate-spin rounded-full border-[3px] border-gray-200 border-t-[#7c3aed]" />
            <p className="text-[12px] text-gray-400">Computing insights…</p>
          </div>
        )}

        {selected && !loadingData && data && !data.has_data && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-[14px] font-bold text-gray-800">No check-ins from {selected.name} yet</p>
            <p className="text-[12px] text-gray-400">Metrics appear after their first daily static flow.</p>
          </div>
        )}

        {selected && !loadingData && data && data.has_data && (
          <div className="flex flex-col gap-6">
            {/* Session banner */}
            <div className="rounded-[18px] bg-white border border-gray-100 shadow-sm p-4 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold text-gray-900 capitalize">{selected.name}</p>
                <p className="text-[10.5px] text-gray-400">Last check-in · {fmtDate(data.session?.started_at)}</p>
              </div>
              {data.session?.is_genuine === false ? (
                <span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide">Review flags</span>
              ) : (
                <span className="rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide">Genuine</span>
              )}
            </div>

            {/* Metrics */}
            <div>
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Dashboard Metrics</p>
              <div className="grid grid-cols-2 gap-3">
                {(data.metrics || []).map((m) => <MetricCard key={m.label} m={m} />)}
              </div>
            </div>

            {/* Traits */}
            <div>
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Traits</p>
              <div className="rounded-[18px] bg-white border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                {Object.entries(data.traits || {}).map(([name, value]) => (
                  <TraitBar key={name} name={name} value={value} />
                ))}
              </div>
            </div>

            {/* System signals */}
            {(data.interaction_signals || []).length > 0 && (
              <div>
                <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">System Signals</p>
                <div className="flex flex-col gap-2">
                  {data.interaction_signals.map((sig, i) => (
                    <div key={i} className="rounded-[14px] bg-white border border-amber-100 shadow-sm p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[12.5px] font-bold text-gray-900">{sig.signal}</span>
                        <span className="text-[9px] font-extrabold uppercase tracking-wide text-amber-600 bg-amber-50 rounded-full px-2 py-[2px]">{sig.trait}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">{sig.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Flags */}
            {(data.session?.flags || []).length > 0 && (
              <div>
                <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Session Flags</p>
                <div className="rounded-[14px] bg-rose-50 border border-rose-100 p-3 flex flex-col gap-1.5">
                  {data.session.flags.map((f, i) => (
                    <p key={i} className="text-[11px] font-semibold text-rose-600">• {f}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Readiness trend */}
            {(data.trend || []).length > 1 && (
              <div>
                <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Readiness Trend</p>
                <div className="rounded-[18px] bg-white border border-gray-100 shadow-sm p-4 flex items-end gap-1.5 h-28">
                  {data.trend.map((t, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                      <div className="w-full rounded-t-md bg-[#7c3aed]" style={{ height: `${Math.max(4, t.readiness)}%` }} title={`${t.date}: ${t.readiness}`} />
                      <span className="text-[8px] text-gray-400">{(t.date || '').slice(5)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  );
}
