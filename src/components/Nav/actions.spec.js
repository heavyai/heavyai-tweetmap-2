import * as actions from "./actions"
import {expect} from "chai"

describe("Nav Actions", () => {
  describe("Toggle Nav", () => {
    it("should be a toggle nav action", () => {
      expect(actions.toggleNav.type).to.equal("TOGGLE_NAV")
    })
  })
  describe("Close Nav", () => {
    it("should be a close nav action", () => {
      expect(actions.closeNav.type).to.equal("CLOSE_NAV")
    })
  })
  describe("Toggle Search", () => {
    it("should be a toggle search action", () => {
      expect(actions.toggleSearch.type).to.equal("TOGGLE_SEARCH")
    })
  })
  describe("Close Search", () => {
    it("should be a close search action", () => {
      expect(actions.closeSearch.type).to.equal("CLOSE_SEARCH")
    })
  })
})
