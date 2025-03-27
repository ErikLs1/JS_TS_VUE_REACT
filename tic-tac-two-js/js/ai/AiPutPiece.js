import { gameController } from "../ui/GameController.js";
import { cloneBoard } from "./AiGameBrain.js";

/**
 * Searches for a winning move for AI.
 * Iterates over all empty cells to find the best move that will get AI closer to winning.
 */
export function findWinningMoveForAI() {
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
 * Searches for move to prevent opponent from winning.
 * For each empty cell calculates a threat score that is used to determine the best blocking move.
 *
 * @return A move object that will prevent other person from winning.
 */
export function findBlockingMoveForAI() {
    const opponent = gameController.gameBrain.currentPlayer === 'X' ? 'O' : 'X';
    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    let bestMove = null;
    let highestScore = 0;
    for (let cell of validCells) {
        const boardCopy = cloneBoard();
        const score = calculateThreatScore(cell.x, cell.y, opponent, boardCopy);

        if (score > highestScore) {
            highestScore = score;
            bestMove = {type: "place", x: cell.x, y: cell.y}
        }
    }

    // If opponent one move away from the win
    if (highestScore >= gameController.gameBrain.winCondition - 1) {
        return bestMove;
    }

    return null;
}

/**
 * Chooses the best move for AI that will lead it closer to winning.
 *
 * @returns a move object that represents the best move for the AI.
 */
export function chooseBestMoveForAI() {
    const currentPlayer = gameController.gameBrain.currentPlayer;
    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    let bestMove = null;
    let highestScore = -100;
    for (let cell of validCells) {
        const boardCopy = cloneBoard();
        const score = evaluateMove(cell.x, cell.y, currentPlayer, boardCopy);

        if (score > highestScore) {
            highestScore = score;
            bestMove = { type: "place", x: cell.x, y: cell.y };
        }
    }
    return bestMove
}

/**
 * Simulates placing a piece for a given player and returns
 * true if the given move would lead to immediate win.
 *
 * @param x The row index.
 * @param y The column index.
 * @param player The player (X or O).
 * @returns True if the move lead to a win, otherwise false.
 */
export function simulatePlaceMove(x, y, player) {
    const boardCopy = gameController.gameBrain.gameBoard.map(row => [...row]);
    boardCopy[x][y] = player;
    return simulateWinCondition(x, y, player, boardCopy);
}

/**
 * Checks whether a win condition is met on the simulated board.
 *
 * @param x The row index of the move.
 * @param y The column index of the move.
 * @param player The player (X or O).
 * @param board True if the win condition is met, otherwise false.
 */
export function simulateWinCondition(x, y, player, board) {
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
                board[checkX][checkY] === player) {
                count++
            } else {
                break;
            }
        }
        return count;
    }

    const directions = [
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: 1, dy: 1},
        {dx: 1, dy: -1}
    ];

    for (let { dx, dy } of directions) {
        let count = 1 + countInDirection(dx, dy) + countInDirection(-dx, -dy);
        if (count >= winCondition) {
            return true;
        }
    }
    return false;
}

/**
 * Calculates the threat score by simulating the potential moves of the opponent.
 * The threat score is calculated by the maximum consecutive pieces.
 *
 * @param x The row index of the cell.
 * @param y The column index of the cell.
 * @param opponent The opponents symbol (X or O).
 * @param board A copy of the board.
 * @returns The threat score for the cell.
 */
export function calculateThreatScore(x, y, opponent, board) {
    board[x][y] = opponent;
    const winCondition = gameController.gameBrain.winCondition;
    const boardWidth = gameController.gameBrain.boardSizeWidth;
    const boardHeight = gameController.gameBrain.boardSizeHeight;

    function countConsecutive(dx, dy) {
        let count = 1;
        for (let step = 1; step < winCondition; step++) {
            const nx = x + step * dx;
            const ny = y + step * dy;

            if (nx >= 0 && nx < boardWidth &&
                ny >= 0 && ny < boardHeight &&
                gameController.gameBrain.isWithinBoundsGrid(nx, ny) &&
                board[nx][ny] === opponent) {
                count++
            } else {
                break;
            }
        }
        for (let step = 1; step < winCondition; step++) {
            const nx = x - step * dx;
            const ny = y - step * dy;
            if (
                nx >= 0 && nx < boardWidth &&
                ny >= 0 && ny < boardHeight &&
                gameController.gameBrain.isWithinBoundsGrid(nx, ny) &&
                board[nx][ny] === opponent
            ) {
                count++;
            } else {
                break;
            }
        }
        return count;
    }

    let maxScore = 0;
    const directions = [
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: 1, dy: 1},
        {dx: 1, dy: -1}
    ];

    for (let { dx, dy } of directions) {
        const score = countConsecutive(dx, dy);
        if (score > maxScore) {
            maxScore = score;
        }
    }

    board[x][y] = 'Empty';
    return maxScore;
}

/**
 * Evaluates a move for the given player by placing a piece at (x, y)
 * and returning the maximum count in direction.
 *
 * @param x The row index of the move.
 * @param y The column index of the move.
 * @param player The player (X or O)
 * @param board a copy of the board.
 * @returns the highest consecutive count.
 */
export function evaluateMove(x, y, player, board) {
    board[x][y] = player;
    const winCondition = gameController.gameBrain.winCondition;
    const boardWidth = gameController.gameBrain.boardSizeWidth;
    const boardHeight = gameController.gameBrain.boardSizeHeight;

    /**
     * Counts the number of consecutive pieces in a given direction.
     *
     * @param dx
     * @param dy
     * @returns The total count od consecutive pieces.
     */
    function countLine(dx, dy) {
        let count = 1;
        for (let step = 1; step < winCondition; step++) {
            const nx = x + step * dx;
            const ny = y + step * dy;
            if (nx >= 0 && nx < boardWidth && ny >= 0 && ny < boardHeight && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let step = 1; step < winCondition; step++) {
            const nx = x - step * dx;
            const ny = y - step * dy;
            if (nx >= 0 && nx < boardWidth && ny >= 0 && ny < boardHeight && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }
        return count;
    }

    let bestLine = 0;
    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 }
    ];
    for (let { dx, dy } of directions) {
        bestLine = Math.max(bestLine, countLine(dx, dy));
    }
    board[x][y] = 'Empty';
    return bestLine;
}