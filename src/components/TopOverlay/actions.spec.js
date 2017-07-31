import {expect} from "chai"
import * as actions from "./actions"

describe("Top Overlay Actions", () => {
  describe("Update Query Terms", () => {
    it("should return an action that includes the new query terms", () => {
      const queries = ["mapd", "gpu"]
      expect(actions.updateQueryTerms(queries)).to.deep.equal({
        type: "QUERIES_UPDATE",
        queries
      })
    })
  })
})
