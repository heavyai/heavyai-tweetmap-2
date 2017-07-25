import {closeNav, closeShare, closeTweetBar} from "../actions"
import BottomOverlay from "./BottomOverlay"
import {connect} from "react-redux"
import LeftNav from "./LeftNav"
import Legend from "./Legend"
import MapChart from "../components/MapChart"
import Modal from "react-modal"
import PropTypes from "prop-types"
import React from "react"
import {setupCharts} from "../thunks/setup"
import ShareMenu from "./ShareMenu"
import TopOverlay from "./TopOverlay"
import TweetResults from "./TweetResults"

let resizeListener = null

class App extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func.isRequired,
    closeShare: PropTypes.func.isRequired,
    closeTweetBar: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    shareOpen: PropTypes.bool.isRequired,
    tweetBarOpen: PropTypes.bool.isRequired
  };

  constructor () {
    super()
    this.closeAll = this.closeAll.bind(this)
  }

  // initialize charts by dispatching setup thunk
  componentDidMount () {
    this.props.dispatch(setupCharts()).then(
      listener => {
        // track chart resize listener to remove on unmount
        resizeListener = listener
      },
      err => {
        console.error(err)
      }
    )
  }

  componentWillUnmount () {
    window.removeEventListener("resize", resizeListener)
  }

  closeAll () {
    this.props.closeNav()
    this.props.closeTweetBar()
  }

  render () {
    return (
      <dash>
        <LeftNav />

        {/* margin shifts div left in mobile site */}
        <main className={this.props.tweetBarOpen ? "shifted" : null} id="main" >
          <TopOverlay />

          <map onClick={this.closeAll}>
            <container>
              <MapChart />
              <BottomOverlay />
            </container>
          </map>

          <Legend onClick={this.closeAll} />
        </main>

        <TweetResults />

        <Modal
          contentLabel="Modal"
          isOpen={this.props.shareOpen}
          onRequestClose={this.props.closeShare}
          className="modalContent"
          overlayClassName="modalOverlay"
        >
          <ShareMenu />
        </Modal>
      </dash>
    )
  }
}

const mapStateToProps = (state) => ({
  tweetBarOpen: state.navigation.tweetBar,
  shareOpen: state.navigation.shareModal
})

const mapDispatchToProps = (dispatch) => ({
  closeNav: () => { dispatch(closeNav) },
  closeTweetBar: () => { dispatch(closeTweetBar) },
  closeShare: () => { dispatch(closeShare) },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
