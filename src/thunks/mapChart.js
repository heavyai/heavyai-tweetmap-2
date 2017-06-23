import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';
import { getConnection, query } from '../services/connector';
import { LANG_DOMAIN, LANG_COLORS } from '../constants';

/*
  BACKEND RENDERED POINT MAP
*/
export default function createMapChart() {
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
    .fillColorScale(d3.scale.ordinal().domain(LANG_DOMAIN).range(LANG_COLORS))
    .popupColumns(['tweet_text', 'sender_name', 'tweet_time', 'lang', 'origin', 'followers'])

    return pointMapChart.pushLayer("points", pointLayer).init()
      .then(() => {
        return [pointMapChart, getChartSize]
      })
  }
}
