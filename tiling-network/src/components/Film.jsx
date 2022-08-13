import * as happyFramework from '@framework'
import Center from './Center'

export default function Film() {
  const controls = [
    <Center>
      <img className="jst" src="jst.svg"/>
    </Center>
  ]


  return [
    {
      className: 'card-sm',
      children: controls
    },
    {
      className: 'card-sm',
      children: [
        <img className="film-cover" src="amazing-spiderman.jpg"/>
      ]
    }
  ]
}
