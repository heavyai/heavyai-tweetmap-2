import * as actions from "./actions"
import {expect} from "chai"
import reducer, {initialState} from "./reducer"

describe("Nav Reducer", () => {
  it('should initialize the correct state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })
  it("should handle TOGGLE_NAV action type", () => {
    const open = reducer(initialState, actions.toggleNav)
    expect(open.navOpen).to.be.true
    const closed = reducer(open, actions.toggleNav)
    expect(closed.navOpen).to.be.false
  })
  it("should handle CLOSE_NAV action type", () => {
    const closed = reducer(initialState, actions.closeNav)
    expect(closed.navOpen).to.be.false
  })
  it("should handle TOGGLE_SEARCH action type", () => {
    const open = reducer(initialState, actions.toggleSearch)
    expect(open.locSearchOpen).to.be.true
    const closed = reducer(open, actions.toggleSearch)
    expect(closed.locSearchOpen).to.be.false
  })
  it("should handle CLOSE_SEARCH action type", () => {
    const closed = reducer(initialState, actions.closeSearch)
    expect(closed.locSearchOpen).to.be.false
  })
})
