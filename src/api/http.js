
import axios from 'axios'

 //打包时候使用

const base_url = 'https://tango.heeyhome.com' 


// const base_url = 'https://tango007.heeyhome.com'

// const base_url = ''   //开发环境使用

// const base_url = 'http://192.168.10.140:8114//swagger-ui.html#!/user-controller/checkTelephoneUsingPOST'

//-----------用户模块
// 登录接口
export const tokenLogin = data => {
  return axios.post(base_url + '/mall/wechat/user/tokenLogin', data)
}
//公众号用户登陆接口 
export const publicLogin = data => {
  return axios.post(base_url + '/mall/wechat/user/publicLogin', data)
}
// 积分历史
export const listIntegral = data => {
  return axios.post(base_url + '/mall/wechat/user/listIntegral', data )
} 
//订阅号注册
export const registered = data => {
  return axios.post(base_url + '/mall/wechat/user/registered', data )
} 
//验证手机号
export const checkTelephone = data => {
  return axios.post(base_url + '/mall/wechat/user/checkTelephone', data )
} 

// 短信验证码
export const smsSend = data => {
  return axios.post(base_url + '/mall/wechat/sms/send', data )
}   

// 订阅号用户修改密码
export const modifyPassword = data => {
  return axios.post(base_url + '/mall/wechat/user/modifyPassword', data )
}   

// 订阅号注销登录
export const cancellation = data => {
  return axios.post(base_url + '/mall/wechat/user/cancellation', data )
}   
// 用户 “我的”  头部信息刷新
export const userinfoRefresh = data => {
  return axios.post(base_url + '/mall/wechat/user/refresh', data )
} 

// 设置里面 修改用户信息接口
export const modifyUserInfo = data => {
  return axios.post(base_url + '/mall/wechat/user/modify', data )
} 

//--------------商家商品模块



//商品详情
export const getGoodsDetail = data => {
  return axios.post(base_url + '/mall/wechat/goods/getGoodsDetail', data )
} 
 
//获取商家信息
export const getShopDetail = data => {
  return axios.post(base_url + '/mall/wechat/goods/getShopDetail', data )
} 
//商品列表包括条件查询
export const listGoods = data => {
  return axios.post(base_url + '/mall/wechat/goods/listGoods', data )
} 
//展示所有商品标签
export const listLabel = data => {
  return axios.post(base_url + '/mall/wechat/goods/listLabel', data )
} 




//---------- 会员卡模块

//指定用户会员卡详情
export const getDetailMember = data => {
  return axios.post(base_url + '/mall/wechat/member/getDetailMember', data )
} 
//会员卡信息
export const getMemberDetail = data => {
  return axios.post(base_url + '/mall/wechat/member/getMemberDetail', data )
} 
//商家会员卡介绍
export const getMemberIntroduce = data => {
  return axios.post(base_url + '/mall/wechat/member/getMemberIntroduce', data )
} 
//商家查看自己的会员人数
export const listMemberNumb = data => {
  return axios.post(base_url + '/mall/wechat/member/listMemberNumb', data )
} 
//会员卡支付
export const payByMember = data => {
  return axios.post(base_url + '/mall/wechat/member/payByMember', data )
} 

//点击成为会员
export const toBeMember = data => {
  return axios.post(base_url + '/mall/wechat/member/toBeMember', data )
} 

//-----------------会员卡重置支付
export const resetgetpay = data => {
  return axios.get(base_url + '/mall/wechat/memberPay/getpay', data )
} 
//   DELETE , GET ,HEAD ,OPTIONS ,PATCH  ,POST  ,PUT  

//会员支付方式
export const recharge = data => {
  return axios.post(base_url + '/mall/wechat/memberPay/recharge', data )
} 
//商家给指定用户充值
export const topMember = data => {
  return axios.post(base_url + '/mall/wechat/memberPay/topMember', data )
} 

 //--------------微信端商户管理
  
//公众号核销
export const verificationCode = data => {
  return axios.post(base_url + '/mall/wechat/merchant/verificationCode', data )
} 


//-------------订单购物车以及记录模块
//加入购物车
export const getCart = data => {
  return axios.post(base_url + '/mall/wechat/order/getCart', data )
} 
//查看购物车列表
export const listCart = data => {
  return axios.post(base_url + '/mall/wechat/order/listCart', data )
} 
//消费明细
export const listConsumptionDetail = data => {
  return axios.post(base_url + '/mall/wechat/order/listConsumptionDetail', data )
} 
//会员卡充值记录
export const listMemberRecord = data => {
  return axios.post(base_url + '/mall/wechat/order/listMemberRecord', data )
} 
//查看订单包括条件查询
export const listOrder = data => {
  return axios.post(base_url + '/mall/wechat/order/listOrder', data )
} 


//微信支付
//get  delete

export const getpay = data => {
  return axios.get(base_url + '/mall/wechat/pay/getpay', data )
} 

export const deletepay = data => {
  return axios.delete(base_url + '/mall/wechat/pay/getpay', data )
} 


//  图片上传
export const uploadFile = data => {
  return axios.post(base_url + '/mall/wechat/upload/uploadFile', data )
} 


