import React from 'react';
import PropTypes from 'prop-types';

import Popover from 'react-popover';
import Octicon from 'react-octicon';
import MediaQuery from 'react-responsive';

class NavItem extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    clicked: PropTypes.func,
    url: PropTypes.string,
    className: PropTypes.string,
    body: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      popover: false
    }
  }

  render() {
    return(
      <a
        href={this.props.url}
        target="_blank"
        onMouseEnter={window.innerWidth > 992 ? () => this.setState({popover: true}) : null}
        onMouseLeave={() => this.setState({popover: false})}
        onClick={() => {
          this.setState({popover: true})
          this.props.clicked()
        }}
      >
        <Popover
          className={this.props.className}
          isOpen={this.state.popover}
          place="right"
          body={this.props.body || this.props.description}>
          <p>
            <Octicon name={this.props.icon} mega />
            {window.innerWidth < 992 ? this.props.description: null}
          </p>
        </Popover>
      </a>
    );
  }
}

export default NavItem;
