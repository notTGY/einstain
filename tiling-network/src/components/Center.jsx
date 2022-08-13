import * as happyFramework from '@framework'

export default function Center(props) {
  return {
    ...props,
    className: 'col center ' + (props.className ?? '')
  }
}

