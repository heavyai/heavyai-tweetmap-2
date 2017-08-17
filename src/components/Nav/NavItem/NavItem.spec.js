import chai, {expect} from "chai"
import NavItem from "./NavItem"
import React from "react"
import {shallow} from "enzyme"
import spies from "chai-spies"
chai.use(spies)

/* eslint-disable no-unused-expressions */

describe("<NavItem />", () => {
  it("renders a link and description", () => {
    const wrapper = shallow(
      <NavItem
        description="hello"
        icon="location"
      />)

    expect(wrapper.find("a")).to.have.length(1)
    expect(wrapper.find("p")).to.have.length(1)
  })
  it("responds to clicks", () => {
    const spy = chai.spy()
    const wrapper = shallow(
      <NavItem
        clickListener={spy}
        description="hello"
        icon="location"
      />)

    wrapper.simulate("click")
    expect(spy).to.have.been.called()
  })
})
