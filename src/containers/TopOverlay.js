import {toggleNav, toggleTweetBar} from "../actions"
import {connect} from "react-redux"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import React from "react"
import SearchBar from "../containers/SearchBar"

const TopOverlay = props => (
  <div className="overlay">
    {/* nav toggle button */}
    <a className="icon">
      <Octicon mega name="three-bars" onClick={props.toggleNav} />
    </a>

    <SearchBar />

    {/* Logo only on Desktop */}
    <a href="https://www.mapd.com" rel="noopener noreferrer" target="_blank">
      <img className="logo" src="src/assets/logo.svg" />
    </a>

    {/* Button only on Mobile */}
    <a className="tweetBar icon">
      <Octicon mega name="list-unordered" onClick={props.toggleTweetBar} />
    </a>
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
