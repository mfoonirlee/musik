"use strict";
const webpack = require("webpack");
let config = require("./webpack.base.config.js");
const url = require("url");
const urlPrefix = require("../f2eci").urlPrefix;
const STATIC_SRC = require("../f2eci")["static-src"];
config.output.publicPath = url.resolve(urlPrefix, STATIC_SRC) + "/";

config.plugins = config.plugins || [];
config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    })
);
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);
module.exports = config;
