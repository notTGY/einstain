function newRandomCoin() {
  gameObjects.push(new GameObject('coin', genRandX(), genRandY(100), 100, 'gold'))
}

function newRandomSpinner() {
  gameObjects.push(new GameObject('spinner', genRandX(), genRandY(200), 200, 'blue'))
}

function newRandomPowerUp() {
  if (Math.random() < 0.5) {
    gameObjects.push(new GameObject('antiMagnet', genRandX(), genRandY(100), 100))
  } else {
    gameObjects.push(new GameObject('mirrorPass', genRandX(), genRandY(100), 100))
  }
}

function newRandomBlock() {
  gameObjects.push(new GameObject('block', genRandX(), genRandY(100), 100, 'red'))
}

function genRandY(width) {
  if (Math.random() < 0.5) return width/2 + (c.height/2-width)*Math.random()
  return c.height/2 + width/2 + (c.height/2-width)*Math.random()
}

function genRandX() {
  if (!gameObjects.length) return c.width
  let max = gameObjects[0].x
  gameObjects.forEach(e => {
    if (e.x > max) max = e.x
  })
  return max + c.width/5
}