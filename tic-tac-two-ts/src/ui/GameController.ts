import {GameConfig} from "../gameBrain/GameConfig.ts";
import {TicTacTwoBrain} from "../gameBrain/GameBrain.ts";
import {isAITurn} from "./main.ts";

export class GameController {
    public gameBrain!: TicTacTwoBrain;
    public updateUI: (() => void) | null;
    public actionActive: "choose" | "grid" | "movePiece" | false | null;
    public movePieceStartCell: { x: number; y: number } | null;

    constructor() {
        this.resetGame();
        this.updateUI = null;
        this.actionActive = null;
        this.movePieceStartCell = null;
    }

    public resetGame(): void {
        const config = new GameConfig("TIC TAC TWO");
        this.gameBrain = TicTacTwoBrain.TicTacTwoBrainConfig(config, 'X');
        this.actionActive = false;
        this.movePieceStartCell = null;
    }

    public handleCellClick(x: number, y: number): void {
        if (isAITurn()) {
            return;
        }

        // Check is winner exists for this game.
        if (gameController.gameBrain.gameOver) {
            alert("Please start new game. There is winner for this game.")
            return;
        }

        // Check if user chose the action
        if (this.actionActive === "choose") {
            alert("Please choose action before making a move!!");
            return;
        }

        // If user chose to move the grid, block the cells
        if (this.actionActive === "grid") {
            alert("You can only move the grid!!");
            return;
        }

        if (this.actionActive === "movePiece") {
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

                const {x: startX, y: startY} = this.movePieceStartCell;
                const success = this.gameBrain.moveAPiece(startX, startY, x, y);
                this.movePieceStartCell = null;
                this.actionActive = null;
                if (success && this.updateUI) {
                    this.updateUI();
                }
            }
            return;
        }

        const isValid = this.gameBrain.makeAMove(x, y);
        if (isValid && this.updateUI) {
            this.updateUI();
        }
    }
}

export const gameController = new GameController();