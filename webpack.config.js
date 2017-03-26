const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry:[path.join(__dirname, './client/client.jsx'), path.join(__dirname, './client/style/style.sass')],
  output: {
    path: path.join(__dirname, './public/bundles'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        loader: 'url-loader?limit=10000',
        test: /\.(png|jpg|jpeg|gif|woff)$/
      },
     { test: /(\.s[ca]ss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  node: {
    net: 'empty',
    dns: 'empty',
  },
};
