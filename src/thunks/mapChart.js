import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';
import { getConnection } from '../services/connector';
const _ = require('lodash');

/*
  BACKEND RENDERED POINT MAP
  initializing map chart is not async, but also doesn't
  change state so we do this in a thunk.
*/
export function createMapChart() {
  return () => {

    const crossfilter = getCf();
    const connection = getConnection();

    const parent = document.getElementById("mapChart");
    function getChartSize() {
      /* set width, height to match parent */
      const w = parent.parentElement.clientWidth;
      const h = parent.parentElement.clientHeight;
      return [w, h];
    }

    const [w, h] = getChartSize();

    let langDomain = ['en', 'pt', 'es', 'in', 'und', 'ja', 'tr', 'fr', 'tl', 'ru', 'ar'];
    const langColors = ["#27aeef", "#ea5545", "#87bc45", "#b33dc6", "#f46a9b", "#ede15b", "#bdcf32", "#ef9b20", "#4db6ac", "#edbf33", "#7c4dff"]

    const pointMapDim = crossfilter.dimension(null).projectOn(["conv_4326_900913_x(lon) as x", "conv_4326_900913_y(lat) as y", "lang as color", "3 as size"]);
    const xDim = crossfilter.dimension("lon");
    const yDim = crossfilter.dimension("lat");

    const sizeScale = d3.scale.linear().domain([0,5000]).range([1,12]);

    const pointMapChart = dc
    .rasterChart(parent, true)
    .con(connection)
    .height(h)
    .width(w)
    .mapUpdateInterval(750)
    .mapStyle('mapbox://styles/mapbox/dark-v9')

    const pointLayer = dc
    .rasterLayer("points")
    .dimension(pointMapDim)
    .group(pointMapDim)
    .cap(5000000)
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

    pointMapChart.pushLayer("points", pointLayer).init().then((chart) => {
      dc.renderAllAsync()
    });

    /*--------------------------RESIZE EVENT------------------------------*/
    /* On resize we resize the corresponding widgets and call dc.renderAll() to refresh everything */
    window.addEventListener("resize", _.debounce(resizeAll, 500));

    function resizeAll() {
      console.log('calling resize')
      const [w, h] = getChartSize();

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
