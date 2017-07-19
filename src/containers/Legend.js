import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import LegendItem from "../components/LegendItem"
import {COLOR_MAP, langCodes} from "../constants"
import {selectFilter} from "../thunks/legendFilter"

const langItemType = PropTypes.shape({
  lang: PropTypes.string,
  count: PropTypes.number
})

class Legend extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    langCounts: PropTypes.arrayOf(langItemType).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  handleClick (lang) {
    this.props.dispatch(selectFilter(lang))
  }

  render () {
    const noneSelected = this.props.selected.length === 0
    const items = this.props.langCounts.map(({lang, count}) =>
      <li
        className="notTitle"
        key={lang}
        onClick={() => {
          this.handleClick(lang)
        }}
      >
        <LegendItem
          active={noneSelected || this.props.selected.includes(lang)}
          color={COLOR_MAP[lang]}
          sub={String(count)}
          title={langCodes[lang].name}
        />
      </li>
    )

    return (
      <div id="legend">
        <ul>
          {/* first list item is title */}
          <li style={{marginLeft: "0.8em"}}>
            <LegendItem
              active
              justTitle
              sub=""
              title="Languages"
            />
          </li>

          {items}
          <div id="legendDummy" />
        </ul>
        <div id="fade" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {langCounts, selectedLangs} = state.filters
  return {
    selected: selectedLangs,
    langCounts
  }
}

export default connect(mapStateToProps)(Legend)
