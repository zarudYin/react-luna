const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./webpack.config.js');

const PATH_DIST = path.join(__dirname, 'dist');

module.exports = function (env) {
    return webpackMerge(config, {
        // devtool: 'cheap-module-source-map',           
        devtool: 'cheap-module-eval-source-map',
        output: {
            path: PATH_DIST,
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    use: [
                        {
                            loader: 'style-loader'    //通过HTML热更新,使css达到热更新
                        },
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
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vender',
                minChunks: Infinity,
                filename: '[name].js'
            }),
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
                version: false,
                publicPath: true,
                timings: true,
                warnings: true,
                errors: true,
                errorDetails: true
            },
        }
    })
}