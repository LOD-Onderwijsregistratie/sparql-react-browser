export default function errorReducer(state = {}, action) {
  if (action.type.endsWith('_FAILURE')) {
    return action.error
  }
  // clear error whensubmitting another request
  if (action.type.endsWith('_REQUEST')) {
    return {}
  }

  if (action.type === 'CREATE_ERROR') {
    console.log(action)
    return action.error
  }

  if (action.type === 'CLEAR_ERROR') {
    return {}
  }

  

  return state
}