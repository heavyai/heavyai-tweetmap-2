import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { query } from '../services/connector'

import Tweet from '../components/Tweet'

const blankImg = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'

class TweetResults extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      showing: 0,
      total: 0
    }
  }

  render() {
    return (
      <div className="tweetResults">
        <div className="tweetTitle">
          <h3>Tweets</h3>
        </div>
        <ul>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah "/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
        </ul>
        <div className="tweetFooter">
          <p>Showing {this.state.showing} of {this.state.total}</p>
        </div>
      </div>
    );
  }
}

export default connect()(TweetResults)
