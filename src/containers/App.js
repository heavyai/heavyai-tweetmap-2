import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapdConnect } from '../thunks/mapdConnect'
import LeftNav from './LeftNav.js';
import SearchBar from './SearchBar.js';
import MapChart from './MapChart.js'
import LineChart from './LineChart.js'
import Legend from './Legend.js'
import TweetResults from './TweetResults.js'

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
        <LeftNav/>

        <main>
          <map>
            <SearchBar/>
            <MapChart/>
            <LineChart/>
            <Legend/>
          </map>
        </main>

        <TweetResults/>
      </dash>
    );
  }
}

export default connect()(App)
