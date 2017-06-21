import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';

import LegendItem from '../components/LegendItem'
import { COLOR_MAP, COLORS, TABLE_NAME } from '../constants';
import langCodes from '../services/langCodes'
import { query } from '../services/connector'

class Legend extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {langItems: [], selected: []}
    this._chart = null
    this.langDim = null
  }

  componentDidUpdate() {
    if (!this.props.isConnected || this._chart != null) { return }

    const crossfilter = getCf()
    const langDim = this.langDim = crossfilter.dimension('lang')
    const group = langDim.group();

    //  _chart lives in the chart registry, triggering redraws through dataAsync()
    this._chart = dc.baseMixin({})
    this._chart.dimension(langDim)
    this._chart.group(group)
    // dummy DOM elem should take no space
    this._chart.minWidth(0)
    this._chart.minHeight(0)
    // rendering is instead done by React
    this._chart._doRender = this._chart._doRedraw = () => {}
    this._chart.setDataAsync((group, callback) => {
      const numColors = COLORS.length

      group.reduceCount('*').topAsync(numColors).then(results => {
        // rename keys
        const langItems = results.map(obj => ({lang: obj.key0, count: obj.val}))

        if (JSON.stringify(this.state.langItems) !== JSON.stringify(langItems)) {
          this.setState({langItems: langItems})
        }
        callback()
      }, error => {
        console.error(error)
        callback()
      })
    })

    this._chart.anchor('#dummy')
  }

  handleClick(lang) {
    let selected
    if (this.state.selected.includes(lang)) {
      selected = this.state.selected.filter(item => item !== lang)
    }
    else {
      selected = [...this.state.selected, lang]
    }
    this.setState({selected: selected})

    if (selected.length == 0) {
      this.langDim.filterAll()
    }
    else {
      this.langDim.filterMulti(selected)
    }

    dc.redrawAllAsync()
  }

  render() {
    const noneSelected = this.state.selected.length === 0
    const items = this.state.langItems.map(({lang, count}) => (
      <li key={lang} className="notTitle" onClick={ () => { this.handleClick(lang) } }>
        <LegendItem color={COLOR_MAP[lang]}
          title={langCodes[lang].name}
          sub={String(count)}
          active={noneSelected || this.state.selected.includes(lang)}/>
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
  const { isConnected, ...rest } = state
  return {isConnected}
}

export default connect(mapStateToProps)(Legend)
