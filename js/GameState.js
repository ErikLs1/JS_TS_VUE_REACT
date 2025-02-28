export class GameState {
    constructor(gameBoard, gameConfig) {
        this.gameBoard = gameBoard;
        this.gameConfig = gameConfig;
        this.nextMoveBy = 'X';
        this.moveCount = 0;
        this.gridPositionX = 0;
        this.gridPositionY = 0;
    }

    toJSON() {
        return JSON.stringify({
            gameBoard: this.gameBoard,
            gameConfig: this.gameConfig,
            nextMoveBy: this.nextMoveBy,
            moveCount: this.moveCount,
            gridPositionX: this.gridPositionX,
            gridPositionY: this.gridPositionY
        });
    }
}