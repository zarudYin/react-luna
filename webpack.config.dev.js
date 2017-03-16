const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const config = require('./webpack.config.js');

module.exports = function (env) {
    return webpackMerge(config, {
        devtool: 'cheap-module-source-map',
        plugins: [
            // 开启全局的模块热替换（HMR）
            new webpack.HotModuleReplacementPlugin(),
            // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
            new webpack.NamedModulesPlugin(),
        ],
        devServer: {
            hot: true,
            port: 3000,
            compress: false,
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            inline: true,
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                }
            },
        }
    })
}