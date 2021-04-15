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



startGame()
