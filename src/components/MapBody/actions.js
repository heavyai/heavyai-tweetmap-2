/* eslint-disable no-magic-numbers */
import {LANG_COLORS, LANG_DOMAIN, MONTH} from "../../constants"
import {debounce} from "lodash"
import fetchJs from "fetch-js"
import React from "react"

export const MOVE_MAP = "MOVE_MAP"
export const FILTER_TIME = "FILTER_TIME"
export const TWEET_COUNT_UPDATE = "TWEET_COUNT_UPDATE"

export const TOGGLE_LINECHART = "TOGGLE_LINECHART"
export const CLOSE_LINECHART = "CLOSE_LINECHART"

export const USER_LOCATION_REQUEST = "USER_LOCATION_REQUEST"
export const USER_LOCATION_SUCCESS = "USER_LOCATION_SUCCESS"
export const USER_LOCATION_FAILURE = "USER_LOCATION_FAILURE"

export function moveMap (zoom, center) {
  return {
    type: MOVE_MAP,
    zoom,
    center
  }
}

export function filterTime (times) {
  return {
    type: FILTER_TIME,
    times
  }
}

export function updateCount (count) {
  return {
    type: TWEET_COUNT_UPDATE,
    count
  }
}

export const toggleLinechart = {type: TOGGLE_LINECHART}
export const closeLinechart = {type: CLOSE_LINECHART}

export const userLocationRequest = {type: USER_LOCATION_REQUEST}
export const userLocationSuccess = {type: USER_LOCATION_SUCCESS}

export function userLocationFailure (error) {
  return {
    type: USER_LOCATION_FAILURE,
    error
  }
}

let geocoder = null
let pointMapChart = null
let lineChart = null

window.mapApiLoaded = () => {
  geocoder = new window.google.maps.Geocoder()
}

const initGeocoder = () => new Promise((resolve, reject) => {
  fetchJs(
    "https://maps.google.com/maps/api/js?sensor=false&async=2&callback=mapApiLoaded",
    err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    }
  )
})

/*
  BACKEND RENDERED POINT MAP
*/
export function createMapChart () {
  return (dispatch, getState, {dc, getCf, getConnection}) => {
    const crossfilter = getCf()
    const connection = getConnection()

    const parent = document.getElementById("mapChart")
    function getChartSize () {
      /* set width, height to match parent */
      const w = parent.parentElement.clientWidth
      const h = parent.parentElement.clientHeight
      return [w, h]
    }

    const [w, h] = getChartSize()

    const pointMapDim = crossfilter
      .dimension(null)
      .projectOn([
        "conv_4326_900913_x(lon) as x",
        "conv_4326_900913_y(lat) as y",
        "lang as color"
      ])
    const xDim = crossfilter.dimension("lon")
    const yDim = crossfilter.dimension("lat")

    pointMapChart = dc
      .rasterChart(parent, true)
      .con(connection)
      .height(h)
      .width(w)
      .mapUpdateInterval(750)
      .mapStyle("mapbox://styles/mapbox/dark-v9")

    function renderPopupHTML (data, columnOrder, columnMap) {
      if (arguments.length === 0) { return true }

      const {sender_name, tweet_text, tweet_time} = data
      const imgSrc = `https://avatars.io/twitter/${sender_name}`
      const date = `${MONTH[tweet_time.getMonth()]} ${String(tweet_time.getDate())}`
      const info = `${sender_name} · ${date}`
      return `<div class="tweetItem tweet"><img class="tweetImage" src="${imgSrc}" onerror="this.onerror=null;this.src='https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';"><div class="tweetBlock"><p class="greyText">${info}</p><p>${tweet_text}</p></div></div>`
    }

    const pointLayer = dc
      .rasterLayer("points")
      .dimension(pointMapDim)
      .group(pointMapDim)
      .cap(5000000)
      .sampling(true)
      .dynamicSize(
        window.d3.scale.sqrt().domain([20000, 0]).range([1.0, 7.0]).clamp(true)
      )
      .xAttr("x")
      .yAttr("y")
      .xDim(xDim)
      .yDim(yDim)
      .fillColorAttr("color")
      .defaultFillColor("#80DEEA")
      .fillColorScale(window.d3.scale.ordinal().domain(LANG_DOMAIN).range(LANG_COLORS))
      .popupColumns(["tweet_text", "sender_name", "tweet_time"])

    pointLayer.popupFunction = renderPopupHTML

    return pointMapChart
      .pushLayer("points", pointLayer)
      .attribLocation("bottom-left")
      .init()
      .then(() => {
        /* display pop up on mouse hover */
        const displayPopupWithData = event => {
          pointMapChart.getClosestResult(
            event.point,
            pointMapChart.displayPopup
          )
        }
        const debouncedPopup = debounce(displayPopupWithData, 250)
        const map = pointMapChart.map()

        map.on("mousewheel", pointMapChart.hidePopup)
        map.on("mousemove", pointMapChart.hidePopup)
        map.on("mousemove", debouncedPopup)

        /* update state at the end of each move, recording where we are */
        map.on("moveend", () => {
          dispatch(moveMap(map.getZoom(), map.getCenter()))
        })

        /* set up Google geocoder */
        return initGeocoder()
      })
      .then(() => [pointMapChart, getChartSize])
  }
}

