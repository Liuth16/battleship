import gameboard from "./gameboard";

describe("Gameboard attributes and methods", () => {
  test("Gameboard has 100 XY coordinates", () => {
    const board = gameboard();
    expect(board.coordinates.length).toBe(100);
  });
  test("Gameboard each coordinate is correct", () => {
    const board = gameboard();
    expect(board.coordinates[0]).toEqual([0, 0]);
    expect(board.coordinates[99]).toEqual([9, 9]);
  });
  test("Gameboard allow to add ships", () => {
    const board = gameboard();
    board.addShip(3, [0, 0], true);
    expect(board.addedShips[0].coordinates).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });
  test("Gameboard don't allow to add two ships that overlap", () => {
    const board = gameboard();
    board.addShip(3, [0, 0], true);
    expect(board.addShip(2, [0, 2], true)).toBe(false);
    expect(board.addShip(2, [0, 4], true)).toBe(true);
  });
  test("Gameboard don't allow to add ship in adjacent tile to existing ship", () => {
    const board = gameboard();
    board.addShip(3, [0, 0], false);
    board.addShip(3, [0, 1], false);
    board.addShip(3, [0, 2], false);
    expect(board.addedShips.length).toBe(2);
    expect(board.addShip(3, [0, 4], true)).toBe(true);
    expect(board.addShip(3, [3, 1], true)).toBe(false);
  });
  test("Gameboard allow to hit ships or coordinates only one time", () => {
    const board = gameboard();
    board.addShip(3, [0, 0], true);
    board.receiveAttack([0, 1]);
    expect(board.receiveAttack([0, 2])).toBe(true);
    expect(board.receiveAttack([0, 2])).toBe(false);
    expect(board.addedShips[0].ship.timesHit).toBe(2);
  });

  test("Gameboard check if all ships are sunk", () => {
    const board = gameboard();
    board.addShip(3, [0, 0], true);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 2]);
    expect(board.allShipsSunk()).toBe(true);
  });
});
