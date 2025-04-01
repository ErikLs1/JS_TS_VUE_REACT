export class GameState {
    constructor(gameBoard, gameConfig) {
        this.gameBoard = gameBoard;
        this.gameConfig = gameConfig;
        this.nextMoveBy = 'X';
        this.moveCount = 0;
        this.gridPositionX = 0;
        this.gridPositionY = 0;
        this.piecesLeftForX = 6;
        this.piecesLeftForO = 6;
    }
}