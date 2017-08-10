import * as actions from "./actions"
import chai, {expect} from "chai"
import fetchMock from "fetch-mock"
import spies from "chai-spies"
chai.use(spies)

/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */

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
  describe("Get Share Url", () => {
    const dispatch = chai.spy()
    const getState = () => ({
      mapBody: {
        mapCenter: [0, 0],
        mapZoom: 4,
        timeBounds: [new Date(10), new Date(100)]
      },
      topOverlay: {
        queryTerms: ["mapd", "lightningfast"]
      },
      legend: {
        selectedLangs: ["en", "es"]
      }
    })
    const state = getState()
    const shareState = {
      mapCenter: state.mapBody.mapCenter,
      mapZoom: state.mapBody.mapZoom,
      timeBounds: state.mapBody.timeBounds,
      queryTerms: state.topOverlay.queryTerms,
      selectedLangs: state.legend.selectedLangs
    }

    const stateString = JSON.stringify(shareState)
    const baseUrl = window.location.origin + window.location.pathname
    const fullViewUrl = `${baseUrl}#${btoa(stateString)}`

    afterEach(() => {
      fetchMock.restore()
    })

    it("should dispatch a set view url action", () => {
      fetchMock.post("*", {status: 404})
      return actions.getShareUrl()(dispatch, getState).then(() => {
        expect(dispatch).to.have.been.called()
      })
    })

    it("should use shortened url", () => {
      fetchMock.post("*", {
        status: 200,
        body: "shortened"
      })
      return actions.getShareUrl()(dispatch, getState).then(() => {
        expect(dispatch).to.have.been.called.with({
          type: "VIEW_URL_UPDATE",
          url: "shortened"
        })
      })
    })

    it("should set view url to full url on api failure", () => {
      fetchMock.post("*", {status: 404})

      return actions.getShareUrl()(dispatch, getState).then(() => {
        expect(dispatch).to.have.been.called.with({
          type: "VIEW_URL_UPDATE",
          url: fullViewUrl
        })
      })
    })
  })
})
