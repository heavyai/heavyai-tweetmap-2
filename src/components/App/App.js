import "./styles.scss"
import {closeShare} from "../ShareModal/actions"
import {connect} from "react-redux"
import MapBody from "../MapBody/MapBody"
import Modal from "react-modal"
import Nav from "../Nav/Nav"
import PropTypes from "prop-types"
import React from "react"
import {setupCharts} from "./actions"
import ShareModal from "../ShareModal/ShareModal"
import TweetSidebar from "../TweetSidebar/TweetSidebar"
import Icons from "./svg-icons"

let resizeListener = null

class App extends React.Component {
  static propTypes = {
    closeShare: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    shareOpen: PropTypes.bool.isRequired
  };

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

  render () {
    return (
      <dash>
        <Nav />
        <MapBody />
        <TweetSidebar />

        <Modal
          className="modalContent"
          contentLabel="Modal"
          isOpen={this.props.shareOpen}
          onRequestClose={this.props.closeShare}
          overlayClassName="modalOverlay"
        >
          <ShareModal />
        </Modal>
        <Icons />
      </dash>
    )
  }
}

const mapStateToProps = (state) => ({shareOpen: state.shareModal.modalOpen})

const mapDispatchToProps = (dispatch) => ({
  closeShare: () => { dispatch(closeShare) },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
