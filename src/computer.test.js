import computerPlayer from "./computer";
import player from "./player";

describe("computer", () => {
  let enemyBoard;
  let computer;

  beforeEach(() => {
    enemyBoard = { receiveAttack: jest.fn() };
    computer = computerPlayer();
  });

  test("should shoot at a player board", () => {
    const humanPlayer = player();
    computer.shoot(humanPlayer);

    expect(humanPlayer.shotCoordinates.length).toBe(1);
  });

  test("should shoots all coordinates from the enemy board", () => {
    const humanPlayer = player();
    for (let i = 0; i < 100; i++) {
      computer.shoot(humanPlayer);
    }
    expect(humanPlayer.shotCoordinates.length).toBe(100);
  });

  test("should call receiveAttack with a valid coordinate", () => {
    computer.shoot(enemyBoard);
    expect(enemyBoard.receiveAttack).toHaveBeenCalled();
    const calledCoord = enemyBoard.receiveAttack.mock.calls[0][0];

    expect(Array.isArray(calledCoord)).toBe(true);
    expect(calledCoord.length).toBe(2);
    expect(calledCoord[0]).toBeGreaterThanOrEqual(0);
    expect(calledCoord[0]).toBeLessThan(10);
    expect(calledCoord[1]).toBeGreaterThanOrEqual(0);
    expect(calledCoord[1]).toBeLessThan(10);
  });

  test("should remove coordinate from shootableCoord after shooting", () => {
    const initialLength = 100;
    computer.shoot(enemyBoard);
    expect(enemyBoard.receiveAttack).toHaveBeenCalled();
    expect(computer.shootableCoord.length).toBe(initialLength - 1);
  });

  test("should add adjacent coordinates to bestShots if a ship is hit", () => {
    enemyBoard.receiveAttack.mockReturnValue(true);

    computer.shoot(enemyBoard);

    const hitCoord = enemyBoard.receiveAttack.mock.calls[0][0];

    expect(Array.isArray(hitCoord)).toBe(true);
    expect(hitCoord.length).toBe(2);

    const [row, col] = hitCoord;

    const expectedAdjacent = [
      [row - 1, col], // Up
      [row + 1, col], // Down
      [row, col - 1], // Left
      [row, col + 1], // Right
    ].filter(([r, c]) => r >= 0 && r < 10 && c >= 0 && c < 10);

    expect(computer.bestShots.length).toBe(expectedAdjacent.length);
    expectedAdjacent.forEach((coord) => {
      expect(computer.bestShots).toContainEqual(coord);
    });
  });

  test("should target an adjacent coordinate after a hit", () => {
    enemyBoard.receiveAttack.mockReturnValue(true);

    computer.shoot(enemyBoard);

    const hitCoord = enemyBoard.receiveAttack.mock.calls[0][0];

    expect(Array.isArray(hitCoord)).toBe(true);
    expect(hitCoord.length).toBe(2);

    const [row, col] = hitCoord;

    const expectedAdjacent = [
      [row - 1, col], // Up
      [row + 1, col], // Down
      [row, col - 1], // Left
      [row, col + 1], // Right
    ].filter(([r, c]) => r >= 0 && r < 10 && c >= 0 && c < 10);

    expect(computer.bestShots.length).toBe(expectedAdjacent.length);
    expectedAdjacent.forEach((coord) => {
      expect(computer.bestShots).toContainEqual(coord);
    });

    computer.shoot(enemyBoard);
    const secondHitCoord = enemyBoard.receiveAttack.mock.calls[1][0];
    expect(expectedAdjacent).toContainEqual(secondHitCoord);
  });
});
