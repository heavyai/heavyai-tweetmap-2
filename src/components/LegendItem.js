import React from 'react';
import PropTypes from 'prop-types';

const LegendItem = props =>
  <div className="legendItem">
    {!props.justTitle &&
      <div className="legendLabel" style={{ backgroundColor: props.color }} />}
    <div className="legendBlock">
      <p>
        {props.title}
      </p>
      <p style={{ color: 'grey' }}>
        {props.sub}
      </p>
    </div>

    {props.active ? null : <div className="greyed" />}
  </div>;

LegendItem.propTypes = {
  justTitle: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default LegendItem;
