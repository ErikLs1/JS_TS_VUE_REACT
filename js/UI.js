import {gameController} from "./GameController.js";

export function renderBoard(boardState) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    const gridPosition = gameController.gameBrain.gridPosition;

    boardState.forEach((row, rowIndex) => {
        row.forEach((cellValue, colIndex) => {
            const cellEl = document.createElement("div");
            cellEl.classList.add("cell");

            if (rowIndex >= gridPosition.top && rowIndex < gridPosition.bottom
                && colIndex >= gridPosition.left && colIndex < gridPosition.right) {
                cellEl.classList.add("inner");
            }

            cellEl.textContent = cellValue !== "Empty" ? cellValue : "";

            cellEl.addEventListener("click", () => {
                gameController.handleCellClick(rowIndex, colIndex);
                console.log("Clicked cell:", rowIndex, colIndex);
            });

            gridContainer.appendChild(cellEl);
        })
    })

    return gridContainer;
}