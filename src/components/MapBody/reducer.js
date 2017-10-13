import {
  CLOSE_LINECHART,
  FILTER_TIME,
  HIDE_HIGHLIGHT,
  MOVE_MAP,
  SET_HEAT_AGG_MODE,
  SET_MAP_TYPE,
  SHOW_HIGHLIGHT,
  TOGGLE_LINECHART,
  TWEET_COUNT_UPDATE,
  USER_LOCATION_FAILURE,
  USER_LOCATION_REQUEST,
  USER_LOCATION_SUCCESS
} from "./actions"

export const initialState = {
  mapCenter: [0, 0],
  mapZoom: 1,
  timeBounds: null,
  tweetCount: 0,
  lineChartOpen: true,
  geoLoading: false,
  highlight: null,
  chartType: "points",
  aggMode: "#",
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case MOVE_MAP:
      return {...state, mapZoom: action.zoom, mapCenter: action.center}
    case FILTER_TIME:
      return {...state, timeBounds: action.times}
    case TWEET_COUNT_UPDATE:
      return {...state, tweetCount: action.count}
    case TOGGLE_LINECHART:
      return {...state, lineChartOpen: !state.lineChartOpen}
    case CLOSE_LINECHART:
      return {...state, lineChartOpen: false}
    case USER_LOCATION_REQUEST:
      return {...state, geoLoading: true}
    case USER_LOCATION_SUCCESS:
      return {...state, geoLoading: false}
    case USER_LOCATION_FAILURE:
      return {...state, geoLoading: false}
    case SHOW_HIGHLIGHT:
      return {...state, highlight: action}
    case HIDE_HIGHLIGHT:
      return {...state, highlight: null}
    case SET_MAP_TYPE:
      return {...state, chartType: action.chartType}
    case SET_HEAT_AGG_MODE:
      return {...state, aggMode: action.aggMode}
    default:
      return state
  }
}
