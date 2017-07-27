import * as dc from "@mapd/mapdc"
import {COLORS} from "../../constants"
import {getCf} from "../../services/crossfilter"

export const LANG_COUNTS_UPDATE = "LANG_COUNTS_UPDATE"
export const SELECTED_LANG_UPDATE = "SELECTED_LANG_UPDATE"

export function updateLangCounts (langCounts) {
  return {
    type: LANG_COUNTS_UPDATE,
    langCounts
  }
}

export function updateSelected (selected) {
  return {
    type: SELECTED_LANG_UPDATE,
    selected
  }
}

let langDim = null

/*
  LEGEND CHART SETUP
  creates a dummy chart added to dc chart registry.
  legend is actually rendered by React, triggered by
  updating props/state
*/
export function createLegendChart () {
  return dispatch => {
    const crossfilter = getCf()
    langDim = crossfilter.dimension("lang")
    const group = langDim.group()

    //  dummyChart lives in the chart registry, triggering redraws through dataAsync()
    const dummyChart = dc.baseMixin({})
    dummyChart.dimension(langDim)
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
          const langCounts = results.map(obj => ({
            lang: obj.key0,
            count: obj.val
          }))

          dispatch(updateLangCounts(langCounts))
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

export function selectFilter (lang) {
  return (dispatch, getState) => {
    const {selectedLangs} = getState().legend

    const selected = selectedLangs.includes(lang) ? selectedLangs.filter(item => item !== lang) : [...selectedLangs, lang]

    if (selected.length === 0) {
      langDim.filterAll()
    } else {
      langDim.filterMulti(selected)
    }

    dc.redrawAllAsync()
    dispatch(updateSelected(selected))
  }
}

// setup in case tweetmap is setup with shared filters
export function initFilters (langs) {
  return dispatch => {
    if (langs.length !== 0) {
      langDim.filterMulti(langs)
      dispatch(updateSelected(langs))
    }
  }
}
