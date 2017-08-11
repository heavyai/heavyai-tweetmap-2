import {
  LEGEND_COUNTS_UPDATE,
  SELECTED_UPDATE
} from "./actions"

export const initialState = {
  selected: [],
  legendCounts: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LEGEND_COUNTS_UPDATE:
      return {...state, legendCounts: action.legendCounts}
    case SELECTED_UPDATE:
      return {...state, selected: action.selected}
    default:
      return state
  }
}
