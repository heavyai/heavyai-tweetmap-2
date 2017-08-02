import * as actions from "./actions"
import chai, {expect} from "chai"
import fetchMock from "fetch-mock"
import spies from "chai-spies"
chai.use(spies)

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
        mapCenter: [10, 12],
        mapZoom: 4,
        timeBounds: [new Date("Jan 1 2017"), new Date("Jan 2 2017")]
      },
      topOverlay: {
        queryTerms: ["mapd", "lightningfast"]
      },
      legend: {
        selectedLangs: ["en", "es"]
      }
    })
    const fullUrl = "nullblank#eyJtYXBDZW50ZXIiOlsxMCwxMl0sIm1hcFpvb20iOjQsInRpbWVCb3VuZHMiOlsiMjAxNy0wMS0wMVQwODowMDowMC4wMDBaIiwiMjAxNy0wMS0wMlQwODowMDowMC4wMDBaIl0sInF1ZXJ5VGVybXMiOlsibWFwZCIsImxpZ2h0bmluZ2Zhc3QiXSwic2VsZWN0ZWRMYW5ncyI6WyJlbiIsImVzIl19"

    afterEach(() => {
      fetchMock.restore();
    })

    it("should dispatch a set view url action", () => {
      fetchMock.post('*', {status: 404})
      return actions.getShareUrl()(dispatch, getState).then(() => {
        expect(dispatch).to.have.been.called
      })
    })

    it("should use shortened url", () => {
      fetchMock.post('*', {
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
      fetchMock.post('*', {status: 404})

      return actions.getShareUrl()(dispatch, getState).then(() => {
        expect(dispatch).to.have.been.called.with({
          type: "VIEW_URL_UPDATE",
          url: fullUrl
        })
      })
    })
  })
})
