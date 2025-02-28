import {GameState} from "./GameState.js";

export class TicTacTwoBrain {
    constructor(gameState) {
        this._gameState = gameState;
        this._gameConfig = gameState.gameConfig;
        this._gameBoard = gameState.gameBoard;
        this._nextMoveBy = gameState.nextMoveBy;
        this._gridPostion = { x: gameState.gridPositionX, y: gameState.gridPositionY};
        this.moveCount = gameState.moveCount;
        this.movePieceAfterNMoves = this._gameConfig.movePieceAfterNMoves;
        this.gameOver = false;
    }

    // Initialize the brain
    static TicTacTwoBrainConfig(gameConfig, startingPlayer = 'X') {
        const board = [];
        for (let x = 0; x < gameConfig.boardSizeWidth; x++) {
            board[x] = new Array(gameConfig.boardSizeHeight).fill('Empty');
        }

        const gameState = new GameState(board, gameConfig);
        gameState.nextMoveBy = startingPlayer;
        gameState.gridPositionX = Math.floor((gameConfig.boardSizeWidth - gameConfig.gridWidth) / 2);
        gameState.gridPositionY = Math.floor((gameConfig.boardSizeWidth - gameConfig.gridHeight) / 2);

        return new TicTacTwoBrain(gameState);
    }

    get gameBoard() {
        return this._gameBoard.map(row => [...row]);
    }

    makeAMove(x, y) {
        if (this.gameOver) {
            console.warn("Game over!")
            return false;
        }

        if (this._gameBoard[x][y] !== 'Empty') {
            return false;
        }

        const currentPLayer = this._nextMoveBy;
        this._gameBoard[x][y] = currentPLayer;
        this.moveCount++;


        if (this.checkForWin(x, y, currentPLayer)) {
            console.log(`${currentPLayer} wins!`);
            this.gameOver = true;
        } else {
            this._nextMoveBy = currentPLayer === 'X' ? 'O' : 'X';
        }

        return true;
    }

    checkForWin(x, y, player) {
        const gridLeft = this._gameState.gridPositionX;
        const gridTop = this._gameState.gridPositionY;
        const gridRight = gridLeft + this._gameConfig.gridWidth;
        const gridBottom = gridTop + this._gameConfig.gridHeight;

        if (!(x >= gridLeft && x < gridRight && y >= gridTop && y < gridBottom)) {
            return false;
        }

        const winCondition = this._gameConfig.winCondition;
        const directions = [
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 }
        ];

        for (const {dx, dy} of directions) {
            const count = 1 +
                this.countInDirection(x, y, dx, dy, player, gridLeft, gridTop, gridRight, gridBottom) +
                this.countInDirection(x, y, -dx, -dy, player, gridLeft, gridTop, gridRight, gridBottom);

            if (count >= winCondition) {
                return true;
            }
        }

        return false;
    }

    countInDirection(x, y, dx, dy, player, gridLeft, gridTop, gridRight, gridBottom) {
        let count = 0;
        let nx = x + dx;
        let ny = y + dy;

        while (nx >= 0 && ny >= 0 &&
            nx < this._gameConfig.boardSizeWidth &&
            ny < this._gameConfig.boardSizeHeight &&
            nx >= gridLeft && nx < gridRight &&
            ny >= gridTop && ny < gridBottom &&
            this._gameBoard[nx][ny] === player) {
            count++;
            nx += dx;
            ny += dy;
        }

        return count;
    }
}