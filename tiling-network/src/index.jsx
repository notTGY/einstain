import * as happyFramework from '@framework'
import Card from 'components/Card'
import Col from 'components/Col'
import Center from 'components/Center'
import Row from 'components/Row'
import Description from 'components/Description'
import Notes from 'components/Notes'
import Gallery from 'components/Gallery'
import Music from 'components/Music'
import Chat from 'components/Chat'
import Film from 'components/Film'
import Map from 'components/Map'


const contacts = [
  { name: 'Amin Yahouse', notifications: 3 },
  { name: 'Jeannete Amin', online: true },
  { name: 'Anot Jasmine'},
  { name: 'Mike Oxmaul'},
  { name: 'JSON statham'},
  { name: 'Yagon Don'},
]

let currentGallery = 0
const pics = ['skater.png', 'profile.jpeg', 'people.png', '1.jpeg', '2.jpeg']
setInterval(() => {
  currentGallery = ++currentGallery % pics.length
  render()
}, 3000)

let width = window.innerWidth
onresize = () => {
  width = window.innerWidth
  render()
}

const App = () => {
  console.log('render')


  if (width < 1100) {
    return (
    <>
      <Center>
        <Col>

          <Row>
            <Card>
              <Center>
                <img
                  className="profile-hover"
                  src="profile.jpeg"
                />
              </Center>
            </Card>
            <Card>
              <Chat contacts={contacts}/>
            </Card>
          </Row>

          <Row>
            <Card size="long">
              <Description/>
            </Card>
          </Row>

          <Row>
            <Card size="big">
              <Gallery
                current={currentGallery}
                pics={pics}
              />
            </Card>
          </Row>

          <Row>
            <Card size="long">
              <Map/>
            </Card>
          </Row>


          <Row>
            <Card>
              <Music/>
            </Card>
          </Row>

          <Row>
            <Card size="long">
              <Film/>
            </Card>
          </Row>

          <Row>
            <Card size="long">
              <Notes/>
            </Card>
          </Row>

        </Col>
      </Center>
    </>
    )
  }

  return (
    <>
      <Center>
        <Col>
          <Row>

            <Col>
              <Row>
                <Card size="long">
                  <Description/>
                </Card>
                <Card>
                  <Center>
                    <img
                      className="profile-hover"
                      src="profile.jpeg"
                    />
                  </Center>
                </Card>
              </Row>
              <Row>
                <Card>
                  <Chat contacts={contacts}/>
                </Card>
                <Card size="long">
                  <Map/>
                </Card>
              </Row>
            </Col>

            <Card size="big">
              <Gallery
                current={currentGallery}
                pics={pics}
              />
            </Card>

          </Row>

          <Row>
          
            <Card>
              <Music/>
            </Card>

            <Card size="long">
              <Film/>
            </Card>

            <Card size="long">
              <Notes/>
            </Card>

          </Row>

        </Col>
      </Center>
    </>
  )
}


const render = happyFramework.init(
  document.getElementById('root'), App
)
