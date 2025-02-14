let currentSetupPlayer = 1;
let selectedShipLength = 0;
let isHorizontal = true;
let player1Instance;
let player2Instance;

function createShipSelection() {
  const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const container = document.createElement("div");
  container.classList.add("ship-selection");

  shipLengths.forEach((length) => {
    const ship = document.createElement("div");
    ship.classList.add("ship-choice");
    ship.style.width = `${length * 49}px`;
    ship.setAttribute("data-length", length);
    ship.draggable = true;
    container.appendChild(ship);

    ship.addEventListener("dragstart", handleDragStart);
  });

  const rotateBtn = document.createElement("button");
  rotateBtn.textContent = "Rotate Ship";
  rotateBtn.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
  });
  container.appendChild(rotateBtn);
  return container;
}

function handleDragStart(e) {
  selectedShipLength = parseInt(e.target.getAttribute("data-length"));
}

function isValidPlacement(row, col, length, horizontal, grid) {
  const cells = document.querySelectorAll(`.grid${grid} .cell`);
  for (let i = 0; i < length; i++) {
    const checkRow = horizontal ? row : row + i;
    const checkCol = horizontal ? col + i : col;

    if (checkRow >= 10 || checkCol >= 10) return false;

    const cell = [...cells].find(
      (cell) =>
        parseInt(cell.getAttribute("data-row")) === checkRow &&
        parseInt(cell.getAttribute("data-col")) === checkCol
    );
    if (cell.classList.contains("ship")) return false;
  }
  return true;
}

function addShipToBoard(
  row,
  col,
  length,
  horizontal,
  currentPlayer,
  gridNumber
) {
  const coordinates = [];
  for (let i = 0; i < length; i++) {
    const shipRow = horizontal ? row : row + i;
    const shipCol = horizontal ? col + i : col;
    coordinates.push([shipRow, shipCol]);

    const cell = document.querySelector(
      `.grid${gridNumber} [data-row="${shipRow}"][data-col="${shipCol}"]`
    );
    cell.classList.add("ship");
  }
  currentPlayer.addShip(
    coordinates.length,
    coordinates[0],
    horizontal ? "horizontal" : "vertical"
  );
}

function initializeShipPlacement(p1, p2) {
  player1Instance = p1;
  player2Instance = p2;

  const shipSelectionUI = createShipSelection();
  document.body.appendChild(shipSelectionUI);

  const playButton = document.createElement("button");
  playButton.textContent = "Play game";
  playButton.classList.add("play-button");
  playButton.style.display = "none";
  document.body.appendChild(playButton);

  setupGridDragAndDrop();
  return playButton;
}

function setupGridDragAndDrop() {
  const activeGrid = `.grid${currentSetupPlayer} .cell`;
  const cells = document.querySelectorAll(activeGrid);

  cells.forEach((cell) => {
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      const row = parseInt(cell.getAttribute("data-row"));
      const col = parseInt(cell.getAttribute("data-col"));

      if (
        isValidPlacement(
          row,
          col,
          selectedShipLength,
          isHorizontal,
          currentSetupPlayer
        )
      ) {
        const currentPlayer =
          currentSetupPlayer === 1 ? player1Instance : player2Instance;
        addShipToBoard(
          row,
          col,
          selectedShipLength,
          isHorizontal,
          currentPlayer,
          currentSetupPlayer
        );

        e.dataTransfer.clearData();
        document
          .querySelector(`[data-length="${selectedShipLength}"]`)
          .remove();

        if (!document.querySelector(".ship-choice")) {
          document.querySelector(".play-button").style.display = "block";
        }
      }
    });
  });
}

function switchToPlayer2Setup() {
  currentSetupPlayer = 2;
  document.querySelector(".ship-selection").remove();
  document.body.appendChild(createShipSelection());
  setupGridDragAndDrop();
}

export { initializeShipPlacement, switchToPlayer2Setup };
