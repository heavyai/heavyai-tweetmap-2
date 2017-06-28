import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Octicon from 'react-octicon'

class LeftNav extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return (
      <div id="sideNav" className="nav">
        <a>
          <Octicon name="location" mega/>
        </a>

        <a>
          <Octicon name="globe" mega/>
        </a>

        <a href="https://www.mapd.com" target="_blank">
          <Octicon name="info" mega/>
        </a>
      </div>
    );
  }
}

export default connect()(LeftNav)
