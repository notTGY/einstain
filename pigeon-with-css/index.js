const submit = document.getElementById('submit')
const name = document.getElementById('name')
const start = document.getElementById('start')
const final = document.getElementById('final')
const text = document.getElementById('text')

let value = ''
submit.onclick = play

window.addEventListener('keyup', e => {
  if (e.key === 'Enter') play()
})

function play() {
  const template = `${name.value}, you are a pigeon\n       _~_\n      (o o)\n     /  V  \\\n    /(  _  )\\\n      ^^ ^^`
  value = template.split('')

  start.style.opacity = 0
  start.style.visibility = 'hidden'
  final.style.visibility = 'unset'
  text.style.visibility = 'unset'
  final.style.opacity = 1
  appendText()
}


function appendText() {
  const char = value.shift()
  if (!char) return
  text.innerText += char
  setTimeout(appendText, 40)
}
