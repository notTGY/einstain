const synth = window.speechSynthesis
const rec = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new rec()
let voices
onclick=e=>{
  recognition.start()
  voices = synth.getVoices()
  console.log(voices)
}

recognition.onresult = e => {
  const text = [...e.results].map(result => result[0].transcript).join(' ')
  const utter = new SpeechSynthesisUtterance(text)
  console.log(text)
  utter.voice = voices[8]
  synth.speak(utter)
  setTimeout(e=>recognition.start(), 1000)
}
