import ship from "./ship";
import { createShipSelection, player } from "./interface";
import computerPlayer from "./computer";

let currentTurn = 1;
let placingShips = 1;
let gameOver = false;
let player1Instance;
let player2Instance;
let isComputerGame = false;
let computerInstance;
let gameStatus;

function checkVictory(player1, player2) {
  if (player1.allShipsSunk()) {
    gameOver = true;
    alert("Player 2 Wins!");
    disableAllGrids();
    return true;
  }
  if (player2.allShipsSunk()) {
    gameOver = true;
    alert("Player 1 Wins!");
    disableAllGrids();
    return true;
  }
  return false;
}

function initializeComputerGame() {
  computerInstance = computerPlayer();
  // Clear any existing ships from player2's board
  player2Instance = player();
  player2Instance.setupBoard();
  callBoth();
  placingShips = 3; // Enable attack phase
  updateGridsInteractivity();
}

function playComputer() {
  const button = document.querySelector("#btn");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    isComputerGame = true;
    const form = document.querySelector("form");
    if (form) form.remove();
  });
}

function disableAllGrids() {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

function callBoth() {
  if (placingShips === 1) {
    markCell(player1Instance.addedShips, 1, false);
    markCell(player2Instance.addedShips, 2, true);
  } else if (placingShips === 2) {
    markCell(player1Instance.addedShips, 1, true);
    markCell(player2Instance.addedShips, 2, false);
  } else {
    // During game phase
    if (isComputerGame) {
      markCell(player1Instance.addedShips, 1, false); // Keep player 1's ships visible
      markCell(player2Instance.addedShips, 2, true); // Hide computer's ships
    } else {
      // Human vs Human - hide both players' ships
      markCell(player1Instance.addedShips, 1, true);
      markCell(player2Instance.addedShips, 2, true);
    }
  }
}

function markCell(addedShips, gridNumber, hideShips = false) {
  const cells = document.querySelectorAll(`.grid${gridNumber} .cell`);

  cells.forEach((cell) => {
    // Don't modify cells that are already hit or missed
    if (cell.classList.contains("hit") || cell.classList.contains("miss")) {
      return;
    }

    const row = parseInt(cell.getAttribute("data-row"));
    const col = parseInt(cell.getAttribute("data-col"));

    const isShip = addedShips.some(({ coordinates }) =>
      coordinates.some(
        ([shipRow, shipCol]) => shipRow === row && shipCol === col
      )
    );

    if (isShip) {
      cell.classList.add("ship");
      if (hideShips) {
        cell.classList.add("invisible-ship");
        cell.textContent = "";
      } else {
        cell.classList.remove("invisible-ship"); // Remove invisible class if exists
        cell.textContent = "S";
      }
    }
  });
}

function checkShipPlacement() {
  if (placingShips === 1) {
    disableAllGrids();
    enableGrid(1);
    if (player1Instance.addedShips.length >= 10) {
      if (isComputerGame) {
        initializeComputerGame();
      } else {
        placingShips = 2;
        markCell(player1Instance.addedShips, 1, true); // Hide player 1's ships
        disableGrid(1);
        enableGrid(2);
        dragTarget(placingShips);
        createShipSelection();
        rotateShip();
        draggableSource();
      }
      gameStatus.updateText();
    }
  } else if (placingShips === 2 && !isComputerGame) {
    if (player2Instance.addedShips.length >= 10) {
      placingShips = 3;
      markCell(player2Instance.addedShips, 2, true); // Hide player 2's ships
      updateGridsInteractivity();
      gameStatus.updateText();
    }
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
      document
        .querySelectorAll(".dragover")
        .forEach((c) => c.classList.remove("dragover"));
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

function handleComputerTurn() {
  if (!isComputerGame || currentTurn !== 2 || gameOver) return;

  setTimeout(() => {
    computerInstance.shoot(player1Instance);
    const lastShot =
      player1Instance.shotCoordinates[
        player1Instance.shotCoordinates.length - 1
      ];
    const cell = document.querySelector(
      `.grid1 [data-row="${lastShot[0]}"][data-col="${lastShot[1]}"]`
    );

    if (
      player1Instance.addedShips.some(({ coordinates }) =>
        coordinates.some(
          ([row, col]) => row === lastShot[0] && col === lastShot[1]
        )
      )
    ) {
      cell.classList.add("hit");
      cell.textContent = "X";
    } else {
      cell.classList.add("miss");
      cell.textContent = "O";
    }

    if (!checkVictory(player1Instance, player2Instance)) {
      switchTurn();
    }
  }, 500);
}

function switchTurn() {
  if (gameOver) return;
  currentTurn = currentTurn === 1 ? 2 : 1;
  updateGridsInteractivity();
  gameStatus.updateText();

  if (isComputerGame && currentTurn === 2) {
    handleComputerTurn();
  }
}

function updateGridsInteractivity() {
  const grid1Cells = document.querySelectorAll(".grid1 .cell");
  const grid2Cells = document.querySelectorAll(".grid2 .cell");

  if (currentTurn === 1) {
    grid1Cells.forEach((cell) => (cell.style.pointerEvents = "none"));
    grid2Cells.forEach((cell) => {
      if (!cell.classList.contains("hit") && !cell.classList.contains("miss")) {
        cell.style.pointerEvents = "auto";
      }
    });
  } else {
    grid2Cells.forEach((cell) => (cell.style.pointerEvents = "none"));
    grid1Cells.forEach((cell) => {
      if (!cell.classList.contains("hit") && !cell.classList.contains("miss")) {
        cell.style.pointerEvents = "auto";
      }
    });
  }
}

function handleCellClick(cell, attackingPlayer, defendingPlayer) {
  if (placingShips < 3) return;

  const row = parseInt(cell.getAttribute("data-row"), 10);
  const col = parseInt(cell.getAttribute("data-col"), 10);

  const hit = defendingPlayer.receiveAttack([row, col]);

  // Remove invisible-ship class if it exists
  cell.classList.remove("invisible-ship");

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
    gameStatus.updateText();
  }
}

function initializeGameEvents(p1, p2) {
  player1Instance = p1;
  player2Instance = p2;
  gameStatus = updateGameStatus();
  gameStatus.updateText();
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
  playComputer();
  checkShipPlacement();
  dragTarget(placingShips);
}

function updateGameStatus() {
  const existingStatus = document.getElementById("game-status");
  if (existingStatus) {
    existingStatus.remove();
  }

  const container = document.querySelector(".container");
  const statusDiv = document.createElement("div");
  statusDiv.id = "game-status";
  statusDiv.style.textAlign = "center";
  statusDiv.style.margin = "20px";
  statusDiv.style.fontSize = "1.2em";

  // Insert after the container
  if (container.nextSibling) {
    container.parentNode.insertBefore(statusDiv, container.nextSibling);
  } else {
    container.parentNode.appendChild(statusDiv);
  }

  function updateText() {
    if (placingShips === 1) {
      statusDiv.textContent = "Player 1's turn to place ships";
    } else if (placingShips === 2) {
      statusDiv.textContent = "Player 2's turn to place ships";
      // Hide computer play button when player 1 finishes without choosing computer
      const button = document.querySelector("#btn");
      const form = document.querySelector("form");
      if (button && form) {
        form.remove();
      }
    } else if (placingShips === 3) {
      if (isComputerGame) {
        statusDiv.textContent =
          currentTurn === 1
            ? "Your turn to attack Computer's grid"
            : "Computer is thinking...";
      } else {
        statusDiv.textContent = `Player ${currentTurn}'s turn to attack`;
      }
    }
  }

  return { updateText };
}

export { initializeGameEvents };
