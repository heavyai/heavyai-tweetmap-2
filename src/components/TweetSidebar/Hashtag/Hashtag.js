import {PERCENTAGE_MAX} from "../../../constants"
import PropTypes from "prop-types"
import React from "react"

const getPercent = (number) => `${String(PERCENTAGE_MAX * number)}%`

const Hashtag = props =>
  <div className="tweetItem hashtag">
    <div className="title">
      <p className="bold">{props.title}</p>
      <p className="greyText">{`· ${props.count}`}</p>
    </div>
    <div className="bar" style={{width: getPercent(props.barLength)}} />
  </div>

Hashtag.propTypes = {
  barLength: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default Hashtag
