import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [screen, setScreen] = useState('start'); // 'start', 'game', 'result'
  const [level, setLevel] = useState('easy');
  const [stats, setStats] = useState(null);

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setScreen('game');
  };

  const finishGame = (gameStats) => {
    setStats(gameStats);
    setScreen('result');
  };

  const goHome = () => {
    setScreen('start');
  };

  return (
    <>
      {screen === 'start' && <StartScreen onStart={startGame} />}
      {screen === 'game' && <GameScreen level={level} onFinish={finishGame} />}
      {screen === 'result' && <ResultScreen stats={stats} level={level} onRestart={() => startGame(level)} onHome={goHome} />}
    </>
  );
}

export default App;
