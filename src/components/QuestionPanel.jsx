import React, { useState, useEffect, useMemo } from 'react';

const QuestionPanel = ({ questionData, currentIndex, total, onNext, isAnswered, setIsAnswered, onScoreUpdate }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Memoize shuffled options so they don't reshuffle on re-render
  const shuffledOptions = useMemo(() => {
    const opts = questionData.options.map((text, i) => ({ text, isCorrect: i === questionData.correct }));
    // basic shuffle
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [questionData]);

  // Reset local state when a new question arrives
  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
    setIsAnswered(false);
  }, [questionData, setIsAnswered]);

  const handleOptionClick = (opt, index) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(index);

    const isCorrect = opt.isCorrect;
    onScoreUpdate(isCorrect);

    if (isCorrect) {
      setFeedback({
        type: 'correct',
        icon: '✅',
        text: `ممتاز! إجابة صحيحة. ${questionData.explanation}`
      });
    } else {
      setFeedback({
        type: 'wrong',
        icon: '❌',
        text: `إجابة خاطئة. ${questionData.explanation}`
      });
    }
  };

  const letters = ['أ', 'ب', 'ج', 'د'];

  return (
    <div className="question-panel">
      <div className="question-card">
        <div className="question-number">السؤال {currentIndex + 1} من {total}</div>
        <div className="question-sign-display">
          <div className="question-sign-emoji">
            {questionData.image ? (
              <img src={questionData.image} alt="traffic sign" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            ) : (
              questionData.sign
            )}
          </div>
          <div><div className="question-text">{questionData.question}</div></div>
        </div>
      </div>

      <div className="options-grid">
        {shuffledOptions.map((opt, i) => {
          let btnClass = 'option-btn';
          if (isAnswered) {
            if (opt.isCorrect) btnClass += ' correct';
            else if (selectedOption === i) btnClass += ' wrong';
          }

          return (
            <button
              key={i}
              className={btnClass}
              onClick={() => handleOptionClick(opt, i)}
              disabled={isAnswered}
            >
              <span className="opt-letter">{letters[i]}</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className={`feedback-box ${feedback.type === 'correct' ? 'correct-fb' : 'wrong-fb'}`}>
          <span className="feedback-icon">{feedback.icon}</span>
          <span>{feedback.text}</span>
        </div>
      )}

      {isAnswered && (
        <button className="next-btn" onClick={onNext}>
          السؤال التالي ←
        </button>
      )}
    </div>
  );
};

export default QuestionPanel;
