let currentTurn = 1;
let gameOver = false;
let player1Instance;
let player2Instance;

function disableAllGrids() {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
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

  updateGridsInteractivity();
}

export { initializeGameEvents };
