// Tik Tak Toe Game

// All the query selectors are listed here
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('#status');
const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');
const resetButton = document.querySelector('#resetButton');
const gameBoard = document.querySelector('#gameBoard');
let isXTurn = true;
let board = Array(9).fill(null);
let gameActive = false;

// Combinations for the wins
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// CLick function to add X or O
function handleClick(e) {
    // Return If the game was not active (Need to press start button)
    if(!gameActive) return;

    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    if(board[cellIndex] || checkWin()) return;
    board[cellIndex] = isXTurn ? 'X' : 'O';
    cell.textContent = board[cellIndex];

    // Update Status from here
    if(checkWin()){
        statusText.textContent = `${isXTurn ? 'X' : 'O'} has won!`;
        gameActive = false;
        stopButton.disabled = true;
    } else if (board.every(cell => cell !== null)){
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        stopButton.disabled = true;
    } else {
        isXTurn = !isXTurn;
        statusText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
    }
};

// Function to check for wins
function checkWin(){
    // Check for 3 combinations in a row
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] && board[index] === board[combination[0]]);
    });
}

// Function to start the game
function startGame(){
    gameActive = true;
    isXTurn = true;
    statusText.textContent = "Player X's Turn";
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
}

// Function to stop the game
function stopGame(){
    gameActive = false;
    statusText.textContent = "Game Stopped";
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetGame(){
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    gameActive = false;
    isXTurn = true;
    statusText.textContent = "Player X's Turn";
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleClick));