import "./styles.scss"
import {closeNav, closeSearch} from "../Nav/actions"
import BottomOverlay from "./BottomOverlay/BottomOverlay"
import {closeSidebar} from "../TweetSidebar/actions"
import {connect} from "react-redux"
import Legend from "../Legend/Legend"
import MapChart from "./MapChart/MapChart"
import PropTypes from "prop-types"
import React from "react"
import TopOverlay from "../TopOverlay/TopOverlay"

const MapBody = (props) => (
  <main className={props.sidebarOpen ? "shifted" : null} >
    <TopOverlay />

    <map onClick={props.closeAll}>
      <container className={props.chartType}>
        <MapChart />
        <BottomOverlay />
        {props.highlight &&
        <div
          className="popupHighlight"
          style={{
            backgroundColor: props.highlight.color,
            top: props.highlight.y,
            left: props.highlight.x
          }}
        />}
      </container>
    </map>

    <Legend />
  </main>
)

MapBody.propTypes = {
  closeAll: PropTypes.func.isRequired,
  highlight: PropTypes.shape({
    color: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string
  }),
  sidebarOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  sidebarOpen: state.tweetSidebar.sidebarOpen,
  highlight: state.mapBody.highlight,
  chartType: state.mapBody.chartType
})

const mapDispatchToProps = (dispatch) => ({
  closeAll: () => {
    dispatch(closeNav)
    dispatch(closeSearch)
    dispatch(closeSidebar)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MapBody)
