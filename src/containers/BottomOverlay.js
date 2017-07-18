import {connect} from "react-redux"
import LineChart from "../components/LineChart"
import MediaQuery from "react-responsive"
import PropTypes from "prop-types"
import React from "react"
import {zoomTo} from "../thunks/map"

class BottomOverlay extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.state = {
      chartOn: false,
      loading: false
    }
  }

  userLocation () {
    const zoomToPosition = position => {
      this.setState({loading: false})
      this.props.dispatch(zoomTo(position))
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(zoomToPosition)
      this.setState({loading: true})
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }

  toggleLineChart () {
    const height = this.state.chartOn ? "0px" : "120px"

    document.getElementById("background").style.height = height
    document.getElementById("lineChart").style.height = height
    this.setState({chartOn: !this.state.chartOn})
  }

  render () {
    const spinning = this.state.loading ? " fa-spin" : ""

    return (
      <div id="bottomOverlay">
        <button onClick={() => this.userLocation()}>
          <i
            aria-hidden="true"
            className={`fa fa-location-arrow fa-lg${spinning}`}
          />
        </button>

        <MediaQuery query="(max-width: 992px)">
          <button onClick={() => this.toggleLineChart()}>
            <i aria-hidden="true" className="fa fa-area-chart fa-lg" />
          </button>
        </MediaQuery>
        <LineChart />
      </div>
    )
  }
}

export default connect()(BottomOverlay)
