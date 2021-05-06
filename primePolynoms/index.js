let primePolynoms = []
primePolynoms[0] = []
primePolynoms[1] = allPolynomsOfDegree(1).filter(e => e[1] !== 0)


const finishDegree = 5


for (let i = 2; i <= finishDegree; i++) {
  primePolynoms[i] = allPolynomsOfDegree(i).filter(e => e[i] !== 0)
  /*for (let j = 1; j <= i-1; j++) {
    for (let k = 1; k <= Math.floor(i / j); k++) {
      const a = i - k * j     
      primePolynoms[j].forEach(e => {
        primePolynoms[a].forEach(c => {
          const polynom = multiply(c, power(e, k))
          tryToSplice(primePolynoms[i], polynom)
        })
      })
    }
  }*/
  generatePolynomsOfDeg(i).forEach(e => tryToSplice(primePolynoms[i], e))
  str = `<div>${i}: <ul>`
  primePolynoms[i].forEach(e => {
    str += `<li>${pol(e)}</li>`
  })
  str += `</ul></div>`
  document.body.innerHTML += str
}

function generatePolynomsOfDeg(deg) {
  let res = []
  if (deg === 0) return [[1]]
  if (deg === 1) return primePolynoms[1]   
  for (let j = 1; j <= deg-1; j++) {
    const a = deg - j     
    primePolynoms[j].forEach(e => {
      generatePolynomsOfDeg(a).forEach(c => {
        const polynom = multiply(c, e)
        res.push(polynom)
      })
    })
  }
  return res
}


function pol(p) {
  let s = ''
  for (let i = p.length-1; i >= 0; i--) {
    if (p[i]) {
      if (s.length !== 0) s += '+'
      if (i === 0) s += '1'
      else if (i === 1) s += 'x'
      else {
        s += 'x<sup>'
        s += i.toString()
        s += '</sup>'
      }
    }
  }
  return s
}

function tryToSplice(listOfPolynoms, polynom) {
  listOfPolynoms.forEach((item, i) => {
    let isEqual = 1
    for (let i = 0; i < item.length; i++) {
      if (item[i] !== polynom[i]) isEqual = 0
    }
    if (!isEqual) return
    listOfPolynoms.splice(i, 1)
  })
}

function multiply(pol1, pol2) {
  let res = []
  for (let i = 0; i < pol1.length+pol2.length-1; i++) res[i] = 0
  for (let i = 0; i < pol1.length; i++) {
    for (let j = 0; j < pol2.length; j++) {
      if (pol1[i] === 1 && pol2[j] === 1) {
        res[i+j] = (res[i+j] + 1) % 2
      }
    }
  }
  return res
}

function power(pol, times) {
  if (times === 1) return pol
  return multiply(pol, power(pol, times-1))
}

function allPolynomsOfDegree(deg) {
  if (deg === 0) return [ [0], [1] ]

  const prev = allPolynomsOfDegree(deg-1)
  let res = []
  prev.forEach(e => {
    res.push([...e, 0])
    res.push([...e, 1])
  })
  return res
}
