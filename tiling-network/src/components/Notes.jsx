import * as happyFramework from '@framework'
import Col from './Col'
import Row from './Row'

export default function Notes(props) {
  return (
    <Col className="typography m8">
      
      <Row>
        <img className="h16 vm8" src="secure.svg"/>
        <span className="m8">
          only you can see this note
        </span>
      </Row>

      <p className="m8">
        > plane at 20:00 to LHR (pack before 16:00)
      </p>
      <p className="mono blue">
        reminder set (expiration in 4 hours 12 minutes)
      </p>
      <p className="m8">
        Don't forget to buy eggs for the breakfast
      </p>
      <p className="m8 mono">
        My national insurance number is: ************ &lt;- tap to reveal
      </p>
    </Col>
  )
}

