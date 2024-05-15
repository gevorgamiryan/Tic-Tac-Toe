let container = document.querySelector(".container"); // Получаем ссылку на контейнер игры.
let reset = document.getElementById("reset"); // Получаем ссылку на кнопку сброса.
let area = [...document.querySelectorAll(".area")]; // Получаем ссылки на все области игры.

let xWinSum = 0; // X victory counter.
let nolWinSum = 0; // O victory counter.
let gameOver = false; // Game end flag.
let wins = [ // Options for winning combinations.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 3, 6],
];
// Indexes of occupied cells with X's and O's.
let xW = [];
let nolW = [];
// Variable to determine whose move it is.
let isTrue = true;

// Add click handlers to each area of the game.
area.forEach((el, index) => {
    board.appendChild(el);// Add a cell to the board.
    el.addEventListener("click", () => {
        currentTurn(el, index); // Call the function to process the current move.
    })
});

// Function for processing the current move.
function currentTurn(el, index) {
    if (el.innerHTML.length !== 0) return; // If the cell is already occupied, exit the function.
    if (gameOver) return overGame(); // If the game is over, end the game.

    isTrue = !isTrue; // Change the player.
    let element = document.createElement("div"); // Create an element for the cross or zero.
    element.id = isTrue ? "nol" : "x"; // Set the id depending on the player.
    element.innerText = isTrue ? "O" : "X";// Set the text depending on the player.
    el.append(element); // Add an element to the cell.
    isTrue ? nolW.push(index) : xW.push(index); // Добавляем индекс занятой клетки в массив текущего игрока.
    return winner();// Check for a winner.
}

// Function to check for a winner.
function winner() {
    const currentPlayerWinsArray = isTrue ? nolW : xW; // Массив занятых клеток текущего игрока.
    let sum = 0; // Match counter.
    for (let i = 0; i < wins.length; i++) {
        for (let j = 0; j < currentPlayerWinsArray.length; j++) {
            if (wins[i].includes(currentPlayerWinsArray[j])) {
                sum++; //Increase the hit counter.
            }
            if (sum == 3) {
                let countState = document.querySelector(`.count > ${isTrue ? ".O" : ".X"} > span`); // Находим элемент для обновления счетчика.
                countState.innerHTML = +countState.innerHTML + 1; // Увеличиваем счетчик побед текущего игрока.
                wins[i].forEach((el, index) => {
                    area[el].classList.add("winnerLine"); // Highlight the winning line.
                });
                gameOver = true; // Set the game end flag.
                setTimeout(() => {
                    overGame();// End the game after a short delay.
                }, 300);
            };
        }
        sum = 0; // Reset the hit counter.
    }

};

// Function to end the game.
function overGame() {
    gameOver = false;// Reset the game end flag.
    isTrue = true;// Set the player's order to the initial one.
    nolW = [];// Clear the array of occupied cells with zeros.
    xW = []; // Clear the array of occupied cells with crosses.
    area.forEach((el) => {
        el.innerHTML = ""; // Clear the contents of the cells.
        el.classList.remove("winnerLine"); // Remove the highlighting of the winning line.
    })
}

// Add a click handler to the reset button.
reset.addEventListener("click", () => {
    overGame(); // End the game.
})
