import React from "react"
import chai, {expect} from "chai"
import spies from 'chai-spies'
import {shallow, render} from "enzyme"
import {QueryDisplay} from "./QueryDisplay"
chai.use(spies)

describe("<QueryDisplay />", () => {
  it("renders individual queries", () => {
    const wrapper = render(
      <QueryDisplay
        dispatch={() => {}}
        queryTerms={["one", "two", "three"]}
      />)
    expect(wrapper.find("div.queryPill")).to.have.length(3)
  })

  it("returns null when there are no queries", () => {
    const wrapper = shallow(
      <QueryDisplay
        dispatch={() => {}}
        queryTerms={[]}
      />)
    expect(wrapper.equals(null)).to.be.true
  })

  it("renders individual queries", () => {
    const wrapper = render(
      <QueryDisplay
        dispatch={() => {}}
        queryTerms={["one", "two", "three"]}
      />)
    expect(wrapper.find(".queryPill")).to.have.length(3)
  })

  it("dispatches thunk on click", () => {
    const dispatch = chai.spy()
    const wrapper = shallow(
      <QueryDisplay
        dispatch={dispatch}
        queryTerms={["one"]}
      />)
    wrapper.find(".queryPill").first().simulate("click")
    expect(dispatch).to.have.been.called()
  })
})
