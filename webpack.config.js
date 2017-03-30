const webpack = require('webpack');
const path = require('path');

const PATH_SRC = path.join(__dirname, 'src');

module.exports = {
  context: PATH_SRC,
  entry: {
    app: './index.js',
    vendor: ['mobx-react', 'mobx', 'react-router-dom', 'react', 'react-dom']
  },
  module: {
    rules: [
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
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      PATH_SRC,
      'node_modules',
    ],
    mainFiles: ['index', 'main'],
    alias: {  //指定路径的别名
      Utils: path.resolve(__dirname, 'src/utils'),
      Components: path.resolve(__dirname, 'src/components'),
      Containers: path.resolve(__dirname, 'src/containers'),
      Assets: path.resolve(__dirname, 'src/assets'),
      Stores: path.resolve(__dirname, 'src/stores'),
    },
  },
  plugins: [

  ]
};
