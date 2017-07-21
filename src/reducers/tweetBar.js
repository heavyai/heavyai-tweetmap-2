import {
  COUNT_UPDATE,
  HASHTAGS_SET,
  TOGGLE_TWEET_BAR,
  TWEETS_APPEND,
  TWEETS_SET
} from "../actions"

const initialState = {
  tweets: [],
  hashtags: [],
  totalTweets: 0,
  tweetBarMode: "hashtag"
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case COUNT_UPDATE:
      return Object.assign({}, state, {
        totalTweets: action.count
      })
    case TWEETS_SET:
      return Object.assign({}, state, {
        tweets: action.tweets
      })
    case TWEETS_APPEND:
      const tweets = state.tweets.concat(action.tweets)
      const tweet_ids = []

      /* filter for duplicates */
      const uniques = tweets.filter(tweet => {
        if (tweet_ids.includes(tweet.id)) {
          return false
        }
        tweet_ids.push(tweet.id)
        return true
      })

      return Object.assign({}, state, {
        tweets: uniques
      })
    case HASHTAGS_SET:
      return Object.assign({}, state, {
        hashtags: action.hashtags
      })
    case TOGGLE_TWEET_BAR:
      return Object.assign({}, state, {
        tweetBarMode: action.setting
      })
    default:
      return state
  }
}
