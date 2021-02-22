import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AddDatasource from '../components/AddDataSource'

import { addDatasource } from '../redux/actions/datasource'


const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({
    addDatasource,
  }, dispatch)

const ConnectedAddDatasource = connect(mapStateToProps, mapDispatchToProps)(AddDatasource)

export default ConnectedAddDatasource