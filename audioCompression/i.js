const input = document.querySelector('input')
const audio = document.createElement('audio')
const canvas = document.querySelector('canvas')
//audio.controls = true
document.body.append(audio)


const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

const distortion = audioCtx.createWaveShaper()
const analyser = audioCtx.createAnalyser()
analyser.fftSize = 2048

const bufferLength = analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)


input.onchange = e => {
  audio.src = window.URL.createObjectURL(e.target.files[0])
  const source = audioCtx.createMediaElementSource(audio)
  audio.play()
  audioCtx.resume()

  source.connect(analyser)
  analyser.connect(distortion)
  distortion.connect(audioCtx.destination)
  draw()
}

const c = canvas
const ctx = c.getContext`2d`

function draw() {
  analyser.getByteTimeDomainData(dataArray)
  ctx.clearRect(0,0,c.width,c.height)
  for (let i = 0; i < dataArray.length; i++) {
    x = i * c.width / dataArray.length
    y = dataArray[i] * c.height / 255
    ctx.fillRect(x,y,1,1)
  }
  console.log(dataArray)
  requestAnimationFrame(draw)
}
