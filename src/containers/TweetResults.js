import {closeNav, setTweetBar} from "../actions"
import {addFilters} from "../thunks/search"
import {connect} from "react-redux"
import Hashtag from "../components/Hashtag"
import {HASHTAG_EXCLUDE} from "../constants"
import InfiniteScroll from "redux-infinite-scroll"
import {loadMoreTweets} from "../thunks/tweets"
import PropTypes from "prop-types"
import QueryDisplay from "./QueryDisplay.js"
import React from "react"
import Tweet from "../components/Tweet"

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

const hashtagType = PropTypes.shape({
  hashtag: PropTypes.string,
  count: PropTypes.number
})

const tweetType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  body: PropTypes.string
})

const format = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

class TweetResults extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func.isRequired,
    filterHashtag: PropTypes.func.isRequired,
    hashtags: PropTypes.arrayOf(hashtagType).isRequired,
    loadMore: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    toggleTweetBar: PropTypes.func.isRequired,
    totalTweets: PropTypes.number.isRequired,
    tweetBarMode: PropTypes.string.isRequired,
    tweets: PropTypes.arrayOf(tweetType).isRequired
  }

  renderMessages () {
    if (this.props.tweetBarMode === "hashtag") {
      // Render Top Hashtags
      const max = this.props.hashtags[0] && this.props.hashtags[0].count || 1

      return this.props.hashtags
        .filter(({hashtag}) => !HASHTAG_EXCLUDE.includes(hashtag))
        .map(({hashtag, count}) =>
          <li key={hashtag} onClick={() => {
            this.props.filterHashtag(hashtag)
            this.props.toggleTweetBar("tweet")()
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
      // Render Recent Tweets
      return this.props.tweets.map(({id, name, date, body}) =>
        <li key={id}>
          <Tweet
            body={body}
            date={`${month[date.getMonth()]} ${String(date.getDate())}`}
            handle={`@${name}`}
            imgLink={`https://twitter.com/${name}/profile_image?size=original`}
          />
        </li>
      )
    }
  }

  render () {
    const totalTweets = this.props.totalTweets
    const listTweets = this.props.tweets.length
    const isHashtag = this.props.tweetBarMode === "hashtag"

    return (
      <div
        className={"tweetResults" + (this.props.open ? "" : " closed")}
        onClick={this.props.closeNav}
      >
        <div className="tweetTitle">
          <div className="buttonGroup">
            <button
              className={isHashtag ? "well" : null}
              onClick={this.props.toggleTweetBar("hashtag")}
            >
              Hashtags
            </button>

            <button
              className={isHashtag ? null : "well"}
              onClick={this.props.toggleTweetBar("tweet")}
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
          loadMore={this.props.loadMore}
        />

        {!isHashtag &&
          <div className="tweetFooter">
            <p>
              Showing {this.props.tweets.length} of {format(this.props.totalTweets)}
            </p>
          </div>
        }
        <div id="tweetDummy" />
      </div>
    )
  }
}

const mapStateToProps = state => Object.assign(
  {open: state.navigation.tweetBar},
  state.tweetBar
)

const mapDispatchToProps = (dispatch) => ({
  closeNav: () => { dispatch(closeNav) },
  filterHashtag: (hashtag) => { dispatch(addFilters(hashtag)) },
  loadMore: () => { dispatch(loadMoreTweets()) },
  toggleTweetBar: (mode) => () => { dispatch(setTweetBar(mode)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TweetResults)
