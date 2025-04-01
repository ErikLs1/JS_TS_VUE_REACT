import {gameController} from "../ui/GameController.ts";
import {isAITurn} from "../ui/main.ts";
import {performAIMove} from "../ai/AiGameBrain.ts";

const MOVE_TIME_SECONDS = 15;
let moveTimerInterval: number | undefined;
let remainingTime: number = MOVE_TIME_SECONDS;

export function startMoveTimer(): void {
    remainingTime = MOVE_TIME_SECONDS;
    updateTimerDisplay();

    if (moveTimerInterval) {
        clearInterval(moveTimerInterval);
    }

    moveTimerInterval = window.setInterval(() => {
        remainingTime--;
        updateTimerDisplay();

        if (remainingTime <= 0) {
            clearInterval(moveTimerInterval);
            if (isAITurn()) {
                performAIMove();
            } else {
                makeRandomMove();
            }
        }
    }, 1000);
}

export function resetMoveTimer(): void {
    startMoveTimer();
}

export function updateTimerDisplay(): void {
    const timerContainer = document.getElementById("timer-container");
    if (timerContainer) {
        timerContainer.textContent = `Time remaining: ${remainingTime} seconds`;
    }
}

export function stopMoveTimer(): void {
    if (moveTimerInterval) {
        clearInterval(moveTimerInterval);
    }
}

export function makeRandomMove(): void {
    if (gameController.gameBrain.gameOver) return;

    const validCells = gameController.gameBrain.emptyCellsCoordinatesInGrid();
    if (validCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * validCells.length);
        const {x, y} = validCells[randomIndex];

        gameController.gameBrain.makeAMove(x, y);
    } else {
        alert("No valid moves available")
    }

    gameController.updateUI?.();
}