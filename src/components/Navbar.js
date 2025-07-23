import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import music from '../assets/Lacrimosa.mp3';
import './../App.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const musicInstance = new Howl({
      src: [music],
      autoplay: true,
      loop: true,
      volume: 0.5
    });

    setSound(musicInstance);
    musicInstance.play();

    return () => {
      musicInstance.stop();
    };
  }, []);

  const toggleMusic = () => {
    if (!sound) return;

    if (isMuted) {
      sound.mute(false);
    } else {
      sound.mute(true);
    }
    setIsMuted(!isMuted);
  };

  return (
    <nav className="bg-black text-white border-b-2 border-purple-700 py-4 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-lg sm:text-xl">
      {/* Left: logo + title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={`${process.env.PUBLIC_URL}/phantom_2.png`}
          alt="Logo"
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
        />
        <h1 className="font-bold text-2xl sm:text-3xl text-white text-center sm:text-left">
          Cody's Crypto Crisis
        </h1>
      </div>

      {/* Right: Restart + Sound */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <button
          onClick={() => navigate('/difficulty')}
          className="text-blue-400 hover:text-blue-600 font-semibold flex items-center gap-1 text-lg sm:text-xl"
        >
          🔁 Restart
        </button>
        <button
          onClick={toggleMusic}
          className="text-blue-400 hover:text-blue-600 text-2xl sm:text-3xl"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
