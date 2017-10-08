import "./styles.scss"
import {addFilters, removeFilter} from "../actions"
import {connect} from "react-redux"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import QueryPill from "../QueryPill/QueryPill"
import React from "react"

export class SearchBar extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    queryTerms: PropTypes.arrayOf(PropTypes.string).isRequired,
    removeQuery: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = {value: ""}
    this.textInput = null
    this.container = null
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const keyPressHandler = (e) => {
      if (this.props.queryTerms.length === 0) { return }

      if (e.key === "Backspace" && this.state.value === "") {
        const last = this.props.queryTerms[this.props.queryTerms.length - 1]
        this.props.dispatch(removeFilter(last))
      }
    }

    this.textInput.addEventListener("keydown", keyPressHandler)
  }

  componentDidUpdate () {
    const gap = 100
    this.container.scrollLeft = this.container.scrollLeftMax - gap
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
    const queries = this.props.queryTerms.map(query =>
      <QueryPill
        key={query}
        query={query}
        removeQuery={this.props.removeQuery(query)}
      />
    )

    return (
      <form className="searchBar" onSubmit={this.handleSubmit}>
        <div className="textBar">
          <div className="iconBox">
            <Octicon name="search" />
          </div>
          <container id="container" ref={elem => { this.container = elem }}>

            {queries}

            <input
              id="tweetSearch"
              onChange={this.handleChange}
              placeholder="Search Tweets"
              ref={input => { this.textInput = input }}
              type="text"
              value={this.state.value}
            />
          </container>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  queryTerms: state.topOverlay.queryTerms,
  mapChartType: state.mapBody.chartType
})
const mapDispatchToProps = dispatch => ({
  removeQuery: (query) => () => dispatch(removeFilter(query)),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
