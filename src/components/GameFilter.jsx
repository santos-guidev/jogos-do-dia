// src/components/GameFilter.jsx
import React from 'react';
import '../styles/styles.css'; // Ajuste o caminho se necessário

const GameFilter = ({ leagues, onFilterChange, filters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="game-filter">
      <label>
        League:
        <select name="league" value={filters.league} onChange={handleChange}>
          <option value="">All</option>
          {leagues.map((league, index) => (
            <option key={index} value={league}>{league}</option>
          ))}
        </select>
      </label>
      <label>
        Max Home Win Probability:
        <input
          type="number"
          name="maxHomeWinProbability"
          value={filters.maxHomeWinProbability}
          onChange={handleChange}
        />
      </label>
      <label>
        Max Draw Probability:
        <input
          type="number"
          name="maxDrawProbability"
          value={filters.maxDrawProbability}
          onChange={handleChange}
        />
      </label>
      <label>
        Max Away Win Probability:
        <input
          type="number"
          name="maxAwayWinProbability"
          value={filters.maxAwayWinProbability}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default GameFilter;
