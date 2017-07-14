import {applyMiddleware, createStore} from "redux"
import App from "./containers/App"
import {Provider} from "react-redux"
import React from "react"
import ReactDOM from "react-dom"
import reducer from "./reducers"
import thunk from "redux-thunk"

// needed for mapbox
require("script-loader!mapbox-gl/dist/mapbox-gl.js")
require("script-loader!mapbox-gl/dist/mapboxgl-overrides.js")

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
