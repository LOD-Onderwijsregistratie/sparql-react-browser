import React from 'react'

class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFound">
        <h1>Not Found...</h1>
        <button onClick={() => this.props.history.push('/home')}>Go home</button>
      </div>
    )
  }
}
export default NotFound