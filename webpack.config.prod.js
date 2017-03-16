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

    //拷贝public到dist
    copyPublicFolder();

    return webpackMerge(config, {
        devtool: 'source-map',
        plugins: [
            
        ]
    })
}