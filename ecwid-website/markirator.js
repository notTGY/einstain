const fs = require('fs')
const { resolve } = require('path')
const [ nodeArg, exeName, firstArg, secondArg ] = process.argv

const printAndExit = (message, code) => {
  code ? console.error(message) : console.log(message)
  process.exit(code)
}

if (!firstArg || firstArg === 'info') printAndExit(
`# Markirator v1.0.0
---
Usage: node markirator.js infile [outfile]`,
0)

const fin = resolve(__dirname, firstArg)
const md = fs.readFileSync(fin, 'utf8')

const inlineRules = [
  [/</g, '&lt;'],
  [/!\[([^\]]*)]\(([^(]+)\)/g, '<img alt="$1" src="$2">'],
  [/\[>_ "([^\"]*)"\]/g, '<label for="$1">$1:<input placeholder="$1" id="$1"/></label>'],
  [/\[([^\]]*)]\(([^(]+)\)/g, '<a href="$2">$1</a>'],
  [/\[([^\]]*)\]/g, '<button id="$1">$1</button>'],
  [/\*\*([^\*]*)\*\*/g, '<strong>$1</strong>'],
  [/__([^_]*)__/g, '<strong>$1</strong>'],
  [/\*([^\*]*)\*/g, '<em>$1</em>'],
  [/_([^_]*)_/g, '<em>$1</em>'],
]

const convertInline = line => {
  for (const rule of inlineRules) {
    line = line.replace(...rule)
  }
  return line.trim()
}

const blockRules = [
  (block, first, lines) => {
    if (first === '<') return { res: block, correct: true }
    return { correct: false }
  },
  (block, first, lines) => {
    if (first === '#') {
      const order = lines[0].split('').findIndex(c => c !== '#')
      const text = convertInline(lines[0].substring(order))
      const idEnd = text.indexOf('<')
      const id = (
          idEnd === -1 ? text : text.substring(0, idEnd)
        ).trim()
      lines.shift()
      const res = `<h${order} id="${id}">\n${text}\n</h${order}>\n${convertBlock(lines.join('\n'))}`
      return { res, correct: true }
    }
    return { correct: false }
  },
  (block, first, lines) => {
    if (lines[0].match(/^---/)) {
      lines.shift()
      const res = `<hr>\n${convertBlock(lines.join('\n'))}`
      return { res, correct: true }
    }
    return { correct: false }
  },
  (block, first, lines) => {
    if (first === '>') {
      const res = `<blockquote>\n${convertBlock(lines.map(line => line.substring(2)).join('\n'))}\n</blockquote>\n`
      return { res, correct: true }
    }
    return { correct: false }
  },
  (block, first, lines) => {
    if (first === '*') {
      const lis = lines.map(line => line.substring(2)).map(convertInline)
      const res = `<ul>\n<li>${lis.join('</li>\n<li>')}</li>\n</ul>\n`
      return { res, correct: true }
    }
    return { correct: false }
  },
  (block, first, lines) => {
    if (lines[0].match(/^\d+\./)) {
      const lis = lines.map(line => line.replace(/^\d+\./, '')).map(convertInline)
      const res = `<ol>\n<li>${lis.join('</li>\n<li>')}</li>\n</ol>\n`
      return { res, correct: true }
    }
    return { correct: false }
  },
  (block, first, lines) => {
    if (first === ' ') {
      const res = `<pre>\n${block.replace(...inlineRules[0])}</pre>\n`
      return { res, correct: true }
    }
    return { correct: false }
  },
  (block, first, lines) => {
    if (lines[0].match(/^-->/)) {
      lines.pop()
      const [first, ...rest] = lines
      const res = `<form>\n${convertBlock(rest.join('\n'))}</form>`
      return { res, correct: true }
    }
    return { correct: false }
  },
  (block, first, lines) => {
    const res = `<p>\n${convertInline(block)}</p>\n`
    return { res, correct: true }
  },
]

const convertBlock = block => {
  if (block === '') return ''
  const lines = block.split('\n')
  const first = lines[0][0]
  let i = 0
  let res = {}
  while(!res.correct) {
    res = blockRules[i++](block, first, lines)
  }
  return res.res
}

const blocks = md.replace(/\r\n/g, '\n').split(/\n\n+/)

const banner = `
<p style="border-radius:5px;border:1px solid grey;background:lightyellow;padding:1rem">
  Generated HTML via <a href="https://gist.github.com/notTGY/9065ded41067b428931021ca0c8993b4">markirator.js</a>
</p>
`

addCode()

const data = blocks.map(convertBlock).join('\n') + banner

if (!secondArg) printAndExit(data, 0)
const fout = resolve(__dirname, secondArg)
fs.writeFileSync(fout, data)

function addCode() {
  inlineRules.splice(1, 0, [/`([^`]+)`/g, '<code>$1</code>'])
}
