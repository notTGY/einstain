const fieldSize = {w: 24, h: 24}
const pixelSize = 10

const bitsInChar = 4

const x = c.getContext('2d')
c.width = fieldSize.w*pixelSize
c.height = fieldSize.h*pixelSize
x.drawImage(image, 0, 0, fieldSize.w*pixelSize,fieldSize.h*pixelSize)
const frame = x.getImageData(0,0,fieldSize.w*pixelSize,fieldSize.h*pixelSize)
const {data} = frame
let res = []
for (let i = 0; i < fieldSize.w*fieldSize.h; i++) {
  res[i] = 0
}
for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i+1]
  const b = data[i+2]
  const sum = r+g+b
  const x = (i/4)%(fieldSize.w*pixelSize)
  const y = (i/4 - x)/(fieldSize.w*pixelSize)
  const col = Math.floor(x / pixelSize)
  const row = Math.floor(y / pixelSize)
  res[row*fieldSize.w+col] += sum
}
let max = 0
res.forEach(e => {if (e > max) max = e})
res = res.map(e => Math.floor(255*(e / max)/16))

function RGB2HTML(red, green, blue) {
  const decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
  return '#'+decColor.toString(16).substr(1);
}

x.fillRect(0,0,c.width, c.height)

let str = ''
for (let i = 0; i < res.length; i += bitsInChar) {
  let n = 0
  for (let j = 0; j < bitsInChar; j++) {
    n += res[i+bitsInChar-1-j]
    if (j !== bitsInChar - 1) n *= 16
  }
  str += String.fromCharCode(n)
}
console.log(str)

let arr = []

let a = 0
let b = 0
for (let i = 0; i < str.length; i++) {
  let n = str.charCodeAt(i)
  for (let j = 0; j < bitsInChar; j++) {
    const cl = n % 16
    n = Math.floor(n / 16)
    arr.push(cl)

    x.fillStyle = RGB2HTML(16*cl, 16*cl, 16*cl)
    x.fillRect(a*pixelSize,b*pixelSize,pixelSize,pixelSize)
    a++
    if (a == fieldSize.w) {
      b++
      a = 0
    }

  }
}
