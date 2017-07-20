import PropTypes from "prop-types"
import React from "react"

const LineChart = ({open}) => {
  const height = open ? "120px" : "0px"

  return (
    <div>
      <div id="background" style={{height}} />
      <div className="lineChart" id="lineChart" style={{height}} />
    </div>
  )
}

LineChart.propTypes = {
  open: PropTypes.bool.isRequired
}

export default LineChart
