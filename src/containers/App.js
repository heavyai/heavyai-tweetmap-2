import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as dc from '@mapd/mapdc';
const _ = require('lodash');

import LeftNav from './LeftNav.js';
import SearchBar from './SearchBar.js';
import Legend from './Legend.js'
import TweetResults from './TweetResults.js'
import MapChart from '../components/MapChart.js'
import LineChart from '../components/LineChart.js'

import { mapdConnect } from '../thunks/mapdConnect'
import { createMapChart } from '../thunks/map';
import { createLineChart } from '../thunks/timeFilter';
import { createLegendChart } from '../thunks/legendFilter';
import { createTweetChart } from '../thunks/tweets';
import { createCount } from '../thunks/count';

let charts = []
let resizeListener = null

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      navShowing: false
    }
  }

  // initialize charts
  componentDidMount() {
    const dispatch = this.props.dispatch

    dispatch(mapdConnect())
      .then(() => {
        // run chart init thunks
        return Promise.all([
          dispatch(createMapChart()),
          dispatch(createLineChart()),
          dispatch(createLegendChart()),
          dispatch(createTweetChart()),
          dispatch(createCount())
        ])
      }).then((result) => {
        // render charts
        charts = result
        return dc.renderAllAsync()
      }).then(() => {
        // attach resize listener
        const [[mapChart, mapSizeFunc], [lineChart, lineSizeFunc]] = charts

        resizeListener = _.debounce(() => {
          const [mapW, mapH] = mapSizeFunc();
          const [lineW, lineH] = lineSizeFunc();

          lineChart.width(lineW).height(lineH)

          mapChart.map().resize();
          mapChart.isNodeAnimate = false;
          mapChart.width(mapW).height(mapH).render();

          dc.redrawAllAsync();
        }, 500)

        window.addEventListener("resize", resizeListener);
      }, err =>  {
        console.error(err)
      })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", resizeListener);
  }

  toggleNav() {
    const w = this.state.navShowing ? '0px' : '72px'
    document.getElementById("sideNav").style.width = w
    this.setState({navShowing: !this.state.navShowing})
  }

  closeNav() {
    document.getElementById("sideNav").style.width = 0
    this.setState({navShowing: false})
  }

  render() {
    return (
      <dash>
        <LeftNav toggle={() => this.toggleNav()}/>

        <main onClick={() => this.closeNav()}>
          <SearchBar/>
          <map>
            <container>
              <MapChart/>
              <LineChart/>
            </container>
          </map>
          <Legend/>
        </main>

        <TweetResults closeNav={() => this.closeNav()}/>
      </dash>
    );
  }
}

export default connect()(App)
