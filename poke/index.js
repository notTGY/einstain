BasicSpriteData = Array.from(
  {length: 16*16},
  (_, i) => {
    pixels = [0, 1, 2, 3]
    return parseInt(
      pixels
        .reverse()
        .map(n => n.toString(2).padStart(2, '0')).join(''),
      2
    )
  },
)

additionalTiles = [
  [
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 2, 3, 3, 3, 3, 2, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0, 0,
    0, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 0,
    0, 1, 3, 3, 3, 3, 1, 3, 3, 1, 3, 3, 3, 3, 1, 0,
    0, 0, 1, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 3, 3, 2, 2, 3, 3, 1, 1, 1, 0, 0,
    0, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 0,
    0, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 0,
    0, 0, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 0, 0,
    0, 0, 0, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0,
  ],
]

additionalSpriteData = []
for (let I = 0; I < Math.ceil(additionalTiles.length) / 4; I++) {
  pixels = []
  for (let i = 0; i < 4; i++) {
    pixelChunk = additionalTiles[I*4 + i] ?? Array.from({length:16*16}, () => 0)
    for (let j = 0; j < 256; j++) {
      if (!pixels[j]) pixels[j] = []
      pixels[j].push(pixelChunk[j])
    }
  }
  additionalSpriteData = additionalSpriteData.concat(pixels.map(
    (pixel) => {
      return parseInt(
        pixel.reverse()
          .map(n => n.toString(2).padStart(2, '0'))
          .join(''),
        2
      )
    }
  ))
}

RawSpriteData = BasicSpriteData.concat(additionalSpriteData)
//---------- above - preprocessing

W = 160
H = 144
x = c.getContext`2d`
emptyFrame = Array.from({length: W*H*4 }, (_, i) => i%4 === 3 ? 255 : 0)

N_IN_CHUNK = 4
// 0 - transparent, 1 - black, 2 - gray, 3 - white
palette = [
  [0, 0, 0, 0],
  [0, 0, 0, 255],
  [170, 170, 170, 255],
  [255, 255, 255, 255]
]
flip = (arr) => {
  rows = []
  for (let i = 0; i < 16; i++) {
    rows[i] = arr.slice(16*i, 16*(i+1)).reverse()
  }
  return [].concat(...rows)
}
tile = (n) => {
  absn = Math.abs(n)
  chunkI = absn % N_IN_CHUNK
  chunk = (absn - chunkI) / N_IN_CHUNK

  data = RawSpriteData
    .slice(16*16*chunk, 16*16*(chunk+1))
    .map(i => palette[(i >> 2*chunkI ) % 4])
  return n > 0 ? data : flip(data)
}

locations = [
  [
    [
      [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
      [1, 3, 3, 3, 2, 2, 2, 2, 3, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 3, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 3, 2, 2, 2, 2, 1],
      [1, 3, 2, 2, 2, 2, 2, 3, 2, 1],
      [1, 3, 2, 2, 2, 2, 2, 3, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ], // M
    10, // MW
    0, // relX
    -32, // relY
  ]
]
loadLocation = (i) => {
  [M, MW, relX, relY] = locations[i]
}


loadLocation(0)

// generates iterator with indexes of sprite at X, Y
iter = ({X, Y}) => {
  return Array.from(
    {length: 16*16 },
    (_, i) => {
      rx = i % 16
      ry = (i - rx) / 16
      fx = X + rx
      fy = Y + ry

      if (fx >= W || fx < 0 || fy >= H || fy < 0) return -1
      return (fx + fy * W)*4
    }
  )
}

opaqueTiles = [2]

manTile = 4
m = d = 0
move = () => {
  // movement action start
  if (k>=0 && k < 4 && d === 0) {
    m = k
    inc = 2*(m%2) - 1
    collisionX = 4 - relX/16 - inc * (m < 2)
    collisionY = 4 - relY/16 - inc * (m > 1)
    if (opaqueTiles.includes(M[collisionY][collisionX])) {
      d = 16
    }
  }
  // movement action perform
  if (d>0) {
    inc = 2*(m%2) - 1
    if (m < 2) {
      relX+=inc
    } else {
      relY+=inc
    }
    d--
  }
}
paint = () => {
  frame = new Uint8ClampedArray(emptyFrame)

  for (mY in M) {
    row = M[mY]
    // O(MW)
    for (mX in row) {
      cell = row[mX]
      T = tile(cell)
      I = iter({X: 16*(+mX)+relX, Y: 16*(+mY)+relY})
      // O(16*16)
      for (i in I) {
        // O(4)
        if (T[i][3]) {
          T[i].forEach((e, k) => {
            if (I[i] >= 0) {
              frame[ I[i] + k ] = e
            }
          })
        }
      }
    }
  }
  // man
  I = iter({X: W / 2 - 16, Y: H / 2 - 8})
  T = tile(manTile)
  for (i in I) {
    // O(4)
    if (T[i][3]) {
      T[i].forEach((e, k) => {
        frame[ I[i] + k ] = e
      })
    }
  }
  
  x.putImageData(new ImageData(frame, W), 0, 0)
}

loop = () => {
  move()
  paint()
  requestAnimationFrame(loop)
}

onload = () => {
  loop()
}

// 0 - left
// 1 - right
// 2 - up
// 3 - down
keys = {65: 1, 68: 0, 87: 3, 83: 2}
k = -1
onkeydown = e => {
  k = keys[e.keyCode]
}
onkeyup = e => {
  // this check to only stop pressing current key
  // W + A (w is active) ==onkeyup=> W <- w remains active
  if (k === keys[e.keyCode]) k = -1
}
