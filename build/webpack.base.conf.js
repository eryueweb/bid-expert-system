const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');


// const packageName = require('./package.json').name;
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// 不同环境api配置
const NODE_ENV = process.env.NODE_ENV;
require('dotenv').config({ path: '.env.' + NODE_ENV });
const processEnvParams = {};
const processEnvObj = JSON.parse(JSON.stringify(process.env));
Object.keys(processEnvObj).forEach(key => {
  if (key.indexOf('EXPERT_SYSTEM_') === 0) {
    processEnvParams[key] = JSON.stringify(processEnvObj[key])
  }
});

// let API_CONF = null;
// if (NODE_ENV === 'production') {
//   API_CONF = {
//     API_HOST: '',
//     NODE_ENV,
//     HOST: '10.101.128.91'
//   }
// } else if (NODE_ENV === 'test') {
//   API_CONF = {
//     API_HOST: 'http://10.101.128.91/gxclient/newbid/',
//     HOST: '10.101.128.91',
//     NODE_ENV
//   }
// } else if (NODE_ENV === 'develoment') {
//   API_CONF = {
//     API_HOST: '/gxclient/newbid/',
//     NODE_ENV
//   }
// }
module.exports = {
  entry: {
    // es6兼容ie
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, '../bidexpert'),
    filename: 'js/[name].bundle.[hash].js',
    sourceMapFilename: 'js/[name].map.[hash].js', //「source map 位置」的文件名模板
    chunkFilename: 'js/[name].chunk.[hash].js', //分块的文件模板
    publicPath: '/bidexpert/'
    // 微应用配置
    // library: `${packageName}-[name]`,
    // libraryTarget: 'umd',
    // jsonpFunction: `webpackJsonp_${packageName}`,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'../src'),
      'assets': path.resolve('__dirname','../src/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'cache-loader',
          {
            loader: 'vue-loader',
            options: {
              scss: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicpath: '../',
                    filename: 'css/[name].[contenthash:8].css'
                  }
                },
                'css-loader'
              ]
            }

          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          'happypack/loader?id=babel'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'cache-loader',
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicpath: '../',
              filename: 'css/[name].[hash:8].css',
            }
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { outputStyle: 'expanded' }  //解决乱码问题
            }
          }
        ]
      },
      {
		    test: /\.css$/,
        use: [
          'cache-loader',
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicpath: '../',
              filename: 'css/[name].[contenthash:8].css'
            }
          },
          "css-loader"
        ]
	    },
      {
        test: /\.(png|jpe?g|gif|webp|woff2?|eot|otf|ttf)$/,
        use: ['cache-loader','url-loader'],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.assign({
        BASE_URL: '/bidexpert/'
      }, processEnvParams)
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, `../public/favicon.ico`), //配置网站图标
    }),
    new WebpackBar(),
    new HappyPack({
      id: 'babel',
      loaders: ['cache-loader','babel-loader?cacheDirectory']
    })
  ],
  optimization: {
    minimize: true,
    // runtimeChunk的作用是将包含chunks 映射关系的 list单独从 app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。
    runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`
    },
    // 在生产环境中自动开启,会有默认配置.功能类似于CommonsChunkPlugin.
    splitChunks: {
        chunks: 'all',//默认作用于异步chunk，值为all/initial/async/function
        minSize: 30000,  //默认值是30kb
        minChunks: 1,  //最少被多少模块共享
        maxAsyncRequests: 5,  //所有异步请求不得超过5个
        maxInitialRequests: 3,  //初始话并行请求不得超过3个
        name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
        cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成vendor为例
            vendor: {
                name: 'chunk',  //抽取的chunk的名字
                chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
                    return chunk.name !== 'my-excluded-chunk';
                },
                test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。
                    return module.type === 'javascript/auto';
                },
                // test: /node_modules\/(.*)\.js/,
                priority: 10,  //表示此缓存组的优先级.一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
                minChunks: 2,  //最少被几个chunk引用
                reuseExistingChunk: true,//	如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
            }
        }
    }
  },
  stats: 'errors-only'
  // stats: {
  //   all: true
  // }
}
