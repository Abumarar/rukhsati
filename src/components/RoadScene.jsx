import React, { useMemo } from 'react';

const RoadScene = ({ isRunning, sign, signType, showSign, signImage }) => {
  const animState = isRunning ? 'running' : 'paused';

  // Memoize random buildings so they don't re-render and change constantly
  const buildings = useMemo(() => {
    const heights = [30,50,70,40,65,35,80,45,55,30,60,70,40,50,80,35,45,65,30,50];
    const widths  = [30,25,35,28,22,32,26,38,24,30,28,35,22,25,30,28,32,24,36,28];
    const colors  = ['#1e3a5f','#2d1b4e','#1e293b'];
    let b = [];
    for (let i = 0; i < 50; i++) {
      b.push(
        <div 
          key={i} 
          className="building" 
          style={{ 
            width: widths[i%widths.length], 
            height: heights[i%heights.length], 
            background: colors[i%3] 
          }}
        />
      );
    }
    return b;
  }, []);

  const dashes = useMemo(() => {
    let d = [];
    for (let i = 0; i < 20; i++) d.push(<div key={i} className="road-dash" />);
    return d;
  }, []);

  return (
    <div className="road-scene">
      <div className="sky"></div>
      
      <div className="buildings" style={{ animationPlayState: animState }}>
        {buildings}
      </div>
      
      <div className="road">
        <div className="road-markings">
          <div className="road-dashes" style={{ animationPlayState: animState }}>
            {dashes}
          </div>
        </div>
        <div className="sidewalk"></div>
      </div>
      
      <div className="car-container">
        {/* Exhaust setup */}
        <div className="exhaust-smoke"></div>
        <div className="exhaust-smoke delay-1"></div>
        <div className="exhaust-smoke delay-2"></div>
        
        <svg viewBox="0 0 120 50" className="car-svg" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow */}
          <ellipse cx="60" cy="46" rx="45" ry="4" fill="rgba(0,0,0,0.5)" />
          
          {/* Headlight Beam (SVG gradient) */}
          <defs>
            <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,200,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,200,0)" />
            </linearGradient>
            <linearGradient id="carBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="windowTint" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path d="M-40,35 L12,25 L12,40 Z" fill="url(#beam)" opacity="0.6" />

          {/* Car Body Main */}
          <path d="M 20 22 C 25 10, 40 8, 60 8 C 80 8, 90 12, 100 22 L 115 25 C 118 26, 118 35, 115 40 L 15 40 C 12 40, 10 35, 12 25 Z" fill="url(#carBody)" stroke="#1d4ed8" strokeWidth="1.5" />
          
          {/* Windows */}
          <path d="M 35 22 L 45 12 L 60 12 L 60 22 Z" fill="url(#windowTint)" stroke="#334155" strokeWidth="1"/>
          <path d="M 64 12 L 80 12 L 95 22 L 64 22 Z" fill="url(#windowTint)" stroke="#334155" strokeWidth="1"/>
          
          {/* Door Lines */}
          <line x1="62" y1="22" x2="62" y2="40" stroke="#1d4ed8" strokeWidth="1" />
          <line x1="30" y1="22" x2="30" y2="40" stroke="#1d4ed8" strokeWidth="1" />
          
          {/* Headlights & Taillights */}
          <rect x="8" y="27" width="5" height="8" rx="2" fill="#ef4444" /> {/* Tail */}
          <rect x="113" y="28" width="6" height="6" rx="2" fill="#fef08a" /> {/* Head */}

          {/* Bumpers */}
          <rect x="110" y="36" width="8" height="4" rx="1" fill="#475569" />
          <rect x="9" y="36" width="6" height="4" rx="1" fill="#475569" />

          {/* Wheels */}
          <g className="wheel-spin" style={{ animationPlayState: animState }} transform="translate(35, 40)">
            <circle cx="0" cy="0" r="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <circle cx="0" cy="0" r="4" fill="#64748b" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
          <g className="wheel-spin" style={{ animationPlayState: animState }} transform="translate(90, 40)">
            <circle cx="0" cy="0" r="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <circle cx="0" cy="0" r="4" fill="#64748b" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      <div className={`sign-post ${showSign ? 'show' : ''}`}>
        <div className={`sign-board ${signType}`} style={signImage ? { padding: 0, overflow: 'hidden' } : {}}>
          {signImage ? (
            <img src={signImage} alt="Traffic Sign" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            sign
          )}
        </div>
        <div className="sign-pole"></div>
      </div>
    </div>
  );
};

export default RoadScene;
