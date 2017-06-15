import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMapChart } from '../thunks'
const _ = require('lodash');

class MapChart extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    // add resize listener
  }

  componentWillUnmount() {
    // remove resize listener
  }

  componentDidUpdate() {
    /* must wait until connection and crossfilter are set */
    if (this.props.isConnected) {
      this.props.dispatch(createMapChart())
    }
  }

  render() {
    return <div id="mapChart"></div>;
  }
}

const mapStateToProps = state => {
  const { isConnected, ...rest } = state
  return {isConnected}
}

export default connect(mapStateToProps)(MapChart)
