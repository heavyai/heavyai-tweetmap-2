import MediaQuery from "react-responsive"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import React from "react"
import SearchBar from "../containers/SearchBar"

const TopOverlay = props => (
  <div id="overlay">
    <a id="icon">
      <Octicon mega name="three-bars" onClick={props.toggleNav} />
    </a>

    <SearchBar />

    <MediaQuery query="(min-width: 992px)">
      <a href="https://www.mapd.com" rel="noopener noreferrer" target="_blank">
        <img className="logo" src="src/assets/logo.svg" />
      </a>
    </MediaQuery>

    <MediaQuery query="(max-width: 992px)">
      <a id="icon">
        <Octicon mega name="list-unordered" onClick={props.toggleTweets} />
      </a>
    </MediaQuery>
  </div>
)

TopOverlay.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  toggleTweets: PropTypes.func.isRequired
}

export default TopOverlay
