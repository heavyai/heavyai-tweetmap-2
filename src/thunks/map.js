import * as dc from '@mapd/mapdc';
import { getCf } from '../services/crossfilter';
import { getConnection, query } from '../services/connector';
import { moveMap } from '../actions';
import { LANG_DOMAIN, LANG_COLORS } from '../constants';

import fetchJs from 'fetch-js';

let geocoder = null;
let pointMapChart = null;

window.mapApiLoaded = () => {
  geocoder = new google.maps.Geocoder();
};

const initGeocoder = () => {
  return new Promise((resolve, reject) => {
    fetchJs(
      'https://maps.google.com/maps/api/js?sensor=false&async=2&callback=mapApiLoaded',
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

/*
  BACKEND RENDERED POINT MAP
*/
export function createMapChart() {
  return dispatch => {
    const crossfilter = getCf();
    const connection = getConnection();

    const parent = document.getElementById('mapChart');
    function getChartSize() {
      /* set width, height to match parent */
      const w = parent.parentElement.clientWidth;
      const h = parent.parentElement.clientHeight;
      return [w, h];
    }

    const [w, h] = getChartSize();

    const pointMapDim = crossfilter
      .dimension(null)
      .projectOn([
        'conv_4326_900913_x(lon) as x',
        'conv_4326_900913_y(lat) as y',
        'lang as color'
      ]);
    const xDim = crossfilter.dimension('lon');
    const yDim = crossfilter.dimension('lat');

    const sizeScale = d3.scale.linear().domain([0, 5000]).range([1, 12]);

    pointMapChart = dc
      .rasterChart(parent, true)
      .con(connection)
      .height(h)
      .width(w)
      .mapUpdateInterval(750)
      .mapStyle('mapbox://styles/mapbox/dark-v9');

    const pointLayer = dc
      .rasterLayer('points')
      .dimension(pointMapDim)
      .group(pointMapDim)
      .cap(5000000)
      .sampling(true)
      .dynamicSize(
        d3.scale.sqrt().domain([20000, 0]).range([1.0, 7.0]).clamp(true)
      )
      .xAttr('x')
      .yAttr('y')
      .xDim(xDim)
      .yDim(yDim)
      .fillColorAttr('color')
      .defaultFillColor('#80DEEA')
      .fillColorScale(d3.scale.ordinal().domain(LANG_DOMAIN).range(LANG_COLORS))
      .popupColumns([
        'tweet_text',
        'sender_name',
        'tweet_time',
        'lang',
        'origin',
        'followers'
      ]);

    return pointMapChart
      .pushLayer('points', pointLayer)
      .attribLocation('bottom-left')
      .init()
      .then(() => {
        /* display pop up on mouse hover */
        const displayPopupWithData = event => {
          pointMapChart.getClosestResult(
            event.point,
            pointMapChart.displayPopup
          );
        };
        const debouncedPopup = _.debounce(displayPopupWithData, 250);
        const map = pointMapChart.map();

        map.on('mousewheel', pointMapChart.hidePopup);
        map.on('mousemove', pointMapChart.hidePopup);
        map.on('mousemove', debouncedPopup);

        map.on('moveend', () => {
          dispatch(moveMap(map.getZoom(), map.getCenter()));
        });

        /* set up Google geocoder */
        return initGeocoder();
      })
      .then(() => {
        return [pointMapChart, getChartSize];
      });
  };
}

export function geocode(placeName) {
  return dispatch => {
    geocoder.geocode({ address: placeName }, (data, status) => {
      if (status != google.maps.GeocoderStatus.OK) {
        return null;
      }
      const viewport = data[0].geometry.viewport;
      const sw = viewport.getSouthWest();
      const ne = viewport.getNorthEast();

      pointMapChart.map().fitBounds([
        // api specifies lng/lat pairs
        [sw.lng(), sw.lat()],
        [ne.lng(), ne.lat()]
      ], { animate: false }); // set animate to true if you want to pan-and-zoom to the location
    });
  };
}

export function zoomOut() {
  return () => {
    pointMapChart.map().flyTo({ center: [0, 0], zoom: 1 }, 1);
  };
}

export function zoomTo(position) {
  return () => {
    pointMapChart.map().flyTo({
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 17,
      speed: 2
    });
  };
}

export function initView(center, zoom) {
  return () => {
    pointMapChart.map().flyTo({ center: center, zoom: zoom, animate: false });
  };
}
