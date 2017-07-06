import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popover from 'react-popover';
import Octicon from 'react-octicon';

import SearchPopover from './SearchPopover';

import { zoomOut } from '../thunks/map';

class LeftNav extends React.Component {
  static propTypes = {
    search: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    closeNav: PropTypes.func.isRequired,
    openShare: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      tooltip: 0,
      shareModal: false
    };
  }

  render() {
    const searchPopover = <SearchPopover closeNav={this.props.closeNav} />;

    return (
      <div id="sideNav" className="nav">
        <a>
          <Popover
            className={this.props.search ? 'searchPopover' : null}
            isOpen={this.state.tooltip === 1 || this.props.search}
            place="right"
            body={this.props.search ? searchPopover : 'search location'}>
            <Octicon
              name="location"
              mega
              onMouseEnter={() => this.setState({ tooltip: 1 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}
              onClick={() => {
                this.props.toggle();
                this.setState({ tooltip: 0 });
              }}
            />
          </Popover>
        </a>

        <a>
          <Popover
            isOpen={this.state.tooltip === 2}
            place="right"
            body="zoom out">
            <Octicon
              name="globe"
              mega
              onMouseEnter={() => this.setState({ tooltip: 2 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}
              onClick={() => {
                this.props.dispatch(zoomOut());
                this.props.closeNav();
              }}
            />
          </Popover>
        </a>

        <a href="https://github.com/mapd/new-tweetmap" target="_blank">
          <Popover
            isOpen={this.state.tooltip === 3}
            place="right"
            body="see repo">
            <Octicon
              name="mark-github"
              mega
              onMouseEnter={() => this.setState({ tooltip: 3 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}
            />
          </Popover>
        </a>

        <a href="https://www.mapd.com" target="_blank">
          <Popover isOpen={this.state.tooltip === 4} place="right" body="about">
            <Octicon
              name="info"
              mega
              onMouseEnter={() => this.setState({ tooltip: 4 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}
            />
          </Popover>
        </a>

        <a>
          <Popover isOpen={this.state.tooltip === 5} place="right" body="share">
            <Octicon
              name="link"
              mega
              onMouseEnter={() => this.setState({ tooltip: 5 })}
              onMouseLeave={() => this.setState({ tooltip: 0 })}
              onClick={() => {
                this.props.openShare();
                this.props.closeNav();
              }}
            />
          </Popover>
        </a>
      </div>
    );
  }
}

export default connect()(LeftNav);
