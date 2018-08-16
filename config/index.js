'use strict'
// Template version: 1.2.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const  target = "https://tango.heeyhome.com"
// const  target = "http://47.98.32.229:8114"


module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/mall/wechat/user/tokenLogin': {
        target: target,
        secure: false
      },
      '/mall/wechat/user/registered': {
          target,
          secure: false
      },
      '/mall/wechat/user/checkTelephone': {
          target,
          secure: false
      },
      '/mall/wechat/goods/listGoods':{
          target,
          secure: false
      },
      '/mall/wechat/goods/getGoodsDetail':{
          target,
          secure: false
      },
      '/mall/wechat/memberPay/recharge':{
          target,
          secure: false
      },

      '/mall/wechat/order/getCart':{
          target,
          secure: false
      },
      '/mall/wechat/goods/getShopDetail':{
          target,
          secure: false
      },
      '/mall/wechat/goods/listLabel':{
          target,
          secure: false
      },
      '/mall/wechat/order/listCart':{
          target,
          secure: false
      },
      '/mall/wechat/order/listConsumptionDetail':{
          target,
          secure: false
      },
      '/mall/wechat/order/listMemberRecord':{
          target,
          secure: false
      },
      '/mall/wechat/order/listOrder':{
          target,
          secure: false
      },
      '/mall/wechat/pay/getpay':{
          target,
          secure: false
      },
      '/mall/wechat/user/listIntegral':{
          target,
          secure: false
      },
      '/mall/wechat/sms/send':{
          target,
          secure: false
      },
      '/mall/wechat/user/cancellation':{
          target,
          secure: false
      },
      '/mall/wechat/member/getDetailMember':{
          target,
          secure: false
      },
      '/mall/wechat/member/getMemberDetail':{
          target,
          secure: false
      },
      '/mall/wechat/memberPay/topMember':{
          target,
          secure: false
      },
      "/mall/wechat/user/modifyPassword":{
          target,
          secure: false
      },
      '/mall/wechat/member/payByMember':{
          target,
          secure: false
      },
      '/mall/wechat/merchant/verificationCode':{
          target,
          secure: false
      },
      '/mall/wechat/member/toBeMember':{
          target,
          secure: false
      },
      '/mall/wechat/upload/uploadFile':{
        target,
        secure: false
      },
      '/mall/wechat/user/refresh':{
        target,
        secure: false
      },
      '/mall/wechat/user/modify':{
        target,
        secure: false
      },
    },

    // Various Dev Server settings
    host: "192.168.1.136", // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // 构建发布的根目录，可配置为资源服务器域名或CDN域名
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
