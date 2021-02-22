import { SET_FORCEGRAPH_SETTINGS } from '../actionTypes'

export const setForcegraphSettings = (settings) => {
  return {
    type: SET_FORCEGRAPH_SETTINGS,
    settings
  }
}