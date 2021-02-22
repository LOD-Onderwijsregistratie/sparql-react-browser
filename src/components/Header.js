import React from 'react'

import Navigation from './Nav'

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <header>
          <Navigation />
        </header>
      </div>
    )
  }
}

export default Header