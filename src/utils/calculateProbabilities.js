// src/utils/calculateProbabilities.js

const calculateProbabilities = (games) => {
    let homeWinTotal = 0;
    let drawTotal = 0;
    let awayWinTotal = 0;
    let over25Total = 0;
    let bttsYesTotal = 0;
    let count = 0;
  
    games.forEach(game => {
      // Verificar e converter odds para probabilidades percentuais
      const homeOdds = parseFloat(game.Odd_H_Back || 0);
      const drawOdds = parseFloat(game.Odd_D_Back || 0);
      const awayOdds = parseFloat(game.Odd_A_Back || 0);
      const over25Odds = parseFloat(game.Odd_Over25_FT_Back || 0);
      const bttsYesOdds = parseFloat(game.Odd_BTTS_Yes_Back || 0);
      
      if (homeOdds > 0) homeWinTotal += (1 / homeOdds) * 100;
      if (drawOdds > 0) drawTotal += (1 / drawOdds) * 100;
      if (awayOdds > 0) awayWinTotal += (1 / awayOdds) * 100;
      if (over25Odds > 0) over25Total += (1 / over25Odds) * 100;
      if (bttsYesOdds > 0) bttsYesTotal += (1 / bttsYesOdds) * 100;
      
      count += 1;
    });
  
    return {
      homeWin: (homeWinTotal / count).toFixed(2),
      draw: (drawTotal / count).toFixed(2),
      awayWin: (awayWinTotal / count).toFixed(2),
      over25: (over25Total / count).toFixed(2),
      bttsYes: (bttsYesTotal / count).toFixed(2),
    };
  };
  
  export default calculateProbabilities;
  