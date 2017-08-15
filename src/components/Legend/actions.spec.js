import * as actions from "./actions"
import {expect} from "chai"

describe("Legend Actions", () => {
  describe("Update Language Counts", () => {
    it("should return an action that includes updated language items", () => {
      const legendCounts = [{lang: "en", count: 15}, {lang: "es", count: 8}]
      expect(actions.updateLegendCounts(legendCounts)).to.deep.equal({
        type: "LEGEND_COUNTS_UPDATE",
        legendCounts
      })
    })
  })
  describe("Update Selected", () => {
    it("should return an action that includes a new list of selected languages", () => {
      const selected = ["en", "es"]
      expect(actions.updateSelected(selected)).to.deep.equal({
        type: "SELECTED_LEGEND_UPDATE",
        selected
      })
    })
  })
})
