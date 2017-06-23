import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as dc from '@mapd/mapdc';

import LegendItem from '../components/LegendItem'
import { COLOR_MAP } from '../constants';
import langCodes from '../services/langCodes'
import { filterSelected } from '../thunks/legendFilter'

class Legend extends React.Component {
  static propTypes = {
    langCounts: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleClick(lang) {
    let selected
    if (this.props.selected.includes(lang)) {
      selected = this.props.selected.filter(item => item !== lang)
    }
    else {
      selected = [...this.props.selected, lang]
    }

    this.props.dispatch(filterSelected(selected))
  }

  render() {
    const noneSelected = this.props.selected.length === 0
    const items = this.props.langCounts.map(({lang, count}) => (
      <li key={lang} className="notTitle" onClick={ () => { this.handleClick(lang) } }>
        <LegendItem color={COLOR_MAP[lang]}
          title={langCodes[lang].name}
          sub={String(count)}
          active={noneSelected || this.props.selected.includes(lang)}/>
      </li>
    ))

    return (
      <ul id="legend">
        <li><LegendItem justTitle={true} title="Languages" sub="" active={true}/></li>
        {items}
        <div id="dummy"></div>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const { langCounts, selectedLangs, ...rest } = state
  return {
    selected: selectedLangs,
    langCounts
  }
}

export default connect(mapStateToProps)(Legend)
