import * as happyFramework from '@framework'
import Center from './Center'

export default function Music() {
  const controls = [
    <Center>
      <div className="play"/>
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
        <img className="album-cover" src="cover.jpg"/>
      ]
    }
  ]
}
