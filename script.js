const gridElement = document.getElementById('grid');
const betAmountInput = document.getElementById('betAmount');
const resultDiv = document.getElementById('result');
const startGameButton = document.getElementById('startGame');

let cells = [];
const NUM_CELLS = 25;
const NUM_MINES = 5;

function createGrid() {
    gridElement.innerHTML = '';
    cells = [];

    for (let i = 0; i < NUM_CELLS; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        gridElement.appendChild(cell);
        cells.push(cell);
    }

    placeMines();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const randomIndex = Math.floor(Math.random() * NUM_CELLS);
        if (!cells[randomIndex].classList.contains('mine')) {
            cells[randomIndex].classList.add('mine');
            minesPlaced++;
        }
    }
}

function handleCellClick(index) {
    const betAmount = parseFloat(betAmountInput.value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        resultDiv.textContent = "Por favor, insira um valor válido para a aposta.";
        return;
    }

    const cell = cells[index];

    if (cell.classList.contains('revealed')) {
        return; // Célula já revelada
    }

    cell.classList.add('revealed');

    if (cell.classList.contains('mine')) {
        resultDiv.textContent = `Você perdeu! Aposta: R$${betAmount}. Você perdeu R$${betAmount}.`;
        revealAllMines();
    } else {
        cell.textContent = '✔'; // Marca como seguro
        const winnings = betAmount * 2; // Dobra o valor apostado
        resultDiv.textContent = `Você ganhou! Aposta: R$${betAmount}. Você ganhou R$${winnings}.`;
    }
}

function revealAllMines() {
    cells.forEach(cell => {
        if (cell.classList.contains('mine')) {
            cell.textContent = '💣'; // Mostra a mina
        }
    });
}

startGameButton.addEventListener('click', () => {
    createGrid();
    resultDiv.textContent = '';
});

