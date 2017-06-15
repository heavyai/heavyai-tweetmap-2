import { MAPD_CONNECT_SUCCESS } from '../actions'

const initialState = {
  isConnected: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case MAPD_CONNECT_SUCCESS:
      return Object.assign({}, state, {
        isConnected: true
      })
    default:
      return state
  }
}
