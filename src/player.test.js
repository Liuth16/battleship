import player from "./player";

describe("Player attributes and methods", () => {
  test("Player can be created with 4 default ships", () => {
    const player1 = player();
    player1.addShip(4, [0, 0], true);
    expect(player1.addedShips.length).toBe(1);
  });
});
