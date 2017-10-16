import "./styles.scss"
import {toggleLinechart, zoomToUserLocation} from "../actions"
import {connect} from "react-redux"
import LineChart from "./LineChart/LineChart"
import PropTypes from "prop-types"
import React from "react"

const BottomOverlay = (props) => {
  const spinning = props.loading ? " fa-spin" : ""

  return (
    <div className="bottomOverlay">
      {/* current location button */}
      <button onClick={props.zoomToUserLocation}>
        <i
          aria-hidden="true"
          className={`fa fa-location-arrow fa-lg${spinning}`}
        />
      </button>

      {/* Hide Linechart button only on Mobile */}
      <button className="linechart" onClick={props.toggleChart(props.chartOpen)}>
        <i aria-hidden="true" className="fa fa-area-chart fa-lg" />
      </button>

      {/* Count Widget */}
      <h1><span className="tweetCount" /></h1>

      <LineChart open={props.chartOpen} />
    </div>
  )
}

BottomOverlay.propTypes = {
  chartOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleChart: PropTypes.func.isRequired,
  zoomToUserLocation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  chartOpen: state.mapBody.lineChartOpen,
  loading: state.mapBody.geoLoading
})
const mapDispatchToProps = (dispatch) => ({
  toggleChart: currVal => () => { dispatch(toggleLinechart(!currVal)) },
  zoomToUserLocation: () => { dispatch(zoomToUserLocation()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomOverlay)
