const c = document.getElementById("c")
const W = 1920
const H = 1080
c.width = W
c.height = H
const ctx = c.getContext('2d')
const w = c.offsetWidth
const h = c.offsetHeight

let touches = []

const render = () => {
  ctx.clearRect(0, 0, W, H)
  for (const touch of touches) {
    const { clientX, clientY } = touch
    const x = W / w * clientX
    const y = H / h * clientY
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, 2 * Math.PI, false)
    ctx.fill()
  }
}

const start = (e) => {
  touches = e.touches
  render()
}
const move = (e) => {
  touches = e.touches
  render()
}
const end = (e) => {
  touches = e.touches
  render()
}

document.addEventListener('touchstart', start)
document.addEventListener('touchmove', move)
document.addEventListener('touchend', end)
