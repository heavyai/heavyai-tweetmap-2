import React from 'react';
import PropTypes from 'prop-types';

const getPercent = (number) => String(100 * number) + '%'

const Hashtag = props =>
  <div className="tweetItem" style={{flexDirection: 'column'}}>
    <p>
      <span className="bold">{props.title}</span> · <span className="grey">{props.count}</span>
    </p>
    <div
      className="bar"
      style={{width: getPercent(props.barLength)}}
    />
  </div>;

Hashtag.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  barLength: PropTypes.number.isRequired
};

export default Hashtag;
