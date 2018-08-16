<template>
  <div class="ds_main" v-cloak>
     <!-- <div id="refreshContainer" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll"> -->
      <scroller   
      ref="vueScroller"
      class="my-scroller"
      refreshText="下拉刷新"
      :on-refresh="refresh"
      :on-infinite="infinite"
      style="height: calc(100% - 60px)"
      :no-data-text="dataList.data.length>0?'没有更多数据':'暂无数据'">
        <div class="mui-table-view mui-table-view-chevron">
          <!-- 头 -->
          <div class="mui-card ds_goodsdetail_header">
            <div class="mui-card-content">
              <div class="mui-card-content-inner">
                <!-- <mt-swipe :auto="4000"> -->
                  <!-- <mt-swipe-item v-for="(item, index) in imgs" :key="index"> -->
                    <img  v-lazy="goodsInfo.goodsImage" alt="">
                    <!-- v-lazy="goodsInfo.goodsImage" -->
                  <!-- </mt-swipe-item> -->
                <!-- </mt-swipe> -->
              </div>
            </div>
          </div>
          <!-- 主要部分 -->
          <div class="ds_card">
            <p class="ds_header">{{goodsInfo.goodsName}}</p>
            <p class="ds_detail_info mui-ellipsis-2">
            {{goodsInfo.goodsName}}
            </p>
            <p class="ds_price">
                <span class="sale_price">&yen;{{(0+goodsInfo.goodsPrice).toFixed(2)}}</span>
            </p>
          </div>
          <div class="ds_picinfo">

            <div class="ds_pic_header">
              <div class="ds_detail_title">
                  <div style="padding:0 8px">
                     <img class="titleimg" src="../images/titledetail.png" alt=""> <span>详情</span>
                  </div>
              </div>
            </div>

             <div class="ds_piclist">
                <div class="ds_picitem" v-for="(item,index) in imgs" :key="index">
                    <img v-lazy="item?item:''" alt="图破了">
                </div>
             </div>
          </div>
          <!-- 推荐商品 -->
            <div class="ds_hotsale_list prouct_list ds_picinfo">
                <div class="ds_hotsale_title">热销推荐</div>
                <ProductItem :dataList="dataList"/> 
            </div>
          <DyTitle></DyTitle>
           <!-- 底部button -->
        </div>
      </scroller>
      <!-- </div>
     </div> -->

     <div class="pay_bottom">
      <div class="ds_goodsdetail_btns">
        <div class="btns">
          <div class="ds_addcart btn_item" @tap="addToCart">加入购物车</div>
          <div class="ds_buynow btn_item" @tap="buyNow">立即购买</div>
        </div>
      </div>
     </div>
     <div class="mui-backdrop" v-if="!settlement">
          <div class="toast">
              <div class="text_conf_pay">
                <div class="close" @tap="settlement=true"></div>
                <div class="text">确认付款</div>
                </div>
              <div class="sum">&yen;{{goodsInfo.goodsPrice.toFixed(2)}}</div>
              <div class="pay_sta">
                <span>付款方式</span>
                <span>会员支付</span>
                </div>
              <div class="account_bal">
                <span>账户余额</span>
                <span>{{(+userMemberBalance).toFixed(2)}}</span>
              </div>
              <div class="border-scale2"></div>
              <div class="pay_btn" @tap="comfirmPay">确认支付</div>
          </div>
     </div>
  </div>
