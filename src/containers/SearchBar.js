import {addFilters} from "../thunks/search"
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
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.value === "") {
      return
    }

    const queries = this.state.value.toLowerCase().split(/\s+/)
    this.props.dispatch(addFilters(queries))

    this.setState({value: ""})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="textBar">
          <div>
            <Octicon name="search" />
          </div>

          <input
            onChange={this.handleChange.bind(this)}
            placeholder="Search Tweets"
            type="text"
            value={this.state.value}
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {queryTerms: state.filters.queryTerms}
}

export default connect(mapStateToProps)(SearchBar)
