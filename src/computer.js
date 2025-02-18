export default function computerPlayer() {
  const existingCoord = Array.from({ length: 100 }, (_, i) => [
    Math.floor(i / 10),
    i % 10,
  ]);
  let shootableCoord = [...existingCoord];
  const shipsHit = [];
  let bestShots = [];

  function removeShotCoordinates(allCoordinates, shotCoordinates) {
    return allCoordinates.filter(
      ([row, col]) =>
        !shotCoordinates.some(
          ([shotRow, shotCol]) => shotRow === row && shotCol === col
        )
    );
  }

  function processHitCoordinates(shipsHit, shootableCoord) {
    if (shipsHit.length === 0) return []; // No hits to process

    // Get (but do not remove) the last hit coordinate
    const [hitRow, hitCol] = shipsHit[shipsHit.length - 1];

    const adjacentOffsets = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    return adjacentOffsets
      .map(([offsetRow, offsetCol]) => [hitRow + offsetRow, hitCol + offsetCol])
      .filter(([newRow, newCol]) =>
        shootableCoord.some(
          ([sRow, sCol]) => sRow === newRow && sCol === newCol
        )
      );
  }

  function shoot(enemyBoard) {
    if (shipsHit.length > 0) {
      bestShots = processHitCoordinates(shipsHit, shootableCoord);
    }

    let getCoord;
    if (bestShots.length > 0) {
      getCoord = bestShots.pop(); // Use the best shot
    } else {
      const randomIndex = Math.floor(Math.random() * shootableCoord.length);
      getCoord = shootableCoord[randomIndex];
    }

    if (!getCoord) return; // Ensure we have a valid coordinate

    const shipHit = enemyBoard.receiveAttack(getCoord);

    if (shipHit) {
      shipsHit.push(getCoord);
    }

    shootableCoord = removeShotCoordinates(shootableCoord, [getCoord]);
  }

  return { shoot };
}
