import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ForceGraphSidebar from '../components/ForceGraphSidebar'
import { setSelectedNode, removeSelectedNode, fetchAboutClickedNode, fetchHistoryGraphs, fetchFromHistoricGraphs, setSelectedHistoryGraph} from '../redux/actions/index'

const mapStateToProps = (state, props) => {
  return {
    data: state.data,
    datasource: state.datasource,
    nodes: state.nodes,
    links: state.links,
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ 
    setSelectedNode,
    removeSelectedNode,
    fetchAboutClickedNode,
    fetchHistoryGraphs,
    fetchFromHistoricGraphs,
    setSelectedHistoryGraph,

  }, dispatch)

const ConnectedForceGraphSidebar = connect(mapStateToProps, mapDispatchToProps)(ForceGraphSidebar)

export default ConnectedForceGraphSidebar