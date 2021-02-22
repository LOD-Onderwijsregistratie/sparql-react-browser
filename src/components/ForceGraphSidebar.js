import React from 'react'
import { isValidHttpUrl } from '../utils/index'

import { Tab, Tabs, Table } from 'react-bootstrap'

import ConnectedQueryForm from '../containers/ConnectedQueryForm'
import ConnectedExamples from '../containers/ConnectedExamples';
import ConnectedSearch from '../containers/ConnectedSearch'
import ConnectedForcegraphSettings from '../containers/ConnectedForcegraphSettings'
import History from '../components/History'
import TableLink from '../components/TableLink'

class ForeGraphSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.fhg = this.props.fetchHistoryGraphs.bind(this)
    this.ffhg = this.props.fetchFromHistoricGraphs.bind(this)
    this.sshg = this.props.setSelectedHistoryGraph.bind(this)
  }

  render () {

    const renderlinks = (nodes, links) => {
    return links.map((link, index) => 
      {
        return(<TableLink key={index} link={link}></TableLink>)
        
      }
     
     )
  }
    
    const renderNodesandLinksTab = (nodes, links) => {
        return (
          <Tab eventKey="Nodes & links" title="Nodes & links">
            <Table responsive>
              <tr>
                <th>Subject</th>
                <th>Property</th>
                <th>Value</th>
              </tr>
              
              {links.map((link, index) => {return(<tr key={link.source.id}>
                <td>{link.source.id}</td>
                <td>{link.property}</td>
                <td>{link.target.id}</td>
              </tr>)})}
            </Table>
          </Tab>
        )
      
    }

    const renderHistoryTab = (nodes) => {
      if (nodes.selectedNode !== "" && isValidHttpUrl(nodes.selectedNode.id)) {
        return (
          <Tab eventKey="History" title="History">
            <History selectedNode={this.props.nodes.selectedNode} datasource={this.props.datasource} fhg={this.fhg} ffhg={this.ffhg} sshg={this.sshg}></History>
          </Tab>

        )
      }
      else {
        return (
          null
        )
      }
    }

    return(
      <Tabs defaultActiveKey="Zoeken" id="uncontrolled-tab-example">
        <Tab eventKey="Zoeken" title="Zoeken">
          <ConnectedSearch></ConnectedSearch>
          <ConnectedQueryForm></ConnectedQueryForm>
        </Tab>
        <Tab eventKey="Instellingen" title="Instellingen">
          <ConnectedForcegraphSettings />
        </Tab>
        <Tab eventKey="Voorbeelden" title="Voorbeelden">
          <ConnectedExamples></ConnectedExamples>
        </Tab>
        {/* {renderNodesandLinksTab(this.props.nodes, this.props.links)} */}
        {renderHistoryTab(this.props.nodes)}
      </Tabs>
    )
  }
}

export default ForeGraphSidebar