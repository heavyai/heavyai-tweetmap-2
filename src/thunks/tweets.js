import * as dc from "@mapd/mapdc"
import {appendTweets, setTweets} from "../actions"
import {getCf} from "../services/crossfilter"
import {TWEET_FETCH_SIZE} from "../constants"

let dummyChart = null

function fetchTweets (offset) {
  return dummyChart
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
  return (dispatch) => {
    const crossfilter = getCf()
    const tweetDim = crossfilter
      .dimension(null)
      .projectOn(["sender_name", "tweet_time", "tweet_id", "tweet_text"])

    //  dummyChart lives in the chart registry, triggering redraws through dataAsync()
    dummyChart = dc.baseMixin({})
    dummyChart.dimension(tweetDim)
    dummyChart.group(() => 0)

    // dummy DOM elem should take no space
    dummyChart.minWidth(0)
    dummyChart.minHeight(0)

    // rendering is instead done by React
    dummyChart._doRender = dummyChart._doRedraw = () => {}

    dummyChart.setDataAsync((group, callback) => {
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

    dummyChart.anchor("#tweetDummy")
  }
}

export function loadMoreTweets () {
  return (dispatch, getState) => {
    if (!dummyChart) {
      return
    }

    const state = getState().tweetBar
    const offset = state.tweets.length
    fetchTweets(offset).then(tweets => {
      dispatch(appendTweets(tweets))
    }, console.error)
  }
}
