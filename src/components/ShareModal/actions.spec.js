import {expect} from "chai"
import * as actions from "./actions"

describe("Share Modal Actions", () => {
  describe("Open Share", () => {
    it("should be a open share action", () => {
      expect(actions.openShare.type).to.equal("OPEN_SHARE")
    })
  })
  describe("Close Share", () => {
    it("should be a close share action", () => {
      expect(actions.closeShare.type).to.equal("CLOSE_SHARE")
    })
  })
  describe("Toggle Mode", () => {
    it("should be a toggle mode action", () => {
      expect(actions.toggleMode.type).to.equal("TOGGLE_SHARE_MODE")
    })
  })
  describe("Set View Url", () => {
    it("should return an action that includes the new url", () => {
      const url = "https://www.mapd.com/demos/tweetmap"
      expect(actions.setViewUrl(url)).to.deep.equal({
        type: "VIEW_URL_UPDATE",
        url
      })
    })
  })
})
