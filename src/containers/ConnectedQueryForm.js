import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import QueryForm from '../components/QueryForm'
import { fetchTest, fetchSparql, fetchAboutSubject, removeSelectedNode } from '../redux/actions/index'
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

const ConnectedQueryForm = connect(mapStateToProps, mapDispatchToProps)(QueryForm)

export default ConnectedQueryForm