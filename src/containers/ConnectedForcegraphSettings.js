import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ForcegraphSettings from '../components/forcegraphSettings'

import { setForcegraphSettings } from '../redux/actions/forcegraphSettings'

const mapStateToProps = (state, props) => {
  return {
    settings: state.forcegraphsettings
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({
    setForcegraphSettings,
  }, dispatch)

const ConnectedSlider = connect(mapStateToProps, mapDispatchToProps)(ForcegraphSettings)

export default ConnectedSlider