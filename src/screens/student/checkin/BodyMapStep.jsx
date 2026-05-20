import React from 'react';
import { BODY_AREAS } from './bodyData';

export function BodyMapStep({ onAreaSelect, stepColor }) {
  return (
    <div className="flex-1 flex flex-col pt-2 pb-4 overflow-y-auto no-scrollbar">
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold text-white mb-1">Where do you feel it in your body?</h1>
        <p className="text-[13px] text-white/50">Tap on the body area to select the sensation</p>
      </div>

      {/* Body map container */}
      <div className="relative flex-1 w-full flex items-center justify-center py-2">
        {/* Fixed aspect ratio wrapper so dots NEVER shift relative to image */}
        <div className="relative w-full max-w-[360px]" style={{ aspectRatio: '340/460' }}>
          
          {/* Human body outline image */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <img
              src="/illustrations/body_outline.png"
              alt=""
              className="w-full h-full object-cover pointer-events-none select-none"
              style={{ 
                opacity: 0.7,
                mixBlendMode: 'screen',
                filter: 'brightness(1.1)',
                transform: 'scale(1.15)', // Increase image size slightly
                transformOrigin: 'center center'
              }}
            />
          </div>

          {/* Glowing dots + labels positioned over the image */}
          {BODY_AREAS.map(area => {
            const isLeft = area.labelSide === 'left';
            return (
              <button
                key={area.id}
                onClick={() => onAreaSelect(area.id)}
                className="absolute group"
                style={{
                  top: area.top,
                  left: area.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                <div className="relative flex items-center">
                  {/* Left-side label */}
                  {isLeft && (
                    <div className="flex items-center mr-2">
                      <div className="text-right mr-2">
                        <span className="text-[11px] font-bold text-white block leading-tight tracking-wide">
                          {area.label}
                        </span>
                        <span className="text-[8px] text-white/40 leading-tight block mt-0.5 whitespace-nowrap">
                          {area.desc}
                        </span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: area.color, boxShadow: `0 0 4px ${area.color}` }} />
                      <div className="w-4 h-px flex-shrink-0" style={{ backgroundColor: `${area.color}50` }} />
                    </div>
                  )}

                  {/* Glowing dot */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute w-7 h-7 rounded-full animate-ping opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: area.color }} />
                    <div className="w-3.5 h-3.5 rounded-full z-10 relative transition-transform group-hover:scale-[1.8] group-active:scale-[2]"
                      style={{
                        backgroundColor: area.color,
                        boxShadow: `0 0 10px 3px ${area.color}90, 0 0 22px 5px ${area.color}30`,
                      }} />
                  </div>

                  {/* Right-side label */}
                  {!isLeft && (
                    <div className="flex items-center ml-2">
                      <div className="w-4 h-px flex-shrink-0" style={{ backgroundColor: `${area.color}50` }} />
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mx-1" style={{ backgroundColor: area.color, boxShadow: `0 0 4px ${area.color}` }} />
                      <div className="text-left ml-1">
                        <span className="text-[11px] font-bold text-white block leading-tight tracking-wide">
                          {area.label}
                        </span>
                        <span className="text-[8px] text-white/40 leading-tight block mt-0.5 whitespace-nowrap">
                          {area.desc}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom info card */}
      <div className="mt-2 flex items-center bg-white/5 rounded-2xl p-4 border border-white/5">
        <div className="w-[56px] h-[56px] mr-3 flex-shrink-0">
          <img src="/illustrations/tune_into_body.png" alt="Tune in" className="w-full h-full object-cover rounded-xl" />
        </div>
        <div>
          <h3 className="font-bold text-white text-[14px]">Tune into your body.</h3>
          <p className="text-[11px] text-white/50 leading-snug mt-1">Your body often knows what your mind tries to ignore</p>
        </div>
      </div>
    </div>
  );
}
