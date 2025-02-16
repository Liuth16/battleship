import ship from "./ship";

export default function gameboard() {
  const coordinates = Array.from({ length: 100 }, (_, i) => [
    Math.floor(i / 10),
    i % 10,
  ]);

  const addedShips = [];
  const blockedTiles = [];
  const shotCoordinates = [];

  function isValidCoordinate(coord) {
    return coordinates.some((c) => c[0] === coord[0] && c[1] === coord[1]);
  }

  function isBlocked(coord) {
    return blockedTiles.some((b) => b[0] === coord[0] && b[1] === coord[1]);
  }

  function isOccupied(coord) {
    return addedShips.some(({ coordinates }) =>
      coordinates.some(
        (sCoord) => sCoord[0] === coord[0] && sCoord[1] === coord[1]
      )
    );
  }

  function getAdjacentTiles(coord) {
    const [x, y] = coord;
    return [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ].filter(isValidCoordinate);
  }

  function addShip(size, coordinate, isHorizontal) {
    if (!isValidCoordinate(coordinate)) {
      throw new Error("Invalid starting coordinate.");
    }
    const newShip = [];
    for (let i = 0; i < size; i++) {
      const shipCoord =
        isHorizontal === false
          ? [coordinate[0] + i, coordinate[1]]
          : [coordinate[0], coordinate[1] + i];

      if (
        !isValidCoordinate(shipCoord) ||
        isBlocked(shipCoord) ||
        isOccupied(shipCoord)
      ) {
        return false;
      }
      newShip.push(shipCoord);
    }

    newShip.forEach((coord) => {
      getAdjacentTiles(coord).forEach((adjCoord) => {
        if (!isOccupied(adjCoord) && !isBlocked(adjCoord)) {
          blockedTiles.push(adjCoord);
        }
      });
    });

    addedShips.push({ ship: ship(size), coordinates: newShip });
    return true;
  }

  function receiveAttack(coordinate) {
    if (
      shotCoordinates.some(
        (shot) => shot[0] === coordinate[0] && shot[1] === coordinate[1]
      )
    ) {
      return false;
    }

    shotCoordinates.push(coordinate);

    const hitShip = addedShips.find(({ coordinates }) =>
      coordinates.some(
        (sCoord) => sCoord[0] === coordinate[0] && sCoord[1] === coordinate[1]
      )
    );
    if (hitShip) {
      hitShip.ship.hit();
      return true;
    }
    return false;
  }

  function allShipsSunk() {
    return addedShips.every(({ ship }) => ship.isSunk());
  }

  return {
    coordinates,
    get addedShips() {
      return addedShips;
    },
    addShip,
    receiveAttack,
    allShipsSunk,
  };
}
