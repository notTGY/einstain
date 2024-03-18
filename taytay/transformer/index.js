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

const SEPARATORS = [' ', '\n', ',', '"', '(', ')', '-', '\'', '?', '$']
const countWords = (text) => {
  const countByWord = {}
  let uniqueWords = 0
  let wordCount = 0
  let word = ''
  let splitByWords = []
  const cleanText = text + ' '
  for (let i = 0; i < cleanText.length; i++) {
    const letter = cleanText[i]
    if (SEPARATORS.includes(letter)) {
      if (word !== '') {
        splitByWords.push(word)
        if (countByWord[word]) {
          countByWord[word]++
          wordCount++
        } else {
          countByWord[word] = 1
          uniqueWords++
          wordCount++
        }
        word = ''
      }
      if (countByWord[letter]) {
        countByWord[letter]++
        wordCount++
      } else {
        countByWord[letter] = 1
        uniqueWords++
        wordCount++
      }
    } else {
      word += letter
    }
  }
  return { uniqueWords, wordCount, countByWord, splitByWords }
}
const saveTrainingData = ({songsData, wordFreq}) => {
  const clean = songsData.map(s => s.clean)
  const text = clean.join('~')
  download('songs.txt', text)

  const words = wordFreq.map(w => w.word).join('~')
  download('words.txt', words)
}
const doSong = (song) => {
  const letterData = countLetters(song.Lyrics)
  const wordData = countWords(letterData.clean)
  return {
    ...wordData,
    ...letterData,
    song,
  }
}
const wordFreqAnal = (songsData) => {
  const wordFreq = {}
  for (const song of songsData) {
    for (const word in song.countByWord) {
      if (!wordFreq[word]) {
        wordFreq[word] = 0
      }
      wordFreq[word] += song.countByWord[word]
    }
  }
  const dic = []
  for (const word in wordFreq) {
    if (!SEPARATORS.includes(word) && wordFreq[word] > 1 && word.length > 1) {
      dic.push({word, count: wordFreq[word]})
    }
  }
  dic.sort((data1, data2) => {
    return data2.count - data1.count
  })
  return dic
}
const doStuff = (songs) => {
  const filteredSongs = songs.filter(song => {
    //return song.Title == "Silent Night"
    return true
  })
  const songsData = filteredSongs.map(song => doSong(song))
  const wordFreq = wordFreqAnal(songsData)
  console.log({wordFreq})
  saveTrainingData({songsData, wordFreq})

  const song = songsData[0]
  const str = '~'+song.clean.substring(0, 7)
  const input_ids = tokenize(str)

  const output_ids = model(input_ids)

  const generated = untokenize(output_ids)

  console.log(str, generated)

}
fetch('../songs.json').then(r => r.json()).then(doStuff)
