import React from 'react'
import { Button, Card } from 'react-bootstrap'

class Example extends React.Component {
  constructor(props) {
    super();
    this.state = {
      query: "SELECT * WHERE" + "{" + "?sub ?pred ?obj ." + "}" + "LIMIT 10",
      subject: "http://lod.onderwijsregistratie.nl/rio/id/Onderwijsbestuur/100B490",
    }

  }

  render() {
    return (
      <>
        
          <Card>
            <Card.Body>
              <Card.Title>Persoon & relevante adressen</Card.Title>
              <Card.Text>
                Dit voorbeeld laat zien hoe de applicatie een persoon visualiseerd met de bijbehorende relevante adressen</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => { 
                this.props.removeSelectedNode()
                this.props.fetchTest()
                }}>Bekijk voorbeeld</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Extra gevens opvragen </Card.Title>
              <Card.Text>
                Een blauwe node representeerd een uri, door hierop te klikken kan extra informatie over deze uri worden opgevraagd en toegeveogd aan de visualisatie.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => {
                this.props.removeSelectedNode()
                this.props.fetchAboutSubject('SELECT * ' +
                'WHERE { <http://lod.onderwijsregistratie.nl/rio/id/Onderwijsbestuur/100B490> ?property ?object }' +
                'limit 200', this.props.datasource.currentDatasource)}}>Bekijk voorbeeld</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Zoeken op basis van text input</Card.Title>
              <Card.Text>
                <p>U kunt in de applicatie ook zoeken op basis van text. Hiervoor gaat u naar de tab "Zoeken". </p>
                <p>Hierbij kunt u eerst het klasse type waarop u wilt zoeken selecteren door de naam hiervan in te vullen in het klasseveld, en een optie uit de lijst te selecteren.</p>
                <p>Vervolgens kunt u met het 2e zoekveld "instane" een instanie van de eerder geselecteerde klasse selecteren.</p>
                <p>Druk nu op de knop "Laad instance" en de applicatie doet de rest.</p>
              </Card.Text>
            </Card.Body>
          </Card>

        
      </>
    )
  }
}

export default Example