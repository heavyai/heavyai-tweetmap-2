import PropTypes from "prop-types"
import React from "react"

const LineChart = ({open}) => (
  <div className={open ? "lineGroup" : "lineGroup closed"} >
    <div className={open ? "background" : "background closed"} />
    <div id="lineChart" />
  </div>
)

LineChart.propTypes = {
  open: PropTypes.bool.isRequired
}

export default LineChart
