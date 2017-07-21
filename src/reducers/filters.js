import {
  FILTER_TIME,
  LANG_COUNTS_UPDATE,
  MOVE_MAP,
  QUERIES_UPDATE,
  SELECTED_LANG_UPDATE
} from "../actions"

const defaultFilters = {
  mapCenter: [0, 0],
  mapZoom: 1,
  timeBounds: null,
  queryTerms: [],
  selectedLangs: [],
  langCounts: []
}

export default function reducer (state = defaultFilters, action) {
  switch (action.type) {
    case MOVE_MAP:
      return Object.assign({}, state, {
        mapZoom: action.zoom,
        mapCenter: action.center
      })
    case FILTER_TIME:
      return Object.assign({}, state, {
        timeBounds: action.times
      })
    case LANG_COUNTS_UPDATE:
      return Object.assign({}, state, {
        langCounts: action.langCounts
      })
    case SELECTED_LANG_UPDATE:
      return Object.assign({}, state, {
        selectedLangs: action.selected
      })
    case QUERIES_UPDATE:
      return Object.assign({}, state, {
        queryTerms: action.queries
      })
    default:
      return state
  }
}
