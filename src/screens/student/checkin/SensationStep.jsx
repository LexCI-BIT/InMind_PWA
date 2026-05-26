import React, { useState } from 'react';
import { BODY_AREAS, SENSATIONS } from './bodyData';

export function SensationStep({ area, currentSensation, onSave, onTrackTap, onTrackOptionChange, onTrackFirstInteraction }) {
  const [sensation, setSensation] = useState(currentSensation?.sensation || null);
  const [intensity, setIntensity] = useState(currentSensation?.intensity || 3);
  
  const areaData = BODY_AREAS.find(a => a.id === area);
  const areaLabel = areaData?.label || 'Area';

  const handleSensation = (id) => {
    if (onTrackTap) onTrackTap();
    if (sensation !== null && onTrackOptionChange) onTrackOptionChange(sensation, id);
    else if (onTrackFirstInteraction) onTrackFirstInteraction();
    setSensation(id);
  };

  const handleIntensity = (val) => {
    if (onTrackTap) onTrackTap();
    if (onTrackOptionChange) onTrackOptionChange(intensity, val);
    setIntensity(val);
  };

  return (
    <div className="flex-1 flex flex-col pt-2 overflow-y-auto no-scrollbar">

      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-white mb-1">
          Sensation at <span style={{color: areaData?.color || '#3b82f6'}}>{areaLabel}</span>
        </h1>
        <p className="text-[13px] text-white/60">What are you feeling?</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {SENSATIONS.map(s => {
          const isSelected = sensation === s.id;
          const isFillIcon = ['tight', 'heavy', 'warm', 'numb', 'relaxed'].includes(s.id);
          const isStrokeIcon = ['buzzy', 'nothing'].includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => handleSensation(s.id)}
              className="flex flex-col items-center justify-center p-4 rounded-[16px] transition-all"
              style={{ 
                background: '#111118',
                border: isSelected ? `2px solid ${s.color}` : '2px solid transparent',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" className="mb-2"
                fill={isFillIcon ? s.color : 'none'}
                stroke={isStrokeIcon ? s.color : 'none'}
                strokeWidth={isStrokeIcon ? '2.5' : '0'}
                strokeLinecap="round"
              >
                <path d={s.svgPath} />
              </svg>
              <span className="text-[12px] font-bold text-white">{s.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mb-8">
        <h2 className="text-[14px] font-bold text-white mb-6">How intense is it?</h2>
        <div className="flex justify-between px-2">
          {[1, 2, 3, 4, 5].map(val => (
            <button
              key={val}
              onClick={() => handleIntensity(val)}
              className={`w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center transition-all border-2 ${
                intensity === val 
                  ? 'border-transparent text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-[#1a1a1a] text-white/80 border-transparent hover:bg-white/20'
              }`}
              style={{
                 backgroundColor: intensity === val ? (areaData?.color || '#3b82f6') : '#111'
              }}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => onSave({ sensation, intensity })}
          disabled={!sensation}
          className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all text-white disabled:opacity-50"
          style={{ backgroundColor: areaData?.color || '#3b82f6' }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
