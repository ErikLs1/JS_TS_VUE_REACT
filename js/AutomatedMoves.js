import {gameController} from "./GameController.js";

export function makeRandomMove() {
    if (gameController.gameBrain.gameOver) return;

    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    if (validCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * validCells.length);
        const {x, y} = validCells[randomIndex];

        gameController.gameBrain.makeAMove(x, y);
    } else {
        alert("No valid moves available")
    }

    gameController.updateUI();
}