import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Popover from 'react-popover'
import Octicon from 'react-octicon'

import SearchPopover from './SearchPopover'

class LeftNav extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      tooltip: 0
    }
  }

  render() {
    const searchPopover = <SearchPopover/>

    return (
      <div id="sideNav" className="nav">
        <a>
          <Popover
            className={this.props.search ? 'searchPopover' : null}
            isOpen={this.state.tooltip === 1 || this.props.search}
            place="right"
            body={this.props.search ? searchPopover : "search location"}>

            <Octicon name="search" mega
              onMouseEnter={() => this.setState({ tooltip: 1 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}
              onClick={() => {
                this.props.toggle()
                this.setState({ tooltip: 0 })
              }}/>
          </Popover>
        </a>

        <a>
          <Popover
            isOpen={this.state.tooltip === 2}
            place="right"
            body="zoom out">

            <Octicon name="globe" mega
              onMouseEnter={() => this.setState({ tooltip: 2 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}/>
          </Popover>
        </a>

        <a>
          <Popover
            isOpen={this.state.tooltip === 3}
            place="right"
            body="about">

            <Octicon name="info" mega
              onMouseEnter={() => this.setState({ tooltip: 3 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}/>
          </Popover>
        </a>
      </div>
    );
  }
}

export default connect()(LeftNav)
