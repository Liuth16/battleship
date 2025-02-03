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
});
