import * as actions from "./actions"
import {expect} from "chai"

describe("Map Body Actions", () => {
  describe("Move Map", () => {
    it("should return an action that includes updated zoom and center", () => {
      const zoom = 1
      const center = [0, 0]
      expect(actions.moveMap(zoom, center)).to.deep.equal({
        type: "MOVE_MAP",
        zoom,
        center
      })
    })
  })
  describe("Filter Time", () => {
    it("should return an action that includes the updated time range", () => {
      const times = [Date("Jan 1 2017"), Date("Jan 2 2017")]
      expect(actions.filterTime(times)).to.deep.equal({
        type: "FILTER_TIME",
        times
      })
    })
  })
  describe("Update Count", () => {
    it("should return an action that includes the updated tweet count", () => {
      const count = 100
      expect(actions.updateCount(count)).to.deep.equal({
        type: "TWEET_COUNT_UPDATE",
        count
      })
    })
  })
  describe("Toggle Line Chart", () => {
    it("should be a toggle line chart action", () => {
      expect(actions.toggleLinechart.type).to.equal("TOGGLE_LINECHART")
    })
  })
  describe("Close Line Chart", () => {
    it("should be a close line chart action", () => {
      expect(actions.closeLinechart.type).to.equal("CLOSE_LINECHART")
    })
  })
  describe("User Location Request", () => {
    it("should be a user location request action", () => {
      expect(actions.userLocationRequest.type).to.equal("USER_LOCATION_REQUEST")
    })
  })
  describe("User Location Success", () => {
    it("should be a user location success action", () => {
      expect(actions.userLocationSuccess.type).to.equal("USER_LOCATION_SUCCESS")
    })
  })
  describe("User Location Failure", () => {
    it("should return an action that includes the error", () => {
      const error = "oops"
      expect(actions.userLocationFailure(error)).to.deep.equal({
        type: "USER_LOCATION_FAILURE",
        error
      })
    })
  })
})