export function geocode (placeName) {
  return () => {
    geocoder.geocode({address: placeName}, (data, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        return
      }
      const viewport = data[0].geometry.viewport
      const sw = viewport.getSouthWest()
      const ne = viewport.getNorthEast()

      pointMapChart.map().fitBounds([
        // api specifies lng/lat pairs
        [sw.lng(), sw.lat()],
        [ne.lng(), ne.lat()]
      ], {animate: false}) // set animate to true if you want to pan-and-zoom to the location
    })
  }
}

export function zoomOut () {
  return () => {
    pointMapChart.map().flyTo({center: [0, 0], zoom: 1}, 1)
  }
}

export function zoomTo (position, zoom) {
  if (arguments.length < 2) {
    zoom = 17
  }

  return () => {
    pointMapChart.map().flyTo({
      center: position,
      zoom,
      speed: 2
    })
  }
}

export function zoomToUserLocation () {
  return dispatch => {
    dispatch(userLocationRequest)

    if (!navigator.geolocation) {
      dispatch(userLocationFailure("Browser does not support geolocation"))
    }

    navigator.geolocation.getCurrentPosition(pos => {
      dispatch(zoomTo([pos.coords.longitude, pos.coords.latitude]))
      dispatch(userLocationSuccess)
    }, err => {
      dispatch(userLocationFailure(err.message))
    })
  }
}

/*
  LINE CHART
*/
export function createLineChart () {
  return (dispatch, getState, {dc, getCf}) => {
    const crossfilter = getCf()
    const parent = document.getElementById("mapChart")

    function getChartSize () {
      /* set width to match parent */
      const w = parent.parentElement.clientWidth
      const h = 120
      return [w, h]
    }

    const timeChartMeasures = [
      {
        expression: "tweet_time",
        agg_mode: "min",
        name: "minimum"
      },
      {
        expression: "tweet_time",
        agg_mode: "max",
        name: "maximum"
      }
    ]

    return crossfilter
      .groupAll()
      .reduce(timeChartMeasures)
      .valuesAsync(true)
      .then((timeChartBounds) => {
        const timeChartDimension = crossfilter.dimension("tweet_time")
        const timeChartGroup = timeChartDimension.group().reduceCount("*")

        const [w, h] = getChartSize()
        const numTicks = 5
        lineChart = dc
          .lineChart("#lineChart")
          .width(w)
          .height(h)
          .margins({top: 16, right: 48, bottom: 0, left: 64})
          .elasticY(true)
          .brushOn(true)
          .renderArea(true)
          .dimension(timeChartDimension)
          .group(timeChartGroup)
          .binParams({
            numBins: 288, // 288 * 5 = number of minutes in a day
            binBounds: [timeChartBounds.minimum, timeChartBounds.maximum]
          })

        lineChart
          .x(
            window.d3.time.scale
              .utc()
              .domain([timeChartBounds.minimum, timeChartBounds.maximum])
          )
          .yAxis()
          .ticks(numTicks)

        lineChart.xAxis().orient("top")

        lineChart.on("filtered", (_, filter) => {
          dispatch(filterTime(filter))
        })

        return Promise.resolve([lineChart, getChartSize])
      })
  }
}

export function initFilter (filter) {
  return () => {
    if (filter !== null) {
      lineChart.filter(filter.map(str => new Date(str)))
    }
  }
}

/*
  DC COUNT
*/
export function createCount () {
  return (dispatch, getState, {dc, getCf}) => {
    const crossfilter = getCf()

    const countGroup = crossfilter.groupAll()
    const dataCount = dc
      .countWidget(".tweetCount")
      .dimension(crossfilter)
      .group(countGroup)
      .countLabel("tweets")

    // hijack _doRender to also dispatch tweet count
    const doRender = dataCount._doRender
    dataCount._doRender = val => {
      dispatch(updateCount(val))
      return doRender(val)
    }
  }
}
