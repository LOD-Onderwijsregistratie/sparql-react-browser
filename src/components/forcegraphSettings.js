import React from 'react'
import { Form } from 'react-bootstrap'

class Slider extends React.Component {
  constructor() {
    super()

    this.state = {
      linkDistance: {
        min: 0,
        max: 800,
        value: 400,
      },
      forceCharge: {
        min: 0,
        max: 3000,
        value: 3000,

      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.applySettings.bind(this)
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let min = event.target.min
    let max = event.target.max
    console.log(event)
    this.setState({
      [name]: { min: min, max: max, value: value }
    }, () => {
      this.applySettings();
    });
  }

  applySettings() {
    this.props.setForcegraphSettings(this.state)
  }

  render() {
    return (
      <div className="slidecontainer">
        <Form>
          <Form.Group>
            <Form.Label>Link distance: {this.state.linkDistance.value}</Form.Label>
            <Form.Control type="range" name='linkDistance' min={this.state.linkDistance.min} max={this.state.linkDistance.max} value={this.state.linkDistance.value} class="slider" id="linkDistance" onChange={this.handleChange} ></Form.Control>
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>attraction: {this.state.forceCharge.value}</Form.Label>
            <Form.Control type="range" name='forceCharge' min={this.state.forceCharge.min} max={this.state.forceCharge.max} value={this.state.forceCharge.value} class="slider" id="forceCharge" onChange={this.handleChange} ></Form.Control>
          </Form.Group> */}
        </Form>
      </div >
    )
  }
}

export default Slider