import {
  closeLinechart,
  createCount,
  createLineChart,
  createMapChart,
  zoomTo as initMap,
  initFilter as initTime
} from "../MapBody/actions"
import {createHashtagChart, createTweetChart} from "../TweetSidebar/actions"
import {createLegendChart, initFilters as initLangs} from "../Legend/actions"
import _ from "lodash"
import {initFilters as initQueries} from "../TopOverlay/actions"

export function mapdConnect () {
  return (dispatch, getState, {connect, createCf}) => connect()
    .then(con => createCf(con))
    .then(
      () => Promise.resolve(),
      err => Promise.reject(err)
    )
}

let charts = []

/*
  SET UP ALL CHARTS
*/
export function setupCharts () {
  return (dispatch, getState, {dc}) => dispatch(mapdConnect())
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
