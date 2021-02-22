import React from 'react'
import { isValidHttpUrl } from '../utils/index'

import { Form, Table } from 'react-bootstrap'

import { fetchFromHistoricGraphs } from '../redux/actions/index'

class History extends React.Component {
  constructor(props) {
    super();
    this.state = ({
      docURI: null,
      data: null
        })

    this.handleChange = this.handleChange.bind(this)
  }

handleChange(event) {
  
  console.log(event.target.value)

  this.props.sshg(event.target.value)  
  this.props.ffhg(event.target.value, this.props.datasource)
  
}

  componentDidMount(){
    if(isValidHttpUrl(this.props.selectedNode.id)){
      // fire query to determine all the graph that exist of the selected node uri
      this.props.fhg(this.props.selectedNode.id, this.props.datasource)
    }
    
  }

  componentDidUpdate(prevprops){
    if(this.props.selectedNode.id !==  prevprops.selectedNode.id && isValidHttpUrl(this.props.selectedNode.id)){
      // fire query to determine all the graph that exist of the selected node uri when it gets updated
      this.props.fhg(this.props.selectedNode.id, this.props.datasource)
    }
  }

  render() {
    console.log("rerender")

 const renderHistorySelect = () => {
   if(this.props.selectedNode.historyList && this.props.selectedNode.historyList.length > 1){  
   return(
    <>
      <p>History van: {this.props.selectedNode.id}</p>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>History opties</Form.Label>
          <Form.Control as="select" onChange={this.handleChange}>
            {this.props.selectedNode.historyList.map((h, i) => {
              return (<option key={i}>{h}</option>) })}
          </Form.Control>
        </Form.Group>
      </Form>
  </>

   )
   } 
   else {
     return(<p>Geen history beschikbaar</p>)
   }
  }

  const renderHistory = () => {
    
    if(this.props.selectedNode.history){
      return(
        <>
         <Table responsive>
              <tr>
                <th>Subject</th>
                <th>Property</th>
                <th>Value</th>
              </tr>
              
              {this.props.selectedNode.history.map((link, index) => {
                return(
                <tr>
                  <td><a href={link.subject.value}>{link.subject.value}</a></td>
                  <td><a href={link.property.value}>{link.property.value}</a></td>
                  <td>{link.object.value}</td>
                </tr>)})}
            </Table>
        </>
      )
    }
  }

    return(
      <div>
            {renderHistorySelect()}
            {renderHistory()}
            
      </div>
    )
  }
}
export default History