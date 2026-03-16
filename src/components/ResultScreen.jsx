import React from 'react';

const ResultScreen = ({ stats, level, onRestart, onHome }) => {
  const { score, correctCount, wrongCount, currentIndex } = stats;
  // Calculate percentage based on answered questions
  const pct = Math.round((correctCount / Math.max(currentIndex, 1)) * 100);
  
  let trophy, title, message;
  if (pct >= 85) {
    trophy = '🏆'; title = 'ممتاز! أنت سائق محترف';
    message = 'نتيجة رائعة! معرفتك بقواعد المرور متميزة. استمر في الممارسة للحفاظ على هذا المستوى.';
  } else if (pct >= 60) {
    trophy = '🥈'; title = 'جيد! لكن هناك مجال للتحسين';
    message = 'أداء جيد، راجع الأسئلة التي أخطأت فيها وأعد المحاولة لتحسين نتيجتك.';
  } else {
    trophy = '📚'; title = 'تحتاج مزيداً من الدراسة';
    message = 'لا بأس، القيادة الآمنة تحتاج وقتاً للتعلم. راجع الكتاب وحاول مرة أخرى!';
  }

  return (
    <div className="result-screen screen">
      <div className="result-trophy">{trophy}</div>
      <div className="result-title">{title}</div>
      <div className="result-score-big">{score} نقطة</div>
      <div className="result-stats">
        <div className="stat-pill correct-stat">✅ إجابات صحيحة: {correctCount}</div>
        <div className="stat-pill wrong-stat">❌ إجابات خاطئة: {wrongCount}</div>
      </div>
      <div className="result-message">{message}</div>
      <div className="result-btns">
        <button className="btn-primary" onClick={onRestart}>🔄 إعادة المستوى</button>
        <button className="btn-ghost" onClick={onHome}>🏠 الرئيسية</button>
      </div>
    </div>
  );
};

export default ResultScreen;
