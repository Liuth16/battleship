import ship from "./ship";
import { createShipSelection } from "./interface";

let currentTurn = 1;
let placingShips = 1;
let gameOver = false;
let player1Instance;
let player2Instance;

function disableAllGrids() {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

function callBoth() {
  markCell(player1Instance.addedShips, 1);
  markCell(player2Instance.addedShips, 2);
}

function markCell(addedShips, gridNumber) {
  const cells = document.querySelectorAll(`.grid${gridNumber} .cell`);

  cells.forEach((cell) => {
    const row = parseInt(cell.getAttribute("data-row"));
    const col = parseInt(cell.getAttribute("data-col"));

    const isShip = addedShips.some(({ coordinates }) =>
      coordinates.some(
        ([shipRow, shipCol]) => shipRow === row && shipCol === col
      )
    );

    if (isShip) {
      cell.classList.add("ship");
      cell.textContent = "S";
    }
  });
}

function checkShipPlacement() {
  if (placingShips === 1) {
    disableAllGrids();
    enableGrid(1);
    if (player1Instance.addedShips.length >= 10) {
      placingShips += 1;
      disableGrid(1);
      enableGrid(2);
      dragTarget(placingShips);
      createShipSelection();
      draggableSource();
    }
  } else if (placingShips === 2) {
    rotateShip();
    draggableSource();
    if (player2Instance.addedShips.length >= 10) {
      placingShips += 1;
    }
  } else {
    updateGridsInteractivity();
  }
}

function placeShip(size, coord, isHorizontal) {
  if (placingShips === 1) {
    return player1Instance.addShip(size, coord, isHorizontal);
  }
  if (placingShips === 2) {
    return player2Instance.addShip(size, coord, isHorizontal);
  }
  return "done";
}

function disableGrid(gridId) {
  const allCells = document.querySelectorAll(`.grid${gridId} .cell`);
  allCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

function enableGrid(gridId) {
  const allCells = document.querySelectorAll(`.grid${gridId} .cell`);
  allCells.forEach((cell) => {
    cell.style.pointerEvents = "auto";
  });
}

function rotateShip() {
  document.querySelectorAll(".ship-choice").forEach((ship) => {
    ship.addEventListener("click", () => doRotation(ship));
  });
}

function draggableSource() {
  const source = document.querySelectorAll(".ship-choice");
  source.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      ship.classList.add("dragging");
    });
    ship.addEventListener("dragend", (e) => {
      ship.classList.remove("dragging");
    });
  });
}

function dragTarget(gridId) {
  if (gridId === 3) return;
  const gridSize = 10;
  const target = document.querySelectorAll(`.grid${gridId} .cell`);

  target.forEach((cell) => {
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggedElement = document.querySelector(".dragging");

      if (!draggedElement) return;

      document
        .querySelectorAll(`.grid${gridId} .dragover`)
        .forEach((c) => c.classList.remove("dragover"));

      const shipSize = Number(draggedElement.dataset.length);
      let col = Number(e.target.dataset.col);
      let row = Number(e.target.dataset.row);
      const isHorizontal = draggedElement.dataset.horizontal === "true";

      if (isHorizontal) {
        if (col + shipSize > gridSize) {
          col = gridSize - shipSize;
        }
      } else if (row + shipSize > gridSize) {
        row = gridSize - shipSize;
      }

      for (let i = 0; i < shipSize; i++) {
        const selector = isHorizontal
          ? `.grid${gridId} [data-col="${col + i}"][data-row="${row}"]`
          : `.grid${gridId} [data-col="${col}"][data-row="${row + i}"]`;

        document
          .querySelectorAll(selector)
          .forEach((c) => c.classList.add("dragover"));
      }
    });

    cell.addEventListener("dragleave", (e) => {
      document
        .querySelectorAll(".dragover")
        .forEach((c) => c.classList.remove("dragover"));
    });

    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      const col = Number(e.target.dataset.col);
      const row = Number(e.target.dataset.row);
      const draggedElement = document.querySelector(".dragging");
      const length = Number(draggedElement.dataset.length);
      const horizontal = draggedElement.dataset.horizontal === "true";

      if (placeShip(length, [row, col], horizontal)) {
        draggedElement.remove();
        callBoth();
        checkShipPlacement();
        console.log(player1Instance.addedShips);
        console.log(player2Instance.addedShips);
      }
    });
  });
}

function doRotation(ship) {
  const lenght = parseInt(ship.getAttribute("data-length"), 10);
  const isH = ship.getAttribute("data-horizontal");
  if (isH === "true") {
    ship.style.width = `49px`;
    ship.style.height = `${49 * lenght}px`;
    ship.dataset.horizontal = "false";
  } else {
    ship.style.width = `${49 * lenght}px`;
    ship.style.height = `49px`;
    ship.dataset.horizontal = "true";
  }
}

function checkVictory(player1, player2) {
  if (player1Instance.allShipsSunk()) {
    gameOver = true;
    alert("Player 2 wins!");
    disableAllGrids();
    return true;
  }
  if (player2Instance.allShipsSunk()) {
    gameOver = true;
    alert("Player 1 wins!");
    disableAllGrids();
    return true;
  }
  return false;
}

function updateGridsInteractivity() {
  if (gameOver) return;
  if (placingShips !== 3) return;
  const grid1Cells = document.querySelectorAll(".grid1 .cell");
  const grid2Cells = document.querySelectorAll(".grid2 .cell");

  // Disable all cells first
  [...grid1Cells, ...grid2Cells].forEach((cell) => {
    cell.style.pointerEvents = "none";
  });

  // Enable only the active player's grid cells
  const activeCells = currentTurn === 1 ? grid2Cells : grid1Cells;
  activeCells.forEach((cell) => {
    if (!cell.classList.contains("hit") && !cell.classList.contains("miss")) {
      cell.style.pointerEvents = "auto";
    }
  });
}

function switchTurn() {
  currentTurn = currentTurn === 1 ? 2 : 1;
  updateGridsInteractivity();
}

function handleCellClick(cell, attackingPlayer, defendingPlayer) {
  if (placingShips !== 3) return;
  const row = parseInt(cell.getAttribute("data-row"), 10);
  const col = parseInt(cell.getAttribute("data-col"), 10);

  const hit = defendingPlayer.receiveAttack([row, col]);

  if (hit) {
    cell.classList.add("hit");
    cell.textContent = "X";
  } else {
    cell.classList.add("miss");
    cell.textContent = "O";
  }

  cell.style.pointerEvents = "none";
  if (!checkVictory(player1Instance, player2Instance)) {
    switchTurn();
  }
}

function initializeGameEvents(p1, p2) {
  player1Instance = p1;
  player2Instance = p2;
  const grid1Cells = document.querySelectorAll(".grid1 .cell");
  const grid2Cells = document.querySelectorAll(".grid2 .cell");
  grid1Cells.forEach((cell) => {
    cell.addEventListener("click", () =>
      handleCellClick(cell, player2Instance, player1Instance)
    );
  });
  grid2Cells.forEach((cell) => {
    cell.addEventListener("click", () =>
      handleCellClick(cell, player1Instance, player2Instance)
    );
  });
  rotateShip();
  draggableSource();
  checkShipPlacement();
  dragTarget(placingShips);
}

export { initializeGameEvents };
