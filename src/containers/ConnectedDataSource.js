import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DataSource from '../components/DataSource'
import { setCurrentDatasource, toggleSearchAll, toggleBlockDatasource, deleteDatasource } from '../redux/actions/index';


const mapStateToProps = (state, props) => {
  return {
    datasource: state.datasource

  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({
    setCurrentDatasource,
    toggleSearchAll,
    toggleBlockDatasource,
    deleteDatasource,
  }, dispatch)

const ConnectedDataSource = connect(mapStateToProps, mapDispatchToProps)(DataSource)

export default ConnectedDataSource