import {toggleNav, toggleTweetBar} from "../actions"
import {connect} from "react-redux"
import MediaQuery from "react-responsive"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import React from "react"
import SearchBar from "../containers/SearchBar"

const TopOverlay = props => (
  <div id="overlay">
    {/* nav toggle button */}
    <a id="icon">
      <Octicon mega name="three-bars" onClick={props.toggleNav} />
    </a>

    <SearchBar />

    {/* mapd logo */}
    <MediaQuery query="(min-width: 992px)">
      <a href="https://www.mapd.com" rel="noopener noreferrer" target="_blank">
        <img className="logo" src="src/assets/logo.svg" />
      </a>
    </MediaQuery>

    {/* tweet bar toggle button */}
    <MediaQuery query="(max-width: 992px)">
      <a id="icon">
        <Octicon mega name="list-unordered" onClick={props.toggleTweetBar} />
      </a>
    </MediaQuery>
  </div>
)

TopOverlay.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  toggleTweetBar: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => { dispatch(toggleNav) },
  toggleTweetBar: () => { dispatch(toggleTweetBar) }
})

export default connect(null, mapDispatchToProps)(TopOverlay)
