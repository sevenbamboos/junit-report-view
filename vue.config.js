const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [new BundleAnalyzerPlugin()]
  }
}