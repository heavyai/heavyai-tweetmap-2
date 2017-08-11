import {expect} from "chai"
import LegendItem from "./LegendItem"
import React from "react"
import {shallow} from "enzyme"

/* eslint-disable no-unused-expressions */

describe("<LegendItem />", () => {
  it("renders a basic legend item", () => {
    const wrapper = shallow(
      <LegendItem
        active
        color="blue"
        sub="9000"
        title="en"
      />)
    expect(wrapper.find("p")).to.have.length(2)
    expect(wrapper.containsMatchingElement(<div className="legendLabel" />)).to.be.true
    expect(wrapper.find(".legendLabel").first().prop("style").backgroundColor).to.equal("blue")
    expect(wrapper.contains(<div className="whitedOut" />)).to.be.false
  })
  it("whites out inactive items", () => {
    const wrapper = shallow(
      <LegendItem
        color="blue"
        sub="9000"
        title="en"
      />)
    expect(wrapper.contains(<div className="whitedOut" />)).to.be.true
  })
})
