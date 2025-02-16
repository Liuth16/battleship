import player from "./player";

function drawCells(number = 1) {
  const grid = document.querySelector(`.grid${number}`);
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

function createShipSelection() {
  const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const container = document.createElement("div");
  container.classList.add("ship-selection");

  shipLengths.forEach((length) => {
    const ship = document.createElement("div");
    ship.classList.add("ship-choice");
    ship.setAttribute("data-length", length);
    ship.setAttribute("data-horizontal", "true");
    ship.draggable = true;
    ship.style.width = `${49 * length}px`;
    ship.style.height = "49px";
    container.appendChild(ship);
  });
  document.body.appendChild(container);
}

function markShipCells(addedShips, gridNumber = 1) {
  const cells = document.querySelectorAll(`.grid${gridNumber} .cell`);

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
      cell.textContent = "S";
    }
  });
}

export { drawCells, markShipCells, player, createShipSelection };
