import {
  CLOSE_NAV,
  CLOSE_SEARCH,
  TOGGLE_NAV,
  TOGGLE_SEARCH
} from "./actions"

export const initialState = {
  navOpen: true,
  locSearchOpen: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return {...state, navOpen: !state.navOpen}
    case CLOSE_NAV:
      return {...state, navOpen: false}
    case TOGGLE_SEARCH:
      return {...state, locSearchOpen: !state.locSearchOpen}
    case CLOSE_SEARCH:
      return {...state, locSearchOpen: false}
    default:
      return state
  }
}
