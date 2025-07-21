import React, { useState, useEffect, useRef } from 'react';
import { charts as allCharts } from './charts';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [portfolio, setPortfolio] = useState(10000);
  const [wager, setWager] = useState(1000);
  const [leverage, setLeverage] = useState(1);
  const [result, setResult] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffledCharts, setShuffledCharts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const [lastIncorrectChart, setLastIncorrectChart] = useState(null);
  const MAX_LEVERAGE = 100;

  useEffect(() => {
    if (difficulty) {
      let filtered = allCharts.filter(c => c.difficulty === 'Beginner');
      if (difficulty === 'Intermediate') {
        filtered = allCharts.filter(c => ['Beginner', 'Intermediate'].includes(c.difficulty));
      } else if (difficulty === 'Expert') {
        filtered = allCharts;
      }
      const shuffled = filtered.sort(() => Math.random() - 0.5);
      setShuffledCharts(shuffled);
      setCurrentIndex(0);
    }
  }, [difficulty]);

  const chart = shuffledCharts[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(() => { });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  const handleChoice = (choice) => {
  if (!chart) return;

  const validLeverage = Math.min(leverage, MAX_LEVERAGE);
  const validWager = Math.min(wager, portfolio);
  const value = validWager * validLeverage;
  let newPortfolio = portfolio;

  if (choice === chart.correct) {
    newPortfolio += value;
    setResult(`✅ Correct! +$${value}`);
    setLastIncorrectChart(null); // ← clear
  } else if (choice === 'no-trade') {
    setResult('⏭️ Skipped.');
    setLastIncorrectChart(null); // ← clear
  } else {
    newPortfolio -= value;
    setResult(`❌ Wrong! -$${value}`);
    setLastIncorrectChart(chart); // ← show explanation
  }

  setPortfolio(newPortfolio);
  setShowHint(false);
  setCurrentIndex((prev) => (prev + 1) % shuffledCharts.length);
};


  const resetGame = () => {
    setUsername('');
    setNameInput('');
    setDifficulty('');
    setPortfolio(10000);
    setWager(1000);
    setLeverage(1);
    setResult('');
    setShowHint(false);
    setCurrentIndex(0);
  };

  return (
    <div className="app">
      <audio ref={audioRef} src={process.env.PUBLIC_URL + '/Lacrimosa.mp3'} loop autoPlay />
      <nav className="navbar">
        <div className="navbar-left">
          <img src={`${process.env.PUBLIC_URL}/phantom_2.png`} alt="logo" className="logo" />
          <span className="title">Cody's Crypto Crisis</span>
        </div>
        <div className="navbar-right">
          <button onClick={() => setIsMuted(!isMuted)}>{isMuted ? '🔈' : '🔊'}</button>
          {username && <button onClick={resetGame}>🔁 Restart</button>}
        </div>
      </nav>

      {!username ? (
        <div className="card center">
          <h2>Enter your name</h2>
          <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
          <button onClick={() => setUsername(nameInput)}>Start</button>
        </div>
      ) : !difficulty ? (
        <div className="card center">
          <h2>Select difficulty</h2>
          <div className="difficulty-options">
            {['Beginner', 'Intermediate', 'Expert'].map((d) => (
              <button key={d} onClick={() => setDifficulty(d)}>{d}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-container">
          <div className="info">
            <h2>👤 {username} | 💰 ${portfolio}</h2>
            <p>{result}</p>
            {lastIncorrectChart && (
              <div className="feedback-box">
                <img
                  src={`${process.env.PUBLIC_URL}/charts/${lastIncorrectChart.file}`}
                  alt="incorrect chart"
                  className="feedback-img"
                />
                <p><strong>{lastIncorrectChart.pattern}</strong> usually signals a <em>{lastIncorrectChart.correct}</em> setup. Review the chart before trading!</p>
              </div>
            )}

          </div>

          {chart && (
            <div className="chart-area">
              <img
                src={`${process.env.PUBLIC_URL}/charts/${chart.file}`}
                alt={chart.pattern}
                className="chart-image"
              />
              {showHint && <div className="hint">💡 {chart.pattern}</div>}
            </div>
          )}

          <div className="controls">
            <div className="inputs">
              <label>Wager ($):</label>
              <input type="number" value={wager} onChange={(e) => setWager(Number(e.target.value))} />
              <label>Leverage (x):</label>
              <input type="number" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} />
            </div>
            <div className="buttons">
              <button className="long" onClick={() => handleChoice('Long')}>📈 Long</button>
              <button className="short" onClick={() => handleChoice('Short')}>📉 Short</button>
              <button className="no-trade" onClick={() => handleChoice('no-trade')}>🚫 No Trade</button>
              <button className="hint-btn" onClick={() => setShowHint(!showHint)}>💡 Hint</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
