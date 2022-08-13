import * as happyFramework from '@framework'
import Row from './Row'
import Card from './Card'
import Center from './Center'
import Chevron from './Chevron'

window.gallery = 0

export default function Gallery(props) {
  const { current, pics } = props
  const children = pics.map(pic => (
    <div className="card-big">
      <Center className="card-big">
        <img className="card-big gallery-pic" src={pic}/>
      </Center>
    </div>
  ))

  requestAnimationFrame(
    () => {
      window.gallery = document.querySelector('.overflow-auto')
      if (current === 0) {
        window.gallery.scrollTo({
          left: pics.length * 432,
        })
      } else {
        window.gallery.scrollTo({
          left: (current-1) * 432,
        })
      }
      window.gallery.scrollTo({
        left: current * 432,
        behavior: 'smooth',
      })
    }
  )

  return (<>
    {{
      className: "card-big",
      children: [
        <Chevron
          total={pics.length}
          current={current}
          className="b16"
        />
      ]
    }}
    {{
      className:"card-big gallery-container",
      children: [
        Row({
          className: "overflow-auto",
          children,
        }),
      ]
    }}
  </>)
}
