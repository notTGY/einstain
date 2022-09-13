import happyFramework from '@happyFramework'

let count = 0
let value = ''

const Button = ({ onclick, children }) =>(
  <button onclick={onclick}>{children}</button>
)

const App = () => {
  console.log('render')

  return (
    <div id="root">
      <h1>Счастливый фреймворк</h1>
      <div>
        <Button onclick={(e) => count++}>+1</Button>
      </div>
      <div>current count: {count.toString()}</div>
      <div>
        {
          new Array(count)
            .fill(
              <Button onclick={(e) => count--}>
                -1
              </Button>
            )
        }
      </div>

      <p>
        Документация на <a href="https://счастливыйконец.рф/фреймворк">https://счастливыйконец.рф/фреймворк</a>
      </p>
    </div>
  )
}


const render = happyFramework.init(
  document.getElementById('root'), App
)
