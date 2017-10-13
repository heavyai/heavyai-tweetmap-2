import {COLORS} from "../../constants"

export const LEGEND_COUNTS_UPDATE = "LEGEND_COUNTS_UPDATE"
export const SELECTED_LEGEND_UPDATE = "SELECTED_LEGEND_UPDATE"
export const MODE_UPDATE = "MODE_UPDATE"

export function updateLegendCounts (legendCounts) {
  return {
    type: LEGEND_COUNTS_UPDATE,
    legendCounts
  }
}

export function updateSelected (selected) {
  return {
    type: SELECTED_LEGEND_UPDATE,
    selected
  }
}

export function updateMode (mode) {
  return {
    type: MODE_UPDATE,
    mode
  }
}

let dummyChart = null
let dimension = null
let group = null

/*
  LEGEND CHART SETUP
  creates a dummy chart added to dc chart registry.
  legend is actually rendered by React, triggered by
  updating props/state
*/
export function createLegendChart () {
  return (dispatch, getState, {dc, getCf}) => {
    const crossfilter = getCf()
    dimension = crossfilter.dimension("lang")
    group = dimension.group()

    //  dummyChart lives in the chart registry, triggering redraws through dataAsync()
    dummyChart = dc.baseMixin({})
    dummyChart.dimension(dimension)
    dummyChart.group(group)
    // dummy DOM elem should take no space
    dummyChart.minWidth(0)
    dummyChart.minHeight(0)
    // rendering is instead done by React
    dummyChart._doRender = dummyChart._doRedraw = () => {}

    dummyChart.setDataAsync((_group, callback) => {
      if (getState().mapBody.chartType === "heat") {
        callback()
        return
      }

      const numColors = COLORS.length
      group.reduceCount("*").topAsync(numColors).then(
        results => {
          // rename keys
          const legendCounts = results.map(obj => ({
            item: obj.key0,
            count: obj.val
          }))

          dispatch(updateLegendCounts(legendCounts))
          callback()
        },
        error => {
          console.error(error)
          callback()
        }
      )
    })

    dummyChart.anchor("#legendDummy")
  }
}

export function selectFilter (item) {
  return (dispatch, getState, {dc}) => {
    const {selected} = getState().legend

    const update = selected.includes(item) ?
      selected.filter(i => i !== item) :
      [...selected, item]

    if (update.length === 0) {
      dimension.filterAll()
    } else {
      dimension.filterMulti(update)
    }

    dc.redrawAllAsync()
    dispatch(updateSelected(update))
  }
}

export function clearLegendFilter () {
  return dispatch => {
    dimension.filterAll()
    dispatch(updateSelected([]))
  }
}

// setup in case tweetmap is setup with shared filters
export function initFilters (item = []) {
  return dispatch => {
    if (item.length !== 0) {
      dimension.filterMulti(item)
      dispatch(updateSelected(item))
    }
  }
}

export function changeDimension (dim) {
  return (dispatch, getState, {dc, getCf}) => {
    dimension.filterAll()
    const crossfilter = getCf()
    dimension = crossfilter.dimension(dim)
    group = dimension.group()

    dummyChart.dimension(dimension)
    dummyChart.group(group)
    dc.redrawAllAsync()
    dispatch(updateLegendCounts([]))
    dispatch(updateSelected([]))
  }
}
