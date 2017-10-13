/* eslint-disable no-magic-numbers */
import {LANG_COLORS, LANG_DOMAIN, MAPBOX_TOKEN, MONTH, QUANT_COLORS, SOURCE_COLORS, SOURCE_DOMAIN} from "../../constants"
import {debounce} from "lodash"
import fetchJs from "fetch-js"
import {updateLegendCounts, clearLegendFilter} from "../Legend/actions"

export const MOVE_MAP = "MOVE_MAP"
export const SHOW_HIGHLIGHT = "SHOW_HIGHLIGHT"
export const HIDE_HIGHLIGHT = "HIDE_HIGHLIGHT"
export const FILTER_TIME = "FILTER_TIME"
export const TWEET_COUNT_UPDATE = "TWEET_COUNT_UPDATE"

export const TOGGLE_LINECHART = "TOGGLE_LINECHART"
export const CLOSE_LINECHART = "CLOSE_LINECHART"

export const USER_LOCATION_REQUEST = "USER_LOCATION_REQUEST"
export const USER_LOCATION_SUCCESS = "USER_LOCATION_SUCCESS"
export const USER_LOCATION_FAILURE = "USER_LOCATION_FAILURE"

export const SET_MAP_TYPE = "SET_MAP_TYPE"
export const SET_HEAT_AGG_MODE = "SET_HEAT_AGG_MODE"

const POINT_LAYER = "points"
const HEAT_LAYER = "heat"

export function moveMap (zoom, center}) {
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

export function setMapType (chartType) {
  return {
    type: SET_MAP_TYPE,
    chartType
  }
}

export function setHeatAggMode (aggMode) {
  return {
    type: SET_HEAT_AGG_MODE,
    aggMode
  }
}

let geocoder = null
let rasterMapChart = null
let pointLayer = null
let heatLayer = null
let lineChart = null
let heatLayerSql = null

const heatLayerSqlIgnoreFilter = ({filter, ...args}) => heatLayerSql({...args, filter: filter.replace(/AND \('.*' = ANY tweet_tokens.*\)/, "")})

const degrees2meters = (lon, lat) => {
  const x = Math.floor(lon * 20037508.34 / 180)
  const y = Math.floor(Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180) * 20037508.34 / 180)
  return {x, y}
}

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

function getChartSize (node) {
  /* set width, height to match parent */
  const w = node.parentElement.clientWidth
  const h = node.parentElement.clientHeight
  return [w, h]
}

const colorDomainSetter = domain => state => ({
  ...state,
  encoding: {
    ...state.encoding,
    color: {
      ...state.encoding.color,
      scale: {
        ...state.encoding.color.scale,
        domain
      }
    }
  }
})

function polyfillColorsGetter () {
  let colorScale = null
  this.colors = scale => {
    if (scale) {
      colorScale = scale
      return this
    } else {
      return colorScale
    }
  }

  this.colorAccessor = () => a => a
  return this
}

/*
  BACKEND RENDERED POINT MAP
*/
export function createMapChart () {
  return (dispatch, getState, {dc, getCf, getConnection}) => {
    const crossfilter = getCf()
    const connection = getConnection()

    const parent = document.getElementById("mapChart")

    const [w, h] = getChartSize(parent)

    const pointMapDim = crossfilter
      .dimension(null)
      .projectOn([
        "conv_4326_900913_x(lon) as x",
        "conv_4326_900913_y(lat) as y",
        "lang as color"
      ])
    const xDim = crossfilter.dimension("lon")
    const yDim = crossfilter.dimension("lat")

    rasterMapChart = dc
      .rasterChart(parent, true)
      .con(connection)
      .height(h)
      .width(w)
      .mapUpdateInterval(750)
      .mapStyle("mapbox://styles/mapbox/dark-v9")
      .mapboxToken(MAPBOX_TOKEN)

    function renderPopupHTML (data) {
      if (arguments.length === 0) { return true }

      const {sender_name, tweet_text, tweet_time} = data
      const imgSrc = `https://avatars.io/twitter/${sender_name}`
      const date = `${MONTH[tweet_time.getMonth()]} ${String(tweet_time.getDate())}`
      const info = `${sender_name} · ${date}`
      return `<div class="tweetItem tweet"><img class="tweetImage" src="${imgSrc}" onerror="this.onerror=null;this.src='https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';"><div class="tweetBlock"><p class="greyText">${info}</p><p>${tweet_text}</p></div></div>`
    }

    pointLayer = dc
      .rasterLayer("points")
      .dimension(pointMapDim)
      .group(pointMapDim)
      .cap(5000000)
      .sampling(true)
      .dynamicSize(
        dc.d3.scale.sqrt().domain([20000, 0]).range([1.0, 7.0]).clamp(true)
      )
      .xAttr("x")
      .yAttr("y")
      .xDim(xDim)
      .yDim(yDim)
      .fillColorAttr("color")
      .defaultFillColor("#80DEEA")
      .fillColorScale(dc.d3.scale.ordinal().domain(LANG_DOMAIN).range(LANG_COLORS))
      .popupColumns(["tweet_text", "sender_name", "tweet_time"])

    pointLayer.popupFunction = renderPopupHTML
    polyfillColorsGetter.apply(rasterMapChart)
    return rasterMapChart
      .pushLayer("points", pointLayer)
      .attribLocation("bottom-left")
      .init()
      .then(() => {
        /* display pop up on mouse hover */
        let dragging = false

        const displayPopupWithData = event => {
          if (dragging) { return }
          rasterMapChart.getClosestResult(
            event.point,
            rasterMapChart.displayPopup
          )
        }
        const debouncedPopup = debounce(displayPopupWithData, 250)
        const map = rasterMapChart.map()

        map.on("mousemove", debouncedPopup)
        map.on("mousemove", rasterMapChart.hidePopup)
        map.on("mousedown", () => dragging = true)
        map.on("mouseup", () => dragging = false)
        map.on("movestart", e => e && e.originalEvent && e.originalEvent.type === "wheel" && rasterMapChart.hidePopup())

        /* update state at the end of each move, recording where we are */
        map.on("moveend", (e) => {
          dispatch(moveMap(map.getZoom(), map.getCenter(), map.getBounds()))
        })

        /* set up Google geocoder */
        return initGeocoder()
      })
      .then(() => [rasterMapChart, getChartSize])
  }
}

