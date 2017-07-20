export const MAPD_CONNECT_REQUEST = "MAPD_CONNECT_REQUEST"
export const MAPD_CONNECT_SUCCESS = "MAPD_CONNECT_SUCCESS"
export const MAPD_CONNECT_FAILURE = "MAPD_CONNECT_FAILURE"

export const MOVE_MAP = "MOVE_MAP"
export const FILTER_TIME = "FILTER_TIME"

export const LANG_COUNTS_UPDATE = "LANG_COUNTS_UPDATE"
export const SELECTED_LANG_UPDATE = "SELECTED_LANG_UPDATE"
export const QUERIES_UPDATE = "QUERIES_UPDATE"
export const COUNT_UPDATE = "COUNT_UPDATE"

export const TWEETS_SET = "TWEETS_SET"
export const TWEETS_APPEND = "TWEETS_APPEND"
export const HASHTAGS_SET = "HASHTAGS_SET"

export const TOGGLE_TWEET_BAR = "TOGGLE_TWEET_BAR"

export const VIEW_URL_UPDATE = "VIEW_URL_UPDATE"

export const TOGGLE_NAV = "TOGGLE_NAV"
export const CLOSE_NAV = "CLOSE_NAV"
export const TOGGLE_SEARCH = "TOGGLE_SEARCH"
export const CLOSE_SEARCH = "CLOSE_SEARCH"
export const TOGGLE_SHARE = "TOGGLE_SHARE"
export const CLOSE_SHARE = "CLOSE_SHARE"
export const TOGGLE_TWEETBAR = "TOGGLE_TWEETBAR"
export const CLOSE_TWEETBAR = "CLOSE_TWEETBAR"
export const TOGGLE_LINECHART = "TOGGLE_LINECHART"
export const CLOSE_LINECHART = "CLOSE_LINECHART"
export const TOGGLE_CURRENT = "TOGGLE_CURRENT"

export const USER_LOCATION_REQUEST = "USER_LOCATION_REQUEST"
export const USER_LOCATION_SUCCESS = "USER_LOCATION_SUCCESS"
export const USER_LOCATION_FAILURE = "USER_LOCATION_FAILURE"

export function mapdConnectRequest () {
  return {
    type: MAPD_CONNECT_REQUEST
  }
}

export function mapdConnectSuccess () {
  return {
    type: MAPD_CONNECT_SUCCESS
  }
}

export function mapdConnectFailure (error) {
  return {
    type: MAPD_CONNECT_FAILURE,
    error
  }
}

export function moveMap (zoom, center) {
  return {
    type: MOVE_MAP,
    zoom,
    center
  }
}

export function filterTime (times) {
  return {
    type: FILTER_TIME,
    times
  }
}

export function updateLangCounts (langCounts) {
  return {
    type: LANG_COUNTS_UPDATE,
    langCounts
  }
}

export function updateSelected (selected) {
  return {
    type: SELECTED_LANG_UPDATE,
    selected
  }
}

export function updateQueryTerms (queries) {
  return {
    type: QUERIES_UPDATE,
    queries
  }
}

export function updateCount (count) {
  return {
    type: COUNT_UPDATE,
    count
  }
}

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

export function setTweetBar (setting) {
  return {
    type: TOGGLE_TWEET_BAR,
    setting
  }
}

export function setViewUrl (url) {
  return {
    type: VIEW_URL_UPDATE,
    url
  }
}

export const toggleNav = {type: TOGGLE_NAV}
export const closeNav = {type: CLOSE_NAV}
export const toggleSearch = {type: TOGGLE_SEARCH}
export const closeSearch = {type: CLOSE_SEARCH}
export const toggleShare = {type: TOGGLE_SHARE}
export const closeShare = {type: CLOSE_SHARE}
export const toggleTweetBar = {type: TOGGLE_TWEETBAR}
export const closeTweetBar = {type: CLOSE_TWEETBAR}
export const toggleLinechart = {type: TOGGLE_LINECHART}
export const closeLinechart = {type: CLOSE_LINECHART}
export const toggleCurrent = {type: TOGGLE_CURRENT}

export function userLocationRequest () {
  return {
    type: USER_LOCATION_REQUEST
  }
}

export function userLocationSuccess () {
  return {
    type: USER_LOCATION_SUCCESS
  }
}

export function userLocationFailure (error) {
  return {
    type: USER_LOCATION_FAILURE,
    error
  }
}
