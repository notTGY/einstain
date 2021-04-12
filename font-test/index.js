const root1 = document.getElementById('page1-content')
const root2 = document.getElementById('page2-content')

function fontTest(root, text, font) {
  let elem = document.createElement('pre')
  elem.classList.add('transparent-back')
  elem.classList.add('string')
  elem.id = font.slice(1,5)
  elem.style.fontFamily = font
  elem.innerText = text
  root.appendChild(elem)
}


str =
`ABCDEFGHIJKLMNOPQRTSUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789,.?!/@#$%^&*(){}•✗⚬`

fontTest(root1, str, "Comic Sans MS")




fontTest(root2, '1•✗⚬-!* Quick brown fox jumps over the lazy dog', "Comic Sans MS")
//fontTest(root2, '2•✗⚬-!* Quick brown fox jumps over the lazy dog', "'Dancing Script', cursive")
fontTest(root2, '5•✗⚬-!* Quick brown fox jumps over the lazy dog', "'Courgette', cursive")
fontTest(root2, '3•✗⚬-!* Quick brown fox jumps over the lazy dog', "'Pacifico', cursive")
//fontTest(root2, '4•✗⚬-!* Quick brown fox jumps over the lazy dog', "'Caveat', cursive")
fontTest(root2, '6•✗⚬-!* Quick brown fox jumps over the lazy dog', "'Yellowtail', cursive")


const back1 = document.getElementById('page1-underlay')

for (let i = 0; i < 27*39; i++) {
  const cell = document.createElement('div')
  cell.classList.add('dot')
  cell.innerText = '.'
  back1.append(cell)
}
const back2 = document.getElementById('page2-underlay')

for (let i = 0; i < 27*39; i++) {
  const cell = document.createElement('div')
  cell.classList.add('dot')
  cell.innerText = '.'
  back2.append(cell)
}

const testDiv = document.createElement('div')
testDiv.classList.add('testing-div')
testDiv.innerText = '♿'
document.body.append(testDiv)
testDiv.style.top = root1.offsetTop+.5 + 'px'
testDiv.style.left = root1.offsetLeft + 'px'

const page1X = root1.offsetLeft, page1Y = root1.offsetTop+0.5
const size = document.querySelector('.dot').offsetWidth

root1.addEventListener('click', e => {
  const {x, y} = e
  const relX = x - page1X
  const relY = y - page1Y
  const col = (relX / size) | 0
  const row = (relY / size) | 0
  const newX = page1X + col * size
  const newY = page1Y + row * size
  testDiv.style.top = newY + 'px'
  testDiv.style.left = newX + 'px'
})