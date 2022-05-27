import happyFramework from './framework'
import dom from './jsx'

let selectedRoom = null
String.prototype.capitalize = function () {
  const first = this[0].toUpperCase()
  return first + this.substring(1)
}

rooms = [
  {
    name: '413 ГК',
    status: 'свободна',
    till: '13:00',
    info: 'Просто хорошая аудитория :)',
  },
  {
    name: '525 ГК',
    status: 'занята',
    till: '13:00',
    info: 'Есть розетки и проектор',
  },
  {
    name: '530 ГК',
    status: 'занята',
    till: '12:20',
    info: 'Есть розетки и проектор',
  },
]


const Room = ({name, status, click}) => (
  <button className="room" click={click}>
    <div className="room-info">
      <h2> {name} </h2>
      <p className="room-status">
        <span> статус: </span> <span> {status} </span>
      </p>
    </div>
  </button>
)

const Popup = ({name, status, till, info}) => (
  <>
    <div className="ghost-popup"/>
    <div className="popup">
      <div className="tumbler">
        <button click={()=>selectedRoom=null}/>
      </div>
      <h2 className="name"> {name} </h2>
      <p className="features">
        {info}
      </p>
      <p className="open-till inset-p">
        {status.capitalize()}&nbsp;до&nbsp;{ till }
      </p>
    </div>
  </>
)

const App = () => {
  console.log('render')

  const roomsJsx = rooms.map(
    (data, i) => (
      <Room
        {...data}
        click={
          () => {
            selectedRoom=i;
            requestAnimationFrame(() => {
              const room = document.querySelectorAll('.room')[i]
              scrollTo({ top: room.scrollTop })
            })
          }
        }
      />
    )
  )

  return (
    <>
      <header>
        <div className="header-container">
          <h1> Аудитории </h1>
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
    </>
  )
}


const render = happyFramework(
  document.getElementById('root'), App
)
