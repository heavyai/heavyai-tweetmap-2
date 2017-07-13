import * as dc from "@mapd/mapdc"
import {getCf} from "../services/crossfilter"

import {COLORS} from "../constants"

import {updateLangCounts, updateSelected} from "../actions"

let langDim = null

/*
  LEGEND CHART
  creates a dummy chart added to dc chart registry
  legend is actually rendered by React, triggered by
  updating props/state
*/
export function createLegendChart () {
  return dispatch => {
    const crossfilter = getCf()
    langDim = crossfilter.dimension("lang")
    const group = langDim.group()

    //  _chart lives in the chart registry, triggering redraws through dataAsync()
    const _chart = dc.baseMixin({})
    _chart.dimension(langDim)
    _chart.group(group)
    // dummy DOM elem should take no space
    _chart.minWidth(0)
    _chart.minHeight(0)
    // rendering is instead done by React
    _chart._doRender = _chart._doRedraw = () => {}

    _chart.setDataAsync((group, callback) => {
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

    _chart.anchor("#legendDummy")
  }
}

export function selectFilter (lang) {
  return (dispatch, getState) => {
    const {selectedLangs, ...rest} = getState()

    const selected = selectedLangs.includes(lang) ? selectedLangs.filter(item => item !== lang) : [...selectedLangs, lang]

    if (selected.length == 0) {
      langDim.filterAll()
    } else {
      langDim.filterMulti(selected)
    }

    dc.redrawAllAsync()
    dispatch(updateSelected(selected))
  }
}

export function initFilters (langs) {
  return dispatch => {
    if (langs.length !== 0) {
      langDim.filterMulti(langs)
      dispatch(updateSelected(langs))
    }
  }
}
