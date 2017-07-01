import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Switch from 'rc-switch';
import Octicon from 'react-octicon'

class ShareMenu extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      share: true
    }
    this.shareLink = "https://mapd.com"
  }

  handleFocus(event) {
    event.target.select()
  }

  copyLink() {
    this.textInput.focus()
    document.execCommand('copy')
  }

  render() {
    return (
      <div>
        <h1>Share</h1>
        <div className="switch">
          <p>Share current view:</p>
          <Switch
            onChange={() => {this.setState({share: !this.state.share})}}
            checked={this.state.share}
          />
        </div>

        <div className="textBar">
          <input
            type="text"
            value={this.state.share ? this.shareLink : "https://mapd.com/demos/tweetmap/"}
            ref={input => this.textInput = input}
            onFocus={this.handleFocus}
            readOnly
          />
          <button onClick={() => this.copyLink()}><Octicon name="clippy"/></button>
        </div>
      </div>
    );
  }
}

export default connect()(ShareMenu)
