import {PERCENTAGE_MAX} from "../constants"
import PropTypes from "prop-types"
import React from "react"

const getPercent = (number) => `${String(PERCENTAGE_MAX * number)}%`

const Hashtag = props =>
  <div className="tweetItem" style={{flexDirection: "column"}}>
    <p>
      <span className="bold">{props.title}</span> · <span className="grey">{props.count}</span>
    </p>
    <div className="bar" style={{width: getPercent(props.barLength)}} />
  </div>

Hashtag.propTypes = {
  barLength: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default Hashtag
