import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function Home() {
    const [nameInput, setNameInput] = useState('');
    const { setUsername } = useGame();
    const navigate = useNavigate();

    const handleStart = () => {
        if (nameInput.trim()) {
            setUsername(nameInput);
            navigate('/difficulty');
        }
    };

    return (
        <div className="page-content">
            <div className="card center">
                <h2>Enter your name</h2>
                <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                <button onClick={handleStart}>Start</button>
            </div>
        </div>
    );
}

export default Home;
