const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';

// Load images
const xImage = new Image();
xImage.src = 'x.png'; // Ensure you have an x.png file in your public directory
const oImage = new Image();
oImage.src = 'o.png'; // Ensure you have an o.png file in your public directory

// Draw the grid
function drawGrid() {
    context.lineWidth = 2;
    context.strokeStyle = '#333';

    // Draw vertical lines
    context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(100, 300);
    context.moveTo(200, 0);
    context.lineTo(200, 300);
    context.stroke();

    // Draw horizontal lines
    context.beginPath();
    context.moveTo(0, 100);
    context.lineTo(300, 100);
    context.moveTo(0, 200);
    context.lineTo(300, 200);
    context.stroke();
}

// Draw X or O
function drawSymbol(x, y, player) {
    if (player === 'X') {
        context.drawImage(xImage, x * 100, y * 100, 100, 100);
    } else if (player === 'O') {
        context.drawImage(oImage, x * 100, y * 100, 100, 100);
    }
}

// Check for a win or draw
function checkWin() {
    const winningCombinations = [
        // Rows
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
        [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
        [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
        // Columns
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
        [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
        [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
        // Diagonals
        [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
        [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a.y][a.x] && board[a.y][a.x] === board[b.y][b.x] && board[a.y][a.x] === board[c.y][c.x]) {
            return board[a.y][a.x];
        }
    }

    if (board.flat().every(cell => cell)) {
        return 'Draw';
    }

    return null;
}

// Handle canvas click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 100);
    const y = Math.floor((event.clientY - rect.top) / 100);

    if (!board[y][x]) {
        board[y][x] = currentPlayer;
        drawSymbol(x, y, currentPlayer);

        const winner = checkWin();
        if (winner) {
            setTimeout(() => alert(winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`), 10);
            board.forEach(row => row.fill(''));
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});

drawGrid();