import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';

import {
  updateTweets
} from '../actions';

/*
  TWEET CHART
  creates a dummy chart added to dc chart registry
  tweet side bar is actually rendered by React,
  triggered by updating props/state
*/
export function createTweetChart() {
  return (dispatch) => {
    const crossfilter = getCf();
    const tweetDim = crossfilter.dimension(null).projectOn([
      "sender_name",
      "tweet_time",
      "tweet_id",
      "tweet_text",
      "lon as x",
      "lat as y",
      "country",
      "admin1"
    ]);

    //  _chart lives in the chart registry, triggering redraws through dataAsync()
    const _chart = dc.baseMixin({})
    _chart.dimension(tweetDim)
    _chart.group(() => 0)

    // dummy DOM elem should take no space
    _chart.minWidth(0)
    _chart.minHeight(0)

    // rendering is instead done by React
    _chart._doRender = _chart._doRedraw = () => {}

    _chart.setDataAsync((group, callback) => {
      // TODO sort by date:
      _chart.dimension().topAsync(10).then(results => {
        const tweets = results.map(obj => ({
          name: obj.sender_name,
          date: obj.tweet_time,
          body: obj.tweet_text
        }))

        dispatch(updateTweets(tweets))
        callback()
      }, error => {
        console.error(error)
        callback()
      })
    })

    _chart.anchor('#tweetDummy')
  }
}
