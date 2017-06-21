import React from 'react'
import PropTypes from 'prop-types'

const Tweet = (props) => (
  <div className="tweetItem">
    <img className="tweetImage" src={props.imgLink} />
    <div className="tweetBlock">
      <p style={{color: 'grey'}}>{props.handle} · {props.date}</p>
      <p>{props.body}</p>
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