</template>
<script>
import ProductItem from "../components/ProductItem.vue"
import DyTitle from "../components/DyTitle.vue"
import dateformat from "../filters/dateformat"
import store from "../store" 
import { getCart, getGoodsDetail,getMemberDetail,payByMember , listGoods} from "../api/http.js"
import { locale } from 'moment';
import { Toast } from 'mint-ui';
// 加入购物车，商品详情 ， 会员支付payByMember
export default {
  data() {
    return {
      // 推荐商品信息
      dataList:{isshowcart:false,data:[]},
      imgs: [],   //详情三张图
      goodsInfo: "",   //商品信息
      count: 1,
      isShowBall: false,
      userOpenId : "",
      appid : "wx6a6f27d3495ac929",
      userMemberBalance:'',
      settlement:true,
          pageSize: 6,
          isEnd: false, // 是否加载完毕
          pageIndex:0
    }
  },
  filters: {
    dateformat
  },
  components: {
    ProductItem,
    DyTitle
  },
  methods: {
    addToCart() {
      // if(1==0){

      //     this.mui.comfirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
      //         if (e.index==0) self.$router.push('/cart')
      //       })

      //   }else{
      //this.$router.push('/login')
      //   }
      //显示小球
      // this.isShowBall = true;
      //1. 获取当前商品的id和当前商品的数量，新建一个对象
      //2. 调用vuex提供的store.commit("addToCarts") 将数据添加到vuex和localstorage中
      let self = this;
      let goodId = self.$route.params.id;
      let cart = { id: goodId, count: self.count };
      let ParamNumber = self.$store.getters.getCountById(goodId)
        ? 1 + self.$store.getters.getCountById(goodId)
        : 1;

      // console.log(this.$route.params.id);
      self.$store.commit("addToCarts", cart);

      let cartsinfo = JSON.parse(localStorage.getItem("cartsinfo")) || [];
      let newcartsinfo = [];
      for (let i = 0; i < cartsinfo.length; i++) {
        let newcartitem = {};
        newcartitem["goodsId"] = cartsinfo[i].id;
        newcartitem["number"] = cartsinfo[i].count;
        newcartsinfo.push(newcartitem);
      }

      //  "goodsId":goodId,
      //           "number": ParamNumber
      // console.log(newcartsinfo);
      if (self.appid && self.userOpenId) {
        getCart({
          appid: self.appid,
          userOpenId: self.userOpenId,
          goodsList: newcartsinfo
        }).then(res => {
          //console.log(res)
          if (res.data.code == 200) {
            //  加入购物车成功
            Toast({ message: "添加购物车成功" });
          } else {
            Toast({ message: res.data.message });
          }
        });
      }
    },
    getGoodsInfo(){
      let self = this
      getGoodsDetail({
              "appid": this.appid,
              "pageIndex": 1,
              "pageSize": 10,
              "goodsId":self.$route.params.id
      }).then(res =>{
          // console.log('商品详情相关数据',res)
          if(res.data.code == 200){
                self.goodsInfo= res.data.data
                //console.log('我是goosinfo',this.goodsInfo)
                
                self.imgs = [res.data.data.goodsImageOne,res.data.data.goodsImageTwo,res.data.data.goodsImageThree]
                self.imgs = self.imgs.filter(v =>{
                  return   (v +"") !=="null"
                })
                //console.log( self.imgs )
          }
           
      })
    }, 
     refresh (done) {
        let self = this
        self.isEnd = false
        self.getGoodsList(0, done)
      },
      infinite (done) {
        let self = this
        self.getGoodsList(1, done)
      },
      // type 1 加载更多 0 刷新
    getGoodsList( type,done){
        let self = this
        if (type === 0) {
          self.pageIndex = 0
        }
         if (self.isEnd) {
          done(true)
          let contentId = self.$refs.vueScroller.containerId
          document.getElementById(contentId).style.height = 'calc(100% + 50px)'
          self.$refs.vueScroller.resize()
          return
        }
        self.pageIndex++
        listGoods({
          "appid": self.appid,
          "pageIndex": self.pageIndex,
          "pageSize":self.pageSize
        }).then(res =>{
             //console.log('推荐商品相关数据',res)
              //self.dataList.data = res.data.dataList || []

          let dataList = res.data.dataList || []
          
          if (type === 0) {
            self.dataList.data = dataList
          } else {
            //console.log( Array.from( self.dataList.data ) , 22222, dataList)
            for (let i = 0; i < dataList.length; i++) {
              self.dataList.data.push(dataList[i])
            }
            // let arr = Array.from( self.dataList.data ).concat( dataList )
            // self.dataList.data = arr 
            if (dataList.length < self.pageSize || (self.dataList.data.length >= 20 && self.type === 2)) {
              self.isEnd = true
            }
          }
          done()
        }, function (res) {
          done()
          self.isEnd = true
        })
    },
    comfirmPay() {
      //  会员支付
      let self = this;
      payByMember({
        appid: self.appid,
        userOpenId: self.userOpenId,
        goodsList: [{ goodsId: self.$route.params.id, number: 1 }],
        memberId: localStorage.getItem("memberid")
      }).then(res => {
        if (res.data.code == 200) {
          self.mui.toast("支付成功，等待商家核销");
          let orderNo = res.data.data.orderNo;
          self.$router.push("/paysuccess/" + orderNo);
        }
      });
    },
    //会员卡信息查询 _wzb
    _getMemberDetail() {
      let self = this;
      getMemberDetail({
        appid: self.appid,
        userOpenId: self.userOpenId
      }).then(res => {
        //console.log("会员卡信息查询", res);
        self.userMemberBalance = res.data.data.userMemberBalance;
        // 超级会员 直接购买 wzb 0815 13：14 修改
        if (res.data.data.userMemberLevel == "超级会员") {
          self.comfirmPay()
          return false;
        } else if (0 + self.userMemberBalance < self.goodsInfo.goodsPrice) {
          self.mui.toast("余额不足请充值");
          return false;
        }
        self.settlement = false;
      });
    },
    buyNow() {
      // 会员支付
      let self = this;
      if (self.userOpenId) {
        self._getMemberDetail();
      } else {
        self.$router.push("/loginandregist");
      }
    }
  },
  watch: {
    // "$route": "getGoodsInfo",   //路由变化，重新调用商品详情Api
    "$route":{
       handler(){
          let self = this 
          self.getGoodsInfo()
          self.$router.push( '/goodsdetail/'+self.$route.params.id )
          self.$nextTick(() => {
            self.$refs.vueScroller.resize()
            self.$refs.vueScroller.scrollTo(0, 0)
          })
       }
    }
  },
  created(){
    let self = this
    self.userOpenId=localStorage.getItem("userOpenId")||""
    self.getGoodsInfo()
    // self.getGoodsList( 1 )
 
  },
   mounted(){
    // this.mui(".mui-scroll-wrapper").scroll();
     
  },
  store
};
</script>

