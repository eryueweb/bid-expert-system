// const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseConf = require('./webpack.base.conf');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let outputPath = '../bidexpert/web/bidexpert';
module.exports = merge(baseConf, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, outputPath), //打包路径
    filename: 'js/[name].bundle.[chunkhash].js',
    sourceMapFilename: 'js/[name].map.[chunkhash].js',
    chunkFilename: 'js/[name].chunk.[chunkhash].js',
    publicPath: '/bidexpert/' //访问地址公共路径
  },
  optimization: {
    // minimizer压缩配置,生产环境下自动开启,也可以自定义配置.
    // minimizer: true,
    minimizer: [
        new UglifyJsPlugin({
            cache: true,//启动缓存
            parallel: true,//启动并行压缩
            //如果为true的话，可以获得sourcemap
            sourceMap: true // set to true if you want JS source maps
        }),
        //压缩css资源的
        new OptimizeCssAssetsPlugin()
    ]
  },
  performance: {
    hints: 'warning',
    // 入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积 整数类型（以字节为单位 1000k）
    maxAssetSize: 100000000,
    // 只给出 js 文件的性能提示
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
});
