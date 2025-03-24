import { gameController } from "./GameController.js";


/**
 * Called when it is AI's turn to make a move. It will way to 3 seconds
 * before making a move to simulate more human real behavior.
 */
export function performAIMove() {
    if (gameController.gameBrain.gameOver) return;

    if (gameController.gameBrain.moveCount < 4) {
        performRandomMove();
        return;
    }

    // Check if AI can win immediately.
    const winningMove = findWinningMoveForAI();
    if (winningMove) {
        executeMove(winningMove);
        return;
    }

    // Check if opponent can win nex move, and if yes then prevent that.
    const blockingMove = findBlockingMoveForAI();
    if (blockingMove) {
        executeMove(blockingMove);
    }

    // Otherwise make a random move.
    performRandomMove();
}

/**
 * Executes a move base on the provided move object.
 * Currently, support only make a move action.
 *
 * @param move the move type (place, grid, movePiece)
 */
function executeMove(move) {
    if (move.type === "place") {
        gameController.gameBrain.makeAMove(move.x, move.y);
    }
    // else if (move type === "grid") {...}
    // else if (move type === "movePiece") {...}

    gameController.updateUI();
}

/**
 * Searches for a winning move for the AI.
 */
function findWinningMoveForAI() {
    const currentPlayer = gameController.gameBrain.currentPlayer;
    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    for (let cell of validCells) {
        if (simulatePlaceMove(cell.x, cell.y, currentPlayer)) {
            return {type: "place", x: cell.x, y: cell.y };
        }
    }
    return null;
}

/**
 * Searches for a winning move for opponent and prevents it if possible.
 */
function findBlockingMoveForAI() {
    const opponent = gameController.gameBrain.currentPlayer === 'X' ? 'O' : 'X';
    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    for (let cell of validCells) {
        if (simulatePlaceMove(cell.x, cell.y, opponent)) {
            return {type: "place", x: cell.x, y: cell.y };
        }
    }
    return null;
}

/**
 * Simulates placing a piece to see if the move will lead to the win.
 *
 * @param x row coordinate.
 * @param y column coordinate.
 * @param player the player to whom simulate the win.
 * @returns true if he simulated move would result to a win.
 */
function simulatePlaceMove(x, y, player) {
    const boardCopy = gameController.gameBrain.gameBoard.map(row => [...row]);
    boardCopy[x][y] = player;
    return simulateWinCondition(x, y, player, boardCopy);
}

/**
 * Checks whether there is a win condition  using the provided board
 *
 * @param x
 * @param y
 * @param player
 * @param board
 */
function simulateWinCondition(x, y, player, board) {
    const winCondition = gameController.gameBrain.winCondition;
    const boardWidth = gameController.gameBrain.boardSizeWidth;
    const boardHeight = gameController.gameBrain.boardSizeHeight;

    const countInDirection = (dx, dy) => {
        let count = 0;
        for (let i = 1; i < winCondition; i++) {
            const checkX = x + i * dx;
            const checkY = y + i * dy;

            if (checkX >= 0 && checkX < boardWidth &&
                checkY >= 0 && checkY < boardHeight &&
                gameController.gameBrain.isWithinBoundsGrid(checkX, checkY) &&
                this._gameBoard[checkX][checkY] === player) {
                count++
            } else {
                break;
            }
        }
        return count++;
    }

    const directions = [
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: 1, dy: 1},
        {dx: 1, dy: -1}
    ];

    for (let { dx, dy } of directions) {
        let count = 1 + countInDirection(dx, dy) + countInDirection(-dx, dy);
        if (count >= winCondition) {
            return true;
        }
    }
    return false;
}

function performRandomMove() {
    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    if (validCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * validCells.length);
        const {x, y} = validCells[randomIndex];

        gameController.gameBrain.makeAMove(x, y);
    }

    gameController.updateUI();
}