import * as actions from "./actions"
import {expect} from "chai"

describe("Tweet Sidebar Actions", () => {
  describe("Set Tweets", () => {
    it("should return an action that includes a new list of tweets", () => {
      const tweets = [
        {id: 1, name: "eric", date: "2 April 2001", body: "hello"},
        {id: 2, name: "jon", date: "2 April 2001", body: "world"}
      ]
      expect(actions.setTweets(tweets)).to.deep.equal({
        type: "TWEETS_SET",
        tweets
      })
    })
  })
  describe("Append Tweets", () => {
    it("should return an action that includes a list of tweets to append", () => {
      const tweets = [
        {id: 1, name: "ricky", date: "2 April 2001", body: "foo"},
        {id: 2, name: "du", date: "2 April 2001", body: "bar"}
      ]
      expect(actions.appendTweets(tweets)).to.deep.equal({
        type: "TWEETS_APPEND",
        tweets
      })
    })
  })
  describe("Set Hashtags", () => {
    it("should return an action that includes a new list of tweets", () => {
      const hashtags = [
        {hashtag: "#mapd", count: 100},
        {hashtag: "#lightningfast", count: 100}
      ]
      expect(actions.setHashtags(hashtags)).to.deep.equal({
        type: "HASHTAGS_SET",
        hashtags
      })
    })
  })
  describe("Set Sidebar Mode", () => {
    it("should return an action that includes the new mode", () => {
      const setting = "tweet"
      expect(actions.setSidebarMode(setting)).to.deep.equal({
        type: "SET_SIDEBAR_MODE",
        setting
      })
    })
  })
})
