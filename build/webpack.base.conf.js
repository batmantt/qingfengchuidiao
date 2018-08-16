'use strict'
//  var webpack=require("webpack")  //为引入jq

const path = require('path')
const utils = require('./utils')
const config = require('../config')
// 工具函数集合
const vueLoaderConfig = require('./vue-loader.conf')
// 获得绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint? [{
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //     emitWarning: !config.dev.showEslintErrorsInOverlay
      //   }
      // }] : []),
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap:true
          }
        },{
          loader:'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        },
        {
          loader:'postcss-loader',
          options: {
            sourceMap:true
          }
        },
        {
          loader:'less-loader',
          options: {
            sourceMap:true
          }
        }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin('common.js'),
  //   new webpack.ProvidePlugin({
  //       jQuery: "jquery",
  //       $: "jquery"
  //   })
  //   ]
}


    // "jquery": "^2.2.3"
