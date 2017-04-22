const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

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
  plugins: [
    new Dotenv({
      path: './.env', 
      safe: true // lets load the .env.example file as well 
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  node: {
    net: 'empty',
    dns: 'empty',
  },
};
