import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapdConnect } from '../thunks/mapdConnect'
import MapChart from './MapChart.js';
import LineChart from './LineChart.js';

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(mapdConnect())
  }

  render() {
    return (
      <dash>
        <nav>nav</nav>

        <main>
          <map>
            <MapChart/>
            <LineChart></LineChart>
            <legend>legend</legend>
          </map>
        </main>

        <tweetResults>tweets</tweetResults>
      </dash>
    );
  }
}

export default connect()(App)
