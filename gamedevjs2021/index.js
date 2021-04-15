window.addEventListener('resize', onresize)

onresize()
function onresize() {
  const w = document.body.offsetWidth
  const h = document.body.offsetHeight
  c.style.width = w + 'px'
  c.style.height = h + 'px'
  c.width = 2*w
  c.height = 2*h
}

window.addEventListener('mousedown', _ => {
  player.isDown = false
  startAudio()
})
window.addEventListener('mouseup', _ => {
  player.isDown = true
  startAudio()
})
window.addEventListener('keydown', e => {
  if (e.key === ' ') player.isDown = false
  startAudio()
})
window.addEventListener('keyup', e => {
  if (e.key === ' ') player.isDown = true
  startAudio()
})



restart.addEventListener('mouseup', _ => {
  startGame()
  restart.style.display = 'none'
})


startButton.addEventListener('mouseup', _ => {
  startGame()
  startingButtonsHolder.style.display = 'none'
})
prepareStartingScreen()
function prepareStartingScreen() {
  ctx.scale(c.width/1000, c.width/1000)
  const t = Math.sqrt(2)
  ctx.fillStyle = '#000'
  ctx.fillRect(0,0,c.width, c.height)

  ctx.translate(150,35)

  ctx.fillStyle = '#0606'

  ctx.translate(275, 125)
  ctx.rotate(Math.PI/4)
  ctx.fillRect(-80*t, -50, 160*t, 100)
  ctx.rotate(-Math.PI/4)
  ctx.translate(-275, -125)

  ctx.translate(185, 125)
  ctx.rotate(-Math.PI/4)
  ctx.fillRect(-220*t, -50, 300*t, 100)
  ctx.rotate(Math.PI/4)
  ctx.translate(-185, -125)

  ctx.translate(-85, 225)
  ctx.rotate(Math.PI/4)
  ctx.fillRect(-100*t, -50, 220*t, 100)
  ctx.rotate(-Math.PI/4)
  ctx.translate(85, -225)

  ctx.fillStyle = '#060'
  ctx.strokeStyle = '#3f3'
  ctx.lineWidth = 10
  rotatedRect(350, 200, 100, 1)

  ctx.translate(-150,-35)
  ctx.scale(1000/c.width, 1000/c.width)
  ctx.fillStyle = '#3f3'

  ctx.font = '3cm"'
  ctx.fillText('Zig-a-Zig ah', c.width/2+400, c.height/2)
}