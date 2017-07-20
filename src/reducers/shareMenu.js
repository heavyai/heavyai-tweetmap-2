import {TOGGLE_CURRENT, VIEW_URL_UPDATE} from "../actions"

const initialState = {
  currentView: true,
  viewUrl: "#"
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CURRENT:
      return Object.assign({}, state, {
        currentView: !state.currentView
      })
    case VIEW_URL_UPDATE:
      return Object.assign({}, state, {
        viewUrl: action.url
      })
    default:
      return state
  }
}
