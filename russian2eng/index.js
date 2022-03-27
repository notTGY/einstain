const alpha = decodeURI('%D0%B0%D0%B1%D0%B2%D0%B3%D0%B4%D0%B5%D1%91%D0%B6%D0%B7%D0%B8%D0%B9%D0%BA%D0%BB%D0%BC%D0%BD%D0%BE%D0%BF%D1%80%D1%81%D1%82%D1%83%D1%84%D1%85%D1%86%D1%87%D1%88%D1%89%D1%8A%D1%8B%D1%8C%D1%8D%D1%8E%D1%8F')
const trans = [
  'A', '6', 'B', 'r',
  'g', 'E', 'E', '>|<',
  '3', 'u', 'u', 'K',
  'Jl', 'M', 'H', 'O',
  'II', 'P', 'C', 'T',
  'y', 'qp', 'X', 'LL',
  '4', 'LLl', 'LLL', 't',
  'bl', 'b', '-', 'IO',
  'R',
]

rus.oninput = e => {
  const text = rus.value
  eng.innerText = text.split('').map(e => {
    const letter = e.toLowerCase()
    const idx = alpha.indexOf(letter)
    if (idx !== -1)
      return trans[idx]
    else return e
  }).join('')
}
