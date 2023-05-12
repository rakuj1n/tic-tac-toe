/*----- constants -----*/
let PLAYER_VALUE = {
    playerA: "#E7CBCB",
    playerB: "#99627A",
}


/*----- state variables -----*/

let game = {
    turn: null,
    winner: null,
    board: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
}

/*----- cached elements  -----*/
let tile = document.querySelectorAll(".tile")
console.log(tile)
let resetButton = document.querySelector("#resetButton")

/*----- event listeners -----*/
for (let x of tile) {
    x.addEventListener("click",handleClickTile)
}

resetButton.addEventListener("click", handleReset)


/*----- event functions -----*/
function handleClickTile(e) {
    let tileCoord = e.target.getAttribute("id")
    if (game.winner != null) {return}
    if (game.turn === "playerA") {
        if (e.target.getAttribute("style")) {return}
        if (tileCoord == "[0][0]") {game.board[0][0] = 1}
        if (tileCoord == "[0][1]") {game.board[0][1] = 1}
        if (tileCoord == "[0][2]") {game.board[0][2] = 1}
        if (tileCoord == "[1][0]") {game.board[1][0] = 1}
        if (tileCoord == "[1][1]") {game.board[1][1] = 1}
        if (tileCoord == "[1][2]") {game.board[1][2] = 1}
        if (tileCoord == "[2][0]") {game.board[2][0] = 1}
        if (tileCoord == "[2][1]") {game.board[2][1] = 1}
        if (tileCoord == "[2][2]") {game.board[2][2] = 1}
        checkWinner()
        render()
        console.log(e.target.getAttribute("id"))
        console.log(game)
        return game.turn = "playerB"
    }
    if (game.turn === "playerB") {
        if (e.target.getAttribute("style")) {return}
        if (tileCoord == "[0][0]") {game.board[0][0] = -1}
        if (tileCoord == "[0][1]") {game.board[0][1] = -1}
        if (tileCoord == "[0][2]") {game.board[0][2] = -1}
        if (tileCoord == "[1][0]") {game.board[1][0] = -1}
        if (tileCoord == "[1][1]") {game.board[1][1] = -1}
        if (tileCoord == "[1][2]") {game.board[1][2] = -1}
        if (tileCoord == "[2][0]") {game.board[2][0] = -1}
        if (tileCoord == "[2][1]") {game.board[2][1] = -1}
        if (tileCoord == "[2][2]") {game.board[2][2] = -1}
        checkWinner()  
        render()
        console.log(e.target.getAttribute("id"))
        console.log(game)  
        return game.turn = "playerA"
    }
}

function init() {
    game.turn = "playerA"
    console.log(game)
}

function checkWinner() {
    //horizontal
    for (let x of game.board) {
        let total = 0
        for (let y of x) {
            total += y
        }
        if (total === 3) {game.winner = "playerA"}
        if (total === -3) {game.winner = "playerB"}
    }
    //vertical
    for (let i = 0; i < 3; i++) {
        let total = game.board[0][i] + game.board[1][i] + game.board[2][i]
        if (total === 3) {game.winner = "playerA"}
        if (total === -3) {game.winner = "playerB"}
    }
    //diagonals
    if (game.board[0][0] + game.board[1][1] + game.board[2][2] === 3) {game.winner = "playerA"}
    if (game.board[0][0] + game.board[1][1] + game.board[2][2] === -3) {game.winner = "playerB"}
    if (game.board[0][2] + game.board[1][1] + game.board[2][0] === 3) {game.winner = "playerA"}
    if (game.board[0][2] + game.board[1][1] + game.board[2][0] === -3) {game.winner = "playerB"}
    //draw
    let nullNum = null
    for (let x of game.board) {
        for (let y of x) {
            if (y === 0)
            nullNum += 1
        }
    }
    if (nullNum === null && game.winner === null) {game.winner = "draw"}
}

function handleReset() {
        game.turn = "playerA"
        game.winner = null
        game.board = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
        render()
        console.log(game)
}

/*----- render functions -----*/
function render() {
    renderBoard();
    renderWinner();
}

function renderBoard() {
    for (let x of tile) {
        x.removeAttribute("style")
    }
    for (let i = 0; i < game.board.length; i++) {
        for (let j = 0; j < game.board[0].length; j++) {
            if (game.board[i][j] === 1) {
                document.getElementById(`[${i}][${j}]`).style.backgroundColor = PLAYER_VALUE.playerA
            }
            if (game.board[i][j] === -1) {
                document.getElementById(`[${i}][${j}]`).style.backgroundColor = PLAYER_VALUE.playerB
            }
        }
    }
}

function renderWinner() {
    document.querySelector("p").innerText = ""
    if (game.winner === null) {return}
    if (game.winner === "playerA") {
        document.querySelector("p").style.color = PLAYER_VALUE.playerA
    }
    if (game.winner === "playerB") {
        document.querySelector("p").style.color = PLAYER_VALUE.playerB
    }
    if (game.winner === "draw") {
        document.querySelector("p").innerText = "It's a " + game.winner + "..."
    } else {
    document.querySelector("p").innerText = game.winner + " wins!"
    }
}

init()