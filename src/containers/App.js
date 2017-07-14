import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'react-modal';

import LeftNav from './LeftNav';
import Legend from './Legend';
import TweetResults from './TweetResults';
import ShareMenu from './ShareMenu';
import BottomOverlay from './BottomOverlay';
import MapChart from '../components/MapChart';
import TopOverlay from '../components/TopOverlay';

import { setupCharts } from '../thunks/setup';

let resizeListener = null;

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      navShowing: false,
      searchShowing: false,
      shareShowing: false,
      tweetBarShowing: false,
    };
  }

  // initialize charts
  componentDidMount() {
    this.props.dispatch(setupCharts()).then(
      listener => {
        resizeListener = listener;
      },
      err => {
        console.error(err);
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resizeListener);
  }

  toggleNav() {
    const openWidth = window.innerWidth > 992 ? '4.75em' : '15em';
    const width = this.state.navShowing ? '0px' : openWidth;
    document.getElementById('sideNav').style.width = width;
    this.setState({
      navShowing: !this.state.navShowing,
      searchShowing: false
     });
  }

  closeNav() {
    document.getElementById('sideNav').style.width = 0;
    this.setState({ navShowing: false, searchShowing: false });
  }

  toggleTweetBar() {
    const width = this.state.tweetBarShowing ? 0 : '17em';
    document.getElementById('tweetResults').style.width = width;
    document.getElementById("main").style.marginLeft = "-" + width;
    this.setState({ tweetBarShowing: !this.state.tweetBarShowing });
  }

  closeAll() {
    this.closeNav();

    if (this.state.tweetBarShowing) {
      document.getElementById('tweetResults').style.width = 0;
      document.getElementById("main").style.marginLeft = 0;
      this.setState({ tweetBarShowing: false });
    }
  }

  toggleSearch() {
    this.setState({ searchShowing: !this.state.searchShowing });
  }

  render() {
    return (
      <dash>
        <LeftNav
          search={this.state.searchShowing}
          toggle={() => this.toggleSearch()}
          closeNav={() => this.closeAll()}
          openShare={() => this.setState({ shareShowing: true })}
        />
        <main id="main">
          <TopOverlay
            toggleNav={() => this.toggleNav()}
            toggleTweets={() => this.toggleTweetBar()}
            closeNav={() => this.closeNav()}
          />
          <map onClick={() => this.closeAll()}>
            <container>
              <MapChart />
              <BottomOverlay />
            </container>
          </map>
          <Legend onClick={() => this.closeAll()} />
        </main>

        <TweetResults closeNav={() => this.closeNav()} />

        <Modal
          isOpen={this.state.shareShowing}
          onRequestClose={() => this.setState({ shareShowing: false })}
          contentLabel="Modal"
          style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
            content: { padding: '2.5rem' }
          }}>
          <ShareMenu />
        </Modal>
      </dash>
    );
  }
}

export default connect()(App);
