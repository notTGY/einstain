import { M, tokenize, untokenize, model } from './neural.js'

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const countLetters = (text) => {
  const countByLetter = {}
  let letterCount = 0
  let isInsideOfUseless = false
  let clean = ''
  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toLowerCase()

    if (isInsideOfUseless) {
      if (']' === letter) {
        isInsideOfUseless = false
      }
      continue
    }
    if ('[' === letter) {
      isInsideOfUseless = true
      continue
    }

    if (M.indexOf(letter) >= 0) {
      clean += letter
    } else {
      clean += '$'
    }

    if (countByLetter[letter]) {
      countByLetter[letter]++
    } else {
      countByLetter[letter] = 1
      letterCount++
    }
  }
  return {countByLetter, letterCount, clean}
}
const saveTrainingData = (songsData) => {
  const clean = songsData.map(s => s.clean)
  const text = clean.join('~')
  download('data.txt', text)
}
const doSong = (song) => {
  const letterData = countLetters(song.Lyrics)
  return {
    ...letterData,
    song,
  }
}
const doStuff = (songs) => {
  const filteredSongs = songs.filter(song => {
    //return song.Title == "Silent Night"
    return true
  })
  const songsData = filteredSongs.map(song => doSong(song))
  //saveTrainingData(songsData)

  const song = songsData[0]
  const str = '~'+song.clean.substring(0, 7)
  const input_ids = tokenize(str)

  const output_ids = model(input_ids)

  const generated = untokenize(output_ids)

  console.log(str, generated)

}
fetch('../songs.json').then(r => r.json()).then(doStuff)
