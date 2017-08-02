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
        dispatch={noop}
        queryTerms={[]}
      />)
    expect(wrapper.equals(null)).to.be.true
  })

  it("renders individual queries", () => {
    const queries = ["one", "two", "three"]
    const wrapper = render(
      <QueryDisplay
        dispatch={noop}
        queryTerms={queries}
      />)
    expect(wrapper.find(".queryPill")).to.have.length(queries.length)
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
