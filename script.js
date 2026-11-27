const cells = document.querySelectorAll(".cell");
const message = document.getElementById("status");
const resetButton = document.getElementById("reset");

let moves = 0;
let gameOver = false;

const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function hasWon(player) {
    for (let i = 0; i < winningLines.length; i++) {
        const line = winningLines[i];

        if (cells[line[0]].textContent === player &&
            cells[line[1]].textContent === player &&
            cells[line[2]].textContent === player) {
            return true;
        }
    }

    return false;
}

function playMove(cell, player) {
    cell.textContent = player;
    cell.setAttribute("aria-label", cell.getAttribute("aria-label") + ": " + player);
    moves++;

    if (hasWon(player)) {
        if (player === "X") {
            message.textContent = "You win";
        } else {
            message.textContent = "Computer wins";
        }

        gameOver = true;
    } else if (moves === cells.length) {
        message.textContent = "It's a draw!";
        gameOver = true;
    }
}

function computerTurn() {
    const emptyCells = [];

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            emptyCells.push(cells[i]);
        }
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    playMove(emptyCells[randomIndex], "O");
}

function playTurn(event) {
    const cell = event.currentTarget;

    if (gameOver || cell.textContent !== "") {
        return;
    }

    playMove(cell, "X");

    if (!gameOver) {
        computerTurn();
    }
}

function resetGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cells[i].setAttribute("aria-label", "Square " + (i + 1));
    }

    moves = 0;
    gameOver = false;
    message.textContent = "Your turn (X)";
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", playTurn);
}

resetButton.addEventListener("click", resetGame);