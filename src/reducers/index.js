import {
  LANG_COUNTS_UPDATE,
  SELECTED_LANG_UPDATE,
  TWEETS_SET,
  TWEETS_APPEND
} from '../actions'

const initialState = {
  langCounts: [],
  selectedLangs: [],
  tweets: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LANG_COUNTS_UPDATE:
      return Object.assign({}, state, {
        langCounts: action.langCounts
      })
    case SELECTED_LANG_UPDATE:
      return Object.assign({}, state, {
        selectedLangs: action.selected
      })
    case TWEETS_SET:
      return Object.assign({}, state, {
        tweets: action.tweets
      })
    case TWEETS_APPEND:
      return Object.assign({}, state, {
        tweets: state.tweets.concat(action.tweets)
      })
    default:
      return state
  }
}
