import * as dc from "@mapd/mapdc"
import {appendTweets, setTweets} from "../actions"
import {getCf} from "../services/crossfilter"
import {TWEET_FETCH_SIZE} from "../constants"

let _chart = null

function fetchTweets (offset) {
  return _chart
    .dimension()
    .order("tweet_time")
    .topAsync(TWEET_FETCH_SIZE, offset)
    .then(results => {
      const tweets = results.map(obj => ({
        id: obj.tweet_id,
        name: obj.sender_name,
        date: obj.tweet_time,
        body: obj.tweet_text
      }))

      return Promise.resolve(tweets)
    })
}

/*
  TWEET CHART
  creates a dummy chart added to dc chart registry
  tweet side bar is actually rendered by React,
  triggered by updating props/state
*/
export function createTweetChart () {
  return (dispatch, getState) => {
    const crossfilter = getCf()
    const tweetDim = crossfilter
      .dimension(null)
      .projectOn(["sender_name", "tweet_time", "tweet_id", "tweet_text"])

    //  _chart lives in the chart registry, triggering redraws through dataAsync()
    _chart = dc.baseMixin({})
    _chart.dimension(tweetDim)
    _chart.group(() => 0)

    // dummy DOM elem should take no space
    _chart.minWidth(0)
    _chart.minHeight(0)

    // rendering is instead done by React
    _chart._doRender = _chart._doRedraw = () => {}

    _chart.setDataAsync((group, callback) => {
      fetchTweets(0).then(
        tweets => {
          dispatch(setTweets(tweets))
          callback()
        },
        err => {
          console.error(err)
          callback()
        }
      )
    })

    _chart.anchor("#tweetDummy")
  }
}

export function loadMoreTweets () {
  return (dispatch, getState) => {
    if (!_chart) {
      return
    }

    const offset = getState().tweets.length
    fetchTweets(offset).then(tweets => {
      dispatch(appendTweets(tweets))
    }, console.error)
  }
}
