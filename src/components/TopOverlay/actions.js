import * as dc from "@mapd/mapdc"
import {getCf} from "../../services/crossfilter"

export const QUERIES_UPDATE = "QUERIES_UPDATE"

export function updateQueryTerms (queries) {
  return {
    type: QUERIES_UPDATE,
    queries
  }
}

let searchDim = null

function filterSearch (queries) {
  return (dispatch) => {
    if (!searchDim) {
      searchDim = getCf().dimension("tweet_tokens").setDrillDownFilter(true)
    }

    if (queries.length === 0) {
      searchDim.filterAll()
    } else {
      searchDim.filterMulti(queries)
    }

    // You must call redrawAll after applying custom filters.
    dc.redrawAllAsync()
    dispatch(updateQueryTerms(queries))
  }
}

export function addFilters (queries) {
  if (!Array.isArray(queries)) {
    queries = [queries]
  }

  return (dispatch, getState) => {
    const {queryTerms} = getState().topOverlay
    const unique = [...new Set(queryTerms.concat(queries))]
    dispatch(filterSearch(unique))
  }
}

export function removeFilter (query) {
  return (dispatch, getState) => {
    const {queryTerms} = getState().topOverlay
    const queries = queryTerms.filter(queryTerm => queryTerm !== query)
    dispatch(filterSearch(queries))
  }
}

export function initFilters (queries) {
  searchDim = getCf().dimension("tweet_tokens").setDrillDownFilter(true)

  return dispatch => {
    if (queries.length !== 0) {
      searchDim.filterMulti(queries)
      dispatch(updateQueryTerms(queries))
    }
  }
}
