import * as happyFramework from '@framework'

export default function Row(props) {
  return {
    ...props,
    className: 'row ' + (props.className ?? '')
  }
}
