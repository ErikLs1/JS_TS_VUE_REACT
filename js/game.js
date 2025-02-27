export function createBoard(gameMode) {
    let container = document.createElement("div");
    container.classList.add("grid-container");

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (row >= 1 && row <= 3 && col >= 1 && col <= 3) {
                cell.classList.add("inner")
            }
            container.appendChild(cell);
        }
    }
    return container;
}