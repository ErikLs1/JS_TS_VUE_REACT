export class GameConfig {
    constructor(
        name = "TIC TAC TWO",
        boardSizeWidth = 5,
        boardSizeHeight = 5,
        gridWidth = 3,
        gridHeight = 3,
        winCondition = 3,
        movePieceAfterNMoves = 4
    ) {
        this.name = name;
        this.boardSizeWidth = boardSizeWidth;
        this.boardSizeHeight= boardSizeHeight;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.winCondition = winCondition;
        this.movePieceAfterNMoves = movePieceAfterNMoves;
    }
}