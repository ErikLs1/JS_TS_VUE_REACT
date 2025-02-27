import { createBoard } from "./game.js";

// Called when we need landing page
function showLandingPage() {
    document.body.innerHTML = "";
    let container = document.createElement("div");
    container.classList.add("main-container");

    let h1 = document.createElement("h1");
    h1.innerHTML = "TIC TAC TWO";
    h1.classList.add("fw-bold", "text-dark", "text-center", "mb-4");
    container.appendChild(h1);

    function createButton(text, gameMode) {
        let button = document.createElement("button");
        button.innerHTML = text;
        button.classList.add("fw-bold", "text-dark", "btn", "btn-light", "mb-2", "w-25");
        button.onclick = () => showGameBoard(gameMode);
        return button;
    }

    let button1 = createButton("Human VS Human", "human-human");
    let button2 = createButton("Human VS AI","human-ai");
    let button3 = createButton("AI VS AI", "ai-ai");

    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(button3);

    document.body.appendChild(container);
}


// Called when we need to show the grid
function showGameBoard(gameMode) {
    document.body.innerHTML = "";

    let gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");

    let newGameButton = document.createElement("button");
    newGameButton.innerHTML = "Start New Game";
    newGameButton.classList.add("fw-bold", "text-dark", "btn", "btn-light", "mt-4", "w-25", "align-center");
    newGameButton.onclick = showLandingPage;

    let gridContainer = createBoard(gameMode);

    gameContainer.appendChild(newGameButton);
    gameContainer.appendChild(gridContainer);

    document.body.appendChild(gameContainer);
}

showLandingPage();
