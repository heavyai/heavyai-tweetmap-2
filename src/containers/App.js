import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as dc from '@mapd/mapdc';
const _ = require('lodash');

import LeftNav from './LeftNav'
import Legend from './Legend'
import TweetResults from './TweetResults'
import MapChart from '../components/MapChart'
import LineChart from '../components/LineChart'
import TopOverlay from '../components/TopOverlay'

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
      navShowing: false,
      searchShowing: false
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
    if (this.state.navShowing) {
      this.setState({searchShowing: false})
    }
    const width = this.state.navShowing ? '0px' : '76px'
    document.getElementById("sideNav").style.width = width
    this.setState({navShowing: !this.state.navShowing})
  }

  closeNav() {
    document.getElementById("sideNav").style.width = 0
    this.setState({navShowing: false, searchShowing: false})
  }

  toggleSearch() {
    this.setState({searchShowing: !this.state.searchShowing})
  }

  render() {
    return (
      <dash>
        <LeftNav
          search={this.state.searchShowing}
          toggle={() => this.toggleSearch()}
        />
        <main>
          <TopOverlay toggle={() => this.toggleNav()}/>
          <map onClick={() => this.closeNav()}>
            <container>
              <MapChart/>
              <LineChart/>
            </container>
          </map>
          <Legend onClick={() => this.closeNav()}/>
        </main>

        <TweetResults closeNav={() => this.closeNav()}/>
      </dash>
    );
  }
}

export default connect()(App)
