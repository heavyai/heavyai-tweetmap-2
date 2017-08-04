import * as actions from "./actions"
import reducer, {initialState} from "./reducer"
import {expect} from "chai"

describe("Share Modal Reducer", () => {
  it("should initialize the correct state", () => {
    // eslint-disable-next-line no-undefined
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })
  it("should handle QUERIES_UPDATE action type", () => {
    const queries = ["mapd", "lightningfast"]
    const newState = reducer(initialState, actions.updateQueryTerms(queries))
    expect(newState.queryTerms).to.equal(queries)
  })
})
