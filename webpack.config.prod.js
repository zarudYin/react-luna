const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        // devtool: 'source-map',
        devtool: 'hidden-source-map',
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
                                }
                            },
                            {
                                loader: 'postcss-loader'
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('app.css')
        ]
    })
}