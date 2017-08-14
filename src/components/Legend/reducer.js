import {
  LEGEND_COUNTS_UPDATE,
  MODE_UPDATE,
  SELECTED_LEGEND_UPDATE
} from "./actions"

export const initialState = {
  selected: [],
  legendCounts: [],
  mode: "lang"
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LEGEND_COUNTS_UPDATE:
      return {...state, legendCounts: action.legendCounts}
    case SELECTED_LEGEND_UPDATE:
      return {...state, selected: action.selected}
    case MODE_UPDATE:
      return {...state, mode: action.mode}
    default:
      return state
  }
}
