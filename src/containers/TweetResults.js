import {addFilters} from "../thunks/search"
import {connect} from "react-redux"
import Hashtag from "../components/Hashtag"
import {HASHTAG_EXCLUDE} from "../constants"
import InfiniteScroll from "redux-infinite-scroll"
import {loadMoreTweets} from "../thunks/tweets"
import PropTypes from "prop-types"
import QueryDisplay from "./QueryDisplay.js"
import React from "react"
import {setTweetBar} from "../actions"
import Tweet from "../components/Tweet"


const blankImg = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const tweetType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  body: PropTypes.string
})

class TweetResults extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    hashtags: PropTypes.array,
    totalTweets: PropTypes.number.isRequired,
    tweetBarMode: PropTypes.string,
    tweets: PropTypes.arrayOf(tweetType).isRequired
  };

  loadTweets () {
    this.props.dispatch(loadMoreTweets())
  }

  renderMessages () {
    if (this.props.tweetBarMode === "hashtag") {
      const max = this.props.hashtags[0] ? this.props.hashtags[0].count : 1

      return this.props.hashtags
        .filter(({hashtag}) => !HASHTAG_EXCLUDE.includes(hashtag))
        .map(({hashtag, count}) =>
          <li key={hashtag} onClick={() => {
            this.props.dispatch(addFilters(hashtag))
            this.props.dispatch(setTweetBar("tweet"))
          }}
          >
            <Hashtag
              barLength={count / max}
              count={count}
              title={hashtag}
            />
          </li>
        )
    } else {
      return this.props.tweets.map(({id, name, date, body}) =>
        <li key={id}>
          <Tweet
            body={body}
            date={`${month[date.getMonth()]} ${String(date.getDate())}`}
            handle={`@${name}`}
            imgLink={blankImg}
          />
        </li>
      )
    }
  }

  render () {
    const totalTweets = this.props.totalTweets
    const listTweets = this.props.tweets.length
    const isHashtag = this.props.tweetBarMode === "hashtag"

    const tweetBarMode = (mode) => () => this.props.dispatch(setTweetBar(mode))

    return (
      <div className="tweetResults" id="tweetResults" onClick={() => this.props.closeNav()}>
        <div className="tweetTitle">
          <div className="buttonGroup">
            <button
              className={isHashtag ? "well" : null}
              onClick={tweetBarMode("hashtag")}
            >
              Hashtags
            </button>

            <button
              className={isHashtag ? null : "well"}
              onClick={tweetBarMode("tweet")}
            >
              Tweets
            </button>
          </div>
        </div>

        <QueryDisplay />

        <InfiniteScroll
          children={this.renderMessages()}
          hasMore={(!isHashtag) && listTweets < totalTweets}
          holderType="ul"
          loadMore={this.loadTweets.bind(this)}
        />

        <div className="tweetFooter" style={{display: isHashtag ? "none" : "inline"}}>
          <p>
            Showing {this.props.tweets.length} of{" "}
            <span className="tweetCount" />
          </p>
        </div>
        <div id="tweetDummy" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {tweets, totalTweets, hashtags, tweetBarMode} = state
  return {
    tweets,
    totalTweets,
    hashtags,
    tweetBarMode
  }
}

export default connect(mapStateToProps)(TweetResults)
