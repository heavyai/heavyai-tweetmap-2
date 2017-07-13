import React from "react"
import ReactDOM from "react-dom"
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import reducer from "./reducers"
import App from "./containers/App"

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
