import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Home = () => {
  const { setUsername } = useGame();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      setUsername(name);
      navigate('/difficulty');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-10">
      <div className="bg-zinc-900 border border-purple-500 rounded-lg p-6 sm:p-10 w-full max-w-md sm:max-w-xl shadow-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-100">Enter your name</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-base sm:text-lg">
          <input
            type="text"
            className="p-3 rounded border border-purple-500 bg-black text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 sm:py-3 rounded transition"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
