import {QUERIES_UPDATE} from "./actions"

export const initialState = {
  queryTerms: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case QUERIES_UPDATE:
      return {...state, queryTerms: action.queries}
    default:
      return state
  }
}
