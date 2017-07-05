import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';
import { getConnection } from '../services/connector';

import { updateQueryTerms } from '../actions';

let searchDim = null

function filterSearch(queries) {
  return (dispatch, getState) => {
    if (!searchDim) {
      searchDim = getCf().dimension("tweet_tokens").setDrillDownFilter(true)
    }

    if (queries.length == 0) {
      searchDim.filterAll()
    }
    else {
      searchDim.filterMulti(queries)
    }

    // You must call redrawAll after applying custom filters.
    dc.redrawAllAsync();
    dispatch(updateQueryTerms(queries))
  }
}

export function addFilters(queries) {
  return (dispatch, getState) => {
    const { queryTerms, ...rest } = getState()
    const unique = [...new Set(queryTerms.concat(queries))]
    dispatch(filterSearch(unique))
  }
}

export function removeFilter(query) {
  return (dispatch, getState) => {
    const { queryTerms, ...rest } = getState()
    const queries = queryTerms.filter((queryTerm) => queryTerm !== query )
    dispatch(filterSearch(queries))
  }
}

export function initFilters(queries) {
  return (dispatch) => {
    searchDim = getCf().dimension("tweet_tokens").setDrillDownFilter(true)
    if (queries.length !== 0) {
      searchDim.filterMulti(queries)
      dispatch(updateQueryTerms(queries))
    }
  }
}
