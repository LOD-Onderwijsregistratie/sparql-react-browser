import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { clearError } from '../redux/actions/index'

import Error from '../components/Error'

const mapStateToProps = (state, props) => {
  return {
    message: state.error && state.error.message
  }
}

const mapDispatchToProps = (dispatch, props, state) =>
  bindActionCreators({
    clearError,
  }, dispatch)

const ConnectedError = connect(mapStateToProps, mapDispatchToProps)(Error)

export default ConnectedError