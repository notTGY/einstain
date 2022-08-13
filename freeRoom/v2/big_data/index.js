import { readdirSync } from 'fs'
import xlsx from 'xlsx'
import { A, getOffsetInCol } from './utils.js'
const { readFile } = xlsx


const files = readdirSync('./data')

for (const file of files) {
  const data = readFile('./data/' + file)
  const sheet = data.Sheets[data.SheetNames[0]]

  const offset = getOffsetInCol(sheet, 1, 'Дни')
  console.log(offset)
  const timeLessonMap = getTimeLessonMap(
    sheet, offset
  )
  console.log(timeLessonMap)
}

function getTimeLessonMap(sheet, offset) {
  let j = 0
  const map = []
  let v
  for (let i = 0; i < 999; i++) {
    const w = sheet[A(2) + (i + offset + 1)]
    if (!w) continue
    if (j === 0) {
      map[j++] = w.v
      continue
    }
    const startTime = Number(w.v.substring(0,4))
    const prev = Number(map[j-1].substring(0,4))
    if (startTime > prev)
      map[j++] = w.v
    else break
  }
  return map
}
