// export function createBoard() {
//     document.body.style.background = "linear-gradient(to right, #007BFF, #00C6FF)";
//
//     let container = document.createElement("div");
//     container.style.display = "grid";
//     container.style.gridTemplateColumns = "repeat(5, 60px)";
//     container.style.gridTemplateRows = "repeat(5, 60px)";
//     container.style.gap = "5px";
//     container.style.justifyContent = "center";
//     container.style.marginTop = "50px";
//
//     for (let row = 0; row < 5; row++) {
//         for (let col = 0; col < 5; col++) {
//             let cell = document.createElement("div");
//             cell.classList.add("cell")
//
//             cell.style.width = "60px";
//             cell.style.height = "60px";
//             cell.style.border = "2px solid black";
//             cell.style.display = "flex";
//             cell.style.alignItems = "center";
//             cell.style.justifyContent = "center";
//             cell.style.fontSize = "24px";
//             cell.style.fontWeight = "bold";
//             cell.style.cursor = "pointer";
//
//             if (row >= 1 && row <= 3 && col >= 1 && col <= 3) {
//                 cell.style.background = "#ffe6e6";
//                 cell.style.borderColor = "red";
//             }
//
//             container.appendChild(cell);
//         }
//     }
//
//     document.body.appendChild(container);
// }