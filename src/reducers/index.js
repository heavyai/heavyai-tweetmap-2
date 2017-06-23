import {
  LANG_COUNTS_UPDATE,
  SELECTED_LANG_UPDATE
} from '../actions'

const initialState = {
  langCounts: [],
  selectedLangs: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LANG_COUNTS_UPDATE:
      return Object.assign({}, state, {
        langCounts: action.langCounts
      })
    case SELECTED_LANG_UPDATE:
      return Object.assign({}, state, {
        selectedLangs: action.selected
      })
    default:
      return state
  }
}
