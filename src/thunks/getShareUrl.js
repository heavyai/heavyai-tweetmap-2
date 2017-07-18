import {setViewUrl} from "../actions"

const _ = require("lodash")

export function getShareUrl () {
  return (dispatch, getState) => {
    const state = getState()
    const shareState = _.pick(state, [
      "mapCenter",
      "mapZoom",
      "timeBounds",
      "queryTerms",
      "selectedLangs"
    ])

    const stateString = JSON.stringify(shareState)
    const baseUrl = window.location.origin + window.location.pathname
    const fullViewUrl = `${baseUrl}#${btoa(stateString)}`

    const data = new FormData()
    data.append("data", fullViewUrl)

    /* mapd api for shortening mapd urls */
    fetch("http://external-apis.mapd.com/shorten", {
      method: "POST",
      body: data
    })
      .then(res => {
        if (res.status !== 200) {
          /* if failed use unshorted url */
          return Promise.resolve(fullViewUrl)
        }

        return res.text()
      })
      .then(text => {
        dispatch(setViewUrl(text))
      },
      err => {
        console.error(err)
      }
      )
  }
}
