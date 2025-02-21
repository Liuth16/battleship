import "./styles.css";
import {
  drawCells,
  markShipCells,
  player,
  createShipSelection,
} from "./interface";
import { initializeGameEvents } from "./event";

drawCells(1);
drawCells(2);
const player1 = player();
const player2 = player();
// markShipCells(player1.addedShips, 1);
createShipSelection();
initializeGameEvents(player1, player2);
