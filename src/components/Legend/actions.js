import {COLORS} from "../../constants"

export const LEGEND_COUNTS_UPDATE = "LEGEND_COUNTS_UPDATE"
export const SELECTED_UPDATE = "SELECTED_UPDATE"

export function updateLegendCounts (legendCounts) {
  return {
    type: LEGEND_COUNTS_UPDATE,
    legendCounts
  }
}

export function updateSelected (selected) {
  return {
    type: SELECTED_UPDATE,
    selected
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
      const numColors = COLORS.length

      group.reduceCount("*").topAsync(numColors).then(
        results => {
          // rename keys
          const legendCounts = results.map(obj => ({
            title: obj.key0,
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

export function selectFilter (title) {
  return (dispatch, getState, {dc}) => {
    const {selected} = getState().legend

    const update = selected.includes(title) ?
      selected.filter(item => item !== title) :
      [...selected, title]

    if (update.length === 0) {
      dimension.filterAll()
    } else {
      dimension.filterMulti(update)
    }

    dc.redrawAllAsync()
    dispatch(updateSelected(update))
  }
}

// setup in case tweetmap is setup with shared filters
export function initFilters (title) {
  return dispatch => {
    if (title.length !== 0) {
      dimension.filterMulti(title)
      dispatch(updateSelected(title))
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
