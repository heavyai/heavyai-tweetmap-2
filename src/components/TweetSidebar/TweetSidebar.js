import "./styles.scss"
import {closeNav, closeSearch} from "../Nav/actions"
import {HASHTAG_EXCLUDE, LANG_COLOR_MAP, MONTH, SOURCE_COLOR_MAP} from "../../constants"
import {hideHighlight, showHighlight} from "../MapBody/actions"
import {loadMoreTweets, setSidebarMode} from "./actions"
import {addFilters} from "../TopOverlay/actions"
import {connect} from "react-redux"
import Hashtag from "./Hashtag/Hashtag"
import InfiniteScroll from "redux-infinite-scroll"
import PropTypes from "prop-types"
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
  body: PropTypes.string,
  highlight: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
    color: PropTypes.string
  })
})

const format = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

class TweetSidebar extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func.isRequired,
    filterHashtag: PropTypes.func.isRequired,
    hashtags: PropTypes.arrayOf(hashtagType).isRequired,
    hideHighlight: PropTypes.func.isRequired,
    legendMode: PropTypes.string,
    loadMore: PropTypes.func.isRequired,
    showHighlight: PropTypes.func.isRequired,
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
            onClick={this.props.filterHashtag(hashtag)}
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
      return this.props.tweets.map(({id, name, date, body, lon, lat, lang, origin}) => {
        const color = this.props.legendMode === "lang" ?
          LANG_COLOR_MAP[lang] :
          SOURCE_COLOR_MAP[origin]
        return (
          <li
            key={id}
            onMouseEnter={this.props.showHighlight(lon, lat, color)}
            onMouseLeave={this.props.hideHighlight}
          >
            <Tweet
              body={body}
              date={`${MONTH[date.getMonth()]} ${String(date.getDate())}`}
              handle={`@${name}`}
              imgLink={`https://avatars.io/twitter/${name}`}
            />
          </li>)
      })
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
  {tweetCount: state.mapBody.tweetCount, legendMode: state.legend.mode},
  state.tweetSidebar
)

const mapDispatchToProps = (dispatch) => ({
  closeNav: () => {
    dispatch(closeNav)
    dispatch(closeSearch)
  },
  filterHashtag: (hashtag) => () => {
    dispatch(addFilters(hashtag))
    dispatch(setSidebarMode("tweet"))
  },
  loadMore: () => { dispatch(loadMoreTweets()) },
  toggleTweetBar: (mode) => () => { dispatch(setSidebarMode(mode)) },
  showHighlight: (lon, lat, color) => () => { dispatch(showHighlight(lon, lat, color)) },
  hideHighlight: () => { dispatch(hideHighlight) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TweetSidebar)
