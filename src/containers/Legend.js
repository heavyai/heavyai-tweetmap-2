import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LegendItem from '../components/LegendItem'
import { LANG_COLORS, TABLE_NAME } from '../constants';
import langCodes from '../services/langCodes'
import { query } from '../services/connector'

const zip = rows => rows[0].map((_,c) => rows.map(row => row[c]))

class Legend extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {langItems: [], selected: []}
  }

  handleClick(lang) {
    this.setState({selected: [...this.state.selected, lang]})
  }

  componentDidUpdate() {
    /* must wait until connection and crossfilter are set */
    if (this.props.isConnected) {
      const numColors = LANG_COLORS.length
      const statement = `SELECT lang, COUNT(*) AS "count" FROM ${TABLE_NAME} GROUP BY lang ORDER BY COUNT(*) DESC LIMIT ${numColors};`
      query(statement).then((results) => {
        if (JSON.stringify(this.state.langItems) !== JSON.stringify(results)) {
          this.setState({langItems: results})
        }
      }, (error) => {
        console.log('failed to query MapD server')
        console.log(error)
      })
    }
  }

  render() {
    const zipped = zip([this.state.langItems, LANG_COLORS])
    const items = zipped.map(([{lang, count}, color]) => (
      <li onClick={ () => { this.handleClick(lang) } }>
        <LegendItem color={color}
          title={langCodes[lang].name}
          sub={count}/>
      </li>
    ))

    return (
      <ul id="legend">
        <li><LegendItem color="white" title="Languages" sub=""/></li>
        {items}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const { isConnected, ...rest } = state
  return {isConnected}
}

export default connect(mapStateToProps)(Legend)
