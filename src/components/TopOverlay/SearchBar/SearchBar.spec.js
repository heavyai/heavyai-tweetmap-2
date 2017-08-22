import chai, {expect} from "chai"
import {mount} from "enzyme"
import React from "react"
import {SearchBar} from "./SearchBar"
import spies from "chai-spies"
chai.use(spies)

describe("<SearchBar />", () => {
  it("should dispatch thunk and clear field on submit", () => {
    const dispatch = chai.spy()
    const noop = () => {}
    const wrapper = mount(
      <SearchBar
        dispatch={dispatch}
        queryTerms={["one"]}
        removeQuery={noop}
      />
    )
    wrapper.setState({value: "foo"})

    const form = wrapper.find("form")
    form.simulate("submit")

    expect(dispatch).to.have.been.called()
    expect(wrapper.state().value).to.equal("")
  })

  it("should not call dispatch when field is empty", () => {
    const dispatch = chai.spy()
    const noop = () => {}
    const wrapper = mount(
      <SearchBar
        dispatch={dispatch}
        queryTerms={["one"]}
        removeQuery={noop}
      />
    )

    const form = wrapper.find("form")
    form.simulate("submit")

    expect(dispatch).to.not.have.been.called()
  })
})
