import {addFilters} from "../actions"
import {connect} from "react-redux"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import React from "react"

class SearchBar extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    queryTerms: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  constructor () {
    super()
    this.state = {value: ""}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

    const queries = this.state.value.toLowerCase().split(/\s+/)
    this.props.dispatch(addFilters(queries))
    // eslint-disable-next-line react/no-set-state
    this.setState({value: ""})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="textBar">
          <div>
            <Octicon name="search" />
          </div>

          <input
            onChange={this.handleChange}
            placeholder="Search Tweets"
            type="text"
            value={this.state.value}
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => state.topOverlay

export default connect(mapStateToProps)(SearchBar)
