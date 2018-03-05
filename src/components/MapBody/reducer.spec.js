import * as actions from "./actions"
import reducer, {initialState} from "./reducer"
import {expect} from "chai"

/* eslint-disable no-unused-expressions */

describe("Map Body Reducer", () => {
  it("should initialize the correct state", () => {
    // eslint-disable-next-line no-undefined
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })
  it("should handle MOVE_MAP action type", () => {
    const zoom = 1
    const center = [0, 0]
    const newState = reducer(initialState, actions.moveMap(zoom, center))
    expect(newState.mapCenter).to.deep.equal(center)
    expect(newState.mapZoom).to.equal(zoom)
  })
  it("should handle FILTER_TIME action type", () => {
    const times = [new Date("Jan 1 2017"), new Date("Jan 2 2017")]
    const newState = reducer(initialState, actions.filterTime(times))
    expect(newState.timeBounds).to.deep.equal(times)
  })
  it("should handle TWEET_COUNT_UPDATE action type", () => {
    const count = 25
    const newState = reducer(initialState, actions.updateCount(count))
    expect(newState.tweetCount).to.equal(count)
  })
  it("should handle CLOSE_LINECHART action type", () => {
    const closed = reducer({lineChartOpen: true}, actions.closeLinechart)
    expect(closed.lineChartOpen).to.be.false
  })
  it("should handle user location success actions", () => {
    const requested = reducer(initialState, actions.userLocationRequest)
    expect(requested.geoLoading).to.be.true
    const success = reducer(requested, actions.userLocationSuccess)
    expect(success.geoLoading).to.be.false
  })
  it("should handle user location failure actions", () => {
    const requested = reducer(initialState, actions.userLocationRequest)
    expect(requested.geoLoading).to.be.true
    const failed = reducer(requested, actions.userLocationFailure("oops"))
    expect(failed.geoLoading).to.be.false
  })
  it("should handle HIDE_HIGHLIGHT action type", () => {
    const hidden = reducer(initialState, actions.hideHighlight)
    expect(hidden.highlight).to.equal.null
  })
})
