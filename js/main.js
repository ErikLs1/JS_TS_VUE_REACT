// import {createBoard} from "./game";



    // Heading
    document.body.style.background = "linear-gradient(to right, #007BFF, #00C6FF)";
    document.body.style.height = "100vh";
    document.body.style.margin = "0";

    let container = document.createElement("div");
    container.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center", "vh-100");

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

    let button1 = createButton("Human VS Human", () => createBoard());
    let button2 = createButton("Human VS AI", () => createBoard());
    let button3 = createButton("AI VS AI", () => createBoard());

    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(button3);

    document.body.appendChild(container);
