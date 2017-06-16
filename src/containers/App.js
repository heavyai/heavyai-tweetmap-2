import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapdConnect } from '../thunks/mapdConnect'
import SearchBar from './SearchBar.js';
import MapChart from './MapChart.js'
import LineChart from './LineChart.js'

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
        <nav></nav>

        <main>
          <map>
            <SearchBar/>
            <MapChart/>
            <LineChart/>
            <legend>legend</legend>
          </map>
        </main>

        <tweetResults>tweets</tweetResults>
      </dash>
    );
  }
}

export default connect()(App)
