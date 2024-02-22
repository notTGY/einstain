import { readdirSync } from 'fs'
import xlsx from 'xlsx'
import { A, getOffsetInCol } from './utils.js'
const { readFile } = xlsx

const GKregex = /(\d\d\d)? ГК/

const daysOfWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]

const DATA_DIR = './big_data/data'

export function getBigData() {
  let bigData = {}
  const files = readdirSync(DATA_DIR)

  for (const file of files) {
    const data = readFile(DATA_DIR + '/' + file)
    const sheet = data.Sheets[data.SheetNames[0]]

    const offset = getOffsetInCol(sheet, 1, 'Дни')
    const timeLessonMap = getTimeLessonMap(
      sheet, offset
    )

    const cells = Object.keys(sheet).map(rowName => sheet[rowName])
    let currentDayOfWeek = null
    let currentPara = null
    cells.forEach(cell => {
      const value = cell.w
      if (daysOfWeek.includes(value)) {
        currentDayOfWeek =
          daysOfWeek.indexOf(value) + 1

        currentPara = null
      } else if (timeLessonMap.includes(value)) {
        currentPara =
          timeLessonMap.indexOf(value) + 1
      } else {
        const res = GKregex.exec(value)
        if (res && res[1]) {
          const name = res[0]
          if (!bigData[name]) {
            bigData[name] = []
          }
          bigData[name].push(
            {
              dow: currentDayOfWeek,
              para: currentPara,
              action: value,
              course: file,
            }
          )
        }
      }
    })
  }

  for (const room in bigData) {
    const takenTime = bigData[room]
    bigData[room] = takenTime.sort((o1, o2) => {
      const dow = o1.dow - o2.dow
      const para = o1.para - o2.para

      if (dow === 0) return para
      return dow
    })
  }
  return bigData
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

