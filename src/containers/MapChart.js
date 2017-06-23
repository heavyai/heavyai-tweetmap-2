import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMapChart } from '../thunks/mapChart'

class MapChart extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
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
