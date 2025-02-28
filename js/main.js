// import { createBoard } from "./game.js";
import { gameController} from "./GameController.js";
import { renderBoard} from "./UI.js";

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

    const newGameButton = document.createElement("button");
    newGameButton.innerHTML = "Start New Game";
    newGameButton.classList.add("fw-bold", "text-dark", "btn", "btn-light", "mt-4", "w-25", "align-center");
    newGameButton.onclick = showLandingPage;
    container.appendChild(newGameButton);

    const boardContainer = document.createElement("div");
    boardContainer.id = "board-container";
    boardContainer.appendChild(renderBoard(gameController.gameBrain.gameBoard));
    container.appendChild(boardContainer);

    document.body.appendChild(container);

    gameController.updateUI = () => {
        const board = document.getElementById("board-container");
        if (board) {
            board.innerHTML = "";
            board.appendChild(renderBoard(gameController.gameBrain.gameBoard));
        }
    }
}

showLandingPage();
