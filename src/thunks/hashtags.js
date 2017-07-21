import * as dc from "@mapd/mapdc"
import {getCf} from "../services/crossfilter"
import {HASHTAG_FETCH_SIZE} from "../constants"
import {setHashtags} from "../actions"

let dummyChart = null

function fetchHashtags () {
  return dummyChart
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
  return dispatch => {
    const crossfilter = getCf()
    const hashtagDim = crossfilter.dimension("hashtags").allowTargeted(false)
    const hashtagGroup = hashtagDim.group().reduceCount()

    //  dummyChart lives in the chart registry, triggering redraws through dataAsync()
    dummyChart = dc.baseMixin({})
    dummyChart.dimension(hashtagDim)
    dummyChart.group(hashtagGroup)
    // dummyChart.removeList(HASHTAG_EXCLUDE);

    // dummy DOM elem should take no space
    dummyChart.minWidth(0)
    dummyChart.minHeight(0)

    // rendering is instead done by React
    dummyChart._doRender = dummyChart._doRedraw = () => {}

    dummyChart.setDataAsync((group, callback) => {
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

    dummyChart.anchor("#hashDummy")
  }
}
