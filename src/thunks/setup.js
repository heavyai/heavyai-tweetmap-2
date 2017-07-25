import * as dc from "@mapd/mapdc"
import {createLegendChart, initFilters as initLangs} from "./legendFilter"
import {createLineChart, initFilter as initTime} from "./timeFilter"
import {createMapChart, initView as initMap} from "./map"
import {closeLinechart} from "../actions"
import {createCount} from "./count"
import {createHashtagChart} from "./hashtags"
import {createTweetChart} from "./tweets"
import {initFilters as initQueries} from "./search"
import {mapdConnect} from "./mapdConnect"

const _ = require("lodash")
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

      const debounceTime = 500
      const resizeListener = _.debounce(() => {
        const [mapW, mapH] = mapSizeFunc()
        const [lineW, lineH] = lineSizeFunc()

        lineChart.width(lineW).height(lineH)

        mapChart.map().resize()
        mapChart.isNodeAnimate = false
        mapChart.width(mapW).height(mapH).render()

        dc.redrawAllAsync()
      }, debounceTime)

      const mobileWidth = 992
      if (screen.width < mobileWidth) {
        dispatch(closeLinechart)
      }

      window.addEventListener("resize", resizeListener)
      return Promise.resolve(resizeListener)
    })
}
