const counter = document.querySelector('#counter')
const difficulty = document.querySelector('#difficulty')
const x = c.getContext('2d')
c.width = 300
c.height = 300
c.style.width = '300px'
c.style.height = '300px'

const size = 30

let isRobotPlaying = 0
let heart = 0
let muted = 0

let diff = 'normal'

const basicTimeout = 320
const hardTimeout = 30
const timeoutDecreaseNormal = 1
const timeoutDecreaseVimHero = 1.1
const hardLevel = 0.3

let isInsert = 1

onkeydownListener = e => {
  if (!I || curY === -1) return 0

  if (isInsert&&e.key==='Escape') isInsert = 0

  if (isInsert&&diff==='vim hero') return 0

  if (e.key === 'k') k = 1

  if (e.key === 'h') {
    if (curX > 0 && !bd[curY][curX-1]) {
      curX--
    }
  } else if (e.key === 'l') {
    if (curX < (c.width / size)-1 && !bd[curY][curX+1]) {
      curX++
    }
  } else if (e.key === 'j') {
    curY++
    checkCollision()
  }
  drawBoard()
}


if (!isRobotPlaying) {
  window.addEventListener('keyup', e => {if (e.key === 'k') k = 0})

  window.addEventListener('keydown', onkeydownListener)
}




let score = 0
let timeout = basicTimeout
let I = 1
let isEven = 0
let k = 0

let curX = Math.floor(Math.random()*c.width / size)
let curY = -1

let bd = [[]]
for (let i = 0; i < c.height / size; i++) {
  bd[i] = []
  for (let j = 0; j < c.width / size; j++) {
    bd[i][j] = 0
  }
}

update()


const A = new AudioContext()

function click() {
  if (muted) return 0
  const G = A.createGain()
  const O = A.createOscillator()

  O.connect(G)
  G.connect(A.destination)

  G.gain.value = .01

  O.type = 'square'
  O.detune.value = 100
  O.frequency.value = 240
  O.duration = 0.01
  O.start(A.currentTime)
  O.stop(A.currentTime+.1)
}

function update() {
  if (!I) return 0

  if (isRobotPlaying) robot()


  if (!(isEven&&k)) {
    curY++
    checkCollision()
  }

  isEven = !isEven
  drawBoard()

  if (heart&&isEven) {
    x.fillStyle = 'red'
    x.fillRect(0,0,10,10)
  }

  if (diff === 'normal'&&timeout > hardTimeout) {
    timeout -= timeoutDecreaseNormal
    document.body.style.background = '#fff'
  } else if (diff === 'vim hero'&&timeout > hardTimeout){
    timeout -= timeoutDecreaseVimHero
    document.body.style.background = '#fff'
  }

  setTimeout(update, timeout)
}

function checkCollision() {
  if (curY === (c.height / size)-1 || bd[curY+1][curX]) {
    if (curY === 0) {
      I = 0
      return 0
    }

    click()

    if (timeout <= hardTimeout) {
      document.body.style.background = randomColor()
    }


    bd[curY][curX] = 1

    tryToDeleteRow(curY)

    curX = Math.floor(Math.random()*c.width / size)
    curY = -1

    isInsert = 1
  }
}

function tryToDeleteRow(row) {
  let isZero = 0
  for (let i = 0; i < c.width / size; i++) {
    if (!bd[row][i]) isZero = 1
  }
  if (!isZero) {
    counter.innerHTML = `${++score}`

    if (diff === 'vim hero') {
      timeout += timeoutDecreaseVimHero * 100 * hardLevel
    } else if (diff === 'normal') {
      timeout += timeoutDecreaseNormal * 100 * hardLevel
    }

    for (let i = row; i > 1; i--) {
      for (let j = 0; j < c.width / size; j++) {
        bd[i][j] = bd[i-1][j]
      }
    }
    for (let j = 0; j < c.width / size; j++) {
      bd[0][j] = 0
    }
  }
}

function drawBoard() {
  x.clearRect(0, 0, c.width, c.height)
  x.fillStyle = '#000'
  for (let i = 0; i < c.height / size; i++) {
    for (let j = 0; j < c.width / size; j++) {
      if (bd[i][j]) x.fillRect(size*j, size*i, size, size)
    }
  }
  x.fillRect(curX * size, curY * size, size, size)

  if (isInsert&&diff==='vim hero') {
    x.fillStyle = 'red'
    x.strokeWidth = 10
    x.font = '24px Segoe UI'
    x.fillText('-- INSERT --', 2, c.height-9)
  }
}


function robot() {
  for (let i = 0; i < c.width / size; i++) {
    if (bd[c.height/size - 1][i] === 0) {
      curX = i
      return 0
    }
  }
}

difficulty.addEventListener('change', e => {
  diff = difficulty.value

  isInsert = 1

  score = 0
  counter.innerHTML = `${score}`
  timeout = basicTimeout
  I = 1
  isEven = 0
  k = 0

  curX = Math.floor(Math.random()*c.width / size)
  curY = -1

  for (let i = 0; i < c.height / size; i++) {
    for (let j = 0; j < c.width / size; j++) {
      bd[i][j] = 0
    }
  }
})