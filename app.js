let size = 5
let moves = 0
let tiles = []
const colors = ['hotpink', 'gold']


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function switchColor(from) {
    return colors[(colors.indexOf(from) + 1) % colors.length]
}

function isValid(row, col) {
    return row >= 0 && row < size && col >= 0 && col < size;
}

function move(row, col) {
    const newColor = switchColor(tiles[row][col].style.backgroundColor)
    tiles[row][col].style.backgroundColor = newColor;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (isValid(newRow, newCol)) {
            const oldColor = tiles[newRow][newCol].style.backgroundColor;
            tiles[newRow][newCol].style.backgroundColor = switchColor(oldColor);
        }
    }

    moves++;

    if (isComplete() && moves > 0) {
        setTimeout(() => { alert("Поздравляю! Вы выиграли за " + moves + " ходов") }, 500);
    }
}

function isComplete() {
    const color = tiles[0][0].style.backgroundColor;
    for (const row of tiles) {
        for (const tile of row) {
            if (tile.style.backgroundColor !== color) {
                return false;
            }
        }
    }
    return true;
}

function run() {
    const board = document.getElementById("board")

    // reset
    moves = 0
    tiles = []
    board.innerHTML = ""

    // generate board
    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            const tile = document.createElement("div")
            tile.classList.add("tile")
            tile.dataset.row = i
            tile.dataset.col = j
            tile.style.backgroundColor = getRandomColor()
            tile.onclick = () => { move(i, j) }

            board.appendChild(tile)
            row.push(tile)
        }
        tiles.push(row)
    }
}


window.onload = run