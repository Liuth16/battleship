import player from "./player";

function drawCells() {
  const grid = document.querySelector(".grid");
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    const row = Math.floor(i / 10);
    const col = i % 10;
    cell.setAttribute("data-row", row);
    cell.setAttribute("data-col", col);
    cell.classList.add("cell");
    grid.appendChild(cell);
  }
}

function markShipCells(addedShips) {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const row = parseInt(cell.getAttribute("data-row"));
    const col = parseInt(cell.getAttribute("data-col"));

    // Check if this cell is part of any ship
    const isShip = addedShips.some(({ coordinates }) =>
      coordinates.some(
        ([shipRow, shipCol]) => shipRow === row && shipCol === col
      )
    );

    if (isShip) {
      cell.classList.add("ship"); // Add a class to visually mark the ship
    }
  });
}

export { drawCells, markShipCells, player };
