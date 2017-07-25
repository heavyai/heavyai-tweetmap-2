import PropTypes from "prop-types"
import React from "react"

const LineChart = ({open}) => (
  <div className={open ? null : "closed"} id="lineGroup" >
    <div className={open ? null : "closed"} id="background" />
    <div id="lineChart" />
  </div>
)

LineChart.propTypes = {
  open: PropTypes.bool.isRequired
}

export default LineChart
