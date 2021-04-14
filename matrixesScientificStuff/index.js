const c = document.getElementById('c')

c.width = 800
c.height = 640

const scaleX = 100
const scaleY = 1

const ctx = c.getContext('2d')

ctx.fillStyle = '#fff'
ctx.fillRect(0,0, c.width, c.height)

ctx.fillStyle='#000'

ctx.fillRect(c.width/2, 0, 1, c.height)
ctx.fillRect(0, c.height/2, c.width, 1)


ctx.fillStyle='#ccc'

ctx.fillRect(c.width/2-2*scaleX, 0, 1, c.height)
ctx.fillRect(c.width/2+2*scaleX, 0, 1, c.height)


ctx.fillStyle='#00f'


t= -c.width/(2*scaleX)
function f() {
  let x = scaleX * t
  let y = scaleY * (4 - 4 / (t*t - 4))

  ctx.fillRect(c.width/2 + x -1,c.height/2 - y - 1,3,3)


  t+=.004
  if (t < c.width/(2*scaleX)) {
    setTimeout(f,0)
  } else {
    onfinishFirst()
  }
}
f()


function onfinishFirst() {
  console.log('hi')
}
