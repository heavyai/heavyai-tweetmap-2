import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import LineChart from '../components/LineChart';

import Octicon from 'react-octicon';

class BottomOverlay extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      chartOn: false
    }
  }

  render() {
    return (
      <div id="bottomOverlay">
        <button onClick={() => {}}>
          <i className="fa fa-location-arrow fa-lg" aria-hidden="true"></i>
        </button>

        <MediaQuery query='(max-width: 992px)'>
          <button onClick={() => {
            const height = this.state.chartOn ? '0px' : '120px';

            document.getElementById('background').style.height = height;
            document.getElementById('lineChart').style.height = height;
            this.setState({chartOn: !this.state.chartOn})
          }}>
            <i className="fa fa-area-chart fa-lg" aria-hidden="true"></i>
          </button>
        </MediaQuery>
        <LineChart />
      </div>
    );
  }
}

export default connect()(BottomOverlay);
