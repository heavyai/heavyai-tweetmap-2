import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';

/*
  DC COUNT
*/
export function createCount() {
  return () => {
    const crossfilter = getCf();

    const countGroup = crossfilter.groupAll();
    const dataCount = dc.countWidget(".tweetCount")
      .dimension(crossfilter)
      .group(countGroup);
  }
}
