import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import './../App.css';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 border border-purple-500 rounded-lg p-10 w-full max-w-md shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-100">Enter your name</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-lg">
          <input
            type="text"
            className="p-3 rounded border border-purple-500 bg-black text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
