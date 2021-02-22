import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ForceGraph from '../components/ForceGraph'

import { setSelectedNode, removeSelectedNode, fetchAboutClickedNode, fetchParentAndSubNodes} from '../redux/actions/index'

const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    datasource: state.datasource,
    links: state.links,
    data: state.data,
    settings: state.forcegraphsettings,
    history: state.router
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({
    setSelectedNode,
    removeSelectedNode,
    fetchAboutClickedNode,
    fetchParentAndSubNodes,
  }, dispatch)

const ConnectedForceGraph = connect(mapStateToProps, mapDispatchToProps)(ForceGraph)

export default ConnectedForceGraph