import * as CrossFilter from "@mapd/crossfilter";

const tableName = 'tweets_nov_feb';
let crossfilter = null;

export function createCf(con) {
  return CrossFilter.crossfilter(con, tableName)
    .then(cf => {
      crossfilter = cf;
      return Promise.resolve(cf, con);
    });
}

export function getCf() {
  return crossfilter
}
