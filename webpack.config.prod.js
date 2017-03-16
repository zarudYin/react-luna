const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
var fs = require('fs-extra');
const path = require('path');
const config = require('./webpack.config.js');

function copyPublicFolder() {
  fs.copySync(path.join(__dirname, "public"), path.join(__dirname, "dist"), {
    dereference: true
  });
}

module.exports = function (env) {

    copyPublicFolder();

    return webpackMerge(config, {
        devtool: 'source-map',
        plugins: [
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         screw_ie8: true, // React doesn't support IE8
            //         warnings: false
            //     },
            //     mangle: {
            //         screw_ie8: true
            //     },
            //     output: {
            //         comments: false,
            //         screw_ie8: true
            //     }
            // })
        ]
    })
}