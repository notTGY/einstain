const x = c.getContext('2d')
c.width = 200
c.height = 200
c.style.width = '200px'
c.style.height = '200px'

const size = 20

let k = []
window.addEventListener('keydown', e => {
  k[e.key] = 1

  if (e.key === 'h') {
    if (curX > 0 && !board[curY][curX-1]) {
      curX--
    }
  } else if (e.key === 'l') {
    if (curX < (c.width / size)-1 && !board[curY][curX+1]) {
      curX++
    }
  } else if (e.key === 'j') {
    curY++
    checkCollision()
  }
  drawBoard(board)
})

let I

let isEven = 0

let board = [[]]
for (let i = 0; i < c.height / size; i++) {
  board[i] = []
  for (let j = 0; j < c.width / size; j++) {
    board[i][j] = 0
  }
}

let curX = Math.floor(Math.random()*c.width / size)
let curY = -1

function update() {
  if (isEven && k['k']) {
    // stay in place
  } else {
    // move 1 down
    curY++
    checkCollision()
  }

  isEven = !isEven
  drawBoard(board)
  k = k.map(e => 0)
}

function checkCollision() {
  if (curY === (c.height / size)-1 || board[curY+1][curX]) {
    board[curY][curX] = 1

    tryToDeleteRow(curY)

    curX = Math.floor(c.width / size / 2)
    curY = -1
  }
}

function tryToDeleteRow(row) {
  let isZero = 0
  for (let i = 0; i < c.width / size; i++) {
    if (!board[row][i]) isZero = 1
  }
  if (!isZero) {
    console.log('deleting row')
    for (let i = row; i > 1; i--) {
      for (let j = 0; j < c.width / size; j++) {
        board[i][j] = board[i-1][j]
      }
    }
    for (let j = 0; j < c.width / size; j++) {
      board[0][j] = 0
    }
  }
}

function drawBoard(bd) {
  x.clearRect(0, 0, c.width, c.height)
  x.fillStyle = '#000'
  for (let i = 0; i < c.height / size; i++) {
    for (let j = 0; j < c.width / size; j++) {
      if (bd[i][j]) x.fillRect(size*j, size*i, size, size)
    }
  }
  x.fillRect(curX * size, curY * size, size, size)
}

I = setInterval(update, 400)