import computerPlayer from "./computer";
import player from "./player";

describe("Computer logic and plays", () => {
  test("Computer shoots at a player board", () => {
    const humanPlayer = player();
    const computer = computerPlayer();
    computer.shoot(humanPlayer);

    expect(humanPlayer.shotCoordinates.length).toBe(1);
  });

  test("Computer shoots all coordinates from the enemy board", () => {
    const humanPlayer = player();
    const computer = computerPlayer();
    for (let i = 0; i < 100; i++) {
      computer.shoot(humanPlayer);
    }
    expect(humanPlayer.shotCoordinates.length).toBe(100);
  });
});
