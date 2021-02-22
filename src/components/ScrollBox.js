import React from 'react'
import styles from './ScrollBox.module.scss';

class ScrollBox extends React.Component {
  render() {
    return <div className={styles.[this.props.orientation]}>
      {this.props.children}
    </div>
  }
}

export default ScrollBox