<style lang="less" scoped>
.ds_goodsdetail_header {
  margin: 0;
  height: 312px;
  width: 100%;
  background-color: #eee;
}
.ds_card {
  padding: 0 10px;
  font-size: 13px;
  .ds_header {
    line-height: 33px;
    color: #222;
  }
  .ds_detail_info {
    color: #656565;
    line-height: 18px;
  }
  .ds_price {
    font-size: 22px;
    line-height: 33px;
    color: #ec0004;
  }
}

.titleimg {
  width: 11px;
  height: 11px;
  display: inline-block;
}

.ds_goodsdetail_btns {
  height: 60px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  text-align: center;
  .btns {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    .btn_item {
      border-radius: 2px;
      width: 48%;
      color: #fff;
    }
    .ds_addcart {
      background-color: #b1b1b1;
    }
    .ds_buynow {
      background-color: #32c0e3;
      margin-left: 4%;
    }
  }
}

.ds_main {
  .mui-card {
    box-shadow: none;
    margin: 0;
  }
  .mint-swipe {
    height: 180px;
  }
  .mint-swipe-item {
    text-align: center;
  }
  .mint-swipe-item img {
    max-height: 100%;
  }
  .mui-card-footer {
    display: block;
  }
}
.sale_price {
  color: red;
  font-size: 18px;
}

.redball {
  position: absolute;
  top: 440px;
  left: 175px;
  width: 14px;
  height: 14px;
  z-index: 999;
  border-radius: 50%;
  background-color: red;
}
.pay_bottom {
  position: fixed;
  bottom: 50px;
  left: 0;
  z-index: 9;
  background-color: #fff;
  width: 100%;
  height: 60px;
}
.ds_productitem {
  overflow: hidden;
}
.ds_hotsale_list {
  .ds_hotsale_title {
    font-size: 13px;
    line-height: 33px;
    color: #222;
    text-align: center;
  }
}
.ds_picinfo {
  font-size: 13px;
  color: #9c9c9c;
}
.gooddetailtitle {
  margin-bottom: 50px;
}

// 支付弹出toast

.ds_main .mui-backdrop {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  .toast {
    width: 100%;
    height: 364px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #ffffff;
    .text_conf_pay {
      width: 100%;
      height: 16.5px;
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      line-height: 16.5px;
      color: #222222;
      display: flex;
      margin-top: 18px;
      align-items: center;
      .close {
        width: 14px;
        height: 14px;
        background: url("../images/close.png") center no-repeat;
        background-size: 100%;
        margin-left: 10px;
        position: absolute;
      }
      .text {
        width: 100%;
        height: 17px;
      }
    }
    .sum {
      width: 100%;
      height: 23px;
      font-family: PingFang-SC-Bold;
      font-size: 30px;
      font-weight: bold;
      line-height: 23px;
      letter-spacing: 0px;
      color: #222222;
      margin-top: 41px;
    }
    .pay_sta,
    .account_bal {
      width: 93.86%;
      height: 14.5px;
      line-height: 14.5px;
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      color: #222222;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    .pay_sta :last-child .account_bal :last-child {
      height: 14.5px;
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      line-height: 14.5px;
      color: #9c9c9c;
    }
    .account_bal :last-child {
      color: #ec0004;
    }
    .border-scale2 {
      margin-top: 15px;
      width: 92%;
    }
    .pay_btn {
      width: 90.7%;
      height: 41px;
      background-color: #32c0e3;
      border-radius: 4px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 41px;
      color: #fff;
      margin-top: 110px;
    }
  }
}
</style>