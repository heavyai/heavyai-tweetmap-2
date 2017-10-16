import "./styles.scss"
import {closeNav, closeSearch, toggleNav} from "../Nav/actions"
import {connect} from "react-redux"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import QueryDisplay from "./QueryDisplay/QueryDisplay.js"
import React from "react"
import SearchBar from "./SearchBar/SearchBar"
import {setSidebar} from "../TweetSidebar/actions"

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
        <img className="logo" src="assets/logo.svg" />
      </a>

      {/* Button only on Mobile */}
      <a className="tweetBar icon">
        <Octicon mega name="list-unordered" onClick={props.toggleSidebar(props.sideBarOpen)} />
      </a>
    </div>

    <QueryDisplay />
  </div>
)

TopOverlay.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  sideBarOpen: state.tweetSidebar.sidebarOpen
})

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => {
    dispatch(closeSearch)
    dispatch(toggleNav)
  },
  toggleSidebar: currVal => () => {
    dispatch(setSidebar(!currVal))
    dispatch(closeSearch)
    dispatch(closeNav)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopOverlay)
