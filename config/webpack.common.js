const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const {resolveRoot} = require('./helpers');

module.exports = {
  context: resolveRoot('src'),
  // shims
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // process is injected via DefinePlugin, although some 3rd party
    // libraries may require a mock to work properly (#934)
    process: 'mock',
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    module : 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue', '.json', '.mjs', '.wasm'],
    plugins: [PnpWebpackPlugin]
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [resolveRoot('src')],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
