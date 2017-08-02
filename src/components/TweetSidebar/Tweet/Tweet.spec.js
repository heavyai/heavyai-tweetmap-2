import {expect} from "chai"
import React from "react"
import {render} from "enzyme"
import Tweet from "./Tweet"

describe("<Tweet />", () => {
  it("renders two divs", () => {
    const wrapper = render(
      <Tweet
        body="Hello, @world! #blessed"
        date="2 April 2001"
        handle="@MapD"
        imgLink="derp"
      />)
    expect(wrapper.find("div")).to.have.length(2)
  })
  it("generates a link from a twitter handle", () => {
    const wrapper = render(
      <Tweet
        body="Hello, @world!"
        date="2 April 2001"
        handle="@MapD"
        imgLink="derp"
      />)
    expect(wrapper.find("a")).to.have.length(1)
  })
  it("generates a link from a hashtag", () => {
    const wrapper = render(
      <Tweet
        body="Hello, world! #blessed"
        date="2 April 2001"
        handle="@MapD"
        imgLink="derp"
      />)
    expect(wrapper.find("a")).to.have.length(1)
  })
  it("generates a link from a url", () => {
    const wrapper = render(
      <Tweet
        body="Hello, world! http://mapd.com/"
        date="2 April 2001"
        handle="@MapD"
        imgLink="derp"
      />)
    expect(wrapper.find("a")).to.have.length(1)
  })
  it("generates links from complex body text", () => {
    const wrapper = render(
      <Tweet
        body="Hello, @world! Feeling #blessed about http://mapd.com/"
        date="2 April 2001"
        handle="@MapD"
        imgLink="derp"
      />)
    const numLinks = 3
    expect(wrapper.find("a")).to.have.length(numLinks)
  })
})
