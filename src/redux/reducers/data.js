import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS, FETCH_ABOUT_CLICKED_NODE_SUCCESS } from '../actionTypes'

export default function dataReducer(state = {
  id: 1,

},
  action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {
      NewState.id = state.id + 1
      return NewState
    }
    case FETCH_SPARQL_SUCCESS: {
      NewState.id = state.id + 1
      return NewState
    }
    case FETCH_SPARQL_ABOUTSUBJECT_SUCCESS: {
      NewState.id = state.id + 1
      return NewState
    }
    case FETCH_ABOUT_CLICKED_NODE_SUCCESS: {
      NewState.id = state.id + 1
      return NewState
    }
    default:
      return state
  }
}