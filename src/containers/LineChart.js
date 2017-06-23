import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLineChart } from '../thunks/lineChart'

class LineChart extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return <div id="lineChart" className="lineChart"></div>;
  }
}

const mapStateToProps = state => {
  const { isConnected, ...rest } = state
  return {isConnected}
}

export default connect(mapStateToProps)(LineChart)
