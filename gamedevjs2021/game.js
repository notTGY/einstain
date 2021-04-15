let trace
let player
let isGameLost
let gameObjects
let score
let powerUps
let sideOfMirror

function update() {
  if (isGameLost) return
  tryToDie()
  player.speed += player.acceleration / player.speed

  score += .01

  ctx.fillStyle = '#000'
  ctx.fillRect(0,0,c.width, c.height)

  gameObjects.forEach(e => {
    e.update()
    e.draw()

    if (powerUps['antiMagnet']) {
      pushAway(e)
    }
  })

  ctx.fillStyle = '#3aebca'
  ctx.strokeStyle = '#3aebca'
  ctx.lineWidth = mirrorWidth / 2
  if (!powerUps['mirrorPass']) {
    ctx.fillRect(0,c.height/2 - mirrorWidth,c.width,2*mirrorWidth)
  } else {
    ctx.strokeRect(0,c.height/2 - mirrorWidth,c.width,2*mirrorWidth)
  }


  ctx.font = '1cm"'
  ctx.fillText(`score: ${score|0}`, c.width - 300, 70)


  trace.forEach((e, i) => {
    if (e.x < 0) trace.splice(i, 1)
    e.x -= player.speed
    e.s -= (0.4) * player.size * player.speed / player.x
    ctx.fillStyle = '#20f02020'
    rotatedRect(e.x, e.y, e.s)
    ctx.fillStyle = '#00500020'
    rotatedRect(e.x, c.height - e.y, e.s)
  })


  ctx.fillStyle = '#060'
  ctx.strokeStyle = '#3f3'
  ctx.lineWidth = playerStrokeWidth
  rotatedRect(player.x, player.y, player.size, 1)

  ctx.fillStyle = '#030'
  ctx.strokeStyle = '#070'
  rotatedRect(player.x, c.height - player.y, player.size, 1)

  trace.push({x: player.x, y: player.y, s: player.size})

  if (player.isDown) player.y += player.speed
  else player.y -= player.speed

  for (let item in powerUps) {
    if (!powerUps.hasOwnProperty(item)) continue

    if (item !== 'mirrorPass') {
      if (powerUps[item]) powerUps[item] -= .01
      if (powerUps[item] < 0) powerUps[item] = 0
    }

    if (powerUps[item]) {
      if (item === 'antiMagnet') {
        drawMagnet(60, 60, 80)
      }
    }
  }

  requestAnimationFrame(update)
}

function rotatedRect(x, y, s, isStroke) {
  ctx.translate(x, y)
  ctx.rotate(Math.PI/4)
  ctx.fillRect(-s/2, -s/2, s, s)
  if (isStroke) ctx.strokeRect(-s/2, -s/2, s, s)
  ctx.rotate(-Math.PI/4)
  ctx.translate(-x, -y)
}

function onCollided(e, i) {
  if (e.type === 'coin') {
    score += 5
    gameObjects.splice(i, 1)
    gameObjects.push(new GameObject('coin', genRandX(), genRandY(100), 100, 'gold'))
  } else if (e.type === 'powerUp') {

    if (e.powerUpType === 'antiMagnet') {
      powerUps['antiMagnet'] = 1
    }
    if (e.powerUpType === 'mirrorPass') {
      powerUps['mirrorPass'] = 1
      if (sideOfMirror === 'top') sideOfMirror = 'dest-bottom'
      if (sideOfMirror === 'bottom') sideOfMirror = 'dest-top'
    }

    gameObjects.splice(i, 1)
    newRandomPowerUp()
  } else {
    loseGame()
  }
}

function tryToDie() {
  let t = Math.sqrt(2) / 2
  if (player.y < player.size*t + playerStrokeWidth) {loseGame(); return}
  if (player.y > c.height - player.size*t - playerStrokeWidth) {loseGame(); return}

  if (player.y >= c.height / 2 - player.size*t - playerStrokeWidth - mirrorWidth) {
    if (sideOfMirror === 'top') {
      loseGame()
      return
    }
  }

  if (player.y >= c.height / 2 + player.size*t + playerStrokeWidth + mirrorWidth) {
    if (sideOfMirror === 'dest-bottom') {
      sideOfMirror = 'bottom'
      powerUps['mirrorPass'] = 0
    }
  }

  if (player.y <= c.height / 2 + player.size*t + playerStrokeWidth + mirrorWidth) {
    if (sideOfMirror === 'bottom') {
      loseGame()
      return
    }
  }

  if (player.y <= c.height / 2 - player.size*t - playerStrokeWidth - mirrorWidth) {
    if (sideOfMirror === 'dest-top') {
      sideOfMirror = 'top'
      powerUps['mirrorPass'] = 0
    }
  }

  gameObjects.forEach((e, i) => {
    if (e.collide(player.x, player.y, player.size + 2*playerStrokeWidth)) onCollided(e, i)

    if (e.collide(player.x, c.height - player.y, player.size + 2*playerStrokeWidth)) onCollided(e, i)

    if (e.x < -e.size) {
      gameObjects.splice(i, 1)
      if (e.type === 'block') newRandomBlock()
      if (e.type === 'spinner') newRandomSpinner()
      if (e.type === 'coin') newRandomCoin()
      if (e.type === 'powerUp') newRandomPowerUp()
    }
  })
}



function loseGame() {
  isGameLost = true
  restart.style.display = 'flex'
}

function startGame() {
  isGameLost = 0
  score = 0
  player = {x: c.width / 10, y: c.height / 4, size: 50, speed: 5, isDown: 1, acceleration: 0.01}
  trace = []

  powerUps = {}

  gameObjects = []
  newRandomBlock()
  newRandomBlock()
  newRandomCoin()
  newRandomBlock()
  newRandomBlock()
  newRandomPowerUp()
  newRandomSpinner()

  sideOfMirror = 'top'

  update()
}