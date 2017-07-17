import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getShareUrl } from  '../thunks/getShareUrl';

import Switch from 'rc-switch';
import Octicon from 'react-octicon';

const baseUrl = window.location.origin + window.location.pathname;

class ShareMenu extends React.Component {
  static propTypes = {
    viewUrl: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      share: true,
    };
  }

  componentWillMount() {
    this.props.dispatch(getShareUrl());
  }

  handleFocus(event) {
    event.target.select();
  }

  copyLink() {
    this.textInput.focus();
    document.execCommand('copy');
  }

  render() {
    const url = this.state.share ? this.props.viewUrl : baseUrl;

    return (
      <div>
        <h1>Share</h1>
        <div className="switch">
          <p>Share with current filters:</p>
          <Switch
            onChange={() => {
              this.setState({ share: !this.state.share });
            }}
            checked={this.state.share}
          />
        </div>

        <div className="textBar">
          <input
            type="text"
            value={url}
            ref={input => (this.textInput = input)}
            onFocus={this.handleFocus}
            readOnly
          />
          <button onClick={() => this.copyLink()}>
            <Octicon name="clippy" />
          </button>
        </div>

        <div className="socialBar">
          <a
            href={'https://www.facebook.com/share.php?u=' + url}
            target="_blank">
            <img className="icon" src="src/assets/facebook_icon.svg" />
          </a>
          <a
            href={
              'https://twitter.com/intent/tweet?text=Explore%20millions%20of%20tweets%20with%20MapD%27s%20GPU-powered%20interactive%20Tweetmap%20' +
              url +
              '%20@mapd'
            }
            target="_blank">
            <img className="icon" src="src/assets/twitter_icon.svg" />
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { viewUrl: state.viewUrl };
};

export default connect(mapStateToProps)(ShareMenu);
