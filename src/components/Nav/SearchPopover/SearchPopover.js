import {closeNav, closeSearch} from "../actions"
import {connect} from "react-redux"
import {geocode} from "../../MapBody/actions"
import PropTypes from "prop-types"
import React from "react"

class SearchPopover extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {value: ""}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.input.focus()
  }

  handleChange (event) {
    // eslint-disable-next-line react/no-set-state
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.value === "") {
      return
    }

    this.props.dispatch(geocode(this.state.value))
    // eslint-disable-next-line react/no-set-state
    this.setState({value: ""})
    this.props.dispatch(closeNav)
    this.props.dispatch(closeSearch)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="textBar">
          <input
            onChange={this.handleChange}
            placeholder="Search Location"
            ref={input => { this.input = input }}
            type="text"
            value={this.state.value}
          />
        </div>
      </form>
    )
  }
}

export default connect()(SearchPopover)
