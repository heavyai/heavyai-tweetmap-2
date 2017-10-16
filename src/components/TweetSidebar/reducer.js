import {
  CLOSE_TWEETBAR,
  HASHTAGS_SET,
  SET_SIDEBAR_MODE,
  SET_TWEETBAR,
  TWEETS_APPEND,
  TWEETS_SET
} from "./actions"

export const initialState = {
  sidebarOpen: false,
  tweets: [],
  hashtags: [],
  sidebarMode: "hashtag"
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_TWEETBAR:
      return {...state, sidebarOpen: action.val}
    case CLOSE_TWEETBAR:
      return {...state, sidebarOpen: false}
    case TWEETS_SET:
      return {...state, tweets: action.tweets}
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

      return {...state, tweets: uniques}
    case HASHTAGS_SET:
      return {...state, hashtags: action.hashtags}
    case SET_SIDEBAR_MODE:
      return {...state, sidebarMode: action.setting}
    default:
      return state
  }
}
