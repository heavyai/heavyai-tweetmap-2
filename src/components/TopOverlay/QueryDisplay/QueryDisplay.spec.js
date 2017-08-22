import chai, {expect} from "chai"
import {render, shallow} from "enzyme"
import {QueryDisplay} from "./QueryDisplay"
import React from "react"
import spies from "chai-spies"
chai.use(spies)

/* eslint-disable no-unused-expressions */

describe("<QueryDisplay />", () => {
  const noop = () => {}

  it("returns null when there are no queries", () => {
    const wrapper = shallow(
      <QueryDisplay
        queryTerms={[]}
        removeQuery={noop}
      />)
    expect(wrapper.equals(null)).to.be.true
  })

  it("renders individual queries", () => {
    const queries = ["one", "two", "three"]
    const wrapper = render(
      <QueryDisplay
        queryTerms={queries}
        removeQuery={noop}
      />)
    expect(wrapper.find(".queryPill")).to.have.length(queries.length)
  })

  it("dispatches thunk on click", () => {
    const removeQuery = chai.spy()
    const wrapper = shallow(
      <QueryDisplay
        queryTerms={["one"]}
        removeQuery={removeQuery}
      />)
    wrapper.find(".queryPill").first().simulate("click")
    expect(removeQuery).to.have.been.called()
  })
})
