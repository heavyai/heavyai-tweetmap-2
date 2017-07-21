import {connect} from "react-redux"
import {getShareUrl} from "../thunks/getShareUrl"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import React from "react"
import Switch from "rc-switch"
import {toggleCurrent} from "../actions"

const baseUrl = window.location.origin + window.location.pathname

class ShareMenu extends React.Component {
  static propTypes = {
    currentView: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    toggleCurrent: PropTypes.func.isRequired,
    viewUrl: PropTypes.string.isRequired
  };

  componentWillMount () {
    this.props.dispatch(getShareUrl())
  }

  handleFocus (event) {
    event.target.select()
  }

  copyLink () {
    this.textInput.focus()
    document.execCommand("copy")
  }

  render () {
    const url = this.props.currentView ? this.props.viewUrl : baseUrl

    const fbShare = `https://www.facebook.com/share.php?u=${url}`
    const twitterShare = `https://twitter.com/intent/tweet?text=Explore%20millions%20of%20tweets%20with%20MapD%27s%20GPU-powered%20interactive%20Tweetmap%20${
      url}%20@mapd`

    return (
      <div>
        <h1>Share</h1>
        <div className="switch">
          <p>Share with current filters:</p>
          <Switch
            checked={this.props.currentView}
            onChange={this.props.toggleCurrent}
          />
        </div>

        <div className="textBar">
          <input
            onFocus={this.handleFocus}
            readOnly
            ref={input => { this.textInput = input }}
            type="text"
            value={url}
          />
          <button onClick={() => this.copyLink()}>
            <Octicon name="clippy" />
          </button>
        </div>

        <div className="socialBar">
          <a href={fbShare} target="_blank">
            <img className="icon" src="src/assets/facebook_icon.svg" />
          </a>
          <a href={twitterShare} target="_blank">
            <img className="icon" src="src/assets/twitter_icon.svg" />
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.shareMenu
const mapDispatchToProps = dispatch => ({
  toggleCurrent: () => { dispatch(toggleCurrent) },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareMenu)
