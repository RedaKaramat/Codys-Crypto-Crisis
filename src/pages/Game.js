import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { charts as allCharts } from '../charts';

function Game() {
    const { username, difficulty } = useGame();
    const [portfolio, setPortfolio] = useState(10000);
    const [wager, setWager] = useState(1000);
    const [leverage, setLeverage] = useState(1);
    const [result, setResult] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [shuffledCharts, setShuffledCharts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastIncorrectChart, setLastIncorrectChart] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();
    const MAX_LEVERAGE = 100;

    // Redirect to home if user info is missing
    useEffect(() => {
        if (!username || !difficulty) {
            navigate('/');
        }
    }, [username, difficulty, navigate]);

    // Load charts based on difficulty
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

    // Handle audio mute/unmute
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

    const chart = shuffledCharts[currentIndex];

    // Handle user choice: Long, Short, or No Trade
    const handleChoice = (choice) => {
        if (!chart) return;

        const validLeverage = Math.min(leverage, MAX_LEVERAGE);
        const validWager = Math.min(wager, portfolio);
        const value = validWager * validLeverage;
        let newPortfolio = portfolio;

        if (choice === chart.correct) {
            newPortfolio += value;
            setResult(`✅ Correct! +$${value}`);
            setLastIncorrectChart(null); // clear previous error
        } else if (choice === 'no-trade') {
            setResult('⏭️ Skipped.');
            setLastIncorrectChart(null);
        } else {
            newPortfolio -= value;
            setResult(`❌ Wrong! -$${value}`);
            setLastIncorrectChart(chart); // show feedback
        }

        setPortfolio(newPortfolio);
        setShowHint(false);
        setCurrentIndex((prev) => (prev + 1) % shuffledCharts.length);
    };

    return (
        <div className="game-container">


            <audio ref={audioRef} src={process.env.PUBLIC_URL + '/Lacrimosa.mp3'} loop autoPlay />
            <div className="player-info">
                <h2>{username} | Portfolio: ${portfolio}</h2>
            </div>
            <p>{result}</p>

            {/* Feedback box if user answered incorrectly */}
            {lastIncorrectChart && (
                <div className="feedback-box">
                    <img
                        src={`${process.env.PUBLIC_URL}/charts/${lastIncorrectChart.file}`}
                        alt="incorrect chart"
                        className="feedback-img"
                    />
                    <p><strong>{lastIncorrectChart.pattern}</strong> usually signals a <em>{lastIncorrectChart.correct}</em> setup.</p>
                </div>
            )}

            {/* Main chart area */}
            {chart && (
                <div className="chart-area">
                    <img
                        src={`${process.env.PUBLIC_URL}/charts/${chart.file}`}
                        alt={chart.pattern}
                        className="chart-image"
                        onError={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/charts/default.png`}
                    />
                    {showHint && <div className="hint">Hint: {chart.pattern}</div>}
                </div>
            )}

            {/* Controls: wager, leverage, buttons */}
            <div className="controls">
                <div className="inputs">
                    <label>Wager ($):</label>
                    <input type="number" value={wager} onChange={(e) => setWager(Number(e.target.value))} />
                    <label>Leverage (x):</label>
                    <input type="number" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} />
                </div>
                <div className="buttons">
                    <button className="long" onClick={() => handleChoice('Long')}>Long</button>
                    <button className="short" onClick={() => handleChoice('Short')}>Short</button>
                    <button className="no-trade" onClick={() => handleChoice('no-trade')}>No Trade</button>
                    <button className="hint-btn" onClick={() => setShowHint(!showHint)}>Hint</button>
                </div>
            </div>
        </div>
    );
}

export default Game;