function updateHeatMapLegend () {
  return (dispatch, getState) => {
    if (getState().mapBody.chartType === "heat") {
      const legendUpdate = rasterMapChart.legendablesContinuous().map(l => ({item: l.value, color: l.color, count: l.value}))
      dispatch(updateLegendCounts(legendUpdate))
    }
  }
}


export function toggleHeatAggMode () {
  return (dispatch, getState, {dc}) => {
    const heatLayer = rasterMapChart.getLayer(HEAT_LAYER)
    if (getState().mapBody.aggMode === "#" && getState().topOverlay.queryTerms.length) {
      dispatch(setHeatAggMode("%"))
      rasterMapChart.isTargeting(true)
      heatLayer.genSQL = heatLayerSqlIgnoreFilter
      const terms = getState().topOverlay.queryTerms.map(t => `'${t.replace("'", "''")}' = ANY tweet_tokens`).join(" AND ") // escape '
      heatLayer.setState(state => ({
        ...state,
        encoding: {
          ...state.encoding,
          color: {
            ...state.encoding.color,
            aggregate: `AVG(CASE WHEN (${terms}) THEN 1 ELSE 0 END)`
          }
        }
      }))
    } else {
      dispatch(setHeatAggMode("#"))
      rasterMapChart.isTargeting(false)
      heatLayer.genSQL = heatLayerSql
      heatLayer.setState(state => ({
        ...state,
        encoding: {
          ...state.encoding,
          color: {
            ...state.encoding.color,
            aggregate: "count(*)"
          }
        }
      }))
    }
    dc.redrawAllAsync()
  }
}

export function toggleMapChartType () {
  return (dispatch, getState, {dc}) => {
    if (getState().mapBody.chartType === "points") {
      dispatch(updateLegendCounts([]))
      dispatch(clearLegendFilter())
      dispatch(launchHeatmp())
    } else {
      dispatch(updateLegendCounts([]))
      dispatch(setMapType("points"))
      rasterMapChart.hidePopup()
      rasterMapChart.popLayer(HEAT_LAYER)
      rasterMapChart.pushLayer(POINT_LAYER, pointLayer)
      dc.redrawAllAsync()
    }
  }
}


export function launchHeatmp () {
  return (dispatch, getState, {dc, getCf, getConnection}) => {
    dispatch(setMapType("heat"))
    rasterMapChart.hidePopup()
    const [width, height] = getChartSize(document.getElementById("mapChart"))

    const layer = dc.rasterLayer("heat")
    layer.crossfilter(getCf())
    layer.xDim(pointLayer.xDim())
    layer.yDim(pointLayer.yDim())
    layer.setState({
      mark: "hex",
      encoding: {
        x: {
          type: "quantitative",
          field: "lon",
          size: width
        },
        y: {
          type: "quantitative",
          field: "lat",
          size: height
        },
        color: {
          type: "quantize",
          aggregate: "count(*)",
          scale: {
            domain: "auto",
            range: QUANT_COLORS,
            default: "#0d0887",
            nullValue: "#0d0887"
          }
        },
        size: {
          type: "manual",
          value: 14
        }
      }
    })

    rasterMapChart.colors(d3.scale.linear().range(QUANT_COLORS))
    rasterMapChart.colorByExpr("count(*)")
    const poppedLayer = rasterMapChart.popLayer(POINT_LAYER)
    rasterMapChart.pushLayer(HEAT_LAYER, layer)
    heatLayer = layer
    rasterMapChart.renderAsync().then(() => {
      dispatch(updateHeatMapLegend())
      rasterMapChart.on("postRedraw", () => {
        dispatch(updateHeatMapLegend())
      })
    })
    heatLayerSql = layer.genSQL
    const legendFunc = rasterMapChart.legendablesContinuous
  }
}

