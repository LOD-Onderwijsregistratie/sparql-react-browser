import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Examples from '../components/Examples'
import { fetchTest, fetchSparql, fetchAboutSubject, removeSelectedNode} from '../redux/actions/index'
import { push } from 'connected-react-router'


const mapStateToProps = (state, props) => {
  return {
    datasource: state.datasource,
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ 
    fetchTest,
    fetchSparql, 
    fetchAboutSubject, 
    removeSelectedNode,
    push 
  }, dispatch)

const ConnectedExamples = connect(mapStateToProps, mapDispatchToProps)(Examples)

export default ConnectedExamples