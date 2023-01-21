const id = 'pip-twitch-exstenstion'
const open = () => {
  const video = document.querySelector('video')
  video.requestPictureInPicture()
}

const css = `
#${id} {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
  border-radius: 4px;
}

#${id}:hover {
  background: rgb(255, 255, 255, 0.2);
}

#${id}:hover .tooltiptext {
  visibility: visible;
}

#${id} .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: white;
  color: #000;
  text-align: center;
  padding: 3px 6px;
  border-radius: 0.4rem;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.2rem;
  text-align: left;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  margin-bottom: 6px;
                 
  position: absolute;
  bottom: 100%;
}
#${id} .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}
`;
const style = document.createElement('style')
if (style.styleSheet) {
  style.styleSheet.cssText = css
} else {
  style.appendChild(document.createTextNode(css))
}
document.getElementsByTagName('head')[0].appendChild(style)

const init = () => {
  const el = document.getElementById(id)
  if (el) {
    return
    el.remove()
  }

  const containers = document.querySelectorAll('#channel-player .player-controls__right-control-group')
  const button = document.createElement('button')
  button.innerHTML = `
  <div role="tooltip" class="tooltiptext">Picture In Picture</div>
  <svg style="width: 2rem; height: 2rem;" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 16 16">
    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
      <path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z"/>
  </svg>
  `

  button.onclick = open
  button.id=id


  if (containers) {
    const container = containers[1] ?? containers[0]
    container.prepend(button)
  }
}

document.addEventListener('mousemove', init)
