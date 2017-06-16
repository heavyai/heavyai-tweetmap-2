import { createCf } from '../services/crossfilter';
import { connect } from '../services/connector';

import {
  mapdConnectRequest,
  mapdConnectSuccess,
  mapdConnectFailure
} from '../actions';

export function mapdConnect() {
  return (dispatch) => {
    dispatch(mapdConnectRequest());

    connect().then(con => {
      return createCf(con);
    }).then((cf, con) => {
      dispatch(mapdConnectSuccess())
    }, err => {
      dispatch(mapdConnectFailure(err))
    })
  }
}
