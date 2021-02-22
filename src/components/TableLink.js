import React from 'react'
import { isValidHttpUrl } from '../utils/index'

class TableLink extends React.Component {

  shouldComponentUpdate(){
 // make sure ompoentn updates
  }

  render() {

    const renderSubject = () => {
      if (this.props.link.source.type === 'uri' || isValidHttpUrl(this.props.link.target.id)  ){
        return <a href={this.props.link.source.id} target={this.props.link.source.id}>{this.props.link.source.id}</a>
      }
      else {
       return this.props.link.source.id
      }

    }

    const renderProperty = () => {
      return <a href={this.props.link.property} target={this.props.link.property}>{this.props.link.property}</a>
    }

    const renderObject = () => {
      if (this.props.link.property.type === 'uri' || isValidHttpUrl(this.props.link.target.id) ){
        return <a href={this.props.link.target.id} target={this.props.link.target.id}>{this.props.link.target.id}</a>
      }
      else {
        return this.props.link.target.id
      }
    }

    return (
    <tr>
      <td>
        {renderSubject()}
      </td>
      <td>
        {renderProperty()}
      </td>
      <td>
        {renderObject()}
      </td>

    </tr>)
  }
}

export default TableLink