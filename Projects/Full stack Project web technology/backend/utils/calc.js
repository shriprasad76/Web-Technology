exports.calculateFinalScore = ({ attendance = 0, journal = 0, performance = 0, viva1 = 0, viva2 = 0, viva3 = 0 }) => {
  const practicalTotal = Number(attendance) + Number(journal) + Number(performance);
  const vivaTotal = Number(viva1) + Number(viva2) + Number(viva3);
  const rawTotal = practicalTotal + vivaTotal;
  const maxTotal = 12 * 15 + 50;
  const outOf50 = (rawTotal / maxTotal) * 50;
  return Number(outOf50.toFixed(2));
};

exports.calculateLabScore = ({ totalPractice = 0, viva1 = 0, viva2 = 0, viva3 = 0, practicalCount = 12 }) => {
  const practicalMax = practicalCount * 15;
  const rawTotal = Number(totalPractice) + Number(viva1) + Number(viva2) + Number(viva3);
  const maxTotal = practicalMax + 50;
  return Number(((rawTotal / maxTotal) * 50).toFixed(2));
};
