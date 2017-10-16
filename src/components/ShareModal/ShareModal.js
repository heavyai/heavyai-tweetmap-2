import "rc-switch/assets/index.css"
import "./styles.scss"
import {getShareUrl, toggleMode} from "./actions"
import {connect} from "react-redux"
import Octicon from "react-octicon"
import PropTypes from "prop-types"
import React from "react"
import Switch from "rc-switch"

const baseUrl = window.location.origin + window.location.pathname

export class ShareModal extends React.Component {
  static propTypes = {
    applyFilters: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    toggleMode: PropTypes.func.isRequired,
    viewUrl: PropTypes.string.isRequired
  }

  constructor () {
    super()
    this.copyLink = this.copyLink.bind(this)
  }

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
    const url = this.props.applyFilters ? this.props.viewUrl : baseUrl

    const fbShare = `https://www.facebook.com/share.php?u=${url}`
    const twitterShare = `https://twitter.com/intent/tweet?text=Explore%20millions%20of%20tweets%20with%20MapD%27s%20GPU-powered%20interactive%20Tweetmap%20${
      url}%20@mapd`

    return (
      <div>
        <h1>Share</h1>
        <div className="switch">
          <p>Share with current filters:</p>
          <Switch
            checked={this.props.applyFilters}
            onChange={this.props.toggleMode}
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
          <button onClick={this.copyLink}>
            <Octicon name="clippy" />
          </button>
        </div>

        <div className="socialBar">
          <a href={fbShare} target="_blank">
            <img className="icon" src="assets/facebook_icon.svg" />
          </a>
          <a href={twitterShare} target="_blank">
            <img className="icon" src="assets/twitter_icon.svg" />
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.shareModal
const mapDispatchToProps = dispatch => ({
  toggleMode: () => { dispatch(toggleMode) },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal)
