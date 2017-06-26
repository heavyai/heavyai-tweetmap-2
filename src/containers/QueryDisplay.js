import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { filterSearch } from '../thunks/search'

class QueryDisplay extends React.Component {
  static propTypes = {
    queryTerms: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  removeQuery(query) {
    const queries = this.props.queryTerms.filter((queryTerm) => queryTerm !== query )

    this.props.dispatch(filterSearch(queries))
  }

  render() {
    const queries = this.props.queryTerms.map((query) => (
      <div className="queryPill" key={query} onClick={() => { this.removeQuery(query) }}>
        {query}
        <span className="delete"> &times;</span>
      </div>
    ))

    if (queries.length === 0) { return null }

    return (
      <div id="queryDisplay">
        {queries}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { queryTerms, ...rest } = state
  return {queryTerms}
}

export default connect(mapStateToProps)(QueryDisplay)
