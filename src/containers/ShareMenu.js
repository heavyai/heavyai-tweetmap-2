import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Switch from 'rc-switch';
import Octicon from 'react-octicon'

class ShareMenu extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      share: true
    }

    this.baseUrl = window.location.origin + window.location.pathname
  }

  componentWillMount() {
    const stateString = JSON.stringify(this.props.state)
    console.log(stateString)
    this.viewUrl = window.location.origin + window.location.pathname + "#" + btoa(stateString);
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
            value={this.state.share ? this.viewUrl : this.baseUrl}
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

const mapStateToProps = state => {
  const { mapCenter, mapZoom, timeBounds, queryTerms, selectedLangs } = state
  return {
    state: { mapCenter, mapZoom, timeBounds, queryTerms, selectedLangs }
  }
}

export default connect(mapStateToProps)(ShareMenu)
