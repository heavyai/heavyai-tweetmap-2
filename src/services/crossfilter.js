import * as CrossFilter from "@mapd/crossfilter"
import {TABLE_NAME} from "../constants"

let crossfilter = null

export function createCf (con) {
  return CrossFilter.crossfilter(con, TABLE_NAME).then(cf => {
    crossfilter = cf
    return Promise.resolve(cf, con)
  })
}

export function getCf () {
  return crossfilter
}
