import "./styles.scss"
import {changeDimension, selectFilter} from "./actions"
import {LANG_COLOR_MAP, langCodes, SOURCE_COLOR_MAP} from "../../constants"
import {connect} from "react-redux"
import LegendItem from "./LegendItem/LegendItem"
import PropTypes from "prop-types"
import React from "react"

const langItemType = PropTypes.shape({
  lang: PropTypes.string,
  count: PropTypes.number
})

class Legend extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    legendCounts: PropTypes.arrayOf(langItemType).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  constructor () {
    super()
    this.state = {value: "lang"}
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick (title) {
    this.props.dispatch(selectFilter(title))
  }

  handleChange (event) {
    const value = event.target.value
    this.setState({value})
    this.props.dispatch(changeDimension(value))
  }

  render () {
    const noneSelected = this.props.selected.length === 0
    const colorMap = this.state.value === "lang" ?
      LANG_COLOR_MAP :
      SOURCE_COLOR_MAP

    const titleize = this.state.value === "lang" ?
      lang => langCodes[lang].name :
      source => (source === "ios" ?
        "iOS" :
        source.charAt(0).toUpperCase() + source.slice(1))

    const items = this.props.legendCounts.map(({title, count}) =>
      <li
        className="pointer"
        key={title}
        onClick={() => { this.handleClick(title) }}
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
            <select onChange={this.handleChange} value={this.state.value}>
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

const mapStateToProps = state => {
  const {legendCounts, selected} = state.legend
  return {
    selected,
    legendCounts
  }
}

export default connect(mapStateToProps)(Legend)
