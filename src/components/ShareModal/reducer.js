import {
  CLOSE_SHARE,
  OPEN_SHARE,
  TOGGLE_SHARE_MODE,
  VIEW_URL_UPDATE
} from "./actions"

export const initialState = {
  modalOpen: false,
  applyFilters: true,
  viewUrl: "#"
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_SHARE:
      return {...state, modalOpen: true}
    case CLOSE_SHARE:
      return {...state, modalOpen: false}
    case TOGGLE_SHARE_MODE:
      return {...state, applyFilters: !state.applyFilters}
    case VIEW_URL_UPDATE:
      return {...state, viewUrl: action.url}
    default:
      return state
  }
}
