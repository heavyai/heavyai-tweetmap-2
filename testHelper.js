require("babel-register")({
  ignore: /node_modules\/(?!(@mapd)\/).*/
})
require('jsdom-global')()
require('ignore-styles')
