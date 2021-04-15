const oneCell = 50
const thickness = 4

const root = document.querySelector('.painting')
const c = root.querySelector('.painting-canvas')
const ctx = c.getContext('2d')
const stylus = root.querySelector('#stylus')

const penButton = root.querySelector('.pen-button')
const lineButton = root.querySelector('.line-button')
const backButton = root.querySelector('.back-button')
const deleteButton = root.querySelector('.delete-button')
const okButton = root.querySelector('.ok-button')

let mode = 'pen'

let painting = false
let currentPath = []
let paths = []

c.addEventListener('mousemove', e => {
  const relX = e.x - c.offsetLeft
  const relY = e.y - c.offsetTop
  if (mode === 'pen') {
    if (painting) {
      currentPath.push({x: relX, y: relY})
    }
    stylus.style.top = e.y - 4 + 'px'
    stylus.style.left = e.x - 4 + 'px'
    stylus.style.display = 'block'

    redrawLinePath(currentPath)
    redrawPenPath(currentPath)
  } else if (mode === 'line') {
    if (painting) {
      requestAnimationFrame(e => {
        redrawAllCanvas()
        redrawLinePath([...currentPath, {x: relX, y: relY}])
      })
    }
  }
})

function ctrlZHandler(e) {
  if (e.ctrlKey) {
    if (e.key === 'z') {
      paths.pop()
      redrawAllCanvas()
    }
  }
}

window.addEventListener('keydown', ctrlZHandler)

c.addEventListener('mousedown', e => {
  if (mode === 'pen') {
    painting = true
    currentPath[0] = 'p'
    const relX = e.x - c.offsetLeft
    const relY = e.y - c.offsetTop
    currentPath.push({x: relX, y: relY})
  }
})

c.addEventListener('mouseup', e => {
  if (mode === 'pen') {
    painting = false
    paths.push(currentPath)
    currentPath = []
  } else if (mode === 'line') {
    const relX = e.x - c.offsetLeft
    const relY = e.y - c.offsetTop
    if (!painting) {
      painting = true
      currentPath[0] = 'l'
      currentPath.push({x: relX, y: relY})
    } else {
      if (e.which === 1) {
        painting = false
        currentPath.push({x: relX, y: relY})
        paths.push(currentPath)
        currentPath = []
      }
      if (e.which === 3) {
        currentPath.push({x: relX, y: relY})
      }
    }
  }
})

c.addEventListener('contextmenu', e => {
  e.preventDefault()
})

function redrawAllCanvas() {
  ctx.clearRect(0,0,c.width, c.height)
  ctx.fillStyle = '#2f2235'
  ctx.strokeStyle = '#2f2235'
  paths.forEach(redrawPath)
}

function redrawPath(path) {
  redrawLinePath(path)
  if (path[0] === 'p') redrawPenPath(path)
}

function redrawLinePath(path) {
  ctx.lineWidth = 2*thickness
  ctx.beginPath()
  path.forEach((e, i) => {
    if (i === 1) ctx.moveTo(2*e.x, 2*e.y)
    if (i > 1) ctx.lineTo(2*e.x, 2*e.y)
  })
  ctx.stroke()
}

function redrawPenPath(path) {
  path.forEach((e, i) => {
    if (i > 0) {
      ctx.beginPath()
      ctx.arc(2*e.x, 2*e.y, 4, 0, 2*Math.PI)
      ctx.fill()
    }
  })
}

let w = root.offsetWidth
let h = root.offsetHeight
changeSize()


root.addEventListener('mousemove', e => {
  e.preventDefault()
  const w0 = root.offsetWidth
  const h0 = root.offsetHeight

  if (w0 === w && h0 === h) return
  w = w0
  h = h0

  changeSize()
})


function changeSize() {
  root.style.width = Math.floor(w / oneCell) * oneCell + 'px'
  root.style.height = Math.floor(h / oneCell) * oneCell + 5 + 'px'

  c.width = 2*Math.floor(w / oneCell) * oneCell - 4
  c.height = 2*Math.floor(h / oneCell) * oneCell - 104

  c.style.width = Math.floor(w / oneCell) * oneCell - 2 + 'px'
  c.style.height = Math.floor(h / oneCell) * oneCell - 52 + 'px'
  redrawAllCanvas()
}

penButton.addEventListener('click', e => {
  mode = 'pen'
})

lineButton.addEventListener('click', e => {
  mode = 'line'
  stylus.style.display = 'none'
})

c.addEventListener('mouseleave', e => {
  stylus.style.display = 'none'
})

backButton.addEventListener('click', e => {
  paths.pop()
  redrawAllCanvas()
})

okButton.addEventListener('click', e => {

})

deleteButton.addEventListener('click', e => {

})


function removeTrace() {
  window.removeEventListener('keydown', ctrlZHandler)
}