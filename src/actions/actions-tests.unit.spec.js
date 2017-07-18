import {expect} from "chai"
import * as actions from "./index"

describe("Tweetmap Actions", () => {
  describe("MapD Connect Request", () => {
    it("should return a connection request action", () => {
      expect(actions.mapdConnectRequest().type).to.deep.equal("MAPD_CONNECT_REQUEST")
    })
  })
  describe("MapD Connect Success", () => {
    it("should return a success action", () => {
      expect(actions.mapdConnectSuccess().type).to.equal("MAPD_CONNECT_SUCCESS")
    })
  })
  describe("MapD Connect Failure", () => {
    it("should return a failure action", () => {
      const error = {success: false}
      expect(actions.mapdConnectFailure(error)).to.deep.equal({
        type: "MAPD_CONNECT_FAILURE",
        error
      })
    })
  })
  describe("Move Map", () => {
    it("should return a map move action that includes a zoom and center", () => {
      const zoom = 42
      const center = {x: 4, y: 2}
      expect(actions.moveMap(zoom, center)).to.deep.equal({
        type: "MOVE_MAP",
        zoom,
        center
      })
    })
  })
  describe("Filter Time", () => {
    it("should return an action that includes filtered times", () => {
      const times = 42
      expect(actions.filterTime(times)).to.deep.equal({
        type: "FILTER_TIME",
        times
      })
    })
  })
  describe("Update Language Counts", () => {
    it("should return an action that includes updated languages", () => {
      const langCounts = 42
      expect(actions.updateLangCounts(langCounts)).to.deep.equal({
        type: "LANG_COUNTS_UPDATE",
        langCounts
      })
    })
  })
  describe("Update Selected", () => {
    it("should return an action that includes a new active item", () => {
      const selected = "tweet"
      expect(actions.updateSelected(selected)).to.deep.equal({
        type: "SELECTED_LANG_UPDATE",
        selected
      })
    })
  })
  describe("Update Query Terms", () => {
    it("should return an action that includes updated query", () => {
      const queries = 42
      expect(actions.updateQueryTerms(queries)).to.deep.equal({
        type: "QUERIES_UPDATE",
        queries
      })
    })
  })
  describe("Update Count", () => {
    it("should return an action that includes updated count (??)", () => {
      const count = 42
      expect(actions.updateCount(count)).to.deep.equal({
        type: "COUNT_UPDATE",
        count
      })
    })
  })
  describe("Set Tweets", () => {
    it("should return an action that includes tweets to set", () => {
      const tweets = {content: "hello world"}
      expect(actions.setTweets(tweets)).to.deep.equal({
        type: "TWEETS_SET",
        tweets
      })
    })
  })
  describe("Append Tweets", () => {
    it("should return an action that includes tweets to append", () => {
      const tweets = {content: "hello world"}
      expect(actions.appendTweets(tweets)).to.deep.equal({
        type: "TWEETS_APPEND",
        tweets
      })
    })
  })
  describe("Set Hashtags", () => {
    it("should return an action that includes hashtags to set", () => {
      const hashtags = ["#mapd"]
      expect(actions.setHashtags(hashtags)).to.deep.equal({
        type: "HASHTAGS_SET",
        hashtags
      })
    })
  })
  describe("Set Tweet Bar", () => {
    it("should return an action that includes the setting of the tweet bar", () => {
      const setting = {content: "hello world"}
      expect(actions.setTweetBar(setting)).to.deep.equal({
        type: "TOGGLE_TWEET_BAR",
        setting
      })
    })
  })
})
