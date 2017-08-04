import * as actions from "./actions"
import reducer, {initialState} from "./reducer"
import {expect} from "chai"

/* eslint-disable no-unused-expressions */

describe("Share Modal Reducer", () => {
  it("should initialize the correct state", () => {
    // eslint-disable-next-line no-undefined
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })
  it("should handle OPEN_SHARE action type", () => {
    const newState = reducer({modalOpen: false}, actions.openShare)
    expect(newState.modalOpen).to.be.true
  })
  it("should handle CLOSE_SHARE action type", () => {
    const newState = reducer({modalOpen: true}, actions.closeShare)
    expect(newState.modalOpen).to.be.false
  })
  it("should handle TOGGLE_SHARE_MODE action type", () => {
    const off = reducer(initialState, actions.toggleMode)
    expect(off.applyFilters).to.be.false
    const on = reducer(off, actions.toggleMode)
    expect(on.applyFilters).to.be.true
  })
  it("should handle TWEET_COUNT_UPDATE action type", () => {
    const url = "#lightningfast"
    const newState = reducer(initialState, actions.setViewUrl(url))
    expect(newState.viewUrl).to.equal(url)
  })
})
