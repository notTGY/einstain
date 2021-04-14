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
}

function drawBlock() {
  ctx.fillStyle = this.color
  ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
}

function updateBlock() {
  this.x -= player.speed
}

function collideBlock(x, y, s) {
  const t = Math.sqrt(2)/2
  let collideX = 0
  let collideY = 0
  if (this.y > y) {
    if (this.y - this.size/2 < y+t*s) collideY = 1
  } else {
    if (this.y + this.size/2 > y-t*s) collideY = 1
  }
  if (this.x > x) {
    if (this.x - this.size/2 < x+t*s) collideX = 1
  } else {
    if (this.x + this.size/2 > x-t*s) collideX = 1
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