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
      share: true,
      baseUrl: window.location.origin + window.location.pathname,
      viewUrl: ''
    }
  }

  componentWillMount() {
    const stateString = JSON.stringify(this.props.state)

    const fullViewUrl = window.location.origin + window.location.pathname + "#" + btoa(stateString);
    const url = new FormData();
    url.append( 'url', fullViewUrl);

    fetch('http://external-apis.mapd.com/shorten', {
      method: 'POST',
      body: url
    }).then(res => {
      if (res.status !== 200) {
        return Promise.resolve(fullViewUrl)
      }
      
      return res.text()
    }).then(text => {
      this.setState({viewUrl: text})
    }, err => {
      console.error(err)
    })
  }

  handleFocus(event) {
    event.target.select()
  }

  copyLink() {
    this.textInput.focus()
    document.execCommand('copy')
  }

  render() {
    const url = this.state.share ? this.state.viewUrl : this.state.baseUrl

    return (
      <div>
        <h1>Share</h1>
        <div className="switch">
          <p>Share with current filters:</p>
          <Switch
            onChange={() => {this.setState({share: !this.state.share})}}
            checked={this.state.share}
          />
        </div>

        <div className="textBar">
          <input
            type="text"
            value={url}
            ref={input => this.textInput = input}
            onFocus={this.handleFocus}
            readOnly
          />
          <button onClick={() => this.copyLink()}><Octicon name="clippy"/></button>
        </div>

        <div className="socialBar">
          <a href={'https://www.facebook.com/share.php?u=' + url} target="_blank">
            <img className="icon" src="src/assets/facebook_icon.svg" />
          </a>
          <a href={'https://twitter.com/intent/tweet?text=Explore%20millions%20of%20tweets%20with%20MapD%27s%20GPU-powered%20interactive%20Tweetmap%20' + url + '%20@mapd'} target="_blank">
            <img className="icon" src="src/assets/twitter_icon.svg" />
          </a>
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
