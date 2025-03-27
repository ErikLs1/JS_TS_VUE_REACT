import { gameController } from "../ui/GameController.js";
import { findWinningMoveForAI, findBlockingMoveForAI, chooseBestMoveForAI } from "./AiPutPiece.js";
import { findBestGridMoveForAI } from "./AiMoveGrid.js";
import { findBestMovePieceForAI } from "./AiMovePiece.js";

/**
 * Called when it is AI's turn to make a move.
 * It waits 3 seconds waits 3 seconds to simulate thinking.
 * The function will try to win, prevent the opponent from winning and choose the best move.
 */
export function performAIMove() {
    if (gameController.gameBrain.gameOver) return;

    if ((gameController.gameBrain.currentPlayer === 'X' && gameController.gameBrain.piecesLeftForX === 0) ||
        (gameController.gameBrain.currentPlayer === 'O' && gameController.gameBrain.piecesLeftForO === 0) ||
        (gameController.gameBrain.emptyCellsCoordinatesInGrid().length === 0)){

        const bestGridMove = findBestGridMoveForAI();
        const bestMovePiece = findBestMovePieceForAI();

        if (bestGridMove && bestGridMove.score > bestMovePiece.score) {
            executeMove(bestGridMove);
            return;
        } else if (bestMovePiece) {
            executeMove(bestMovePiece);
            return;
        }
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
        return;
    }

    // Choose the best move for AI
    const bestPlaceMove = chooseBestMoveForAI();
    // Choose the best grid move for the AI
    const bestGridMove = findBestGridMoveForAI();

    if (bestGridMove && bestGridMove.score > 0 && bestGridMove.score > bestPlaceMove.score) {
        executeMove(bestGridMove);
        return;
    }

    if (bestPlaceMove) {
        executeMove(bestPlaceMove);
        return;
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
export function executeMove(move) {
    if (move.type === "place") {
        gameController.gameBrain.makeAMove(move.x, move.y);
    } else if (move.type === "grid") {
        gameController.gameBrain.moveGrid(move.direction);
    } else if (move.type === "movePiece") {
        gameController.gameBrain.moveAPiece(move.from.x, move.from.y, move.to.x, move.to.y);
    }

    gameController.updateUI();
}


/**
 * Performs a random valid move for the AI.
 */
export function performRandomMove() {
    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    if (validCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * validCells.length);
        const {x, y} = validCells[randomIndex];
        gameController.gameBrain.makeAMove(x, y);
    }

    gameController.updateUI();
}

/**
 * Makes a copy of the board.
 *
 * @returns Array representing the board.
 */
export function cloneBoard() {
    return gameController.gameBrain.gameBoard.map(row => [...row]);
}