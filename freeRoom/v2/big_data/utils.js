const N = 'Z'.charCodeAt(0) - 'A'.charCodeAt(0)

export function A(i) {
  i--
  if (i <= N) return String.fromCharCode('A'.charCodeAt(0) + i)
  return A((i / N) - 1) + A((i % N) - 1)
}

export function getOffsetInCol(sheet, col, word) {
  for (let i = 1; i < Object.keys(sheet).length; i++) {
    const w = sheet[A(col) + i]
    if (!w) continue
    if (w.v === word) return i
  }
  return -1
}
