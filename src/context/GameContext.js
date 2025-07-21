import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [difficulty, setDifficulty] = useState('');

  return (
    <GameContext.Provider value={{ username, setUsername, difficulty, setDifficulty }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
