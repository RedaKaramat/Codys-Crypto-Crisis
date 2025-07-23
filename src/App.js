import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Difficulty from './pages/Difficulty';
import Game from './pages/Game';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';
import './App.css';
// Entry point for your app with context and routing
function App() {
  return (
    <GameProvider>
      <Router>
        {/* Global navbar with sound control */}
        <Navbar />
        
        {/* Page routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/difficulty" element={<Difficulty />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
