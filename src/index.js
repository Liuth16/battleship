import "./styles.css";
import {
  drawCells,
  markShipCells,
  player,
  createShipSelection,
} from "./interface";
import { initializeGameEvents } from "./event";
import { initializeShipPlacement, switchToPlayer2Setup } from "./shipPlacement";

drawCells(1);
drawCells(2);
const player1 = player();
const player2 = player();
createShipSelection();
initializeGameEvents();
