import {connect} from "react-redux"
import LineChart from "../components/LineChart"
import MediaQuery from "react-responsive"
import PropTypes from "prop-types"
import React from "react"
import {toggleLinechart} from "../actions"
import {zoomToUserLocation} from "../thunks/map"

class BottomOverlay extends React.Component {
  static propTypes = {
    chartOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleChart: PropTypes.func.isRequired,
    zoomToUserLocation: PropTypes.func.isRequired
  }

  render () {
    const spinning = this.props.loading ? " fa-spin" : ""

    return (
      <div id="bottomOverlay">
        {/* current location button */}
        <button onClick={this.props.zoomToUserLocation}>
          <i
            aria-hidden="true"
            className={`fa fa-location-arrow fa-lg${spinning}`}
          />
        </button>

        {/* line chart toggle button */}
        <MediaQuery query="(max-width: 992px)">
          <button onClick={this.props.toggleChart}>
            <i aria-hidden="true" className="fa fa-area-chart fa-lg" />
          </button>
        </MediaQuery>

        {/* line chart component */}
        <LineChart open={this.props.chartOpen} />
      </div>
    )
  }
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
