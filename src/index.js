import "./styles.css";
import { drawCells, markShipCells, player } from "./interface";

drawCells();
const player1 = player();
markShipCells(player1.addedShips);
