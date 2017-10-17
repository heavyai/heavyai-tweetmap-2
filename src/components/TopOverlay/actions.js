import {setHeatTargetFilters, toggleHeatAggMode} from "../MapBody/actions"

export const QUERIES_UPDATE = "QUERIES_UPDATE"

export function updateQueryTerms (queries) {
  return {
    type: QUERIES_UPDATE,
    queries
  }
}

let searchDim = null

function filterSearch (queries) {
  return (dispatch, getState, {dc, getCf}) => {
    if (!searchDim) {
      searchDim = getCf().dimension("tweet_tokens").setDrillDownFilter(true)
    }

    if (queries.length === 0) {
      searchDim.filterAll()
    } else {
      searchDim.filterMulti(queries)
    }

    dispatch(updateQueryTerms(queries))

  }
}

export function addFilters (queries) {
  if (!Array.isArray(queries)) {
    queries = [queries]
  }

  queries = queries.filter(q => q !== "")

  return (dispatch, getState, {dc}) => {
    const {queryTerms} = getState().topOverlay
    const unique = [...new Set(queryTerms.concat(queries))]
    dispatch(filterSearch(unique))
    if (getState().mapBody.chartType === "heat" && unique.length > queryTerms.length && getState().mapBody.aggMode !== "%") {
      dispatch(toggleHeatAggMode())
    } else if (getState().mapBody.chartType === "heat" && unique.length > queryTerms.length && getState().mapBody.aggMode === "%") {
      dispatch(setHeatTargetFilters())
      dc.redrawAllAsync()
    } else {
      dc.redrawAllAsync() // call redrawAll after applying custom filters.
    }
  }
}

export function removeFilter (query) {
  return (dispatch, getState, {dc}) => {
    const {queryTerms} = getState().topOverlay
    const queries = queryTerms.filter(queryTerm => queryTerm !== query)
    dispatch(filterSearch(queries))
    if (getState().mapBody.chartType === "heat" && queries.length === 0) {
      dispatch(toggleHeatAggMode())
    } else if (getState().mapBody.aggMode === "%") {
      dispatch(setHeatTargetFilters())
      dc.redrawAllAsync()
    } else {
      dc.redrawAllAsync() // call redrawAll after applying custom filters.
    }
  }
}

export function initFilters (queries) {
  return (dispatch, getState, {getCf}) => {
    searchDim = getCf().dimension("tweet_tokens").setDrillDownFilter(true)
    if (queries.length !== 0) {
      searchDim.filterMulti(queries)
      dispatch(updateQueryTerms(queries))
    }
  }
}