export function showHighlight (lat, lon, color) {
  const googCoords = degrees2meters(lat, lon)

  rasterMapChart.x().range([0, rasterMapChart.width() - 1])
  rasterMapChart.y().range([0, rasterMapChart.height() - 1])

  const x = rasterMapChart.x()(googCoords.x) - 14
  const y = rasterMapChart.height() - rasterMapChart.y()(googCoords.y) - 14

  return {
    type: SHOW_HIGHLIGHT,
    x: `${x}px`,
    y: `${y}px`,
    color
  }
}

export const hideHighlight = {type: HIDE_HIGHLIGHT}

export function geocode (placeName) {
  return () => {
    geocoder.geocode({address: placeName}, (data, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        return
      }
      const viewport = data[0].geometry.viewport
      const sw = viewport.getSouthWest()
      const ne = viewport.getNorthEast()

      rasterMapChart.map().fitBounds([
        // api specifies lng/lat pairs
        [sw.lng(), sw.lat()],
        [ne.lng(), ne.lat()]
      ], {animate: false}) // set animate to true if you want to pan-and-zoom to the location
    })
  }
}

export function zoomOut () {
  return () => {
    rasterMapChart.map().flyTo({center: [0, 0], zoom: 1}, 1)

  }
}

export function zoomTo (position, zoom = 17) {
  return () => {
    rasterMapChart.zoom(zoom)
    rasterMapChart.center(position)
    rasterMapChart.map().flyTo({
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

export function changeDimension (dim) {
  return (dispatch, getState, {dc, getCf}) => {
    const isLang = getState().legend.mode === "lang"
    const domain = isLang ? LANG_DOMAIN : SOURCE_DOMAIN
    const range = isLang ? LANG_COLORS : SOURCE_COLORS
    const crossfilter = getCf()
    const pointMapDim = crossfilter
      .dimension(null)
      .projectOn([
        "conv_4326_900913_x(lon) as x",
        "conv_4326_900913_y(lat) as y",
        `${dim} as color`
      ])
    pointLayer
      .dimension(pointMapDim)
      .group(pointMapDim)
      .fillColorAttr("color")
      .fillColorScale(dc.d3.scale.ordinal().domain(domain).range(range))
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
      const h = 100
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
            dc.d3.time.scale
              .utc()
              .domain([timeChartBounds.minimum, timeChartBounds.maximum])
          )
          .yAxis()
          .ticks(numTicks)

        lineChart.xAxis().orient("top")

        lineChart.on("postRender", () => {
          // append slider label elements
          dc.d3.select(".resize.w").append("rect")
            .attr("class", "labelRect")
            .attr("x", -40)
            .attr("y", -14)
            .attr("rx", 8)
            .attr("ry", 8)
            .attr("width", 80)
            .attr("height", 16)
          dc.d3.select(".resize.e").append("rect")
            .attr("class", "labelRect")
            .attr("x", -40)
            .attr("y", -14)
            .attr("rx", 8)
            .attr("ry", 8)
            .attr("width", 80)
            .attr("height", 16)
          dc.d3.select(".resize.w").append("text")
            .attr("class", "labelDate")
          dc.d3.select(".resize.e").append("text")
            .attr("class", "labelDate")
        })

        lineChart.on("filtered", (_, filter) => {
          if (typeof filter !== "object") { return }
          dispatch(filterTime(filter))

          const dates = filter.map(dc.d3.time.format("%m/%d/%y"))
          dc.d3.select(".resize.w text").text(dates[0])
          dc.d3.select(".resize.e text").text(dates[1])

          const rotate = dc.d3.select(".extent").attr("width") < 80 ?
            "rotate(90deg) translate(40px, 4px)" :
            "rotate(0) translate(0, 0)"

          dc.d3.selectAll(".labelRect, .labelDate").style("transform", rotate)
        })

        const setBrushY = lineChart.setBrushY
        lineChart.setBrushY = (...args) => {
          const ret = setBrushY.apply(lineChart, args)
          dc.d3.selectAll(".labelRect").attr("height", 16)
          return ret
        }

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
