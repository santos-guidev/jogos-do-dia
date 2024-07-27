// src/components/GameList.jsx
import React, { useState } from 'react';
import calculateProbabilities from '../utils/calculateProbabilities';
import '../styles/styles.css';

const GameList = ({ games, leagues }) => {
  const [selectedLeague, setSelectedLeague] = useState('Todos');

  const handleFilterChange = (e) => {
    setSelectedLeague(e.target.value);
  };

  const filteredGames = selectedLeague === 'Todos' ? games : games.filter(game => game.League === selectedLeague);

  const probabilities = calculateProbabilities(filteredGames);

  return (
    <div className="game-list-container">
      <div className="game-filter">
        <label>
          Selecione o Campeonato:
          <select onChange={handleFilterChange} value={selectedLeague}>
            <option value="Todos">Todos</option>
            {leagues.map((league, index) => (
              <option key={index} value={league}>{league}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="game-list">
        {filteredGames.map((game, index) => (
          <div key={index} className="game-item">
            <div className="game-details">
              <h3>{game.League} - {game.DateTime}</h3>
              <p>{game.Home} vs {game.Away}</p>
              <p><strong>Probabilidades de vitória:</strong></p>
              <p>Home: {probabilities.homeWin}%</p>
              <p>Draw: {probabilities.draw}%</p>
              <p>Away: {probabilities.awayWin}%</p>
              <p><strong>Over 2.5 FT:</strong> {probabilities.over25}%</p>
              <p><strong>BTTS Yes:</strong> {probabilities.bttsYes}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
