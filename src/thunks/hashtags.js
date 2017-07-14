import * as dc from "@mapd/mapdc"
import {getCf} from "../services/crossfilter"
import {HASHTAG_FETCH_SIZE} from "../constants"
import {setHashtags} from "../actions"

let _chart

function fetchHashtags () {
  return _chart
    .group()
    .topAsync(HASHTAG_FETCH_SIZE)
    .then(results => {
      const hashtags = results.map(obj => ({
        hashtag: obj.key0,
        count: obj.val
      }))

      return Promise.resolve(hashtags)
    })
}

/*
  HASHTAG CHART
  creates a dummy chart added to dc chart registry
  hashtag list is actually rendered by React,
  triggered by updating props/state
*/
export function createHashtagChart () {
  return (dispatch, getState) => {
    const crossfilter = getCf()
    const hashtagDim = crossfilter.dimension("hashtags").allowTargeted(false)
    const hashtagGroup = hashtagDim.group().reduceCount()

    //  _chart lives in the chart registry, triggering redraws through dataAsync()
    _chart = dc.baseMixin({})
    _chart.dimension(hashtagDim)
    _chart.group(hashtagGroup)
    // _chart.removeList(HASHTAG_EXCLUDE);

    // dummy DOM elem should take no space
    _chart.minWidth(0)
    _chart.minHeight(0)

    // rendering is instead done by React
    _chart._doRender = _chart._doRedraw = () => {}

    _chart.setDataAsync((group, callback) => {
      fetchHashtags().then(
        hashtags => {
          dispatch(setHashtags(hashtags))
          callback()
        },
        err => {
          console.error(err)
          callback()
        }
      )
    })

    _chart.anchor("#hashDummy")
  }
}
