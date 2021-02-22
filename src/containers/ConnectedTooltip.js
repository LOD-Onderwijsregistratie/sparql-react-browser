import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Tooltip from '../components/Tooltip'

import { fetchClasses, fetchInstances, setSelectedClass, setSelectedInstance, fetchAboutSubject } from '../redux/actions/index'

const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    }
}

const mapDispatchToProps = (dispatch, props, state) =>
  bindActionCreators({
    }, dispatch)

const ConnectedTooltip = connect(mapStateToProps, mapDispatchToProps)(Tooltip)

export default ConnectedTooltip