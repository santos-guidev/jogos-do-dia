// src/services/fetchGames.js
import Papa from 'papaparse';

const oddsToProb = (odds) => (odds > 0 ? 1 / odds : 0);

const normalizeProbs = (probH, probD, probA) => {
  const total = probH + probD + probA;
  return total > 0 ? [probH / total * 100, probD / total * 100, probA / total * 100] : [0, 0, 0];
};

const fetchGames = async () => {
  try {
    const response = await fetch('/data/Jogos_do_Dia_Betfair_Back_Lay.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);
    const parsedData = Papa.parse(csv, { header: true });

    const rows = parsedData.data;

    const games = rows.map((row) => {
      const league = row['League'] || 'Unknown League';
      const date = row['Date'] || 'Unknown Date';
      const time = row['Time'] || 'Unknown Time';
      const homeTeam = row['Home'] || 'Unknown Home Team';
      const awayTeam = row['Away'] || 'Unknown Away Team';

      const homeOdd = parseFloat(row['Odd_H_Back']) || 0;
      const drawOdd = parseFloat(row['Odd_D_Back']) || 0;
      const awayOdd = parseFloat(row['Odd_A_Back']) || 0;
      const over25Odd = parseFloat(row['Odd_Over25_FT_Back']) || 0;
      const bttsOdd = parseFloat(row['Odd_BTTS_Yes_Back']) || 0;

      // Log para verificar os valores lidos
      console.log(`League: ${league}, Date: ${date}, Time: ${time}`);
      console.log(`Home: ${homeTeam}, Away: ${awayTeam}`);
      console.log(`Odds: H=${homeOdd}, D=${drawOdd}, A=${awayOdd}, Over2.5=${over25Odd}, BTTS=${bttsOdd}`);

      const [probHBack, probDBack, probABack] = normalizeProbs(
        oddsToProb(homeOdd),
        oddsToProb(drawOdd),
        oddsToProb(awayOdd)
      );

      return {
        league,
        date,
        time,
        home: homeTeam,
        away: awayTeam,
        probHBack,
        probDBack,
        probABack,
        probOver25FTBack: oddsToProb(over25Odd) * 100,
        probBTTSYesBack: oddsToProb(bttsOdd) * 100,
      };
    });

    console.log('Processed games data:', games);
    return games;
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    throw new Error('Erro ao buscar os jogos');
  }
};

export default fetchGames;
