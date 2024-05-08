const fieldSize = {w: 40, h: 40}
const pixelSize = 4


/*const image = document.createElement('img')
image.src = './img.jpg?'+new Date()
image.hidden = true
image.setAttribute('crossOrigin', '');
document.body.append(image)
image.onload=s*/
const image = document.querySelector('img')
/*for (let i = 8; i > 0; i--) {
  const c = document.querySelector('#c' + i)
  s(i, c)
}*/

const c = document.querySelector('#c' + 8)
s(4, c)

function s(cellsInChar, c) {
  const colorNum = 2**(8-cellsInChar)
  const multiplier = 2**cellsInChar
  const x = c.getContext('2d')
  c.width = fieldSize.w*pixelSize
  c.height = fieldSize.h*pixelSize
  c.style.width = c.width + 'px'
  c.style.height = c.height + 'px'
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
    const x = Math.floor(i/4)%(fieldSize.w*pixelSize)
    const y = Math.floor(i/4 - x)/(fieldSize.w*pixelSize)
    const col = Math.floor(x / pixelSize)
    const row = Math.floor(y / pixelSize)
    res[row*fieldSize.w+col] += sum
  }
  let max = 0
  res.forEach(e => {if (e > max) max = e})
  res = res.map(e => Math.floor(255*(e / max)/multiplier))

  function RGB2HTML(red, green, blue) {
    const decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '#'+decColor.toString(16).substr(1);
  }

  x.fillRect(0,0,c.width, c.height)

  let str = ''
  for (let i = 0; i < res.length; i += cellsInChar) {
    let n = 0
    for (let j = 0; j < cellsInChar; j++) {
      n += res[i+cellsInChar-1-j]
      if (j !== cellsInChar - 1) n *= colorNum
    }
    str += String.fromCharCode(n)
  }
  console.log(str)

  let arr = []

  let a = 0
  let b = 0
  for (let i = 0; i < str.length; i++) {
    let n = str.charCodeAt(i)
    for (let j = 0; j < cellsInChar; j++) {
      const cl = n % colorNum
      n = Math.floor(n / colorNum)
      arr.push(cl)

      x.fillStyle = RGB2HTML(multiplier*cl, multiplier*cl, multiplier*cl)
      x.fillRect(a*pixelSize,b*pixelSize,pixelSize,pixelSize)
      a++
      if (a == fieldSize.w) {
        b++
        a = 0
      }

    }
  }
}
