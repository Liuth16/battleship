import ship from "./ship";

export default function gameboard() {
  const coordinates = Array.from({ length: 100 }, (_, i) => [
    Math.floor(i / 10),
    i % 10,
  ]);

  const addedShips = [];
  const blockedTiles = [];

  function addShip(size, coordinate, direction) {
    const newShip = [];
    for (let i = 0; i < size; i++) {
      if (direction === "vertical") {
        newShip.push([coordinate[0] + i, coordinate[1]]);
      } else if (direction === "horizontal") {
        newShip.push([coordinate[0], coordinate[1] + i]);
      }
    }
    addedShips.push(newShip);
  }

  return {
    coordinates,
    get addedShips() {
      return addedShips;
    },
    addShip,
  };
}
