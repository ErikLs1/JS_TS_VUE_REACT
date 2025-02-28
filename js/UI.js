import {gameController} from "./GameController.js";

export function renderBoard(boardState) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    boardState.forEach((row, rowIndex) => {
        row.forEach((cellValue, colIndex) => {
            const cellEl = document.createElement("div");
            cellEl.classList.add("cell");

            if (rowIndex >= 1 && rowIndex <= 3 && colIndex >= 1 && colIndex <= 3) {
                cellEl.classList.add("inner");
            }

            cellEl.textContent = cellValue !== "Empty" ? cellValue : "";

            cellEl.addEventListener("click", () => {
                gameController.handleCellClick(rowIndex, colIndex);
            });

            gridContainer.appendChild(cellEl);
        })
    })

    return gridContainer;
}