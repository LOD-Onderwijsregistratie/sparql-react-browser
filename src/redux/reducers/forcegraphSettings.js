import { SET_FORCEGRAPH_SETTINGS } from '../actionTypes'

export default function forcegraphSettingsReducer(state = {
  linkDistance: {
    min: 0,
    max: 800,
    value: 400,
  },
  forceCharge: {
    min: -3000,
    max: 0,
    value: -3000,

  }
},
  action) {
  switch (action.type) {
    case SET_FORCEGRAPH_SETTINGS: {

      return action.settings
    }

    default:
      return state
  }
}