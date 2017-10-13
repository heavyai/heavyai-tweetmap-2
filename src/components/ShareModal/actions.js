export const OPEN_SHARE = "OPEN_SHARE"
export const CLOSE_SHARE = "CLOSE_SHARE"
export const TOGGLE_SHARE_MODE = "TOGGLE_SHARE_MODE"
export const VIEW_URL_UPDATE = "VIEW_URL_UPDATE"

export const openShare = {type: OPEN_SHARE}
export const closeShare = {type: CLOSE_SHARE}
export const toggleMode = {type: TOGGLE_SHARE_MODE}
export function setViewUrl (url) {
  return {
    type: VIEW_URL_UPDATE,
    url
  }
}

export function getShareUrl () {
  return (dispatch, getState) => {
    const state = getState()
    const shareState = {
      mapCenter: state.mapBody.mapCenter,
      mapType: state.mapBody.chartType,
      mapZoom: state.mapBody.mapZoom,
      timeBounds: state.mapBody.timeBounds,
      queryTerms: state.topOverlay.queryTerms,
      selectedLangs: state.legend.selectedLangs
    }

    const stateString = JSON.stringify(shareState)
    const baseUrl = window.location.origin + window.location.pathname
    const fullViewUrl = `${baseUrl}#${btoa(stateString)}`

    const data = new FormData()
    data.append("data", fullViewUrl)

    /* mapd api for shortening mapd urls */
    return fetch("http://external-apis.mapd.com/shorten", {
      method: "POST",
      body: data
    })
      .then(res => {
        // eslint-disable-next-line no-magic-numbers
        if (res.status !== 200) {
          /* if failed use unshorted url */
          return Promise.resolve(fullViewUrl)
        }
        return res.text()
      })
      .then(text => dispatch(setViewUrl(text)))
  }
}
