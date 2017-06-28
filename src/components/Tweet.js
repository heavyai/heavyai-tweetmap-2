import React from 'react'
import PropTypes from 'prop-types'

const urlify = function(tweetText) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const handleRegex = /@\w+/g;
  const hashRegex = /#\w+/g;

  tweetText = tweetText.replace(urlRegex, function(url) {
    return '<a class="tweet-link" href="' + url + '" target="_blank">' + url + '</a>';
  })

  tweetText = tweetText.replace(handleRegex, function(handle){
    return '<a class="tweet-link" href="https://www.twitter.com/' + handle.substring(1) + '" target="_blank">' + handle + '</a>';
  })

  tweetText = tweetText.replace(hashRegex, function(hashtag){
    return '<a class="tweet-link" href="https://www.twitter.com/hashtag/' + hashtag.substring(1) + '" target="_blank">' + hashtag + '</a>';
  })

  return {__html: tweetText};
}

const Tweet = (props) => (
  <div className="tweetItem">
    <img className="tweetImage" src={props.imgLink} />
    <div className="tweetBlock">
      <p style={{color: 'grey'}}>{props.handle} · {props.date}</p>
      <p dangerouslySetInnerHTML={urlify(props.body)}></p>
    </div>
  </div>
)

Tweet.propTypes = {
  imgLink: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

export default Tweet
