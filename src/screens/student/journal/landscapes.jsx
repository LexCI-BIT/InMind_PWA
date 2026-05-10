/**
 * Stylized landscape illustrations used as background headers for journal
 * entries. Pure SVG — no external assets, scales to any width.
 */

export function MorningLandscape({ className = '' }) {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="morningSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.7" cy="0.35" r="0.4">
          <stop offset="0%"  stopColor="#fef3c7" stopOpacity="1" />
          <stop offset="60%" stopColor="#fef3c7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="midMountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>
        <linearGradient id="grassFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      {/* sky */}
      <rect width="400" height="200" fill="url(#morningSky)" />
      <rect width="400" height="200" fill="url(#sunGlow)" />
      {/* sun */}
      <circle cx="280" cy="70" r="22" fill="#fde68a" />
      {/* far mountains */}
      <path d="M0 130 L 60 80 L 110 110 L 170 70 L 230 105 L 290 80 L 340 100 L 400 90 L 400 200 L 0 200 Z" fill="url(#midMountain)" opacity="0.85" />
      {/* mid mountains */}
      <path d="M0 150 L 50 120 L 110 145 L 170 115 L 230 140 L 290 120 L 340 140 L 400 125 L 400 200 L 0 200 Z" fill="#047857" />
      {/* lake */}
      <path d="M0 165 L 400 160 L 400 200 L 0 200 Z" fill="#0e7490" />
      <path d="M0 168 L 400 163 L 400 175 L 0 178 Z" fill="#155e75" opacity="0.5" />
      {/* foreground hill */}
      <path d="M0 175 Q 100 160 200 178 Q 300 186 400 168 L 400 200 L 0 200 Z" fill="url(#grassFar)" />
      {/* trees */}
      <Tree x="55"  y="170" h="22" />
      <Tree x="120" y="172" h="18" />
      <Tree x="280" y="170" h="20" />
      <Tree x="335" y="172" h="18" />
      {/* tiny train */}
      <rect x="170" y="172" width="22" height="8" rx="1.5" fill="#dc2626" />
      <rect x="192" y="172" width="6"  height="8" rx="1" fill="#7f1d1d" />
      <circle cx="174" cy="182" r="1.6" fill="#1f2937" />
      <circle cx="186" cy="182" r="1.6" fill="#1f2937" />
    </svg>
  );
}

export function EveningLandscape({ className = '' }) {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eveSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#fbbf24" />
          <stop offset="40%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="eveMountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#eveSky)" />
      {/* sun setting */}
      <circle cx="200" cy="120" r="36" fill="#fde68a" />
      <circle cx="200" cy="120" r="22" fill="#fef3c7" />
      {/* mountains */}
      <path d="M0 140 L 80 100 L 150 130 L 230 95 L 310 125 L 400 110 L 400 200 L 0 200 Z" fill="url(#eveMountain)" />
      {/* water reflection */}
      <path d="M0 155 L 400 150 L 400 200 L 0 200 Z" fill="#7c3aed" opacity="0.6" />
      <path d="M180 168 L 220 168 L 220 175 L 180 175 Z" fill="#fbbf24" opacity="0.5" />
      <Tree x="50"  y="170" h="22" color="#1e1b1b" />
      <Tree x="350" y="172" h="20" color="#1e1b1b" />
    </svg>
  );
}

export function ValleyLandscape({ className = '' }) {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="valleySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
        <linearGradient id="valleyHill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#valleySky)" />
      {/* far hills */}
      <path d="M0 110 Q 100 70 200 90 Q 300 110 400 80 L 400 200 L 0 200 Z" fill="#1e293b" />
      {/* mid hills */}
      <path d="M0 130 Q 80 100 160 130 Q 250 160 400 110 L 400 200 L 0 200 Z" fill="#166534" />
      {/* close hills */}
      <path d="M0 160 Q 100 140 200 165 Q 300 185 400 155 L 400 200 L 0 200 Z" fill="url(#valleyHill)" />
      {/* path */}
      <path d="M180 200 Q 200 175 250 165" fill="none" stroke="#b91c1c" strokeWidth="6" opacity="0.7" />
      {/* tiny figures */}
      <ellipse cx="120" cy="178" rx="8" ry="3" fill="#1f2937" />
      <ellipse cx="160" cy="180" rx="8" ry="3" fill="#1f2937" />
    </svg>
  );
}

function Tree({ x, y, h = 20, color = '#0f4c33' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-1.5" y="0" width="3" height={h * 0.4} fill="#3f2f1a" />
      <path d={`M-${h * 0.45} ${h * 0.25} L 0 -${h} L ${h * 0.45} ${h * 0.25} Z`} fill={color} />
    </g>
  );
}
