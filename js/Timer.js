import {makeRandomMove} from "./AutomatedMoves.js";
import {isAITurn} from "./main.js";
import {performAIMove} from "./AIActions.js";

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