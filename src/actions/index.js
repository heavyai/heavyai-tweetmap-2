export const MAPD_CONNECT_REQUEST = 'MAPD_CONNECT_REQUEST';
export const MAPD_CONNECT_SUCCESS = 'MAPD_CONNECT_SUCCESS';
export const MAPD_CONNECT_FAILURE = 'MAPD_CONNECT_FAILURE';

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
