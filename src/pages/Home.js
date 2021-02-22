import React from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

import { Container } from 'react-bootstrap'

class Home extends React.Component {

  render() {
    return (
      <Container id="Home">
      <div className="Home">
        <Jumbotron>
          <h1>Sparql-React-Browser</h1>
          <p>
            Welkom bij de Sparql-React-Browser. Via deze applicatie kunt u open onderwijsdata opvragen en visualiseren. Met onderstaande zoekmogelijkheid komt u snel bij de data die u zoekt. Data wordt weergegeven in een graph JSON. Het gaat om open informatie.
          </p>
          <p>
            <Button variant="primary" onClick={() => this.props.history.push('/sparql-react-browser/graph/examples')}>Probeer uit!</Button>
          </p>
        </Jumbotron>
      </div>
      </Container>
    )
  }
}
export default Home