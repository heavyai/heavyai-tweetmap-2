import {
  LANG_COUNTS_UPDATE,
  SELECTED_LANG_UPDATE
} from "./actions"

export const initialState = {
  selectedLangs: [],
  langCounts: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LANG_COUNTS_UPDATE:
      return {...state, langCounts: action.langCounts}
    case SELECTED_LANG_UPDATE:
      return {...state, selectedLangs: action.selected}
    default:
      return state
  }
}
