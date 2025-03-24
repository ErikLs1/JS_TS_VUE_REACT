import {makeRandomMove} from "./AutomatedMoves.js";

let moveTimerInterval;
const MOVE_TIME_SECONDS = 1;
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
            makeRandomMove();
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