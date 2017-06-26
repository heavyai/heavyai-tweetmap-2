import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';
import { getConnection } from '../services/connector';

import { updateQueryTerms } from '../actions';

let searchDim = null

export function filterSearch(queries) {
  return (dispatch) => {
    dispatch(updateQueryTerms(queries))

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
  }
}
