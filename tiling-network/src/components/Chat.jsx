import * as happyFramework from '@framework'
import Col from './Col'
import Row from './Row'
import Center from './Center'

export default function Chat(props) {
  const children = props.contacts.map(contact => {
    return (
      <div className="contact">
        <div
          className={
            `bubble ${
              contact.notifications
                ? 'new'
                : contact.online
                  ? 'online'
                  : ''
            }`
          }
        >
          <Center>
            {{text: contact.notifications}}
          </Center>
        </div>
        {contact.name}
      </div>
    )
  })
  return (
    <Row className="justify-center">
      { Col({ children }) }
    </Row>
  )
}
