const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin;
const {merge} = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const {resolveRoot} = require('./helpers');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  entry: resolveRoot('src/index.ts'),
  mode: 'production',
  output: {
    path: resolveRoot('dist'),
    publicPath: '/',
    filename: 'vue-prop-enhancers.js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new HashedModuleIdsPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
});
