import "./styles.scss"
import {loadMoreTweets, setSidebarMode} from "./actions"
import {addFilters} from "../TopOverlay/actions"
import {closeNav} from "../Nav/actions"
import {connect} from "react-redux"
import Hashtag from "./Hashtag/Hashtag"
import {HASHTAG_EXCLUDE, MONTH} from "../../constants"
import InfiniteScroll from "redux-infinite-scroll"
import PropTypes from "prop-types"
import QueryDisplay from "./QueryDisplay/QueryDisplay.js"
import React from "react"
import Tweet from "./Tweet/Tweet"

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

class TweetSidebar extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func.isRequired,
    filterHashtag: PropTypes.func.isRequired,
    hashtags: PropTypes.arrayOf(hashtagType).isRequired,
    loadMore: PropTypes.func.isRequired,
    sidebarMode: PropTypes.string.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    toggleTweetBar: PropTypes.func.isRequired,
    tweetCount: PropTypes.number.isRequired,
    tweets: PropTypes.arrayOf(tweetType).isRequired
  }

  renderMessages () {
    if (this.props.sidebarMode === "hashtag") {
      // Render Top Hashtags
      const max = this.props.hashtags[0] && this.props.hashtags[0].count || 1

      return this.props.hashtags
        .filter(({hashtag}) => !HASHTAG_EXCLUDE.includes(hashtag))
        .map(({hashtag, count}) =>
          <li
            className="pointer"
            key={hashtag}
            onClick={() => {
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
            date={`${MONTH[date.getMonth()]} ${String(date.getDate())}`}
            handle={`@${name}`}
            imgLink={`https://avatars.io/twitter/${name}`}
          />
        </li>
      )
    }
  }

  render () {
    const tweetCount = this.props.tweetCount
    const listTweets = this.props.tweets.length
    const isHashtag = this.props.sidebarMode === "hashtag"

    return (
      <div
        className={this.props.sidebarOpen ? "tweetResults" : "tweetResults closed"}
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
          hasMore={(!isHashtag) && listTweets < tweetCount}
          holderType="ul"
          loadMore={this.props.loadMore}
        />

        {!isHashtag && (
          <div className="tweetFooter">
            <p>
              Showing {this.props.tweets.length} of {format(this.props.tweetCount)}
            </p>
          </div>
        )}
        <div id="tweetDummy" />
      </div>
    )
  }
}

const mapStateToProps = state => Object.assign(
  {tweetCount: state.mapBody.tweetCount},
  state.tweetSidebar
)

const mapDispatchToProps = (dispatch) => ({
  closeNav: () => { dispatch(closeNav) },
  filterHashtag: (hashtag) => { dispatch(addFilters(hashtag)) },
  loadMore: () => { dispatch(loadMoreTweets()) },
  toggleTweetBar: (mode) => () => { dispatch(setSidebarMode(mode)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TweetSidebar)
