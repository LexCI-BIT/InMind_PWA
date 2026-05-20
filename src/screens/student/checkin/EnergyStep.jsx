import React from 'react';

export function EnergyStep({ energy, setEnergy }) {
  const getEnergyData = (val) => {
    if (val <= 25) return { label: 'Low Activation', color: '#ef4444' };
    if (val <= 50) return { label: 'Calm/Neutral', color: '#eab308' };
    if (val <= 75) return { label: 'Moderate-Active', color: '#22c55e' };
    return { label: 'High Energy', color: '#d946ef' };
  };

  const data = getEnergyData(energy);

  return (
    <div className="flex-1 flex flex-col pt-2 overflow-y-auto no-scrollbar">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-white mb-1">How is your energy right now?</h1>
        <p className="text-[13px] text-white/60">Drag the slider to show how you feel</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Battery Graphic */}
        <div className="relative w-32 h-48 rounded-2xl mb-6 flex flex-col items-center justify-end" style={{
            background: 'linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(40,40,40,1) 100%)',
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.5)',
            border: '2px solid rgba(255,255,255,0.1)'
        }}>
          {/* Battery Top Bump */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3 bg-gradient-to-b from-gray-500 to-gray-700 rounded-t-md" />
          
          {/* Fill level */}
          <div className="w-full p-1 h-full flex flex-col justify-end overflow-hidden rounded-xl">
             <div 
               className="w-full transition-all duration-300 rounded-lg relative overflow-hidden" 
               style={{ 
                 height: `${Math.max(10, energy)}%`, 
                 background: `linear-gradient(180deg, ${data.color} 0%, ${data.color}90 100%)`, 
                 boxShadow: `0 -5px 20px ${data.color}60` 
               }}
             >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
             </div>
          </div>

          {/* Lightning Bolt */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#facc15" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-[28px] font-extrabold tracking-wide mb-1" style={{color: data.color}}>{energy}%</h2>
          <p className="text-[15px] font-bold text-white">{data.label}</p>
        </div>

        <div className="w-full max-w-xs px-2 mb-8">
          <div className="relative h-2 bg-white/20 rounded-full">
            <div className="absolute top-0 left-0 h-full rounded-full pointer-events-none" style={{
                width: `${energy}%`,
                backgroundColor: data.color,
                boxShadow: `0 0 10px ${data.color}`
            }} />
            <input 
              type="range" 
              min="0" max="100" 
              value={energy} 
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-6 appearance-none cursor-pointer outline-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
            />
          </div>
          <div className="flex justify-between mt-3 text-[11px] font-bold text-white/50">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        {/* Scale Legend */}
        <div className="flex justify-between w-full max-w-sm px-2 text-center text-[10px] font-bold">
          <div className="flex flex-col items-center gap-1 w-1/4">
            <span className="text-[#ef4444]">0-25</span>
            <span className="text-white/80 whitespace-nowrap">Low<br/>Activation</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-1/4">
            <span className="text-[#eab308]">26-50</span>
            <span className="text-white/80 whitespace-nowrap">Calm/<br/>Neutral</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-1/4">
            <span className="text-[#22c55e]">51-75</span>
            <span className="text-white/80 whitespace-nowrap">Active</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-1/4">
            <span className="text-[#d946ef]">76-100</span>
            <span className="text-white/80 whitespace-nowrap">High<br/>Energy</span>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-4 flex items-start text-white/50">
        <span className="text-[#22c55e] mr-2 text-xl leading-none">★</span>
        <div className="text-sm">
          <p className="font-bold text-white/80">Energy is not mood.</p>
          <p className="text-[12px] mt-0.5">It shows your mental and physical activation level</p>
        </div>
      </div>
    </div>
  );
}
