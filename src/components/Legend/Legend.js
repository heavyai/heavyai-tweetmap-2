import "./styles.scss"
import {changeDimension as changeLegendDim, selectFilter, updateMode} from "./actions"
import {LANG_COLOR_MAP, langCodes, SOURCE_COLOR_MAP} from "../../constants"
import {changeDimension as changeMapDim} from "../MapBody/actions"
import {connect} from "react-redux"
import LegendItem from "./LegendItem/LegendItem"
import PropTypes from "prop-types"
import React from "react"

const legendCountType = PropTypes.shape({
  title: PropTypes.string,
  count: PropTypes.number
})

class Legend extends React.Component {
  static propTypes = {
    legendCounts: PropTypes.arrayOf(legendCountType).isRequired,
    mode: PropTypes.string.isRequired,
    modeUpdate: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectFilter: PropTypes.func.isRequired
  }

  render () {
    const noneSelected = this.props.selected.length === 0
    const colorMap = this.props.mode === "lang" ?
      LANG_COLOR_MAP :
      SOURCE_COLOR_MAP

    const titleize = this.props.mode === "lang" ?
      lang => langCodes[lang].name :
      source => (source === "ios" ?
        "iOS" :
        source.charAt(0).toUpperCase() + source.slice(1))

    const items = this.props.legendCounts.map(({title, count}) =>
      <li
        className="pointer"
        key={title}
        onClick={this.props.selectFilter(title)}
      >
        <LegendItem
          active={noneSelected || this.props.selected.includes(title)}
          color={colorMap[title]}
          sub={String(count)}
          title={titleize(title)}
        />
      </li>
    )

    return (
      <div className="legend">
        <ul>
          {/* title */}
          <li className="title">
            <select onChange={this.props.modeUpdate} value={this.props.mode}>
              <option value="origin">Device</option>
              <option value="lang">Language</option>
            </select>
          </li>

          {items}
          <div id="legendDummy" />
        </ul>
        <div className="fade" />
      </div>
    )
  }
}

const mapStateToProps = state => state.legend
const mapDispatchToProps = dispatch => ({
  modeUpdate: event => {
    const value = event.target.value
    dispatch(updateMode(value))
    dispatch(changeLegendDim(value))
    dispatch(changeMapDim(value))
  },
  selectFilter: title => () => dispatch(selectFilter(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(Legend)
