import React, { useState, useEffect, useMemo } from 'react';
import HUD from './HUD';
import RoadScene from './RoadScene';
import QuestionPanel from './QuestionPanel';
import { allQuestions } from '../data/questions';

const LEVEL_CONFIG = {
  easy:   { count: 20, label: '🌱 سهل',   color: '#22c55e', points: 10 },
  medium: { count: 30, label: '⚡ متوسط', color: '#f59e0b', points: 15 },
  hard:   { count: 40, label: '🔥 صعب',   color: '#ef4444', points: 20 }
};

const shuffle = (array) => {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const GameScreen = ({ level, onFinish }) => {
  const config = LEVEL_CONFIG[level];

  const questions = useMemo(() => {
    const pool = shuffle(allQuestions.filter(q => q.level === level));
    let qs = pool.slice(0, config.count);
    if (qs.length < config.count) {
      const others = shuffle(allQuestions.filter(q => q.level !== level));
      qs = [...qs, ...others].slice(0, config.count);
    }
    return qs;
  }, [level, config.count]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSign, setShowSign] = useState(false);

  useEffect(() => {
    // Trigger the sign pop-up animation when changing questions
    setShowSign(false);
    const timer = setTimeout(() => setShowSign(true), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleScoreUpdate = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + config.points);
      setCorrectCount(prev => prev + 1);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
      setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length || hearts <= 0) {
      // Small timeout to allow the final update to register before finishing
      setTimeout(() => {
        onFinish({
          score,
          correctCount,
          wrongCount,
          currentIndex: currentIndex + 1
        });
      }, 0);
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
    }
  };

  // If hearts dropped to 0 on the last answer, auto-finish when clicking next (handled above)
  useEffect(() => {
    if (hearts <= 0 && isAnswered) {
      // The user can still see the feedback and hit next to finish the game
    }
  }, [hearts, isAnswered]);

  const currentQ = questions[currentIndex];

  if (!currentQ) return <div className="game-screen screen">Loading...</div>;

  return (
    <div className="game-screen screen">
      <HUD 
        levelLabel={config.label}
        levelColor={config.color}
        currentIndex={currentIndex}
        total={config.count}
        score={score}
        hearts={hearts}
      />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <RoadScene 
          isRunning={!isAnswered}
          sign={currentQ.sign}
          signType={currentQ.signType}
          showSign={showSign}
          signImage={currentQ.image}
        />
        
        <QuestionPanel 
          questionData={currentQ}
          currentIndex={currentIndex}
          total={config.count}
          onNext={handleNext}
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          onScoreUpdate={handleScoreUpdate}
        />
      </div>
    </div>
  );
};

export default GameScreen;
