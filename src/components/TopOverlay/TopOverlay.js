import "./styles.scss"
import {closeNav, closeSearch, toggleNav} from "../Nav/actions"
import {connect} from "react-redux"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import QueryDisplay from "./QueryDisplay/QueryDisplay.js"
import React from "react"
import SearchBar from "./SearchBar/SearchBar"
import {toggleSidebar} from "../TweetSidebar/actions"

const TopOverlay = props => (
  <div className="overlay">
    <div className="control">
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
        <Octicon mega name="list-unordered" onClick={props.toggleSidebar} />
      </a>
    </div>

    <QueryDisplay />
  </div>
)

TopOverlay.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => {
    dispatch(closeSearch)
    dispatch(toggleNav)
  },
  toggleSidebar: () => {
    dispatch(toggleSidebar)
    dispatch(closeSearch)
    dispatch(closeNav)
  }
})

export default connect(null, mapDispatchToProps)(TopOverlay)
