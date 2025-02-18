// import "./styles.css";
// import {
//   drawCells,
//   markShipCells,
//   player,
//   createShipSelection,
// } from "./interface";
// import { initializeGameEvents } from "./event";

// drawCells(1);
// drawCells(2);
// const player1 = player();
// const player2 = player();
// markShipCells(player1.addedShips, 1);
// createShipSelection();
// initializeGameEvents(player1, player2);

import "./styles.css";
import { drawCells, player, createShipSelection } from "./interface";
import { initializeGameEvents } from "./event";
import computerPlayer from "./computer";

// Draw initial boards
drawCells(1);
drawCells(2);

// Initialize players but don't start the game yet
const player1 = player();
const player2 = player();

// Create initial ship selection for player 1
createShipSelection();

// Hide grid2 initially
const grid2 = document.querySelector(".grid2");
grid2.style.display = "none";

// Add event listener for the play button
document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();

  // Show grid2
  grid2.style.display = "grid";

  // Remove the form after clicking play
  const form = document.querySelector("form");
  form.remove();

  // Initialize game with computer player
  initializeGameEvents(player1, player2, true);
});
