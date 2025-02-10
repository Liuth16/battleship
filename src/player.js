import gameboard from "./gameboard";

export default function player() {
  const currentPlayer = gameboard();
  currentPlayer.addShip(4, [0, 0], "horizontal");
  currentPlayer.addShip(3, [2, 0], "horizontal");
  currentPlayer.addShip(2, [4, 0], "horizontal");
  currentPlayer.addShip(1, [6, 0], "horizontal");

  return currentPlayer;
}
