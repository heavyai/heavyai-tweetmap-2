import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';
import { getConnection } from '../services/connector';
const _ = require('lodash');

/*
  LINE CHART
*/
export function createLineChart() {
  return () => {

    const crossfilter = getCf();
    const connection = getConnection();

    const parent = document.getElementById("mapChart");
    function getChartSize() {
      /* set width, height to match parent */
      const w = parent.parentElement.clientWidth;
      const h = 120;
      return [w, h];
    }

    const [w, h] = getChartSize();

    const timeChartMeasures = [
      {
        expression: "tweet_time",
        agg_mode:"min",
        name: "minimum"
      },
      {
        expression: "tweet_time",
        agg_mode:"max",
        name: "maximum"
      }
    ]

    crossfilter
      .groupAll()
      .reduce(timeChartMeasures)
      .valuesAsync(true).then(function(timeChartBounds) {
        const timeChartDimension = crossfilter.dimension("tweet_time");
        const timeChartGroup = timeChartDimension
          .group()
          .reduceCount('*')

        const lineChart = dc.lineChart('.lineChart')
          .width(w)
          .height(h)
          .elasticY(true)
          .renderHorizontalGridLines(true)
          .brushOn(true)
          .dimension(timeChartDimension)
          .group(timeChartGroup)
          .binParams({
            numBins: 288, // 288 * 5 = number of minutes in a day
            binBounds: [timeChartBounds.minimum, timeChartBounds.maximum]
          });

        lineChart
          .x(d3.time.scale.utc().domain([timeChartBounds.minimum, timeChartBounds.maximum]))
          .yAxis().ticks(5);

        lineChart
          .xAxis()
          .scale(lineChart.x())
          .tickFormat(dc.utils.customTimeFormat)
          .orient('top');

        dc.renderAllAsync()
      });
  }
}
