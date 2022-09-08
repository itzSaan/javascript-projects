let gameStat = JSON.parse(localStorage.getItem('gamestats'))
console.log((gameStat))

if(gameStat) {
    document.getElementById('xWonCount').innerText = gameStat.xWon
    document.getElementById('oWonCount').innerText = gameStat.oWon
    document.getElementById('tiesCount').innerText = gameStat.ties
}
 else{
    document.getElementById('xWonCount').innerText = 0
    document.getElementById('oWonCount').innerText = 0
    document.getElementById('tiesCount').innerText = 0
 }

let cells = ['', '', '', '', '', '', '', '', '']
let ticTacBoxs = document.querySelectorAll('.tic-tac-btn')
let x = `<img src="img/X.svg" alt="X">`
let o = `<img src="img/O.svg" alt="O">`
let xSmall = `<img src="img/x-small.svg" width="14" alt="X"> <b>TURN</b>`
let oSmall = `<img src="img/o-small.svg" width="14" alt="O"> <b>TURN</b>`
let currentPlayer = x
let turn = document.querySelector('.turn')
turn.innerHTML = xSmall
let modal = document.getElementById('modal')
let resultText = document.querySelector('.result-text')
let wonText = document.querySelector('.won')

let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let gameStats = {
    "xWon": 0,
    "oWon": 0,
    "ties": 0
}

let storeGameStats = () => {
    gameStats = {...gameStats}
    localStorage.setItem('gamestats', JSON.stringify(gameStats))
    console.log(gameStats)
}

let ticTacToe = (element, index) => {
    // debugger   
    element.innerHTML = currentPlayer
    element.disabled = true
    cells[index] = currentPlayer
    currentPlayer = currentPlayer === x ? o : x
    turn.innerHTML = currentPlayer === x ? xSmall : oSmall

    for(let i = 0; i < conditions.length; i++) {
        let condition = conditions[i]
        let a = cells[condition[0]]
        let b = cells[condition[1]]
        let c = cells[condition[2]]

        if(a === '' || b === '' || c === '') {
            continue
        }
        if((a === b) && (b === c)) {
            let winner = a == x ? x : o
            resultText.innerHTML = `${winner} TAKES THE ROUND`
            modal.style.display = 'grid'
            ticTacBoxs.forEach(item => item.disabled = true)
            winner == x ? gameStats.xWon++ : gameStats.oWon++            
            storeGameStats()
        }        
        
    }
    if(cells.every(item => item != '' )) {
        wonText.innerHTML = 'NO ONE WINS!'
        resultText.innerHTML = 'MATCH TIES'
        modal.style.display = 'grid'
        winCount = gameStats.ties++
        storeGameStats()
     }
}

window.onclick = (e) => {    
    if(e.target == modal) {
        modal.style.display = 'none'
    }
}

let resetGame = () => {
    ticTacBoxs.forEach(item => {
        item.innerHTML = ''
        item.disabled = false
        turn.innerHTML = xSmall
        currentPlayer = x
        cells = ['', '', '', '', '', '', '', '', '']
    })
}

let nextGame = () => {
    resetGame()
    modal.style.display = 'none'
}

document.querySelector('.next-btn').addEventListener('click', nextGame)
document.querySelector('.reset-btn').addEventListener('click', resetGame)
document.querySelector('.quit-btn').addEventListener('click', () => {
    resetGame()
    modal.style.display = 'none'
    })

ticTacBoxs.forEach((ticTac, indx) => {
    ticTac.addEventListener('click', () => ticTacToe(ticTac, indx))  
})

