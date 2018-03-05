import * as actions from "./actions"
import reducer, {initialState} from "./reducer"
import {expect} from "chai"

/* eslint-disable no-unused-expressions */

describe("Share Modal Reducer", () => {
  it("should initialize the correct state", () => {
    // eslint-disable-next-line no-undefined
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })
  it("should handle CLOSE_TWEETBAR action type", () => {
    const closed = reducer(initialState, actions.closeSidebar)
    expect(closed.sidebarOpen).to.be.false
  })
  it("should handle TWEETS_SET action type", () => {
    const tweets = [
      {id: 1, name: "isabel", date: "2 April 2001", body: "hello"},
      {id: 2, name: "wamsi", date: "2 April 2001", body: "world"}
    ]
    const newState = reducer(initialState, actions.setTweets(tweets))
    expect(newState.tweets).to.deep.equal(tweets)
  })
  it("should handle TWEETS_APPEND action type", () => {
    const state = {
      ...initialState,
      tweets: [
        {id: 1, name: "isabel", date: "2 April 2001", body: "hello"},
        {id: 2, name: "wamsi", date: "2 April 2001", body: "world"}
      ]
    }

    const newTweets = [
      {id: 1, name: "isabel", date: "2 April 2001", body: "hello"},
      {id: 3, name: "eric", date: "2 April 2001", body: "world"}
    ]

    const newState = reducer(state, actions.appendTweets(newTweets))
    const uniques = 3
    expect(newState.tweets.length).to.equal(uniques)
  })
  it("should handle HASHTAGS_SET action type", () => {
    const hashtags = [
      {hashtag: "#mapd", count: 100},
      {hashtag: "#lightningfast", count: 100}
    ]
    const newState = reducer(initialState, actions.setHashtags(hashtags))
    expect(newState.hashtags).to.deep.equal(hashtags)
  })
  it("should handle SET_SIDEBAR_MODE action type", () => {
    const tweetMode = reducer(initialState, actions.setSidebarMode("tweet"))
    expect(tweetMode.sidebarMode).to.equal("tweet")
    const hashtagMode = reducer(tweetMode, actions.setSidebarMode("hashtag"))
    expect(hashtagMode.sidebarMode).to.equal("hashtag")
  })
})
