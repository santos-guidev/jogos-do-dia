// src/components/GameLoader.jsx
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import GameList from './GameList';
import '../styles/styles.css'; // Ajuste o caminho se necessário

const GameLoader = () => {
  const [games, setGames] = useState([]);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Carregar e processar o arquivo CSV
    Papa.parse('/data/Jogos_do_Dia_Betfair_Back_Lay.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        setGames(data);

        // Extrair ligas únicas
        const uniqueLeagues = [...new Set(data.map(game => game.League))];
        setLeagues(uniqueLeagues);
      },
      error: (error) => {
        console.error("Erro ao carregar o CSV:", error);
      }
    });
  }, []);

  return (
    <div className="game-loader">
      <h1>Jogos do Dia</h1>
      <GameList games={games} leagues={leagues} />
    </div>
  );
};

export default GameLoader;
