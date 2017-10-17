import {
  toggleLinechart,
  createCount,
  createLineChart,
  createMapChart,
  toggleMapChartType,
  toggleHeatAggMode,
  zoomTo as initMap,
  initFilter as initTime
} from "../MapBody/actions"
import {createHashtagChart, createTweetChart, setSidebar} from "../TweetSidebar/actions"
import {createLegendChart, initFilters as initLangs} from "../Legend/actions"
import {closeNav} from "../Nav/actions"
import {debounce} from "lodash"
import {initFilters as initQueries} from "../TopOverlay/actions"

export function mapdConnect () {
  return (dispatch, getState, {connect, createCf}) => connect()
    .then(con => createCf(con))
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
        dispatch(initMap(state.mapCenter, state.mapZoom, state.mapBounds))

        dispatch(initTime(state.timeBounds))
        dispatch(initQueries(state.queryTerms))
        if (state.mapType === "heat") {
          dispatch(toggleMapChartType())
          if (state.queryTerms.length) {
            dispatch(toggleHeatAggMode())
          }
        } else {
          dispatch(initLangs(state.selectedLangs))
        }
      }

      return dc.renderAllAsync()
    })
    .then(() => {
      // attach resize listener
      const [[mapChart, mapSizeFunc], [lineChart, lineSizeFunc]] = charts

      const debounceTime = 500
      const resizeListener = debounce(() => {
        const [mapW, mapH] = mapSizeFunc(document.getElementById("mapChart"))
        const [lineW, lineH] = lineSizeFunc(document.getElementById("mapChart"))

        lineChart.width(lineW).height(lineH)

        mapChart.map().resize()
        mapChart.isNodeAnimate = false
        mapChart.width(mapW).height(mapH).render()

        dc.redrawAllAsync()
      }, debounceTime)

      const mobileWidth = 992
      if (screen.width < mobileWidth) {
        dispatch(closeNav)
        dispatch(toggleLinechart(false))
        dispatch(setSidebar(false))
      }

      window.addEventListener("resize", resizeListener)
      return Promise.resolve(resizeListener)
    })
}
