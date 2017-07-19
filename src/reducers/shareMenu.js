import {VIEW_URL_UPDATE} from "../actions"

const initialState = {
  viewUrl: "#"
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case VIEW_URL_UPDATE:
      return Object.assign({}, state, {
        viewUrl: action.url
      })
    default:
      return state
  }
}
