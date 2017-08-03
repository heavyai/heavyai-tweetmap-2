import "./styles.scss"
import BottomOverlay from "./BottomOverlay/BottomOverlay"
import {closeNav} from "../Nav/actions"
import {closeSidebar} from "../TweetSidebar/actions"
import {connect} from "react-redux"
import Legend from "../Legend/Legend"
import MapChart from "./MapChart/MapChart"
import PropTypes from "prop-types"
import React from "react"
import TopOverlay from "../TopOverlay/TopOverlay"

const MapBody = (props) => {
  const closeAll = () => {
    props.closeNav()
    props.closeSidebar()
  }

  return (
    <main className={props.sidebarOpen ? "shifted" : null} >
      <TopOverlay />

      <map onClick={closeAll}>
        <container>
          <MapChart />
          <BottomOverlay />
        </container>
      </map>

      <Legend onClick={closeAll} />
    </main>
  )
}

MapBody.propTypes = {
  closeNav: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  sidebarOpen: state.tweetSidebar.sidebarOpen
})

const mapDispatchToProps = (dispatch) => ({
  closeNav: () => { dispatch(closeNav) },
  closeSidebar: () => { dispatch(closeSidebar) }
})

export default connect(mapStateToProps, mapDispatchToProps)(MapBody)
