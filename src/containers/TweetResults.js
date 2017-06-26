import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tweet from '../components/Tweet'

const blankImg = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
const month = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class TweetResults extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func,
    tweets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const tweets = this.props.tweets.map(({id, name, date, body}) => (
      <li key={id}>
        <Tweet
          imgLink={blankImg}
          handle={"@" + name}
          date={month[date.getMonth()] + ' ' + String(date.getDate())}
          body={body}
        />
      </li>
    ))

    return (
      <div className="tweetResults" onClick={() => this.props.closeNav()}>
        <div className="tweetTitle">
          <h3>Tweets</h3>
        </div>
        <ul>
          {tweets}
        </ul>
        <div className="tweetFooter">
          <p>Showing {this.props.tweets.length} of {this.props.tweets.length}</p>
        </div>
        <div id="tweetDummy"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { tweets, ...rest } = state
  return { tweets }
}

export default connect(mapStateToProps)(TweetResults)
