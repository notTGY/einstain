const fieldSize = {w: 40, h: 40}
const pixelSize = 8


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
s(1, c)

function s(cellsInChar, c) {
  const bitsperpixel = 6
  if (6 % bitsperpixel) {
    throw 'you are stupido'
  }
  // ha ha lol
  const inCell = 6 / bitsperpixel

  const colorNum = 2**bitsperpixel
  const multiplier = 256 / colorNum

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

  const sourceArr = []
  let str = ''
  for (let i = 0; i < res.length; i += inCell) {
    let n = 0
    for (let j = 0; j < inCell; j++) {
      n += res[i+inCell-1-j]
      if (j !== inCell - 1) n *= colorNum
    }

    sourceArr.push(n)
    str += String.fromCharCode(n)
  }
  const sourceStr = btoa(str)
  console.log('encoding length', sourceStr.length)
  console.log({sourceStr})

  const usedStr = atob(sourceStr)
  const isEqual = usedStr.split('').filter((c, i) => c != str[i]).length === 0
  console.log({usedStr, isEqual})

  let arr = []

  let a = 0
  let b = 0
  for (let i = 0; i < usedStr.length; i++) {
    let n = usedStr.charCodeAt(i)
    for (let j = 0; j < inCell; j++) {
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
