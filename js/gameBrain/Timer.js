import {isAITurn} from "../ui/main.js";
import {performAIMove} from "../ai/AiGameBrain.js";
import {gameController} from "../ui/GameController.js";
// import {performAIMove} from "./AIActions.js";

let moveTimerInterval;
const MOVE_TIME_SECONDS = 15;
let remainingTime = MOVE_TIME_SECONDS;

export function startMoveTimer() {
    remainingTime = MOVE_TIME_SECONDS;
    updateTimerDisplay();

    if (moveTimerInterval) {
        clearInterval(moveTimerInterval);
    }
    moveTimerInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();
        if (remainingTime <= 0) {
            clearInterval(moveTimerInterval);
            if (isAITurn()) {
                performAIMove()
            } else {
                makeRandomMove();
            }
        }
    }, 1000);

}

export function resetMoveTimer() {
    startMoveTimer();
}

export function updateTimerDisplay() {
    const timerContainer = document.getElementById("timer-container");
    if (timerContainer) {
        timerContainer.textContent = `Time remaining: ${remainingTime} seconds`;
    }
}

export function stopMoveTimer() {
    if (moveTimerInterval) {
        clearInterval(moveTimerInterval);
    }
}

export function makeRandomMove() {
    if (gameController.gameBrain.gameOver) return;

    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    if (validCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * validCells.length);
        const {x, y} = validCells[randomIndex];

        gameController.gameBrain.makeAMove(x, y);
    } else {
        alert("No valid moves available")
    }

    gameController.updateUI();
}