import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import MediaQuery from "react-responsive"

import LineChart from '../components/LineChart';
import { zoomTo } from '../thunks/map';

import Octicon from "react-octicon"

class BottomOverlay extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor () {
    super()

    this.state = {
      chartOn: false,
      loading: false
    }
  }

  userLocation() {
    const zoomToPosition = position => {
      this.setState({loading: false})
      this.props.dispatch(zoomTo(position));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(zoomToPosition);
      this.setState({loading: true})
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  toggleLineChart() {
    const height = this.state.chartOn ? '0px' : '120px';

    document.getElementById('background').style.height = height;
    document.getElementById('lineChart').style.height = height;
    this.setState({chartOn: !this.state.chartOn})
  }

  render() {
    return (
      <div id="bottomOverlay">
        <button onClick={() => this.userLocation()}>
          <i
            className={"fa fa-location-arrow fa-lg" + (this.state.loading ? " fa-spin" : "")}
            aria-hidden="true">
          </i>
        </button>

        <MediaQuery query='(max-width: 992px)'>
          <button onClick={() => this.toggleLineChart()}>
            <i className="fa fa-area-chart fa-lg" aria-hidden="true"></i>
          </button>
        </MediaQuery>
        <LineChart />
      </div>
    )
  }
}

export default connect()(BottomOverlay)
