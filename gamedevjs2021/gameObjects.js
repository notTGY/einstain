function GameObject(type, x, y, size, color) {
  this.x = x
  this.y = y
  this.type = type

  this.color = color
  this.size = size
  this.width = 10

  if (type === 'block') {
    this.draw = drawBlock
    this.update = updateBlock
    this.collide = collideBlock
  }

  if (type === 'spinner') {
    this.spin = 0
    this.draw = drawSpinner
    this.update = updateSpinner
    this.collide = collideSpinner
  }

  if (type === 'coin') {
    this.spin = 0
    this.draw = drawCoin
    this.update = updateCoin
    this.collide = collideCoin
  }

  if (type === 'antiMagnet') {
    this.type = 'powerUp'
    this.powerUpType = type
    this.phi = 0
    this.orbit = 10
    this.draw = drawAntiMagnet
    this.collide = collideBlock
    this.update = updateAntiMagnet
  }

  if (type === 'mirrorPass') {
    this.type = 'powerUp'
    this.powerUpType = type
    this.phi = 0
    this.innerSize = 20
    this.draw = drawMirrorPass
    this.collide = collideBlock
    this.update = updateMirrorPass
  }
}

function drawBlock() {
  ctx.fillStyle = this.color
  ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
}

function drawMirrorPass() {
  ctx.fillStyle = '#3aebca'
  ctx.translate(this.x, this.y)
  ctx.fillRect( -3*this.size/8, -this.size/2, 3*this.size/4, this.size)
  ctx.fillStyle = '#8afbfa'
  ctx.beginPath()
  ctx.arc(0,0,this.innerSize*Math.abs(Math.sin(this.phi)), 0, 2*Math.PI)
  ctx.fill()
  ctx.translate(-this.x, -this.y)
}

function updateMirrorPass() {
  this.x -= player.speed
  this.phi += 0.1
}

function updateBlock() {
  this.x -= player.speed
}

function collideBlock(x, y, s) {
  const t = Math.sqrt(2)/2
  let collideX = 0
  let collideY = 0
  let verticalSize = this.size
  let horizontalSize = this.size
  if (this.type === 'powerUp' && this.powerUpType === 'mirrorPass') {
    horizontalSize = 3*this.size/4
  }
  if (this.y > y) {
    if (this.y - verticalSize/2 < y+t*s) collideY = 1
  } else {
    if (this.y + verticalSize/2 > y-t*s) collideY = 1
  }
  if (this.x > x) {
    if (this.x - horizontalSize/2 < x+t*s) collideX = 1
  } else {
    if (this.x + horizontalSize/2 > x-t*s) collideX = 1
  }
  if (collideY && collideX) {
    if ((this.x - x)**2+(this.y - y)**2 <= 2*((s/2)**2+(this.size/2)**2)) return 1
  }
  return 0
}

function drawSpinner() {
  ctx.fillStyle = this.color
  ctx.translate(this.x, this.y)
  ctx.rotate(this.spin)
  ctx.fillRect(-this.size / 2, -this.width / 2, this.size, this.width)
  ctx.rotate(-this.spin)
  ctx.translate(-this.x, -this.y)
}

function updateSpinner() {
  this.x -= player.speed
  this.spin += 1.5 * player.speed / (this.size / 2)
}

function collideSpinner(x, y, s) {
  const t = Math.sqrt(2)/2
  const relX = x - this.x
  const relY = y - this.y
  const x2 = relX*Math.cos(this.spin) - relY*Math.sin(this.spin)
  const y2 = relX*Math.sin(this.spin) + relY*Math.cos(this.spin)

  let collideY = false
  if (y2 - s*t < this.width/2 && y2 + s*t > -this.width/2) collideY = true

  let collideX = false
  if (x2 - s*t < this.size/2 && x2 + s*t > -this.size/2) collideX = true

  return collideY && collideX
}

function drawCoin() {
  ctx.fillStyle = this.color
  ctx.beginPath()
  ctx.ellipse(this.x, this.y, Math.abs(Math.cos(this.spin))*this.size/2, this.size/2,0,  0, 2*Math.PI)
  ctx.fill()
}

function collideCoin(x, y, s) {
  if ((this.x-x)**2+(this.y-y)**2 <= (s/2)**2+(this.size/2)**2) return 1
  return 0
}

function updateCoin() {
  this.x -= player.speed
  this.spin += 1 * player.speed / (this.size / 2)
}

function updateAntiMagnet() {
  this.x -= player.speed
  this.phi += 1 * player.speed / (this.size / 2)
}

function drawAntiMagnet() {
  drawMagnet(this.x, this.y + this.orbit * Math.sin(this.phi), this.size)
}

function drawMagnet(x, y, s) {
  ctx.translate(x, y)
  ctx.fillStyle = '#a0f'
  ctx.beginPath()
  ctx.arc(0, 0, s/2, 0, Math.PI, true)
  ctx.fill()
  ctx.fillRect(-s/2, -1, s, 1+s/4)
  ctx.fillStyle = '#60f'
  ctx.fillRect(-s/2, s/4, s, s/4)
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(0, 0, s/4, 0, Math.PI, true)
  ctx.fill()
  ctx.fillRect(-s/4, 0, s/2, s/2)
  ctx.translate(-x, -y)
}

function pushAway(obj) {
  const {x, y, speed} = player
  let dx = obj.x - x
  let dy = obj.y - y
  let alpha = Math.atan2(dy, dx)
  obj.x += 0.5 * speed * Math.cos(alpha)
  obj.y += 0.5 * speed * Math.sin(alpha)

  dy = obj.y - (c.height - y)
  alpha = Math.atan2(dy, dx)
  obj.y += 0.5 * speed * Math.sin(alpha)
}