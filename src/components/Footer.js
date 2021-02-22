import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <footer id="Footer">
        <p>© React-SPARQL-Browser {new Date().getYear() + 1900}</p>
      </footer>
    )
  }
}

export default Footer