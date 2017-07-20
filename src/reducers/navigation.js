import {
  CLOSE_LINECHART,
  CLOSE_NAV,
  CLOSE_SEARCH,
  CLOSE_SHARE,
  CLOSE_TWEETBAR,
  TOGGLE_LINECHART,
  TOGGLE_NAV,
  TOGGLE_SEARCH,
  TOGGLE_SHARE,
  TOGGLE_TWEETBAR,
  USER_LOCATION_FAILURE,
  USER_LOCATION_REQUEST,
  USER_LOCATION_SUCCESS
} from "../actions"

const initialState = {
  leftNav: false,
  locationSearch: false,
  shareModal: false,
  tweetBar: false,
  lineChart: true,
  locationLoading: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return Object.assign({}, state, {leftNav: !state.leftNav})
    case CLOSE_NAV:
      return Object.assign({}, state, {leftNav: false})
    case TOGGLE_SEARCH:
      return Object.assign({}, state, {locationSearch: !state.locationSearch})
    case CLOSE_SEARCH:
      return Object.assign({}, state, {locationSearch: false})
    case TOGGLE_SHARE:
      return Object.assign({}, state, {shareModal: !state.shareModal})
    case CLOSE_SHARE:
      return Object.assign({}, state, {shareModal: false})
    case TOGGLE_TWEETBAR:
      return Object.assign({}, state, {tweetBar: !state.tweetBar})
    case CLOSE_TWEETBAR:
      return Object.assign({}, state, {tweetBar: false})
    case TOGGLE_LINECHART:
      return Object.assign({}, state, {lineChart: !state.lineChart})
    case CLOSE_LINECHART:
      return Object.assign({}, state, {lineChart: false})
    case USER_LOCATION_REQUEST:
      return Object.assign({}, state, {locationLoading: true})
    case USER_LOCATION_SUCCESS:
      return Object.assign({}, state, {locationLoading: false})
    case USER_LOCATION_FAILURE:
      return Object.assign({}, state, {locationLoading: false})
    default:
      return state
  }
}
