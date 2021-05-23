const baseInput = document.getElementById('base')
const polynomInput = document.getElementById('polynom')
let base = 2
let polynom = [1, 1, 1]


checkPolynom(polynom, base)

baseInput.addEventListener('change', e => {
  base = baseInput.value
  checkPolynom(polynom, base)
})

polynomInput.addEventListener('change', e => {
  polynom = parsePolynom(polynomInput.value)
  checkPolynom(polynom, base)
})

function parsePolynom(str) {
  const pieces = str.split('+')
  let res = []
  console.log(pieces)
  return [0]
}



function checkPolynom(polynom, base) {
  const diffP = diff(polynom, base)
  const NOD = calcNOD(polynom, diffP, base)
  if (NOD.length > 1) console.log('NO')
}


function calcNOD(biggerP, smallerP, base) {
  if (smallerP.length === 1 && smallerP[0] === 0) return normalize(biggerP, base)

  let nextSmaller = normalize(biggerP, base)
  let nextBigger = normalize(smallerP, base)

  for (let i = nextSmaller.length-nextBigger.length; i >= 0; i--) {
    if (!nextSmaller[i+nextBigger.length-1]) continue
    let tmp = []
    for (let j = 0; j < i; j++) tmp[j] = 0
    tmp[i] = 1
    tmp = multiply(tmp, nextBigger, base)
    nextSmaller = normalize(minus(nextSmaller, tmp, base), base)
  }
  return calcNOD(nextBigger, nextSmaller, base)
}

function normalize(polynom, base) {
  const deg = polynom.length-1
  const multiplier = inverted(polynom[deg], base)
  return multiply(polynom, [multiplier], base)
}

function minus(polynom1, polynom2, base) {
  let res = []
  for (let i = 0; i < Math.max(polynom1.length, polynom2.length); i++) {
    const a = polynom1[i] || 0
    const b = polynom2[i] || 0
    res[i] = (2*base + a - b) % base
  }
  for (let i = res.length-1; i > 0; i--) {
    if (res[i] === 0) res.pop()
    else return res
  }
  return res
}

function multiply(polynom1, polynom2, base) {
  let res = []
  for (let i = 0; i < polynom1.length+polynom2.length+2; i++) res[i]=0
  for (let i = 0; i < polynom1.length; i++) {
    for (let j = 0; j < polynom2.length; j++) {
      res[i+j] += polynom1[i] * polynom2[j]
    }
  }
  res = res.map(item => item % base)
  for (let i = res.length-1; i > 0; i--) {
    if (res[i] === 0) res.pop()
      else return res
  }
  return res
}

function inverted(num, base) { //better algo needed
  for (let i = 0; i < base; i++)
    if ((num * i) % base === 1) return i
  return 0
}

function diff(polynom, base) {
  let res = []
  for (let i = 1; i < polynom.length; i++) res[i-1] = (polynom[i] * i) % base

  for (let i = res.length-1; i > 0; i++) {
    if (res[i] === 0) res.length--
    else return res
  }
}
