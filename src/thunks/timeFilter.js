import * as dc from "@mapd/mapdc"
import {filterTime} from "../actions"
import {getCf} from "../services/crossfilter"
let lineChart = null

/*
  LINE CHART
*/
export function createLineChart () {
  return dispatch => {
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
