const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const commonConfig = require('./webpack.common');
const {resolveRoot} = require('./helpers');

module.exports = merge(commonConfig, {
  entry: resolveRoot('app/main'),
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: resolveRoot('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      '@': resolveRoot('src')
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebPackPlugin({
      showErrors: true,
      cache: true,
      template: resolveRoot('public/index.html'),
      filename: resolveRoot('dist/index.html')
    }),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    // open: true,
    overlay: true,
    port: 9000,
    stats: {
      normal: true
    }
  }
});
