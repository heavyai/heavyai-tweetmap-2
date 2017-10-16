import "./reset.scss"
import * as dc from "@mapd/mapdc"
import {applyMiddleware, createStore} from "redux"
import {connect, getConnection} from "./services/connector"
import {createCf, getCf} from "./services/crossfilter"
import App from "./components/App/App"
import {createLogger} from "redux-logger"
import {Provider} from "react-redux"
import React from "react"
import ReactDOM from "react-dom"
import reducer from "./rootReducer"
import thunk from "redux-thunk"

// needed for mapbox
require("script-loader!mapbox-gl/dist/mapbox-gl.js")
require("script-loader!mapbox-gl/dist/mapboxgl-overrides.js")
require("mapbox-gl/dist/mapbox-gl.css")

require("@mapd/mapdc/mapdc.css")
require("@mapd/mapdc/scss/chart.scss")

const api = {
  dc,
  connect,
  createCf,
  getCf,
  getConnection
}

const conditionalMiddleware = process.env.NODE_ENV === "production" ? [] : [applyMiddleware(createLogger({collapsed: true}))]

const store = createStore(
  reducer,
  ...conditionalMiddleware,
  applyMiddleware(thunk.withExtraArgument(api)),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
