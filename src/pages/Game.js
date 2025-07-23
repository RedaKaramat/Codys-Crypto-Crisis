import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { charts as allCharts } from '../charts';
import './../App.css';

const Game = () => {
    const { username, difficulty, portfolio, setPortfolio } = useGame();
    const [chartIndex, setChartIndex] = useState(0);
    const [wager, setWager] = useState(1000);
    const [leverage, setLeverage] = useState(1);
    const [feedback, setFeedback] = useState(null);
    const [selectedCharts, setSelectedCharts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (difficulty) {
            const filtered = allCharts.filter((chart) => chart.difficulty === difficulty);
            setSelectedCharts(filtered);
            setChartIndex(0);
            setFeedback(null);
            setPortfolio(10000);
        }
    }, [difficulty, setPortfolio]);

    const goToNextChart = () => {
        if (chartIndex < selectedCharts.length - 1) {
            setChartIndex(chartIndex + 1);
        } else {
            navigate('/difficulty');
        }
    };

    const handleAnswer = (answer) => {
        const currentChart = selectedCharts[chartIndex];
        const correct = currentChart.correct.toLowerCase();
        const isCorrect = correct === answer.toLowerCase();

        if (answer === 'No-trade') {
            // Show correct answer without modifying portfolio
            setFeedback({
                type: 'info',
                message: `No trade made. Correct answer was: ${currentChart.correct}`
            });
            setTimeout(() => {
                setFeedback(null);
                goToNextChart();
            }, 3000);
            return;
        }

        if (isCorrect) {
            const profit = wager * leverage;
            setPortfolio((prev) => prev + profit);
            setFeedback({
                type: 'success',
                message: `Correct! You earned $${profit}`
            });
        } else {
            const loss = wager * leverage;
            setPortfolio((prev) => prev - loss);
            setFeedback({
                type: 'error',
                message: `Wrong! It was "${currentChart.correct}". You lost $${loss}. Pattern: ${currentChart.pattern}`
            });
        }

        // Go to next chart immediately
        setTimeout(() => {
            goToNextChart();
        }, 700);

        // Optional: Clear feedback after 3s
        setTimeout(() => {
            setFeedback(null);
        }, 3000);
    };

    if (!username || !difficulty) {
        navigate('/');
        return null;
    }

    const currentChart = selectedCharts[chartIndex];

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold">
                    Player: <span className="text-purple-400">{username}</span> | Portfolio: <span className="text-yellow-400">${portfolio}</span>
                </h2>
                <p className="text-md text-gray-400">Difficulty: {difficulty}</p>
            </div>

            <div className="flex justify-center mb-4">
                {currentChart && (
                    <img
                        src={`${process.env.PUBLIC_URL}/charts/${currentChart.file}`}
                        alt={currentChart.pattern}
                        className="border-2 border-purple-500 rounded w-[600px] h-[600px] object-contain"
                    />

                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <label className="text-white text-xl">Wager ($):</label>
                    <input
                        type="number"
                        value={wager}
                        onChange={(e) => setWager(Number(e.target.value))}
                        className="bg-black border border-purple-500 px-3 py-1 rounded text-white w-24"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-white text-xl">Leverage (x):</label>
                    <input
                        type="number"
                        value={leverage}
                        onChange={(e) => setLeverage(Number(e.target.value))}
                        className="bg-black border border-purple-500 px-3 py-1 rounded text-white w-24"
                    />
                </div>
            </div>

            <div className="flex justify-center gap-4 mb-6 text-lg">
                <button onClick={() => handleAnswer('Long')} className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded font-bold">Long</button>
                <button onClick={() => handleAnswer('Short')} className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded font-bold">Short</button>
                <button onClick={() => handleAnswer('No-trade')} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded font-bold">No Trade</button>
                <button onClick={() => setFeedback({ type: 'hint', message: `Hint: ${currentChart.pattern}` })} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded font-bold">Hint</button>
            </div>

            {feedback && (
                <div className={`text-center font-semibold text-lg ${feedback.type === 'success' ? 'text-green-400' : feedback.type === 'error' ? 'text-red-400' : 'text-purple-300'}`}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

export default Game;
