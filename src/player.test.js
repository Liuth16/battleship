import player from "./player";

describe("Player attributes and methods", () => {
  test("Player can be created with 4 default ships", () => {
    const player1 = player();
    expect(player1.addedShips.length).toBe(4);
  });
});
