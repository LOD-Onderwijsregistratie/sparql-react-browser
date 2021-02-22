import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

class AddDatasource extends React.Component {
  constructor() {
    super();
    this.state = ({
      show: false,
      name: '',
      endpoint: '',

    })

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEndpointChange = this.handleEndpointChange.bind(this)
  }
  handleModal() {
    this.setState({
      show: !this.state.show,
      name: '',
      endpoint: '',
    })
  }

  handleNameChange(event) {
    console.log(event.target.value)
    this.setState({ name: event.target.value });
  }

  handleEndpointChange(event) {
    console.log(event.target.value)
    this.setState({ endpoint: event.target.value });
  }

  handleSubmitDatasource() {
    console.log('submit datasource')

    this.props.addDatasource(this.state.name, this.state.endpoint)

    this.setState({
      show: !this.state.show
    })

  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={() => { this.handleModal() }}>
          Databron Toevoegen
      </Button>

        <Modal
          show={this.state.show}
          onHide={() => this.handleModal()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Databron Toevoegen: </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form onSubmit={() => this.handleSubmitDatasource()}>

              <Form.Group controlId="formName">
                <Form.Label>Naam:</Form.Label>
                <Form.Control type="text" placeholder="Naam" onChange={this.handleNameChange} />

              </Form.Group>

              <Form.Group controlId="formEndpoint">
                <Form.Label>Endpoint:</Form.Label>
                <Form.Control type="text" placeholder="Endpoint" onChange={this.handleEndpointChange} />
              </Form.Group>
            </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => { this.handleModal() }}>Sluiten</Button>
            <Button variant="primary" onClick={() => { this.handleSubmitDatasource() }}>Opslaan</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

}

export default AddDatasource

