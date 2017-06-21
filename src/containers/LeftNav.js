import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Octicon from 'react-octicon'

class LeftNav extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      showing: false
    }
  }

  toggleNav() {
    const w = this.state.showing ? '0px' : '72px'
    document.getElementById("sideNav").style.width = w
    this.setState({showing: !this.state.showing})
  }

  render() {
    return (
      <div>
        <Octicon name="three-bars"
          mega
          onClick={() => { this.toggleNav() }}/>

        <div id="sideNav" className="nav flex-column" onHover={() => {alert('zomg')}}>
          <Octicon name="location" mega/>
          <Octicon name="globe" mega/>
          <Octicon name="info" mega/>
        </div>
      </div>
    );
  }
}

export default connect()(LeftNav)
