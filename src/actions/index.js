export const MAPD_CONNECT_REQUEST = 'MAPD_CONNECT_REQUEST';
export const MAPD_CONNECT_SUCCESS = 'MAPD_CONNECT_SUCCESS';
export const MAPD_CONNECT_FAILURE = 'MAPD_CONNECT_FAILURE';

export const LANG_COUNTS_UPDATE = 'MAPD_CONNECT_FAILURE';
export const SELECTED_LANG_UPDATE = 'SELECTED_LANG_UPDATE';

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
