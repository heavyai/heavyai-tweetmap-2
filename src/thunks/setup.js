import * as dc from "@mapd/mapdc"

const _ = require("lodash")

import {mapdConnect} from "./mapdConnect"
import {createMapChart, initView as initMap} from "./map"
import {createLineChart, initFilter as initTime} from "./timeFilter"
import {createLegendChart, initFilters as initLangs} from "./legendFilter"
import {createTweetChart} from "./tweets"
import {createHashtagChart} from "./hashtags"
import {createCount} from "./count"
import {initFilters as initQueries} from "./search"

let charts = []

/*
  SET UP ALL CHARTS
*/
export function setupCharts () {
  return dispatch => dispatch(mapdConnect())
    .then(() =>
      // run chart init thunks
      Promise.all([
        dispatch(createMapChart()),
        dispatch(createLineChart()),
        dispatch(createLegendChart()),
        dispatch(createTweetChart()),
        dispatch(createHashtagChart()),
        dispatch(createCount())
      ])
    )
    .then(result => {
      // render charts
      charts = result
      const data = window.location.hash.slice(1)

      if (data !== "") {
        const stateJson = atob(data)
        const state = JSON.parse(stateJson)

        dispatch(initMap(state.mapCenter, state.mapZoom))
        dispatch(initTime(state.timeBounds))
        dispatch(initQueries(state.queryTerms))
        dispatch(initLangs(state.selectedLangs))
      }

      return dc.renderAllAsync()
    })
    .then(() => {
      // attach resize listener
      const [[mapChart, mapSizeFunc], [lineChart, lineSizeFunc]] = charts

      const resizeListener = _.debounce(() => {
        const [mapW, mapH] = mapSizeFunc()
        const [lineW, lineH] = lineSizeFunc()

        lineChart.width(lineW).height(lineH)

        mapChart.map().resize()
        mapChart.isNodeAnimate = false
        mapChart.width(mapW).height(mapH).render()

        dc.redrawAllAsync()
      }, 500)

      if (window.innerWidth < 992) {
        document.getElementById("background").style.height = 0
        document.getElementById("lineChart").style.height = 0
      }

      window.addEventListener("resize", resizeListener)
      return Promise.resolve(resizeListener)
    })
}
