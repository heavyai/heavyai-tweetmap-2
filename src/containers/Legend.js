import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LegendItem from '../components/LegendItem'
import { LANG_DOMAIN, LANG_COLORS } from '../constants';

const zip = rows => rows[0].map((_,c) => rows.map(row => row[c]))

class Legend extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const zipped = zip([LANG_DOMAIN, LANG_COLORS])
    const items = zipped.map(([lang, color]) => (
      <li><LegendItem color={color} title={lang} sub="500"/></li>
    ))

    return (
      <ul>
        <li><LegendItem color="white" title="Languages" sub=""/></li>
        {items}
      </ul>
    );
  }
}

export default connect()(Legend)
