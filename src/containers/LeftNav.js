import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import SearchPopover from './SearchPopover';

import { zoomOut } from '../thunks/map';
import NavItem from '../components/NavItem';

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
      shareModal: false
    };
  }

  render() {
    const searchPopover = <SearchPopover closeNav={this.props.closeNav} />;

    return (
      <div id="sideNav" className="nav">
        <MediaQuery query='(max-width: 992px)'>
          <a id="close" onClick={this.props.closeNav}>
            &times;
          </a>
        </MediaQuery>

        <NavItem
          className={this.props.search ? 'searchPopover' : null}
          icon="location"
          description='Search Location'
          body={this.props.search ? searchPopover : null}
          clicked={() => {
            this.props.toggle();
          }}
        />

        <NavItem
          icon="globe"
          description="Zoom Out"
          clicked={() => {
            this.props.dispatch(zoomOut());
            this.props.closeNav();
          }}
        />

        <NavItem
          icon="mark-github"
          description="See Repo"
          url="https://github.com/mapd/new-tweetmap"
        />

        <NavItem icon="info" description="About" url="https://www.mapd.com" />

        <NavItem
          icon="link"
          description="Share"
          clicked={() => {
            this.props.openShare();
            this.props.closeNav();
          }}
        />
      </div>
    );
  }
}

export default connect()(LeftNav);
