export default function computerPlayer() {
  const existingCoord = Array.from({ length: 100 }, (_, i) => [
    Math.floor(i / 10),
    i % 10,
  ]);
  let shootableCoord = [...existingCoord];
  const shipsHit = [];
  let bestShots = [];
  let lastHitCoord = null;

  function removeShotCoordinates(allCoordinates, shotCoordinates) {
    return allCoordinates.filter(
      ([row, col]) =>
        !shotCoordinates.some(
          ([shotRow, shotCol]) => shotRow === row && shotCol === col
        )
    );
  }

  function isValidCoordinate([row, col]) {
    return row >= 0 && row < 10 && col >= 0 && col < 10;
  }

  function getAdjacentCoordinates([row, col]) {
    const adjacentOffsets = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    return adjacentOffsets
      .map(([offsetRow, offsetCol]) => [row + offsetRow, col + offsetCol])
      .filter(
        (coord) =>
          isValidCoordinate(coord) &&
          shootableCoord.some(
            ([sRow, sCol]) => sRow === coord[0] && sCol === coord[1]
          )
      );
  }

  function processHitCoordinates(hitCoord) {
    // Clear previous best shots when we get a new hit
    bestShots = [];

    // Get adjacent coordinates for the hit
    const adjacentCoords = getAdjacentCoordinates(hitCoord);

    // Add all valid adjacent coordinates to bestShots
    bestShots.push(...adjacentCoords);
  }

  function shoot(enemyBoard) {
    let getCoord;

    if (bestShots.length > 0) {
      // Randomly select one of the best shots
      const randomIndex = Math.floor(Math.random() * bestShots.length);
      getCoord = bestShots[randomIndex];
      // Remove the selected coordinate from bestShots
      bestShots.splice(randomIndex, 1);
    } else {
      // No best shots available, choose a random coordinate
      const randomIndex = Math.floor(Math.random() * shootableCoord.length);
      getCoord = shootableCoord[randomIndex];
    }

    if (!getCoord) return; // Ensure we have a valid coordinate

    const shipHit = enemyBoard.receiveAttack(getCoord);

    // Remove the shot coordinate from shootable coordinates
    shootableCoord = removeShotCoordinates(shootableCoord, [getCoord]);

    if (shipHit) {
      // If we hit a ship, process adjacent coordinates
      processHitCoordinates(getCoord);
      lastHitCoord = getCoord;
    }
  }

  return { shoot };
}
