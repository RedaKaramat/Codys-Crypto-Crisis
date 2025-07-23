import React, { createContext, useContext, useState } from 'react';

// Create the GameContext
const GameContext = createContext();

// Provide global state values to the app
export const GameProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [portfolio, setPortfolio] = useState(10000); // Optional: shared game state

  return (
    <GameContext.Provider
      value={{
        username,
        setUsername,
        difficulty,
        setDifficulty,
        portfolio,
        setPortfolio
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook to use the context in any component
export const useGame = () => useContext(GameContext);
