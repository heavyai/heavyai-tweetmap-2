import "./styles.scss"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import QueryPill from "../QueryPill/QueryPill"
import React from "react"
import {removeFilter} from "../actions"

export const QueryDisplay = (props) => {
  const queries = props.queryTerms.map(query =>
    <QueryPill
      key={query}
      query={query}
      removeQuery={props.removeQuery(query)}
    />
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

QueryDisplay.propTypes = {
  queryTerms: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeQuery: PropTypes.func.isRequired
}

const mapStateToProps = state => ({queryTerms: state.topOverlay.queryTerms})
const mapDispatchToProps = dispatch => ({
  removeQuery: (query) => () => dispatch(removeFilter(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryDisplay)
