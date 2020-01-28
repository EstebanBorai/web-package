const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, args) => {
  const isDev = args.mode === 'development';
  const isProd = args.mode === 'production';

  const config = {
    module: {}
  };

  config.entry = './src/main.js';

  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  }

  config.module.rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/,
      use:  [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }
  ];

  config.plugins = [
    new MiniCssExtractPlugin({
      filename: "style.[hash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './public/index.ejs',
      filename: 'index.html',
      title: 'webpack-boilerplate'
    })
  ]
  
  if (isDev) {
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      hot: true,
      inline: true,
      compress: true,
      port: 8080,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 1500,
      },
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false
      }
    };
  }

  if (isProd) {
    config.plugins.push(new CleanWebpackPlugin());
  }

  return config;
}
