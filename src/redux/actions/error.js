import { CREATE_ERROR, CLEAR_ERROR } from '../actionTypes'

export const createError = (error) => {
  return {
    type: CREATE_ERROR,
    error

  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  }
}

