const id = 'pip-twitch-exstenstion'
const open = () => {
  const video = document.querySelector('video')
  video.requestPictureInPicture()
}

const init = () => {
  if (document.getElementById(id)) return

  const container = document.querySelector('.player-controls__right-control-group')
  const button = document.createElement('button')
  button.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 16 16">
    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
      <path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z"/>
  </svg>
  `

  button.onclick = open
  button.id=id
  button.style.width=32;
  button.style.height=32;
  button.style.zIndex = 99999;

  container.prepend(button)

  console.log(button)
}

document.addEventListener('mousemove', init)
