import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from 'react-modal'

import LeftNav from './LeftNav'
import Legend from './Legend'
import TweetResults from './TweetResults'
import ShareMenu from './ShareMenu'
import MapChart from '../components/MapChart'
import LineChart from '../components/LineChart'
import TopOverlay from '../components/TopOverlay'

import { setupCharts } from '../thunks/setup'

let resizeListener = null

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      navShowing: false,
      searchShowing: false,
      shareShowing: false
    }
  }

  // initialize charts
  componentDidMount() {
    this.props.dispatch(setupCharts()).then((listener) => {
      resizeListener = listener
    }, err => {
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
          closeNav={() => this.closeNav()}
          openShare={() => this.setState({shareShowing: true})}
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

        <Modal
          isOpen={this.state.shareShowing}
          onRequestClose={() => this.setState({shareShowing: false})}
          contentLabel="Modal"
          style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.75)'}}}
        >
          <ShareMenu/>
        </Modal>
      </dash>
    );
  }
}

export default connect()(App)
