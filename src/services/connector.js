require("@mapd/connector/dist/browser-connector");
const Connector = window.MapdCon;

const connection = new Connector()
  .protocol("https")
  .host("metis.mapd.com")
  .port("443")
  .dbName("mapd")
  .user("mapd")
  .password("HyperInteractive");

export function connect() {
  return new Promise((resolve, reject) => {
    return connection.connect((error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

export function getConnection() {
  return connection
}
