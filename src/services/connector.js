import * as CrossFilter from "@mapd/crossfilter";
require("@mapd/connector/dist/browser-connector");
const Connector = window.MapdCon;

export function startConnection(cb) {
  new Connector()
    .protocol("https")
    .host("metis.mapd.com")
    .port("443")
    .dbName("mapd")
    .user("mapd")
    .password("HyperInteractive")
    .connect((error, con) => {
      // Get a table from the database
      const tableName = 'tweets_nov_feb';
      // A CrossFilter instance is used for generating the raw query strings for your MapdCon.
      const crossFilter = CrossFilter.crossfilter(con, tableName)
        .then(cf => {
          cb(cf, con);
        });
    });
  return ;
}

export default Connector;
