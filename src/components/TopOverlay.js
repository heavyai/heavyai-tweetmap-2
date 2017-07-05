import React from 'react';
import PropTypes from 'prop-types'

import SearchBar from '../containers/SearchBar'

import Octicon from 'react-octicon'

const TopOverlay = (props) => {
  return (
    <div id="overlay">

      <a id="settings">
        <Octicon name="three-bars" mega onClick={props.toggle}/>
      </a>

      <SearchBar/>

      <a href="https://www.mapd.com" target="_blank">
        <img className="logo" src="src/assets/logo.svg" />
      </a>
    </div>
  )
}

TopOverlay.propTypes = {
  toggle: PropTypes.func.isRequired
}

export default TopOverlay
