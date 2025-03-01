import {TicTacTwoBrain} from "./GameBrain.js";
import {GameConfig} from "./GameConfig.js";

class GameController {
    constructor() {
        this.resetGame();
        this.updateUI = null;
        this.actionACtive = null;
        this.movePieceStartCell = null;
    }

    resetGame() {
        const config = new GameConfig("TIC TAC TWO");
        this.gameBrain = TicTacTwoBrain.TicTacTwoBrainConfig(config, 'X');
        this.actionACtive = false;
        this.movePieceStartCell = null;
    }

    handleCellClick(x, y) {
        if (this.actionACtive === "movePiece") {
            // If cell has not been chosen yet
            if (!this.movePieceStartCell) {
                // Check if clicked cell is inside the grid
                if (!this.gameBrain.isWithinBoundsGrid(x, y)) {
                    alert("Please choose one of your pieces inside the grid!!");
                    return;
                }

                // Check that cell contains the current player's piece.
                if (this.gameBrain.getPiece(x, y) !== this.gameBrain.currentPlayer) {
                    alert("You can only choose your piece!!")
                    return;
                }

                this.movePieceStartCell = {x, y};
                alert("Now select the target cell!")
            } else {
                // Check that the target cell is inside the grid
                if (!this.gameBrain.isWithinBoundsGrid(x, y)) {
                    alert("You can move the piece only inside the grid!!")
                    return;
                }

                // Check that the target cell must be empty
                if (this.gameBrain.getPiece(x, y) !== 'Empty') {
                    alert("This cell is not empty. Please choose another cell.");
                    return;
                }

                const { x: startX, y: startY} = this.movePieceStartCell;
                const success = this.gameBrain.moveAPiece(startX, startY, x, y);
                this.movePieceStartCell = null;
                this.actionACtive = null;
                if (success && this.updateUI) {
                    this.updateUI();
                }
            }

            return;
        }

        if (this.actionACtive && this.actionACtive !== "movePiece") {
            alert("Please finish this action first!")
            return;
        }

        const isValid = this.gameBrain.makeAMove(x, y);
        if (isValid && this.updateUI) {
            this.updateUI();
        }
    }
}

export const gameController = new GameController();