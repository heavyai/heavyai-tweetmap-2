import * as actions from "./actions"
import {expect} from "chai"

describe("Legend Actions", () => {
  describe("Update Language Counts", () => {
    it("should return an action that includes updated language items", () => {
      const langCounts = [{lang: "en", count: 15}, {lang: "es", count: 8}]
      expect(actions.updateLangCounts(langCounts)).to.deep.equal({
        type: "LANG_COUNTS_UPDATE",
        langCounts
      })
    })
  })
  describe("Update Selected", () => {
    it("should return an action that includes a new list of selected languages", () => {
      const selected = ["en", "es"]
      expect(actions.updateSelected(selected)).to.deep.equal({
        type: "SELECTED_LANG_UPDATE",
        selected
      })
    })
  })
})
