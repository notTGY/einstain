import * as happyFramework from '@framework'
import Center from './Center'

export default function Map() {
  const controls = [
    <Center className="typography">
      <b className="z10 m8">
        Here is the address for tomorrow party 🥳     🥳
🥳
🥳
🥳
🥳

      </b>
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
        <img className="film-cover" src="map.png"/>
      ]
    }
  ]
}

