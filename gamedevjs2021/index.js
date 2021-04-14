const c = document.getElementById('c')
const restart = document.getElementById('restart')
const ctx = c.getContext('2d')

window.addEventListener('resize', onresize)

const mirrorWidth = 5


onresize()
function onresize() {
  const w = document.body.offsetWidth
  const h = document.body.offsetHeight
  c.style.width = w + 'px'
  c.style.height = h + 'px'
  c.width = 2*w
  c.height = 2*h
}


let trace
let player
let isGameLost
let gameObjects
let score

startGame()

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
  })

  ctx.fillStyle = '#3aebca'
  ctx.fillRect(0,c.height/2 - mirrorWidth,c.width,2*mirrorWidth)

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
  ctx.lineWidth = mirrorWidth
  rotatedRect(player.x, player.y, player.size, 1)

  ctx.fillStyle = '#030'
  ctx.strokeStyle = '#070'
  rotatedRect(player.x, c.height - player.y, player.size, 1)

  trace.push({x: player.x, y: player.y, s: player.size})

  if (player.isDown) player.y += player.speed
  else player.y -= player.speed

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


window.addEventListener('mousedown', e => {
  player.isDown = false
  startAudio()
})
window.addEventListener('mouseup', e => {
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

function tryToDie() {
  let t = Math.sqrt(2) / 2
  if (player.y < player.size*t + mirrorWidth) {loseGame(); return}
  if (player.y >= c.height / 2 - player.size*t - 2*mirrorWidth) {loseGame(); return}

  gameObjects.forEach((e, i) => {
    if (e.collide(player.x, player.y, player.size + 2*mirrorWidth)) loseGame()
    if (e.collide(player.x, c.height - player.y, player.size + 2*mirrorWidth)) loseGame()
    if (e.x < -e.size) {
      gameObjects.splice(i, 1)
      if (e.type === 'block') newRandomBlock()
      if (e.type === 'spinner') gameObjects.push(new GameObject('spinner', genRandX(), genRandY(), 200, 'blue'))
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

  gameObjects = []
  gameObjects.push(new GameObject('block', c.width, genRandY(), 100, 'red'))
  newRandomBlock()
  newRandomBlock()
  newRandomBlock()

  gameObjects.push(new GameObject('spinner', genRandX(), genRandY(), 200, 'blue'))


  update()
}

function newRandomBlock() {
  gameObjects.push(new GameObject('block', genRandX(), genRandY(), 100, 'red'))
}

function genRandY() {
  return 50+Math.random()*(c.height - 100)
}

function genRandX() {
  return c.width*(1+Math.random())
}

let isAudioPlaying = false

isAudioPlaying = true // FIXME

function startAudio() {
  if (isAudioPlaying) return
  isAudioPlaying = true
  p(m,new AudioContext || new window.AudioContext ,1)
}

p=(L,c,l)=>{for(let i=0;L.length>i;i++)o(L[i],c,0,l)};o=(l,c,i,p)=>{if(i>=l.length&&p)i=0;if(l.length>i){with(c){with(createOscillator()){let g=createGain(),t=currentTime;connect(g);g.connect(destination);g.gain.value=l[i][0];frequency.value=l[i][1];type=l[i][2];start(t);stop(t+l[i][3]);onended=_=>{o(l,c,i+1,p)}}}}};
m=[[[0.1,200,"square",0.08],[0,500,"sawtooth",0.185],[0.1,400,"square",0.081],[0,400,"sine",0.162],[0.1,385,"square",0.106],[0,200,"sine",0.1062],[0.1,320,"square",0.1208],[0,200,"sine",0.179]]];


restart.addEventListener('mouseup', e => {
  startGame()
  restart.style.display = 'none'
})