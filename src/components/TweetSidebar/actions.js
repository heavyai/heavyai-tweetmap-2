import {HASHTAG_FETCH_SIZE, TWEET_FETCH_SIZE} from "../../constants"

export const TWEETS_APPEND = "TWEETS_APPEND"
export const TWEETS_SET = "TWEETS_SET"
export const HASHTAGS_SET = "HASHTAGS_SET"
export const SET_SIDEBAR_MODE = "SET_SIDEBAR_MODE"
export const TOGGLE_TWEETBAR = "TOGGLE_TWEETBAR"
export const CLOSE_TWEETBAR = "CLOSE_TWEETBAR"


export function setTweets (tweets) {
  return {
    type: TWEETS_SET,
    tweets
  }
}

export function appendTweets (tweets) {
  return {
    type: TWEETS_APPEND,
    tweets
  }
}

export function setHashtags (hashtags) {
  return {
    type: HASHTAGS_SET,
    hashtags
  }
}

export function setSidebarMode (setting) {
  return {
    type: SET_SIDEBAR_MODE,
    setting
  }
}

export const toggleSidebar = {type: TOGGLE_TWEETBAR}
export const closeSidebar = {type: CLOSE_TWEETBAR}

let dummyTweetChart = null

function fetchTweets (offset) {
  return dummyTweetChart
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
  return (dispatch, getState, {dc, getCf}) => {
    const crossfilter = getCf()
    const tweetDim = crossfilter
      .dimension(null)
      .projectOn(["sender_name", "tweet_time", "tweet_id", "tweet_text"])

    //  dummyTweetChart lives in the chart registry, triggering redraws through dataAsync()
    dummyTweetChart = dc.baseMixin({})
    dummyTweetChart.dimension(tweetDim)
    dummyTweetChart.group(() => 0)

    // dummy DOM elem should take no space
    dummyTweetChart.minWidth(0)
    dummyTweetChart.minHeight(0)

    // rendering is instead done by React
    dummyTweetChart._doRender = dummyTweetChart._doRedraw = () => {}

    dummyTweetChart.setDataAsync((group, callback) => {
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

    dummyTweetChart.anchor("#tweetDummy")
  }
}

export function loadMoreTweets () {
  return (dispatch, getState) => {
    if (!dummyTweetChart) {
      return
    }

    const state = getState().tweetSidebar
    const offset = state.tweets.length
    fetchTweets(offset).then(tweets => {
      dispatch(appendTweets(tweets))
    }, console.error)
  }
}

let dummyHashtagChart = null

function fetchHashtags () {
  return dummyHashtagChart
    .group()
    .topAsync(HASHTAG_FETCH_SIZE)
    .then(results => {
      const hashtags = results.map(obj => ({
        hashtag: obj.key0,
        count: obj.val
      }))

      return Promise.resolve(hashtags)
    })
}

/*
  HASHTAG CHART
  creates a dummy chart added to dc chart registry
  hashtag list is actually rendered by React,
  triggered by updating props/state
*/
export function createHashtagChart () {
  return (dispatch, getState, {dc, getCf}) => {
    const crossfilter = getCf()
    const hashtagDim = crossfilter.dimension("hashtags").allowTargeted(false)
    const hashtagGroup = hashtagDim.group().reduceCount()

    //  dummyHashtagChart lives in the chart registry, triggering redraws through dataAsync()
    dummyHashtagChart = dc.baseMixin({})
    dummyHashtagChart.dimension(hashtagDim)
    dummyHashtagChart.group(hashtagGroup)

    // dummy DOM elem should take no space
    dummyHashtagChart.minWidth(0)
    dummyHashtagChart.minHeight(0)

    // rendering is instead done by React
    dummyHashtagChart._doRender = dummyHashtagChart._doRedraw = () => {}

    dummyHashtagChart.setDataAsync((group, callback) => {
      fetchHashtags().then(
        hashtags => {
          dispatch(setHashtags(hashtags))
          callback()
        },
        err => {
          console.error(err)
          callback()
        }
      )
    })

    dummyHashtagChart.anchor("#hashDummy")
  }
}
