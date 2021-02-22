// redux
import { createStore, compose } from 'redux'

//root reducer
import appReducer from '../reducers/index'

//middleware
import middleware from './middleware'
import { history } from './middleware'

//devtools
import { persistState } from 'redux-devtools'
import DevTools from '../../containers/DevTools'


const enhancer = compose(
  middleware,
  DevTools.instrument(),
  persistState(getSessionKey())
)

function getSessionKey() {
  const matches = window.location.href.match(/[?&]debug=([^&#])\b/)
  return (matches && matches.length > 0)
    ? matches[1]
    : null
}

export default function configureStore(initialState) {
  return createStore(appReducer(history), initialState, enhancer)
}