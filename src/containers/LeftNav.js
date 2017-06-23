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
        <a><Octicon name="three-bars"
          mega
          onClick={() => { this.toggleNav() }}/></a>

        <div id="sideNav" className="nav flex-column" onHover={() => {alert('zomg')}}>
          <a>
            <Octicon name="location"
              mega
              data-toggle="tooltip"
              data-placement="right"
              title="Search Location"/>
          </a>

          <a>
            <Octicon name="globe"
              mega
              data-toggle="tooltip"
              data-placement="right"
              title="Zoom to World"/>
          </a>

          <a>
            <Octicon name="info"
              mega
              data-toggle="tooltip"
              data-placement="right"
              title="Learn More about MapD"/>
          </a>
        </div>
      </div>
    );
  }
}

export default connect()(LeftNav)
