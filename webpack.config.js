const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const isProd = false;

module.exports = {
  devtool: 'cheap-module-source-map',
  context: sourcePath,
  entry: {
    app: './index.js',
    common: ['mobx-react', 'mobx', 'react-router-dom', 'react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "less-loader"]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192&name=[md5:hash:base64:10].[ext]'
      },
      {
        test: /\.gif$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=8192&mimetype=image/svg+xml'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules',
    ],
    mainFiles: ['index', 'main'],
    alias: {  //指定路径的别名
      Utils: path.resolve(__dirname, 'src/utils'),
      Components: path.resolve(__dirname, 'src/components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      filename: 'common.js'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
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
};
