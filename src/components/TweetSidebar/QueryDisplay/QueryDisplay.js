import {connect} from "react-redux"
import PropTypes from "prop-types"
import React from "react"
import {removeFilter} from "../../TopOverlay/actions"

class QueryDisplay extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    queryTerms: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  removeQuery (query) {
    this.props.dispatch(removeFilter(query))
  }

  render () {
    const queries = this.props.queryTerms.map(query =>
      <div
        className="queryPill"
        key={query}
        onClick={() => { this.removeQuery(query) }}
      >
        {query}
        <span className="delete"> &times;</span>
      </div>
    )

    if (queries.length === 0) {
      return null
    }

    return (
      <div className="queryDisplay">
        {queries}
      </div>
    )
  }
}

const mapStateToProps = state => ({queryTerms: state.topOverlay.queryTerms})

export default connect(mapStateToProps)(QueryDisplay)
