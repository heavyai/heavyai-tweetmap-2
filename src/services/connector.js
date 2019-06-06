require("@mapd/connector/dist/browser-connector")
const config = require ("../servers.conf.json")
const Connector = window.MapdCon

const connection = new Connector()
  .protocol(config.protocol || "http")
  .host(config.host)
  .port(config.port)
  .dbName(config.database)
  .user(config.user)
  .password(config.password)

// log SQL queries
// connection.logging(true)

export function connect () {
  return new Promise((resolve, reject) => connection.connect((error, result) => (error ? reject(error) : resolve(result))))
}

export function getConnection () {
  return connection
}
