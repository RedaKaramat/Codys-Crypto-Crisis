import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import './../App.css';

const Difficulty = () => {
    const { setDifficulty } = useGame();
    const navigate = useNavigate();
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const [showGlossary, setShowGlossary] = useState(false);

    const handleSelect = (level) => {
        setDifficulty(level);
        navigate('/game');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-10">
            <div className="bg-zinc-900 border border-purple-500 rounded-lg p-10 w-full max-w-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Select Your Difficulty</h1>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-lg">
                    <button
                        onClick={() => handleSelect('Beginner')}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
                    >
                        Beginner
                    </button>
                    <button
                        onClick={() => handleSelect('Intermediate')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded transition"
                    >
                        Intermediate
                    </button>
                    <button
                        onClick={() => handleSelect('Expert')}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
                    >
                        Expert
                    </button>
                </div>

                <div className="flex justify-center items-center gap-4 mb-6 text-lg">
                    <button
                        onClick={() => setShowHowToPlay((prev) => !prev)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-1 rounded shadow"
                    >
                        📘 How to Play
                    </button>
                    <button
                        onClick={() => setShowGlossary((prev) => !prev)}
                        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-1 rounded shadow"
                    >
                        📚 Pattern Glossary
                    </button>
                </div>

                {showHowToPlay && (
                    <div className="mt-4 text-lg text-gray-300 leading-relaxed px-4 animate-fadeSlide">

                        <p>
                            To play, choose your difficulty. Your task is based on the 4-hour candles provided.
                            Look at the chart and predict whether it's appropriate to Long, Short, or No Trade
                            based on the TA pattern shown.
                        </p>
                    </div>
                )}

                {showGlossary && (
                    <div className="mt-6 text-lg text-gray-300 leading-relaxed text-center px-6 animate-fadeSlide">

                        <h3 className="text-white font-semibold mt-4">Beginner</h3>
                        <ul className="list-disc list-inside">
                            <li><strong>Double Bottom</strong> - Correct Move: Long</li>
                            <li><strong>Double Top</strong> - Correct Move: Short</li>
                            <li><strong>Hammer</strong> - Correct Move: Long</li>
                            <li><strong>Shooting Star</strong> - Correct Move: Short</li>
                        </ul>

                        <h3 className="text-white font-semibold mt-4">Intermediate</h3>
                        <ul className="list-disc list-inside">
                            <li><strong>Bull Flag</strong> - Correct Move: Long</li>
                            <li><strong>Tower Top</strong> - Correct Move: Short</li>
                            <li><strong>Tower Bottom</strong> - Correct Move: Long</li>
                            <li><strong>Rising Wedge</strong> - Correct Move: Short</li>
                            <li><strong>Falling Wedge</strong> - Correct Move: Long</li>
                            <li><strong>Bearish Flag</strong> - Correct Move: Short</li>
                        </ul>

                        <h3 className="text-white font-semibold mt-4">Expert</h3>
                        <ul className="list-disc list-inside">
                            <li><strong>Bull Pennant</strong> - Correct Move: Long</li>
                            <li><strong>Bearish Pennant</strong> - Correct Move: Short</li>
                            <li><strong>Ascending Triangle</strong> - Correct Move: Long</li>
                            <li><strong>Head and Shoulders</strong> - Correct Move: Short</li>
                            <li><strong>Doji</strong> - Correct Move: No Trade</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Difficulty;
