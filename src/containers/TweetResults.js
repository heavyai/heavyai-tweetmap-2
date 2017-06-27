import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import InfiniteScroll from 'redux-infinite-scroll';

import QueryDisplay from './QueryDisplay.js'
import Tweet from '../components/Tweet'
import { loadMoreTweets } from '../thunks/tweets'

const blankImg = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
const month = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class TweetResults extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func,
    tweets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  loadTweets() {
    this.props.dispatch(loadMoreTweets())
  }

  renderMessages() {
    return this.props.tweets.map(({id, name, date, body}) => (
      <li key={id}>
        <Tweet
          imgLink={blankImg}
          handle={"@" + name}
          date={month[date.getMonth()] + ' ' + String(date.getDate())}
          body={body}
        />
      </li>
    ))
  }

  render() {
    return (
      <div className="tweetResults" onClick={() => this.props.closeNav()}>
        <div className="tweetTitle">
          <h3>Tweets</h3>
        </div>

        <QueryDisplay/>

        <InfiniteScroll
          children={this.renderMessages()}
          loadMore={this.loadTweets.bind(this)}
          holderType="ul"
        />

        <div className="tweetFooter">
          <p>Showing {this.props.tweets.length} of <span className="tweetCount"></span></p>
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
