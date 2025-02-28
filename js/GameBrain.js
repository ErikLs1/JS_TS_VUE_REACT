import {GameState} from "./GameState.js";

export class TicTacTwoBrain {
    constructor(gameState) {
        this._gameState = gameState;
        this._gameConfig = gameState.gameConfig;
        this._gameBoard = gameState.gameBoard;
        this._nextMoveBy = gameState.nextMoveBy;
        this._gridPostion = { x: gameState.gridPositionX, y: gameState.gridPositionY };
        this.moveCount = gameState.moveCount;
        this.movePieceAfterNMoves = this._gameConfig.movePieceAfterNMoves;
        this.gameOver = false;
        this._winner = null;
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
        gameState.gridPositionY = Math.floor((gameConfig.boardSizeHeight - gameConfig.gridHeight) / 2);

        return new TicTacTwoBrain(gameState);
    }

    get gameBoard() {
        return this._gameBoard.map(row => [...row]);
    }

    get gridPosition() {
        return {
            left: this._gameState.gridPositionX,
            top: this._gameState.gridPositionY,
            right: this._gameState.gridPositionX + this._gameConfig.gridWidth,
            bottom: this._gameState.gridPositionY + this._gameConfig.gridHeight,
        };
    }

    get currentPlayer() {
        return this._nextMoveBy;
    }

    get winner() {
        return this._winner;
    }

    isWithinBoundsGrid(x, y) {
        const gridLeft = this._gameState.gridPositionX;
        const gridTop = this._gameState.gridPositionY;
        const gridRight = gridLeft + this._gameConfig.gridWidth;
        const gridBottom = gridTop + this._gameConfig.gridHeight;
        return x >= gridLeft && x < gridRight && y >= gridTop && y < gridBottom;
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

        if (this.isWithinBoundsGrid(x, y)) {
            const winner = this.checkForWin(x, y, currentPLayer);
            if (winner) {
                alert(`${currentPLayer} wins!`);
                this.gameOver = true;
                this._winner = winner;
            } else {
                this._nextMoveBy = currentPLayer === 'X' ? 'O' : 'X';
            }

        } else {
            this._nextMoveBy = currentPLayer === 'X' ? 'O' : 'X';
        }
        return true;
    }

    checkForWin(x, y, piece) {
        if (!this.isWithinBoundsGrid(x, y)) {
            return null;
        }

        const directions = [
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 }
        ];

        for (const { dx, dy } of directions) {
            const count =
                1 +
                this.countInDirection(x, y, dx, dy, piece) +
                this.countInDirection(x, y, -dx, -dy, piece);
            if (count >= this._gameConfig.winCondition) {
                return piece;
            }
        }
        return null;
    }

    countInDirection(x, y, dx, dy, piece) {
        let count = 0;
        let nx = x + dx;
        let ny = y + dy;
        while (this.isWithinBoundsGrid(nx, ny) && this._gameBoard[nx][ny] === piece) {
            count++;
            nx += dx;
            ny += dy;
        }
        return count;
    }

    moveGrid(dx, dy) {
        const boardWidth = this._gameConfig.boardSizeWidth;
        const boardHeight = this._gameConfig.boardSizeHeight;
        const gridWidth = this._gameConfig.gridWidth;
        const gridHeight = this._gameConfig.gridHeight;
        const targetX = this._gridPostion.x + dx;
        const targetY = this._gridPostion.y + dy;

        if (
            targetX >= 0 &&
            targetX <= boardWidth - gridWidth &&
            targetY >= 0 &&
            targetY <= boardHeight - gridHeight
        )  {
            this._gridPostion.x = targetX;
            this._gridPostion.y = targetY;
            this._gameState.gridPositionX = targetX;
            this._gameState.gridPositionY = targetY;

            const currentPlayer = this._nextMoveBy;
            this._nextMoveBy = currentPlayer === 'X' ? 'O' : 'X';

            const winner  = this.checkForWin(targetX, targetY, currentPlayer);
            if (winner) {
                alert(`${winner} wins!!`)
                this.gameOver = true;
                this._winner = winner;
            }
            return true;
        }
        return false;
    }
}