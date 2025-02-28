import {TicTacTwoBrain} from "./GameBrain.js";
import {GameConfig} from "./GameConfig.js";

class GameController {
    constructor() {
        this.resetGame();
        this.updateUI = null;
        this.actionACtive = false;
    }

    resetGame() {
        const config = new GameConfig("TIC TAC TWO");
        this.gameBrain = TicTacTwoBrain.TicTacTwoBrainConfig(config, 'X');
        this.actionACtive = false;
    }

    handleCellClick(x, y) {
        if (this.actionACtive) {
            alert("Choose the action");
            return;
        }

        const isValid = this.gameBrain.makeAMove(x, y);
        if (isValid) {
            if (this.updateUI) {
                this.updateUI();
            } else {
                alert("Invalid Move");
            }
        }
    }
}

export const gameController = new GameController();