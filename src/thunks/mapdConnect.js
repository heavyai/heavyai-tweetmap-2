import {
  mapdConnectFailure,
  mapdConnectRequest,
  mapdConnectSuccess
} from "../actions"
import {connect} from "../services/connector"
import {createCf} from "../services/crossfilter"

export function mapdConnect () {
  return dispatch => {
    dispatch(mapdConnectRequest())

    return connect()
      .then(con => createCf(con))
      .then(
        (cf, con) => {
          dispatch(mapdConnectSuccess())
          return Promise.resolve()
        },
        err => {
          dispatch(mapdConnectFailure(err))
          return Promise.reject(err)
        }
      )
  }
}
