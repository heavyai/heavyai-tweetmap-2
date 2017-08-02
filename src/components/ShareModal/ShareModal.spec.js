import chai, {expect} from "chai"
import {mount, shallow} from "enzyme"
import React from "react"
import {ShareModal} from "./ShareModal"
import spies from "chai-spies"
chai.use(spies)

/* eslint-disable no-unused-expressions */

describe("<ShareModal />", () => {
  it("renders the modal items", () => {
    const noop = () => {}
    const wrapper = shallow(
      <ShareModal
        applyFilters
        dispatch={noop}
        toggleMode={noop}
        viewUrl="http://www.mapd.com"
      />)
    expect(wrapper.find(".switch")).to.have.length(1)
    expect(wrapper.find(".textBar")).to.have.length(1)
    expect(wrapper.find(".socialBar")).to.have.length(1)
    expect(wrapper.find("a")).to.have.length(2)
  })

  it("dispatches a thunk requesting a url", () => {
    const dispatch = chai.spy()
    const noop = () => {}
    mount(
      <ShareModal
        applyFilters
        dispatch={dispatch}
        toggleMode={noop}
        viewUrl="http://www.mapd.com"
      />)

    expect(dispatch).to.have.been.called()
  })
})
