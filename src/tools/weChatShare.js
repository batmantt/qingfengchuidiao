/*
* 微信分享
* */
/* <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script> */
import wx from "weixin-js-sdk" 

export const setWeChatShare = (config = {}, shareDes = {}, debug = false) => {
  wx.config({
    debug: debug,
    appId: config.appId,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.sign,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
  });
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: shareDes.title,
      link: shareDes.link,
      imgUrl: shareDes.imgUrl,// 自定义图标
      success: function (res) {

      },
      cancel: function (res) {
      }
    });
    //分享给好友
    wx.onMenuShareAppMessage({
      title: shareDes.title, // 分享标题
      desc: shareDes.des, // 分享描述
      link: shareDes.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareDes.imgUrl, // 自定义图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
      },
      cancel: function () {
      }
    });
    wx.error(function (res) {
      //alert(res.errMsg);
    });
  });
};
