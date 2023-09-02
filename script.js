const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let isGameOver = false;
const cells = [];

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],  
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            isGameOver = true;
            return cells[a];
        }
    }

    if (!cells.includes('')) {
        isGameOver = true;
        return 'draw';
    }

    return null;
}

function handleClick(index) {
    if (!isGameOver && cells[index] === '') {
        cells[index] = currentPlayer;
        board.children[index].textContent = currentPlayer;
        const winner = checkWin();
        if (winner) {
            if (winner === 'draw') {
                message.textContent = "It's a draw!";
            } else {
                message.textContent = `Player ${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    cells.length = 0;
    currentPlayer = 'X';
    isGameOver = false;
    board.innerHTML = '';
    message.textContent = `Player ${currentPlayer}'s turn`;
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleClick(i));
        cells.push('');
        board.appendChild(cell);
    }
}

resetButton.addEventListener('click', resetGame);

resetGame();
