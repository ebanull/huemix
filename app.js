let size = 5
let moves = 0
let tiles = []
let pm = 2

const colors = ['hotpink', 'gold']
const board = document.getElementById("board")
const message = document.getElementById("message")
const reset = document.getElementById("reset")


function switchColor(color) {
    return colors[(colors.indexOf(color) + 1) % colors.length]
}

function isValid(row, col) {
    return row >= 0 && row < size && col >= 0 && col < size;
}

function switchNeighbors(row, col) {
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (isValid(newRow, newCol)) {
            const oldColor = tiles[newRow][newCol].style.backgroundColor;
            tiles[newRow][newCol].style.backgroundColor = switchColor(oldColor);
        }
    }
}

function move(row, col, counter = false) {
    if (counter) {
        moves++;
    }

    const newColor = switchColor(tiles[row][col].style.backgroundColor)
    tiles[row][col].style.backgroundColor = newColor;

    switchNeighbors(row, col);

    if (isComplete() && moves > 0) {
        setTimeout(() => {
            message.style.color = 'yellowgreen';
            message.innerHTML = `Congratulations! You completed the level in ${moves} moves!`

            if (moves < pm) {
                message.innerHTML = `Wow! You did it in ${moves} moves. Are you alien?`
            }

            reset.style.display = "block";
            board.style.pointerEvents = "none";
        }, 500);
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
    // reset
    moves = 0
    tiles = []
    pm = [1, 3, 5, 7, 9][Math.floor(Math.random() * 5)]

    board.innerHTML = ""
    board.style.pointerEvents = "auto";

    message.style.color = 'inherit';
    message.innerHTML = `Try to complete the level in ${pm} moves`

    reset.style.display = "none";


    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            const tile = document.createElement("div")
            tile.classList.add("tile")
            tile.dataset.row = i
            tile.dataset.col = j
            tile.style.backgroundColor = colors[0]
            tile.onclick = () => { move(i, j, true) }
            board.appendChild(tile)
            row.push(tile)
        }
        tiles.push(row)
    }

    for (let i = 0; i < pm; i++) {
        move(Math.floor(Math.random() * size), Math.floor(Math.random() * size))
    }
}

window.onload = run