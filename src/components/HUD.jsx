import React from 'react';

const HUD = ({ levelLabel, levelColor, currentIndex, total, score, hearts }) => {
  const pct = total > 0 ? (currentIndex / total) * 100 : 0;

  return (
    <div className="hud">
      <div 
        className="hud-level" 
        style={{ color: levelColor, borderColor: `${levelColor}60` }}
      >
        {levelLabel}
      </div>
      
      <div className="hud-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }}></div>
        </div>
        <div className="progress-text">
          {currentIndex + 1} / {total}
        </div>
      </div>
      
      <div className="hud-score">⭐ <span>{score}</span></div>
      
      <div className="hud-hearts">
        {[0, 1, 2].map(i => (
          <span key={i}>{i < hearts ? '❤️' : '🖤'}</span>
        ))}
      </div>
    </div>
  );
};

export default HUD;
