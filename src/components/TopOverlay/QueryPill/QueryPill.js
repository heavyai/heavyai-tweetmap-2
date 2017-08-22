import "./styles.scss"
import PropTypes from "prop-types"
import React from "react"

const QueryPill = (props) => (
  <div
    className="queryPill pointer"
    onClick={props.removeQuery}
  >
    {props.query}
    <span className="delete"> &times;</span>
  </div>
)

QueryPill.propTypes = {
  query: PropTypes.string.isRequired,
  removeQuery: PropTypes.func.isRequired
}

export default QueryPill
