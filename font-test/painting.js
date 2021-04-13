const oneCell = 50
const thickness = 4

const root = document.querySelector('.painting')
const c = root.querySelector('.painting-canvas')
const ctx = c.getContext('2d')

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
    requestAnimationFrame(e => {
      ctx.fillStyle = '#2f2235'
      ctx.beginPath()
      ctx.arc(2*relX, 2*relY, thickness, 0, 2*Math.PI)
      ctx.fill()
    })
  } else if (mode === 'line') {
    if (painting) {
      requestAnimationFrame(e => {
        redrawLinePath([...currentPath, {x: relX, y: relY}])
      })
    }
  }
})

c.addEventListener('mousedown', e => {
  if (mode === 'pen') {
    painting = true
    currentPath[0] = 'p'
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
  ctx.fillStyle = '#2f2235'
  ctx.strokeStyle = '#2f2235'
  paths.forEach(redrawPath)
  if (mode === 'pen' && currentPath.length > 1) {
    redrawPenPath(currentPath)
  }
}

function redrawPath(path) {
  if (path[0] === 'p') redrawPenPath(path)
  if (path[0] === 'l') redrawLinePath(path)
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

root.addEventListener('mousemove', e => {
  e.preventDefault()
  const w0 = root.offsetWidth
  const h0 = root.offsetHeight

  root.style.width = Math.floor(w0 / oneCell) * oneCell + 'px'
  root.style.height = Math.floor(h0 / oneCell) * oneCell + 'px'

  c.width = 2*Math.floor(w0 / oneCell) * oneCell
  c.height = 2*Math.floor((h0-50) / oneCell) * oneCell

  c.style.width = Math.floor(w0 / oneCell) * oneCell + 'px'
  c.style.height = Math.floor((h0-50) / oneCell) * oneCell + 'px'

  redrawAllCanvas()
})


penButton.addEventListener('click', e => {
  mode = 'pen'
})

lineButton.addEventListener('click', e => {
  mode = 'line'
})

backButton.addEventListener('click', e => {
  paths.pop()
  ctx.clearRect(0,0,c.width, c.height)
  redrawAllCanvas()
})

okButton.addEventListener('click', e => {

})

deleteButton.addEventListener('click', e => {

})
