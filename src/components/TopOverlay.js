import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import SearchBar from '../containers/SearchBar';

import Octicon from 'react-octicon';

const TopOverlay = props => {
  return (
    <div id="overlay">
      <a id="icon">
        <Octicon name="three-bars" mega onClick={props.toggle} />
      </a>

      <SearchBar />

      <MediaQuery query='(min-width: 992px)'>
        <a href="https://www.mapd.com" target="_blank">
          <img className="logo" src="src/assets/logo.svg" />
        </a>
      </MediaQuery>

      <MediaQuery query='(max-width: 992px)'>
      <a id="icon">
        <Octicon name="list-unordered" mega onClick={props.toggle} />
      </a>
      </MediaQuery>
    </div>
  );
};

TopOverlay.propTypes = {
  toggle: PropTypes.func.isRequired
};

export default TopOverlay;
