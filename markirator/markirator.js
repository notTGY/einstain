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
  [/\[>_ ([^\]]*)\]/g, '<input placeholder=$1 />'],
  [/\[([^\]]*)]\(([^(]+)\)/g, '<a href="$2">$1</a>'],
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

const convertBlock = block => {
  if (block === '') return ''
  const lines = block.split('\n')
  const first = lines[0][0]
  if (first === '<') return block
  if (first === '#') {
    const order = lines[0].split('').findIndex(c => c !== '#')
    const text = convertInline(lines[0].substring(order))
    lines.shift()
    return `<h${order}>\n${text}\n</h${order}>\n${convertBlock(lines.join('\n'))}`
  }
  if (lines[0].match(/^---/)) {
    lines.shift()
    return `<hr>\n${convertBlock(lines.join('\n'))}`
  }
  if (first === '>')
    return `<blockquote>\n${convertBlock(lines.map(line => line.substring(2)).join('\n'))}\n</blockquote>\n`
  if (first === '*') {
    const lis = lines.map(line => line.substring(2)).map(convertInline)
    return `<ul>\n<li>${lis.join('</li>\n<li>')}</li>\n</ul>\n`
  }
  if (lines[0].match(/^\d+\./)) {
    const lis = lines.map(line => line.replace(/^\d+\./, '')).map(convertInline)
    return `<ol>\n<li>${lis.join('</li>\n<li>')}</li>\n</ol>\n`
  }
  if (first === ' ') return `<pre>\n${block.replace(...inlineRules[0])}</pre>\n`
  return `<p>\n${convertInline(block)}</p>\n`
}

const blocks = md.replace(/\r\n/g, '\n').split(/\n\n+/)

const banner = `
<p style="border-radius:5px;border:1px solid grey;background:lightyellow;padding:1rem">
  Generated HTML via <a href="https://gist.github.com/notTGY/9065ded41067b428931021ca0c8993b4">markirator.js</a>
</p>
`

addCode()

const data = '<article>' + banner + blocks.map(convertBlock).join('\n') + '</article>'


if (!secondArg) printAndExit(data, 0)
const fout = resolve(__dirname, secondArg)
fs.writeFileSync(fout, data)

function addCode() {
  inlineRules.splice(1, 0, [/`([^`]+)`/g, '<code>$1</code>'])
}
