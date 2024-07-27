// src/App.jsx
import React, { useState } from 'react';
import GameList from './components/GameList';
import GameLoader from './components/GameLoader';
import './styles/styles.css'; // Ajuste o caminho se necessário

const App = () => {
  const [games, setGames] = useState([]);
  const [leagues, setLeagues] = useState([]);

  const handleDataLoaded = (data) => {
    setGames(data);
    setLeagues([...new Set(data.map(game => game.League))]);
  };

  return (
    <div className="app-container">
      <GameLoader onDataLoaded={handleDataLoaded} />
      <GameList games={games} leagues={leagues} />
    </div>
  );
};

export default App;
