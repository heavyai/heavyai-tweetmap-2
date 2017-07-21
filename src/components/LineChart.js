import PropTypes from "prop-types"
import React from "react"

const LineChart = ({open}) => {
  const chartHeight = open ? "120px" : "0px"

  return (
    <div>
      <div id="background" style={{height: chartHeight}} />
      <div className="lineChart" id="lineChart" style={{height: chartHeight}} />
    </div>
  )
}

LineChart.propTypes = {
  open: PropTypes.bool.isRequired
}

export default LineChart
