import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tweet from '../components/Tweet'

const blankImg = 'https://www.betafy.co/assets/img/default_user.png'

class TweetResults extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="tweetResults">
        <div className="tweetTitle">
          <h2>Tweets</h2>
        </div>
        <ul>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
          <li><Tweet imgLink={blankImg} handle="@edwickable" date="June 17" body="blah blah blah"/></li>
        </ul>
        <div className="tweetFooter">
          <p>Showing 5 of 1,000,000,000</p>
        </div>
      </div>
    );
  }
}

export default connect()(TweetResults)
