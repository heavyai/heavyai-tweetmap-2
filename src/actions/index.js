export const MAPD_CONNECT_REQUEST = 'MAPD_CONNECT_REQUEST';
export const MAPD_CONNECT_SUCCESS = 'MAPD_CONNECT_SUCCESS';
export const MAPD_CONNECT_FAILURE = 'MAPD_CONNECT_FAILURE';

export const MOVE_MAP = 'MOVE_MAP';
export const FILTER_TIME = 'FILTER_TIME';

export const LANG_COUNTS_UPDATE = 'LANG_COUNTS_UPDATE';
export const SELECTED_LANG_UPDATE = 'SELECTED_LANG_UPDATE';
export const QUERIES_UPDATE = 'QUERIES_UPDATE';
export const COUNT_UPDATE = 'COUNT_UPDATE';

export const TWEETS_SET = 'TWEETS_SET';
export const TWEETS_APPEND = 'TWEETS_APPEND';

export function mapdConnectRequest() {
  return {
    type: MAPD_CONNECT_REQUEST
  }
}

export function mapdConnectSuccess() {
  return {
    type: MAPD_CONNECT_SUCCESS
  }
}

export function mapdConnectFailure(error) {
  return {
    type: MAPD_CONNECT_FAILURE,
    error
  }
}

export function moveMap(zoom, center) {
  return {
    type: MOVE_MAP,
    zoom,
    center
  }
}

export function filterTime(times) {
  return {
    type: FILTER_TIME,
    times
  }
}

export function updateLangCounts(langCounts) {
  return {
    type: LANG_COUNTS_UPDATE,
    langCounts
  }
}

export function updateSelected(selected) {
  return {
    type: SELECTED_LANG_UPDATE,
    selected
  }
}

export function updateQueryTerms(queries) {
  return {
    type: QUERIES_UPDATE,
    queries
  }
}

export function updateCount(count) {
  return {
    type: COUNT_UPDATE,
    count
  }
}

export function setTweets(tweets) {
  return {
    type: TWEETS_SET,
    tweets
  }
}

export function appendTweets(tweets) {
  return {
    type: TWEETS_APPEND,
    tweets
  }
}
