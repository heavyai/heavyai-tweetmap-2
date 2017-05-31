import React from 'react';
import * as dc from '@mapd/mapdc';
require("script-loader!mapbox-gl/dist/mapbox-gl.js");
require("script-loader!mapbox-gl/dist/mapboxgl-overrides.js");
const _ = require('lodash');

export default class Map extends React.Component {

  componentDidMount() {
    this.createCharts(this.props.crossfilter, this.props.connection);
  }

  render() {
    return <div id="mainmap"></div>;
  }

  getChartSize() {
    const w = document.documentElement.clientWidth;
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    return [w, h];
  }

  createCharts(crossFilter, con) {
    const [w, h] = this.getChartSize();

  /*----------------BACKEND RENDERED POINT MAP EXAMPLE-----------------------*/
    let langDomain = ['en', 'pt', 'es', 'in', 'und', 'ja', 'tr', 'fr', 'tl', 'ru', 'ar', 'th', 'it', 'nl', 'sv', 'ht', 'de', 'et', 'pl', 'sl', 'ko', 'fi', 'lv', 'sk', 'uk', 'da', 'zh', 'ro', 'no', 'cy', 'iw', 'hu', 'bg', 'lt', 'bs', 'vi', 'el', 'is', 'hi', 'hr', 'fa', 'ur', 'ne', 'ta',  'sr', 'bn', 'si', 'ml', 'hy', 'lo', 'iu', 'ka', 'ps', 'te', 'pa', 'am', 'kn', 'chr', 'my', 'gu', 'ckb', 'km', 'ug', 'sd', 'bo', 'dv'];
    const langOriginColors = ["#27aeef", "#ea5545", "#87bc45", "#b33dc6", "#f46a9b", "#ede15b", "#bdcf32", "#ef9b20", "#4db6ac", "#edbf33", "#7c4dff"]
    const langColors = [];
    const pointMapDim = crossFilter.dimension(null).projectOn(["conv_4326_900913_x(lon) as x", "conv_4326_900913_y(lat) as y", "lang as color", "followers as size"]);
    const xDim = crossFilter.dimension("lon");
    const yDim = crossFilter.dimension("lat");
    const parent = document.getElementById("mainmap");
    mapLangColors(40);
    /* Point Map Radius Size:
     * in order to calculate the radius size.  We use d3 scale and pass in a
     * domain and range.

     To learn more about d3 scales, please read this:
     https://github.com/d3/d3-scale

     We then pass this scale into the r function within bubbleRasterChart
    */
    const sizeScale = d3.scale.linear().domain([0,5000]).range([2,12]);

    const pointMapChart = dc
    .rasterChart(parent, true)
    .con(con)
    .height(h)
    .width(w)
    .mapUpdateInterval(750)
    .mapStyle('mapbox://styles/mapbox/dark-v9')

    const pointLayer = dc
    .rasterLayer("points")
    .dimension(pointMapDim)
    .group(pointMapDim)
    .cap(500000)
    .sampling(true)
    .sizeAttr("size")
    .dynamicSize(d3.scale.sqrt().domain([20000,0]).range([1.0,7.0]).clamp(true))
    .sizeScale(sizeScale)
    .xAttr("x")
    .yAttr("y")
    .xDim(xDim)
    .yDim(yDim)
    .fillColorAttr("color")
    .defaultFillColor("#80DEEA")
    .fillColorScale(d3.scale.ordinal().domain(langDomain).range(langColors))
    .popupColumns(['tweet_text', 'sender_name', 'tweet_time', 'lang', 'origin', 'followers'])

    function mapLangColors(n) {
      langDomain = langDomain.slice(0, n);
      for (let i = 0; i < langDomain.length; i++) {
        langColors.push(langOriginColors[i%langOriginColors.length]);
      }
    }

    pointMapChart.pushLayer("points", pointLayer).init().then((chart) => {
      // custom click handler with just event data (no network calls)
      pointMapChart.map().on('mouseup', logClick)
      function logClick (result) {
        console.log("clicked!", result)
      }
      // disable with pointMapChart.map().off('mouseup', logClick)

      // custom click handler with event and nearest row data
      pointMapChart.map().on('mouseup', logClickWithData)
      function logClickWithData (event) {
        pointMapChart.getClosestResult(event.point, function(result){
          console.log(result && result.row_set[0])
        })
      }

      // hover effect with popup
      const debouncedPopup = _.debounce((event) => {
        pointMapChart.getClosestResult(event.point, pointMapChart.displayPopup);
      }, 250);

      pointMapChart.map().on('mousewheel', pointMapChart.hidePopup);
      pointMapChart.map().on('mousemove', pointMapChart.hidePopup)
      pointMapChart.map().on('mousemove', debouncedPopup)

      dc.renderAllAsync()
    });

    /*--------------------------RESIZE EVENT------------------------------*/
    /* On resize we resize the corresponding widgets and call dc.renderAll() to refresh everything */
    window.addEventListener("resize", _.debounce(resizeAll, 500));

    function resizeAll() {
      const w = document.documentElement.clientWidth;
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      pointMapChart.map().resize();
      pointMapChart.isNodeAnimate = false;
      pointMapChart
        .width(w)
        .height(h)
        .render();
      dc.redrawAllAsync();
    }
  }
}
