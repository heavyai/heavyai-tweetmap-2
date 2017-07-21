import {closeNav, toggleSearch, toggleShare} from "../actions"
import {connect} from "react-redux"
import {IS_MOBILE} from "../constants"
import NavItem from "../components/NavItem"
import PropTypes from "prop-types"
import React from "react"
import SearchPopover from "./SearchPopover"
import {zoomOut} from "../thunks/map"

const LeftNav = (props) => {
  const searchPopover = <SearchPopover />
  const openWidth = IS_MOBILE ? "15em" : "4.75em"
  const width = props.open ? openWidth : 0

  return (
    <div className="nav" id="sideNav" style={{width}} >
      {/* Close Nav (only on mobile) */}
      <a id="close" onClick={props.closeNav}>
        &times;
      </a>

      {/* Search Location */}
      <NavItem
        body={props.search ? searchPopover : null}
        className={props.search ? "searchPopover" : null}
        clicked={props.toggleSearch}
        description="Search Location"
        icon="location"
      />

      {/* Share */}
      <NavItem
        clicked={props.zoomOut}
        description="Zoom Out"
        icon="globe"
      />

      {/* Github */}
      <NavItem
        description="See Repo"
        icon="mark-github"
        url="https://github.com/mapd/mapd-tweetmap-2"
      />

      {/* About */}
      <NavItem
        description="About"
        icon="info"
        url="https://www.mapd.com"
      />

      {/* Share */}
      <NavItem
        clicked={props.openShare}
        description="Share"
        icon="link"
      />
    </div>
  )
}

LeftNav.propTypes = {
  closeNav: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  openShare: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: state.navigation.leftNav,
  search: state.navigation.locationSearch
})

const mapDispatchToProps = (dispatch) => ({
  closeNav: () => { dispatch(closeNav) },
  openShare: () => {
    dispatch(toggleShare)
    dispatch(closeNav)
  },
  toggleSearch: () => { dispatch(toggleSearch) },
  zoomOut: () => {
    dispatch(zoomOut())
    dispatch(closeNav)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
