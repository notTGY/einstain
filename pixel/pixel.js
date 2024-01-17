// JS initializing
const start = () => {
  // TODO: send analytic to some proprietary cloud
  
  const root = document.getElementById('pixel')
  root.className = 'black-background' 


  let alerts = ['Hello world']

  const paintSelector = () => {
    root.className = 'selector-container'
    root.innerHTML = ''
  }

  const paintWatchface = () => {
    const time = document.createElement('span')
    const date = new Date()
    time.innerText =
      `${
        date.getHours().toString().padStart(2, '0')
        }:${
        date.getMinutes().toString().padStart(2, '0')
      }`
    time.className = 'watchface-time'

    const Alert = document.createElement('button')
    Alert.className = 'watchface-alert'
    const alertText = document.createElement('span')
    alertText.innerText = alerts[0]
    const counter = document.createElement('span')
    counter.innerText = alerts.length.toString()
    counter.className = 'watchface-counter'
    Alert.append(alertText, counter)

    root.className = 'watchface-container'
    root.innerHTML = ''

    root.appendChild(time)
    if (alerts[0] != null) {
      root.appendChild(Alert)
    }
  }
  paintWatchface()
}

window.addEventListener('load', start)
