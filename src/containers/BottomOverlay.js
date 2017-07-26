import {connect} from "react-redux"
import LineChart from "../components/LineChart"
import PropTypes from "prop-types"
import React from "react"
import {toggleLinechart} from "../actions"
import {zoomToUserLocation} from "../thunks/map"

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
      <button className="linechart" onClick={props.toggleChart}>
        <i aria-hidden="true" className="fa fa-area-chart fa-lg" />
      </button>

      <LineChart open={props.chartOpen} />
    </div>
  )
}

BottomOverlay.propTypes = {
  chartOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleChart: PropTypes.func.isRequired,
  zoomToUserLocation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  chartOpen: state.navigation.lineChart,
  loading: state.navigation.locationLoading
})
const mapDispatchToProps = (dispatch) => ({
  toggleChart: () => { dispatch(toggleLinechart) },
  zoomToUserLocation: () => { dispatch(zoomToUserLocation()) },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomOverlay)
