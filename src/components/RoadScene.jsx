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
        
        <img 
          src="/player-car.png" 
          className="car-svg" 
          alt="Player Car" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
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
