import {gameController} from "./GameController.ts";

export function renderBoard(boardState: string[][]): HTMLElement {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    const { left, top, right, bottom } = gameController.gameBrain.gridPosition;

    boardState.forEach((row, x) => {
        row.forEach((cellValue, y) => {
            const cellEl = document.createElement("div");
            cellEl.classList.add("cell");

            if (x >= left && x < right &&
                y >= top && y < bottom) {
                cellEl.classList.add("inner");
            }

            cellEl.textContent = cellValue !== "Empty" ? cellValue : "";

            cellEl.addEventListener("click", () => {
                // gameController.handleCellClick(rowIndex, colIndex);
                gameController.handleCellClick(x, y);
            });

            gridContainer.appendChild(cellEl);
        })
    })

    return gridContainer;
}