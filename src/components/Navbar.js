import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, setDifficulty, portfolio } = useGame();
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const handleRestart = () => {
    setDifficulty('');
    navigate('/difficulty');
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  return (
    <nav className="navbar">
      <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/Lacrimosa.mp3`} loop autoPlay />
      <div className="navbar-left">
        <img src={`${process.env.PUBLIC_URL}/phantom_2.png`} alt="logo" className="logo" />
        <span className="title">Cody's Crypto Crisis</span>
      </div>

      <div className="navbar-right">
        {username && location.pathname === '/game' && (
          <>
            <button onClick={handleRestart}>🔁 Restart</button>
          </>
        )}
        <button onClick={() => setIsMuted(!isMuted)}>{isMuted ? '🔈' : '🔊'}</button>
      </div>
    </nav>
  );
}

export default Navbar;
