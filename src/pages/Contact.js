import React from 'react'

import { Container } from 'react-bootstrap'

class Contact extends React.Component {
  onSubmit = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <Container id="contact">
      <div className="Contact">
        <h2>Contact form</h2>
        <form>
          <input placeholder="name" type="name" />
          <input placeholder="email" type="email" />
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
      </Container>
    )
  }
}
export default Contact