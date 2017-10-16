const webpack = require("webpack")
const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  favicon: path.resolve(__dirname, "src/favicon.ico"),
  template: path.resolve(__dirname, "src/index.html"),
  filename: "index.html",
  inject: "body"
})

const webpackDefinePlugin = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
  "process.env.GOOGLE_API_KEY": JSON.stringify(
    process.env.GOOGLE_API_KEY || null
  )
})

const copyPlugin = new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }])

const optimizePlugins = [
  new webpack.optimize.AggressiveMergingPlugin(),
  new UglifyJSPlugin({
    sourceMap: process.env.NODE_ENV !== "production"
  })
]

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/index"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@mapd/mapdc"),
          path.resolve(__dirname, "node_modules/@mapd/crossfilter")
        ],
        exclude: [
          path.resolve(
            __dirname,
            "node_modules/@mapd/crossfilter/node_modules"
          ),
          path.resolve(__dirname, "node_modules/@mapd/mapdc/node_modules"),
          /(node_modules\/[^(@mapd)]+)/
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|otf|eot|svg|ttf|woff|woff2).*$/,
        loader: "url-loader?limit=8192"
      },
      {
        test: /\.svg$/,
        loader: "file-loader"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  devtool: process.env.NODE_ENV !== "production" ? "eval-source-map" : "none",
  plugins: [
    HtmlWebpackPluginConfig,
    webpackDefinePlugin,
    copyPlugin,
    ...optimizePlugins
  ]
}
