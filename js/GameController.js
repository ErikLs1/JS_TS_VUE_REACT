import {TicTacTwoBrain} from "./GameBrain.js";
import {GameConfig} from "./GameConfig.js";

class GameController {
    constructor() {
        this.resetGame();
        this.updateUI = null;
    }

    resetGame() {
        const config = new GameConfig("TIC TAC TWO");
        this.gameBrain = TicTacTwoBrain.TicTacTwoBrainConfig(config, 'X');
    }

    handleCellClick(x, y) {
        const isValid = this.gameBrain.makeAMove(x, y);
        if (isValid) {
            if (this.updateUI) {
                this.updateUI();
            } else {
                console.warn("Invalid Move");
            }
        }
    }
}

export const gameController = new GameController();