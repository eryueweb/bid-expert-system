// const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConf = require('./webpack.base.conf');
const ip = require('ip');
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');
const host_ip = ip.address();
const port = 8060;
const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}
module.exports = merge(baseConf, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [infoColor(`App running at:`), infoColor(`- Network: http://${host_ip}:${port}/bidexpert`), infoColor(`- Local: http://localhost:${port}/bidexpert`)],
        // notes: ['Some additional notes to be displayed upon successful compilation']
      }
    })
  ],
  devServer: {
    port,
    host: host_ip,
    hot: true,
    open: true,
    openPage: 'bidexpert/#/register',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      "/gxclient/expert": {
        target: "http://10.101.128.91/gxclient/expert/",
        changeOrigin: true,
        pathRewrite: {
          "^/gxclient/expert": ""
        }
      },
      "/gxclient/newbid": {
        target: `http://10.101.128.91/gxclient/newbid/`,
        changeOrigin: true,
        pathRewrite: {
          ["^/gxclient/newbid"]: ""
        }
      }
    }
  }
});
