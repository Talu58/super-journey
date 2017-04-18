const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry:[path.join(__dirname, './client/index.jsx'), path.join(__dirname, './client/style/style.sass')],
  output: {
    path: path.join(__dirname, './public/bundles'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\socket.io.js/,
      },
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        loader: 'file-loader',
        test: /\.(png|jpg|jpeg|gif|woff)$/
      },
     {
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        test: /(\.s[ca]ss)$/
    }
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
