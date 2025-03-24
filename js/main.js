// import { createBoard } from "./game.js";
import { gameController} from "./GameController.js";
import { renderBoard} from "./UI.js";
import {resetMoveTimer, startMoveTimer} from "./Timer.js";

// Called when we need landing page
function showLandingPage() {
    document.body.innerHTML = "";

    let container = document.createElement("div");
    container.classList.add("main-container");

    let h1 = document.createElement("h1");
    h1.innerHTML = "TIC TAC TWO";
    h1.classList.add("fw-bold", "text-dark", "text-center", "mb-4");
    container.appendChild(h1);

    function createButton(text, onClick) {
        let button = document.createElement("button");
        button.innerHTML = text;
        button.classList.add("fw-bold", "text-dark", "btn", "btn-light", "mb-2", "w-25");
        button.onclick = onClick;
        return button;
    }

    let button1 = createButton("Human VS Human", () => showGameBoard());
    let button2 = createButton("Human VS AI", () => showGameBoard());
    let button3 = createButton("AI VS AI", () => showGameBoard());

    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(button3);

    document.body.appendChild(container);
}


// Called when we need to show the grid
function showGameBoard(gameMode) {
    gameController.resetGame();
    document.body.innerHTML = "";

    const container = document.createElement("div");
    container.id = "game_container";
    container.classList.add("main-container");

    const timerContainer = document.createElement("div");
    timerContainer.id = "timer-container";
    timerContainer.classList.add("mb-3");
    container.appendChild(timerContainer);

    const newGameButton = document.createElement("button");
    newGameButton.innerHTML = "Start New Game";
    newGameButton.classList.add("fw-bold", "text-dark", "btn", "btn-light", "mt-4", "w-25", "align-center");
    newGameButton.onclick = showLandingPage;
    container.appendChild(newGameButton);

    const statusContainer = document.createElement("div");
    statusContainer.id = "status-container";
    statusContainer.classList.add("mb-3");
    container.appendChild(statusContainer);

    const boardContainer = document.createElement("div");
    boardContainer.id = "board-container";
    boardContainer.appendChild(renderBoard(gameController.gameBrain.gameBoard));
    container.appendChild(boardContainer);

    const actionContainer = document.createElement("div");
    actionContainer.id = "action-container";
    container.appendChild(actionContainer);


    document.body.appendChild(container);

    startMoveTimer();

    gameController.updateUI = () => {

        resetMoveTimer();

        const board = document.getElementById("board-container");
        if (board) {
            board.innerHTML = "";
            board.appendChild(renderBoard(gameController.gameBrain.gameBoard));
        }

        const status = document.getElementById("status-container");
        if (status) {
            if (gameController.gameBrain.gameOver) {
                status.textContent = `Winner: ${gameController.gameBrain.winner}`;
            } else {
                const currentPlayer = gameController.gameBrain.currentPlayer;
                const piecesX = gameController.gameBrain.piecesLeftForX;
                const piecesO = gameController.gameBrain.piecesLeftForO;
                status.textContent = `Move: ${currentPlayer} | Pieces left for ${currentPlayer === 'X' ? currentPlayer : 'O'}: ${currentPlayer === 'X' ? piecesX : piecesO}`;
            }
        }
        updateActionContainer();
    };
    gameController.updateUI();
}

function updateActionContainer() {
    const actionContainer = document.getElementById("action-container");
    if (!actionContainer) return;

    actionContainer.innerHTML = "";

    if (gameController.gameBrain.moveCount >= gameController.gameBrain.movePieceAfterNMoves &&
        !gameController.gameBrain.gameOver) {

        gameController.actionACtive = "choose";
        const currentPlayer = gameController.gameBrain.currentPlayer;
        const piecesLeft = currentPlayer === 'X' ? gameController.gameBrain.piecesLeftForX : gameController.gameBrain.piecesLeftForO;

        const btnMakeAMove = document.createElement("button");
        btnMakeAMove.textContent = "Make a Move";
        btnMakeAMove.classList.add("btn", "btn-primary", "m-1");

        if (piecesLeft === 0) {
            btnMakeAMove.onclick = () => {
                alert("No pieces left. Please choose another action.")
            };
        } else {
            btnMakeAMove.onclick = () => {
                actionContainer.innerHTML = "";
                gameController.actionACtive = null;
            };
        }

        actionContainer.appendChild(btnMakeAMove);

        const btnMoveTheGrid = document.createElement("button");
        btnMoveTheGrid.textContent = "Move the Grid";
        btnMoveTheGrid.classList.add("btn", "btn-primary", "m-1");
        btnMoveTheGrid.onclick = () => {
            showGridDirectionButtons(actionContainer);
            gameController.actionACtive = "grid";
        }
        actionContainer.appendChild(btnMoveTheGrid);

        const btnMovePiece = document.createElement("button");
        btnMovePiece.textContent = "Move a Piece";
        btnMovePiece.classList.add("btn", "btn-primary", "m-1");

        const piecesInGrid = gameController.gameBrain.countPiecesInGrid();

        if (piecesInGrid === 0) {
            btnMovePiece.onclick = () => {
                alert("You have no pieces inside the grid. Please choose another action.")
            };
        } else {
            btnMovePiece.onclick = () => {
                actionContainer.innerHTML = ""
                gameController.actionACtive = "movePiece";
            };
        }
        actionContainer.appendChild(btnMovePiece);
    }
}

function showGridDirectionButtons(container) {
    container.innerHTML = "";
    const directions = [
        {label: "Up"},
        {label: "Down"},
        {label: "Left"},
        {label: "Right"},
        {label: "Up-Left"},
        {label: "Up-Right"},
        {label: "Down-Left"},
        {label: "Down-Right"}
    ];

    directions.forEach(dir => {
        const btn = document.createElement("button");
        btn.textContent = dir.label;
        btn.classList.add("btn", "btn-secondary", "m-1");
        btn.onclick = () => {
            const isValidMove = gameController.gameBrain.moveGrid(dir.label);
            if (isValidMove) {
                container.innerHTML = "";
                gameController.actionACtive = false;
                gameController.updateUI();
            } else {
                alert("Cannot move grid in that direction!!");
            }
        };
        container.appendChild(btn);
    })
}

showLandingPage();
