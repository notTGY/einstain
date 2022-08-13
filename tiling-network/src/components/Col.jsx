import * as happyFramework from '@framework'

export default function Col(props) {
  return {
    ...props,
    className: 'col ' + (props.className ?? '')
  }
}
