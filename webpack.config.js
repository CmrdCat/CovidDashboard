const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./src/index.js', './src/style.scss'],
  output: {
    publicPath: '',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      './images/layers.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/layers.png'
      ),
      './images/layers-2x.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/layers-2x.png'
      ),
      './images/marker-icon.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/marker-icon.png'
      ),
      './images/marker-icon-2x.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/marker-icon-2x.png'
      ),
      './images/marker-shadow.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/marker-shadow.png'
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|mp3|svg|jpe?g|gif)$/i,
        loader: 'file-loader',
        // options: {
        //   outputPath: 'img/',
        // },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/img', to: './img' },
        // { from: './src/audio', to: './audio' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new PrettierPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 9000,
  },
};
