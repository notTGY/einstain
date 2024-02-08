function decode(replaceLetterWithWord, encodeWordsByNumber) {
// replaceLetterWithWord='  '
// every 5 letters have 5 bits from seven letters
// encodeWordsByNumber='abcdeabcde'

//console.log({replaceLetterWithWord, encodeWordsByNumber})
/*
const Arr = []
for (let i = 0; i < 245; i++) {
  Arr.push(encodeWordsByNumber.charCodeAt(i))
}
console.log({Arr})
*/

M=['~','$', ' ', '\n', '\'', ',']
for (i = 26; i --> 0;) {
  M[i+6]=String.fromCharCode(97+i)
}
const getNthLetter=(n) => {
  const bitInSector = n % 7
  const sector = (n - bitInSector)/7
  const bits = [0,1,2,3,4].map(i => {
    const letter =
      encodeWordsByNumber.charCodeAt(sector*5 + i)
    return (letter>>bitInSector)%2
  })
  //console.log(bits)
  const num = bits.reduce((a,b)=>a*2+b,0)
  //console.log(num)
  //console.log({n, num})
  return M[num]
}
W=[]
j = 0
for (wordNumber = 0; wordNumber < 128; wordNumber++) {
  word = ''
  WLetter = ''
  while ((WLetter=getNthLetter(j++)) != '~') {
    word += WLetter
  }
  W[wordNumber] = word
}
//console.log({W})
res = replaceLetterWithWord
  .split``
  .map(wordNumber => W[wordNumber.charCodeAt(0)])
  .join``

  return res
}

onclick = e => {
  const testSong = OUT_SONGS[0]
  //console.log(testSong)
  const {
    replaceLetterWithWord, encodeWordsByNumber
  } = testSong
  let res = decode(
    replaceLetterWithWord, encodeWordsByNumber
  )
  //console.log({res, input: testSong.song.Lyrics})
  //console.log({wordsToEncode: testSong.wordsToEncode})
}
