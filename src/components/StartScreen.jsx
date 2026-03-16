import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen screen">
      <div className="stars"></div>
      <div className="start-logo">
        <img src="/logo.png" alt="رخصتي" className="logo-img" />
      </div>
      <div className="start-sub">اختبر معرفتك بإشارات وقوانين المرور</div>
      <div className="level-cards">
        <div className="level-card easy" onClick={() => onStart('easy')}>
          <div className="level-icon">🌱</div>
          <div className="level-name">سهل</div>
          <div className="level-count">٢٠ سؤالاً<br/>إشارات أساسية</div>
        </div>
        <div className="level-card medium" onClick={() => onStart('medium')}>
          <div className="level-icon">⚡</div>
          <div className="level-name">متوسط</div>
          <div className="level-count">٣٠ سؤالاً<br/>إشارات وتقاطعات</div>
        </div>
        <div className="level-card hard" onClick={() => onStart('hard')}>
          <div className="level-icon">🔥</div>
          <div className="level-name">صعب</div>
          <div className="level-count">٤٠ سؤالاً<br/>سيناريوهات معقدة</div>
        </div>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} <a href="https://github.com/Abumarar" target="_blank" rel="noopener noreferrer">Mohmmad Abumarar</a>
      </div>
    </div>
  );
};

export default StartScreen;
