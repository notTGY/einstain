function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const SEPARATORS = [' ', '\n', ',', '"', '(', ')', '-', '\'', '?']
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
      splitByWords.push(letter)
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


M=['~','$', ' ', '\n', '\'', ',']
for (i = 26; i --> 0;) {
  M[i+6]=String.fromCharCode(97+i)
}

const encodeLetters = (letters) => {
  let allCodes = []
  const LETTERS_IN_SECTION = 7
  const LETTERS_IN_ENCODED = 5
  while (letters.length % LETTERS_IN_SECTION !== 0) {
    letters.push('~')
  }
  //console.log({letters})
  const sectionsNum = letters.length / LETTERS_IN_SECTION
  for (let i = 0; i < sectionsNum; i++) {
    const section = []
    for (let k = 0; k < LETTERS_IN_ENCODED; k++) {
      section[k] = 0
    }
    for (let j = 0; j < LETTERS_IN_SECTION; j++) {
      const letter = letters[i*LETTERS_IN_SECTION+j]
      let num = M.indexOf(letter)
      if (num === -1) {
        num = 1
      }
      const bits = []
      for (let k = 0; k < LETTERS_IN_ENCODED; k++) {
        const kthBit = (num>>(LETTERS_IN_ENCODED-k-1))%2
        bits[k] = kthBit
        section[k] += (2**j)*kthBit
      }
      //console.log({bits, num})
    }
    //console.log({section})
    allCodes = allCodes.concat(section)
  }
  //console.log({allCodes})
  return String.fromCharCode(...allCodes)
}

const encodeWords = (words) => {
  let orderedLetters = []
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    for (let n = 0; n < word.length; n++) {
      orderedLetters.push(word[n])
    }
    orderedLetters.push('~')
  }
  const encodeWordsByNumber = encodeLetters(orderedLetters)
  return encodeWordsByNumber
}

const encodeFullText = (splits, words) => {
  const charCodes = []
  for (let i = 0; i < splits.length; i++) {
    const curSplit = splits[i]
    const index = words.indexOf(curSplit)
    if (index !== -1) {
      charCodes.push(index)
    }
  }
  const replaceLetterWithWord = String.fromCharCode(...charCodes)
  return replaceLetterWithWord
}

const encode = (cleanText) => {
  const wordData = countWords(cleanText)

  const wordsToEncode = Object.keys(wordData.countByWord)
  const encodeWordsByNumber = encodeWords(wordsToEncode)
  const replaceLetterWithWord = encodeFullText(wordData.splitByWords, wordsToEncode)

  const JS = `for(w=E='',j=-1,R='${replaceLetterWithWord}',i=R.length;0<i--;E=w.split\`~\`[R.charCodeAt(i)]+E)while(j++<1e4)w+=(\`~$ \n',\`+String.fromCharCode(...Array.from({length:26},function(v,i){return i+97})))[[0,1,2,3,4].reduce(function(a,i){return a*2+('${encodeWordsByNumber}'.charCodeAt((j-j%7)/7*5+i)/(2**j%7)|0)%2},0)];outerHTML=E`
  const HTML = `<svg onload="${JS}">`

  const finalFile = HTML
  return {
    replaceLetterWithWord, encodeWordsByNumber,
    wordsToEncode, finalFile
  }
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
  const wordData = countWords(letterData.clean)
  const encoding = encode(letterData.clean)
  const dataLen =
    encoding.encodeWordsByNumber.length
    + encoding.replaceLetterWithWord.length
  //console.log({song, countData})
  return {
    //...letterData,
    ...wordData,
    //...encoding,
    //dataLen,
    //song,
  }
}

let OUT_SONGS = []

const doStuff = (songs) => {
  const filteredSongs = songs.filter(song => {
    //return song.Title == "Silent Night"
    return true
  })
  const songsData = filteredSongs.map(song => doSong(song))
  const wordsData = songsData.reduce((acc, cur) => {
    for (const word in cur.countByWord) {
      if (!acc[word]) {
        acc[word] = 0
      }
      acc[word] += cur.countByWord[word]
    }
    return acc
  }, {})
  const wordsArray = []
  for (const word in wordsData) {
    wordsArray.push({word, count: wordsData[word]})
  }
  wordsArray.sort((data1, data2) => {
    return data2.count - data1.count
  })
  /*
  songsData.sort((data1, data2) => {
    //return data1.wordCount - data2.wordCount
    //return data1.uniqueWords - data2.uniqueWords
    return data1.dataLen - data2.dataLen
  })
  */
  //console.log(songsData)
  console.log(wordsArray)
  //const example = songsData[3]
  //download(example.song.Title + '.html', example.finalFile)
}

fetch('./songs.json').then(r => r.json()).then(doStuff)

