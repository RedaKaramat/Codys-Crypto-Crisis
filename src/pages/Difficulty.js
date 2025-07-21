import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { div } from 'framer-motion/client';

function Difficulty() {
    const { setDifficulty } = useGame();
    const navigate = useNavigate();

    const selectDifficulty = (level) => {
        setDifficulty(level);
        navigate('/game');
    };

    return (
        <div className="page-content">
            <div className="card center">
                <h2>Select difficulty</h2>
                <div className="difficulty-options">
                    {['Beginner', 'Intermediate', 'Expert'].map((d) => (
                        <button key={d} onClick={() => selectDifficulty(d)}>{d}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Difficulty;
