import { tokenize, untokenize, model } from './neural.js'

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

    clean += letter

    if (countByLetter[letter]) {
      countByLetter[letter]++
    } else {
      countByLetter[letter] = 1
      letterCount++
    }
  }
  return {countByLetter, letterCount, clean}
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
    return song.Title == "Silent Night"
    //return true
  })
  const songsData = filteredSongs.map(song => doSong(song))

  const song = songsData[0]
  const str = '~'+song.clean.substring(0, 7)
  const input_ids = tokenize(str)

  const output_ids = model(input_ids)

  const generated = untokenize(output_ids)

  console.log(str, generated)

}
fetch('../songs.json').then(r => r.json()).then(doStuff)
