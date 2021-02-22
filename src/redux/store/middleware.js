import thunkMiddleware from 'redux-thunk'

import { applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()

const middleware = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(history)
)

export default middleware