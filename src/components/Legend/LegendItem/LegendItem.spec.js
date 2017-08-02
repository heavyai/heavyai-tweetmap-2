import {expect} from "chai"
import React from "react"
import {shallow} from "enzyme"
import LegendItem from "./LegendItem"

describe("<LegendItem />", () => {
  it("renders a basic legend item", () => {
    const wrapper = shallow(
      <LegendItem
        active={true}
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
        active={false}
        color="blue"
        sub="9000"
        title="en"
      />)
    expect(wrapper.contains(<div className="whitedOut" />)).to.be.true
  })
  it("displays no dot for titles", () => {
    const wrapper = shallow(
      <LegendItem
        active={true}
        justTitle={true}
        sub="9000"
        title="en"
      />)
    expect(wrapper.containsMatchingElement(<div className="legendLabel" />)).to.be.false
  })
})
