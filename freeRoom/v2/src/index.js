import happyFramework from './framework'
import { dom } from './jsx'

let selectedRoom = null

let currentTime = {}
currentTime.hours = (new Date()).getHours()
currentTime.minutes = (new Date()).getMinutes()
let currentDayOfTheWeek = (new Date()).getDay()
let timetable = [
  {key: 1, value: {start: {hours: 9, minutes: 0}, end: {hours: 10, minutes: 25}}},
  {key: 2, value: {start: {hours: 10, minutes: 45}, end: {hours: 12, minutes: 10}}},
  {key: 3, value: {start: {hours: 12, minutes: 20}, end: {hours: 13, minutes: 45}}},
  {key: 4, value: {start: {hours: 13, minutes: 55}, end: {hours: 15, minutes: 20}}},
  {key: 5, value: {start: {hours: 15, minutes: 30}, end: {hours: 16, minutes: 55}}},
  {key: 6, value: {start: {hours: 17, minutes: 5}, end: {hours: 18, minutes: 30}}},
  {key: 7, value: {start: {hours: 18, minutes: 35}, end: {hours: 20, minutes: 0}}}
]
let currentPara = 0
timetable.forEach(e => {
  if (e.value.start.hours*60+e.value.start.minutes <= currentTime.hours*60+currentTime.minutes) {
    if (e.value.end.hours*60+e.value.end.minutes >= currentTime.hours*60+currentTime.minutes) {
      currentPara = e.key
    }
  }
})

const bigData = typeof BIGDATA === 'undefined' ? {} : BIGDATA



const Room = ({name, status, onClick}) => (
  <button className="room" onclick={onClick}>
    <div className="room-info">
      <h2> {name} </h2>
      <p className="room-status">
        <span> {status ? 'занята' : 'свободна'} </span>
      </p>
    </div>
  </button>
)

const Popup = ({name, status, till, info}) => (
  <>
    <div className="ghost-popup"/>
    <div className="popup-wrapper">
      <div className="popup">
        <div className="tumbler">
          <button onclick={()=>selectedRoom=null}/>
        </div>
        <h2 className="name"> {name} </h2>
        <p className="features">
          {info}
        </p>
        <p className="open-till inset-p">
          {status ? 'занята' : `свободна до ${ till }`}
        </p>
      </div>
    </div>
  </>
)

let para = 4
let dow = currentDayOfTheWeek
const disclaimer = 'Парсер не учитывает сдвоенные пары, так что аккуратнее.'
const App = () => {
  const rooms = Object.keys(bigData).map(name => {
    const allEvents = bigData[name]
    const todayEvents = allEvents
      .filter((ev) => {
        if (dow !== ev.dow) return false
        return ev.para >= para
      }).sort((ev1, ev2) => ev1.para - ev2.para)
    if (!todayEvents.length) {
      const tillEv = allEvents.find((ev) => ev.dow > dow) || bigData[name][0]
      const d = new Date(Date.UTC(0, 0, tillEv.dow, 0, 0, 0))
      const till = d.toLocaleString(window.navigator.language, {weekday: 'long'});
      return {
        name,
        status: false,
        till,
        tillDOW: tillEv.dow,
        info: disclaimer,
      }
    }
    const nextEvent = todayEvents[0]
    if (nextEvent.para > para) {
      // свободна до начала $ пары
      const till = `начала ${nextEvent.para} пары`
      return {
        name,
        status: false,
        till,
        tillP: nextEvent.para,
        info: disclaimer,
      }
    }
    const { course, action } = nextEvent
    const info = `курс: ${course}\nпредмет: ${action}`
    const till = ''
    return {
      name,
      status: true, 
      till,
      info,
    }
  }).sort((room1, room2) => {
    if (room1.status && !room2.status) return 1
    if (room2.status && !room1.status) return -1
    if (!room1.status && !room2.status) {
      const room1P = room1.tillP ?? Infinity
      const room2P = room2.tillP ?? Infinity
      if (room1P < room2P)  return 1
      if (room1P > room2P)  return -1
      const room1DOW = room1.tillDOW ?? -1
      const room2DOW = room2.tillDOW ?? -1
      if (room1DOW < room2DOW)  return 1
      if (room1DOW > room2DOW)  return -1
      return 0
    }
    return 0
  })


  const roomsJsx = rooms.map(
    (data, i) => (
      <Room
        {...data}
        onClick={() => {
          selectedRoom=i;
          requestAnimationFrame(() => {
            const room = document.querySelectorAll('.room')[i]
            //scrollTo({ top: room.scrollTop })
          })
        }
        }
      />
    )
  )

  const onParaSelect = (e) => {
    const value = e.target.value
    para = Number(value)
  }

  const SelectPara = ({}) => ({
    elem: 'select',
    id: 'selp',
    onchange: onParaSelect,
    children: 
      Array.from({length: 6}, (_, i) => {
        const n = i + 1
        return (
          <option value={n.toString()} selected={n===para}>{n.toString()}</option>
        )
      })
  })

  const onDOWSelect = (e) => {
    const value = e.target.value
    dow = Number(value)
  }
  const SelectDOW = ({}) => ({
    elem: 'select',
    id: 'seld',
    onchange: onDOWSelect,
    children: 
      Array.from({length: 7}, (_, i) => {
        const n = i + 1
        const d = new Date(Date.UTC(0, 0, n, 0, 0, 0))
        const weekday = d.toLocaleString(window.navigator.language, {weekday: 'long'});
        return (
          <option value={n.toString()} selected={n===dow}>{weekday}</option>
        )
      })
  })

  return (
    <div>
      <header>
        <div className="header-container">
          <h1> Аудитории </h1>
          <label for="selp">Пара:
            <SelectPara/>
          </label>
          <label for="seld">День недели:
            <SelectDOW/>
          </label>
        </div>
      </header>
      <div className="container">
        <div className="room-container">
          {roomsJsx}
        </div>
      </div>
        <a
          className="copy"
          click={
            e => window.open(
              'https://github.com/notTGY'
            )
          }
        >
          &copy; notTGY
        </a>
      {
        selectedRoom != null
        ? (
          <Popup {...rooms[selectedRoom]}/>
        )
        : ''
      }
    </div>
  )
}


const render = happyFramework.init(
  document.getElementById('root'), App
)
