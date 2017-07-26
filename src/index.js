import "rc-switch/assets/index.css"
import "./components/App/reset.scss"
import "./components/App/style.scss"
import "./components/TweetSidebar/tweetSidebar.scss"
import "./components/Legend/legend.scss"
import "./components/TopOverlay/topOverlay.scss"
import "./components/Nav/nav.scss"
import "./components/Nav/popover.scss"
import "./components/ShareModal/shareModal.scss"

import {applyMiddleware, createStore} from "redux"
import App from "./components/App/App"
import {Provider} from "react-redux"
import React from "react"
import ReactDOM from "react-dom"
import reducer from "./components/App/rootReducer"
import thunk from "redux-thunk"

// needed for mapbox
require("script-loader!mapbox-gl/dist/mapbox-gl.js")
require("script-loader!mapbox-gl/dist/mapboxgl-overrides.js")
require("mapbox-gl/dist/mapbox-gl.css")

require("@mapd/mapdc/mapdc.css")
require("@mapd/mapdc/scss/chart.scss")

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
