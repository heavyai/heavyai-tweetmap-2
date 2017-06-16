import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';
import { getConnection } from '../services/connector';

function createMultiFilterArray(search) {
  if (search == "") {
    return undefined;
  }

  return search.split(',').map(function(searchValue) {
    return searchValue.trim();
  });
}

export function filterSearch(value) {
  return () => {
    const crossfilter = getCf();
    const searchFilterTweets = crossfilter.dimension("tweet_tokens").setDrillDownFilter(true);

    var mutipleFilterArray = createMultiFilterArray(value);
    if (mutipleFilterArray) {
      searchFilterTweets.filterMulti(mutipleFilterArray);
    } else {
      // Clears all filters
      searchFilterTweets.filter();
    }
    // You must call redrawAll after applying custom filters.
    dc.redrawAllAsync();
  }
}
