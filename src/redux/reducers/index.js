// Root Reducer, combines all reducers into one single reducer
import { combineReducers } from 'redux'

// reducer for updating forcegraph based on meaningfull changes.
import dataReducer from './data'

//sparql endpoint data reducers
import nodesReducer from './nodes'
import linkesReducer from './links'

import datasourceReducer from './datasource'
import forcegraphSettingsReducer from './forcegraphSettings'

//utility reducers
import loadingReducer from './loading'
import errorReducer from './error'

//router reducer
import { connectRouter } from 'connected-react-router'

const appReducer = (history) => combineReducers({
  data: dataReducer,
  nodes: nodesReducer,
  links: linkesReducer,
  datasource: datasourceReducer,
  forcegraphsettings: forcegraphSettingsReducer,
  loading: loadingReducer,
  error: errorReducer,
  router: connectRouter(history)
})

export default appReducer