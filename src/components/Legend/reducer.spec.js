import * as actions from "./actions"
import {expect} from "chai"
import reducer, {initialState} from "./reducer"

describe("Legend Reducer", () => {
  it('should initialize the correct state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })
  it("should handle LANG_COUNTS_UPDATE action type", () => {
    const langCounts = [{lang: "en", count: 15}, {lang: "es", count: 8}]
    const newState = reducer(initialState, actions.updateLangCounts(langCounts))
    expect(newState.langCounts).to.deep.equal(langCounts)
  })
  it("should handle SELECTED_LANG_UPDATE action type", () => {
    const selected = ["en", "es"]
    const newState = reducer(initialState, actions.updateSelected(selected))
    expect(newState.selectedLangs).to.deep.equal(selected)
  })
})
