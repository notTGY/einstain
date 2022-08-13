import * as happyFramework from '@framework'
import Row from './Row'

export default function Chevron(props) {
  const { total, current } = props
  const circles = new Array(total).fill().map(
    (_, i) => {
      return current === i
        ? <div className="circle-light"/>
        : <div className="circle-dark"/>
    }
  )

  return Row({
    ...props,
    children: circles
  })
}
