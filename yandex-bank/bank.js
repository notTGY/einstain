addEventListener("error", async (event) => {
  console.log(`https://www.google.com/search?q=${encodeURIComponent(event.message)}`)
  window.open(`https://www.google.com/search?q=${encodeURIComponent(event.message)}`)
});

function displayBalance() {
  const balance = document.querySelector('h2').innerText
  const balanceNum = parseFloat(balance.replace(',','.'))
  const mount = document.querySelector('[class^=SplitLayout-module__content__]');
  const balanceEl = document.createElement('div')

  const initial = document.createElement('span')
  initial.innerText = balance

  const minus = document.createElement('span')
  minus.innerHTML = '&nbsp;-&nbsp;'
  minus.className = 'minus'

  const result = document.createElement('div')
  result.id = 'result'
  result.className = 'result'

  const spent = document.createElement('input')
  spent.placeholder = '0'
  spent.type = 'number'
  spent.min = '0'
  spent.max = balanceNum.toString()
  spent.className = 'spent'
  spent.addEventListener('input', e => {
    const val = e.target.value
    const res = balanceNum - val
    result.className = res > 0 ? 'result' : 'result neg'
    result.innerHTML = val ? `&nbsp;=&nbsp${res.toFixed(2)}` : ''
  })


  balanceEl.append(initial, minus, spent, result)


  balanceEl.className = 'balance'
  mount.firstChild.after(balanceEl)
}

function removeOverflowHidden() {
  const element = document.querySelector('.infinite-scroll-component')
  element.style.overflow = 'auto'
}

function applyCSS() {
  html.classList.add('w67')
}

function setup() {
  applyCSS()
  displayBalance()
  removeOverflowHidden()
}

const html = document.querySelector('html')
const balance = document.querySelector('[class^=MainBalanceBlock-module__mainBalanceAndCardWrapper__]')
if (html.getAttribute('data-rum-page-id') === 'bank.webstandaloneapp.debit' && balance) {
  setup()
}