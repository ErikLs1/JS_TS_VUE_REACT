import {GameState} from "./GameState.js";

export class TicTacTwoBrain {
    constructor(gameState) {
        this._gameState = gameState;
        this._gameConfig = gameState.gameConfig;
        this._gameBoard = gameState.gameBoard;
        this._nextMoveBy = gameState.nextMoveBy;
        this._gridPostion = {
            x: gameState.gridPositionX,
            y: gameState.gridPositionY
        };
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

    get currentPlayer() {
        return this._nextMoveBy;
    }

    get winner() {
        return this._winner;
    }

    get piecesLeftForX() {
        return this._gameState.piecesLeftForX;
    }

    get piecesLeftForO() {
        return this._gameState.piecesLeftForO;
    }

    get winCondition() {
        return this._gameConfig.winCondition;
    }

    get boardSizeWidth() {
        return this._gameConfig.boardSizeWidth;
    }

    get boardSizeHeight() {
        return this._gameConfig.boardSizeHeight;
    }

    get gridCenter() {
        const startX = Math.floor((this._gameConfig.boardSizeWidth - this._gameConfig.gridWidth) / 2);
        const startY = Math.floor((this._gameConfig.boardSizeHeight - this._gameConfig.gridHeight) / 2);
        return {startX, startY};
    }

    get gridPosition() {
        const left = this._gridPostion.x;
        const top = this._gridPostion.y;
        const right = left + this._gameConfig.gridWidth;
        const bottom = top + this._gameConfig.gridHeight;
        return { left, top, right, bottom };
    }

    getPiece(x, y) {
        return this._gameBoard[x][y];
    }

    isWithinBounds(x, y) {
        let boardWidth = this._gameConfig.boardSizeWidth;
        let boardHeight = this._gameConfig.boardSizeHeight;

        return x >= 0 && x < boardWidth && y >= 0 && y < boardHeight;
    }

    isWithinBoundsGrid(x, y) {
        const gridPosition = this._gridPostion;

        const gridLeft = gridPosition.x;
        const gridTop = gridPosition.y
        const gridRight = gridLeft + this._gameConfig.gridWidth;
        const gridBottom = gridTop + this._gameConfig.gridHeight;
        return x >= gridLeft && x < gridRight &&
               y >= gridTop && y < gridBottom;
    }

    makeAMove(x, y) {
        if (this.gameOver) {
            console.warn("Game over!")
            return false;
        }

        if (this.currentPlayer === 'X' && this._gameState.piecesLeftForX === 0) {
            alert("No pieces left for X. Please choose a piece from the board and move the grid")
            return false;
        }

        if (this.currentPlayer === 'O' && this._gameState.piecesLeftForO === 0) {
            alert("No pieces left for O. Please choose a piece from the board and move the grid")
            return false;
        }

        if (this._gameBoard[x][y] !== 'Empty') {
            return false;
        }

        const currentPlayer = this._nextMoveBy;
        this._gameBoard[x][y] = currentPlayer;

        const winner = this.checkForWin(x, y, currentPlayer);

        if (winner) {
            alert(`${currentPlayer} wins!`);
            this.gameOver = true;
            this._winner = currentPlayer;
        } else {
            if (this.currentPlayer === 'X') {
                this._gameState.piecesLeftForX--;
            } else {
                this._gameState.piecesLeftForO--;
            }
            this._nextMoveBy = currentPlayer === 'X' ? 'O' : 'X';
        }

        this.moveCount++;

        return true;
    }

    countPiecesInGrid(player = this.currentPlayer) {
        const grid = this.gridPosition;
        let count = 0;
        const board = this.gameBoard;
        for (let x = grid.left; x < grid.right; x++) {
            for (let y = grid.top; y < grid.bottom; y++) {
                if (board[x][y] === player) {
                    count++;
                }
            }
        }
        return count;
    }

    emptyCellsCoordinatesInGrid() {
        const grid = this.gridPosition;
        const  board = this.gameBoard;
        const validCells = [];

        for (let x = grid.left; x < grid.right; x++) {
            for (let y = grid.top; y < grid.bottom; y++) {
                if (board[x][y] === 'Empty') {
                    validCells.push({x, y})
                }
            }
        }

        return validCells;
    }


    checkForWin(x, y, piece) {
        if (!this.isWithinBoundsGrid(x, y)) {
            return null;
        }

        if (
            this.checkDirection(x, y, 1, 0, piece) ||
            this.checkDirection(x, y, 0, 1, piece) ||
            this.checkDirection(x, y, 1, 1, piece) ||
            this.checkDirection(x, y, 1, -1, piece)
        ) {
            const timerContainer = document.getElementById("timer-container");
            if (timerContainer) {
                timerContainer.remove();
            }
            return piece;
        }

        return null;
    }

    checkDirection(x, y, deltaX, deltaY, piece) {
        let count = 1;

        count += this.countInDirection(x, y, deltaX, deltaY, piece);
        count += this.countInDirection(x, y, -deltaX, -deltaY, piece);

        return count >= this._gameConfig.winCondition;
    }

    countInDirection(x, y, deltaX, deltaY, piece) {
        let count = 0;

        for (let i = 1; i < this._gameConfig.winCondition; i++) {
            let checkX = x + i * deltaX;
            let checkY = y + i * deltaY;

            if (
                checkX >= 0 && checkX < this._gameConfig.boardSizeWidth &&
                checkY >= 0 && checkY < this._gameConfig.boardSizeHeight &&
                this.isWithinBoundsGrid(checkX, checkY) &&
                this._gameBoard[checkX][checkY] === piece
            ) {
                count++;
            } else {
                break;
            }
        }

        return count;

    }

    canMoveGrid(directionX, directionY) {
        let targetX = this._gridPostion.x + directionX;
        let targetY = this._gridPostion.y + directionY;

        if (
            targetX >= 0 && targetX <= this._gameConfig.boardSizeWidth - this._gameConfig.gridWidth &&
            targetY >= 0 && targetY <= this._gameConfig.boardSizeHeight - this._gameConfig.gridHeight
        ) {
            this._gridPostion.x = targetX;
            this._gridPostion.y = targetY;
            this._nextMoveBy = this._nextMoveBy === 'X' ? 'O' : 'X';
            return true;
        }

        alert("Cannot move the grid in this direction!");
        return false;
    }

    moveGrid(direction) {
        switch (direction) {
            case "Up":
                return this.canMoveGrid(-1, 0);
            case "Down":
                return this.canMoveGrid(1, 0);
            case "Left":
                return this.canMoveGrid(0, -1);
            case "Right":
                return this.canMoveGrid(0, 1);
            case "Up-Left":
                return this.canMoveGrid(-1, -1);
            case "Up-Right":
                return this.canMoveGrid(-1, 1);
            case "Down-Left":
                return this.canMoveGrid(1, -1);
            case "Down-Right":
                return this.canMoveGrid(1, 1);
            default:
                return false;
        }
    }

    moveAPiece(startX, startY, targetX, targetY) {
        if (this.gameOver) {
            alert("Game is over!");
            return false;
        }

        const currentPlayer = this._nextMoveBy;

        if (this._gameBoard[startX][startY] === currentPlayer) {
            this._gameBoard[startX][startY] = "Empty";
            this._gameBoard[targetX][targetY] = currentPlayer;

            if (this.checkForWin(targetX, targetY, currentPlayer) != null) {
                alert(`${currentPlayer} wins!!`)
                this.gameOver = true;
                this._winner = currentPlayer;
                return true;
            }

            this._nextMoveBy = currentPlayer === "X" ? "O" : "X";

            this.moveCount++;
        } else {
            alert("Invalid move!")
        }

        return true;
    }
}