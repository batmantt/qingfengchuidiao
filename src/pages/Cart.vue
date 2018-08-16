<template>
  <div class="ds_main shopcar" v-cloak>
       <scroller>
              <div class="goods-list">
                <div class="mui-table-view-cell mui-transitioning" v-for="(item,index) in CartData" :key="index">
                  <div class="mui-slider-right mui-disabled">
                    <a class="mui-btn mui-btn-red mui-icon mui-icon-trash btn_delete"></a>
                  </div>
                <div class="mui-slider-handle" v-if="isshowcartlist" :data-id="item.id">
                  <div class="mui-table-cell ds_itembox" :data-id="item.id">
                      <div>
                        <div class="mui-input-row mui-checkbox mui-left" @tap="checkOne(item,index)">
                            <label :for="index"></label>
                            <input :value="index" name="checkbox1" class="ds_checkbox"
                                      v-model="item.checked" type="checkbox">
                        </div>  
                      </div>    
                      <div class="thumb_imgbox"><img v-lazy="item.goodsImage" class="thumb_img"></div>
                        <div class="info">
                          <h4 class="mui-ellipsis-2">{{item.goodsName}}</h4>
                            <div class="box">
                              <span class="price">&yen;{{isPlusMember? ((+item.goodsRealPrice)).toFixed(2) : (+item.goodsPrice).toFixed(2)}}</span>
                              <numberbox v-model="item.count" :changeGoodsId="item.id" ></numberbox>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div  class="emptycart_box">
                    <div class="cart_title" v-if="userOpenId==''||userOpenId=='null'||userOpenId==null?true:false">
                       您还没有登录，请立即 <a @tap="$router.push('./loginandregist')">登录</a>
                       <img src="../images/cart_arrow.png" alt="" @tap="$router.push('./loginandregist')">
                    </div>
                    <div class="emptycart" v-if="!isshowcartlist">
                        <img src="https://tango007.heeyhome.com/upload/15302/emptycart.e9e381e.png" alt="">
                        <p>购物车竟然是空的</p>
                    </div>
                </div>
                <div class="ds_hotsale_list prouct_list ds_picinfo">
                    <div class="ds_hotsale_title">热销推荐</div>
                    <ProductItem :dataList="dataList"/> 
                </div>
         </scroller>
        <section class="ds_topayall">
            <div class="ds_payall" v-if="settlement">
                <div>
                  <div class="mui-input-row mui-checkbox mui-left" @tap="checkAll" >
                      <input id="all" name="checkbox1"   v-model="isallchecked"
                        class="ds_checkbox"  type="checkbox"> 
                      <label for="all" style="">全选</label>
                  </div>
                </div> 
                <div class="ds_btn_r">
                    <div class="amount">
                    <p class="ds_total">合计:<span class="red">&yen;{{totalPrice.toFixed(2)}}</span></p>
                    <p class="ds_cut">已优惠<span class="red">&yen;{{totalPrice.toFixed(2)}}</span>(会员折扣)</p>
                    </div>
                    <div class="gotopayorder">
                      <button class="payorder_btn" @tap="dsPayBtn">去结算({{totalCount}})</button>
                    </div>
                </div>
            </div>
        </section>

        <div class="mui-backdrop" v-if="!settlement">
            <div class="toast">
                <div class="text_conf_pay">
                  <div class="close" @tap="close"></div>
                  <div class="text">确认付款</div>
                  </div>
                <div class="sum">&yen;{{(+totalPrice).toFixed(2)}}</div>
                <div class="pay_sta">
                  <span>付款方式</span>
                  <span>会员支付</span>
                  </div>
                <div class="account_bal">
                  <span>账户余额</span>
                  <span>{{(+userMemberBalance).toFixed(2)}}</span>
                </div>
                <div class="border-scale2"></div>
                <div class="pay_btn" @tap="_recharge">确认支付</div>
            </div>
        </div>
  </div>
</template>

<script>
import ProductItem from "../components/ProductItem.vue";
// import EmptyCart from "../components/EmptyPage.vue";
import numberbox from "../components/NumberBox.vue";
import { Toast } from "mint-ui";

import {
  getCart,
  listCart,
  listConsumptionDetail,
  listMemberRecord,
  listOrder,
  listGoods,
  recharge,
  payByMember,
  getDetailMember,
  getMemberDetail
} from "../api/http";
import store from "../store";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isshowcartlist: false,
      isallchecked: true,
      // 购物车的data列表
      CartData: [],
      // 存放推荐商品的信息
      dataList: {
        isshowcart: false,
        data: ""
      },
      userOpenId: "",
      appid: "wx6a6f27d3495ac929",
      //结算按钮
      settlement: true,
      // user_infilist:[],
      userMemberBalance: 0,
      cartinfo: this.$store.state.carts.length,
      paytoastdata: "",
      pageIndex: 1,
      pageSize: 50
    };
  },

  components: {
    numberbox,
    ProductItem
    // EmptyCart
  },
  watch: {
    CartData: {
      handler() {
        this.$store.commit("updateAll", this.CartData);
      },
      deep: true
    }
  },
  methods: {
    checkAll() {
      let self = this;
      //self.settlement = false;
      self.isallchecked = !self.isallchecked;
      self.CartData.forEach(el => {
        el.checked = self.isallchecked;
      });
    },
    checkOne(item, index) {
      let self = this;
      item.checked = !item.checked;
      self.isallchecked =
        self.CartData.filter(el => {
          return el.checked === false;
        }).length === 0
          ? true
          : false;
    },
    getAllcartGoods(data) {
      let self = this;
      listCart(data).then(res => {
        // console.log("我是购物车列表数据", res);
        res.data.dataList.length == 0
          ? (self.isshowcartlist = false)
          : (self.isshowcartlist = true);

        if (res.data.code == 200) {
          let list = res.data.dataList;
          for (var i = 0; i < list.length; i++) {
            self.CartData.push({
              id: list[i].id,
              count: list[i].cartNumb,
              goodsImage: list[i].goodsImage,
              goodsPrice: list[i].goodsPrice,
              goodsRealPrice: list[i].goodsRealPrice,
              goodsName: list[i].goodsName,
              checked: true
            });
          }

          self.$nextTick(() => {
            let delbtns = document.querySelectorAll(".mui-btn-red");
            for (let i = 0; i < delbtns.length; i++) {
              delbtns[i].addEventListener("click", function(e) {
                let id = e.target.parentElement.nextElementSibling.getAttribute(
                  "data-id"
                );
                if (id == null) return;
                self.delCart(id);
              });
            }
          });
        }
      });
    },
    getGoodsList() {
      // 获取推荐商品
      let self = this;
      listGoods({
        appid: self.appid,
        pageIndex: 1,
        pageSize: 50
      }).then(res => {
        // console.log("推荐商品相关数据", res);
        if (res.data.code == 200) {
          this.dataList.data = res.data.dataList;
        }
      });
    },
    dsPayBtn() {
      let self = this;
      if (self.allCheckedinfo.length == 0) {
        self.mui.toast("请选择商品");
      } else {
        self._getMemberDetail();
      }
    },
    //会员卡信息查询 _wzb
    _getMemberDetail() {
      let self = this;
      getMemberDetail({
        appid: self.appid,
        userOpenId: self.userOpenId
      }).then(res => {
        console.log("会员卡信息查询", res);
        self.userMemberBalance = res.data.data.userMemberBalance;
        // console.log( self.userMemberBalance , self.totalPrice)
        console.log(res.data.data.userMemberLevel);
        // 超级会员 直接购买 wzb 0815 13：14 修改
        if (res.data.data.userMemberLevel == "超级会员") {
          self._recharge();
          return false;
        } else if (+self.userMemberBalance < +self.totalPrice) {
          Toast("您的余额为" + self.userMemberBalance + "元，余额不足请充值");
          return false;
        }

        self.settlement = false;
      });
    },
    // 会员支付
    _recharge() {
      let self = this;
      payByMember({
        appid: self.appid,
        userOpenId: self.userOpenId,
        goodsList: self.allCheckedinfo,
        memberId: localStorage.getItem("memberid")
      }).then(res => {
        if (res.data.code == 200) {
          // console.log("会员方式支付成功");
          let orderId = res.data.data.orderNo;
          self.$router.push("./paysuccess/" + orderId);
          self.$store.commit("deleteAll");
          self.settlement = false;
        } else {
          // 可能库存不足
          self.mui.toast(res.data.message);
          self.settlement = false;
        }
      });
    },
    delCart(goodId) {
      let self = this;
      self.CartData.length == 0
        ? (self.isshowcartlist = false)
        : (self.isshowcartlist = true);
      self.userOpenId = localStorage.getItem("userOpenId");

      let cartsinfo = self.carts.filter(e => {
        if (e.id != goodId) {
          return { id: e.id, count: e.count };
        }
      }); //改变vuex中的状态
      self.CartData = self.CartData.filter(e => {
        if (e.id != goodId) {
          return e;
        }
      }); //改变页面渲染

      // 获取新的数组 发请请求，购物车数据变化
      let newcartsinfo = cartsinfo.map((v, i) => {
        return { goodsId: v.id, number: v.count };
      });
      getCart({
        appid: self.appid,
        userOpenId: self.userOpenId,
        goodsList: newcartsinfo
      }).then(res => {
        if (res.data.code == 200) {
          // 请求成功之后将数据保存到store
          self.$store.commit("updateAll", cartsinfo);
          Toast({ message: "删除成功" });
        } else {
          Toast({ message: res.data.message });
        }
        this.$nextTick(_ => {
          //消除滑动的删除按钮
          let btnDeletes = Array.from(
            document.getElementsByClassName("btn_delete")
          );
          let leftHandles = Array.from(
            document.getElementsByClassName("mui-slider-handle")
          );
          for (let i = 0; i < btnDeletes.length; i++) {
            btnDeletes[i].style = "transform:translate(0px, 0px)";
            leftHandles[i].style = "transform:translate(0px, 0px)";
          }
        });
      });
    },
    close() {
      let self = this;
      let t1 = setTimeout(function() {
        self.settlement = true;
        clearTimeout(t1);
      }, 350);
    }
  },
  computed: {
    allCheckedinfo() {
      let allcheckedlist = [];
      this.CartData.forEach(v => {
        //如果元素是被选中的
        if (v.checked) {
          allcheckedlist.push({ goodsId: v.id, number: v.count });
        }
      });
      return allcheckedlist;
    },
    totalCount() {
      //找出数组中所有checked属性为true的元素 将其count累加
      let count = 0;

      this.CartData.forEach(v => {
        //如果元素是被选中的
        if (v.checked) {
          count += v.count;
        }
      });
      return count;
    },

    totalPrice() {
      //找出数组中所有checked属性为true的元素 将其count * pirce 累加
      let price = 0;
      let self = this;

      self.CartData.forEach(v => {
        //如果元素是被选中的
        if (v.checked) {
          if (self.$store.state.isPlusMember) {
            price += +v.count * +v.goodsRealPrice;
          } else {
            price += +v.count * +v.goodsPrice;
          }
        }
      });
      return price;
    },
    ...mapGetters({
      carts: "carts", //后加为删除
      isPlusMember: "isPlusMember"
    })
  },
  created() {
    let self = this;
    self.userOpenId = localStorage.getItem("userOpenId") || "";

    if (self.userOpenId) {
      self.getAllcartGoods({
        userOpenId: self.userOpenId,
        appid: self.appid,
        pageSize: self.pageSize,
        pageIndex: self.pageIndex
      });
      // self.isshowcartlist = true;
    } else {
      self.isshowcartlist = false;
    }

    self.getGoodsList();
  },
  mounted() {
    let self = this;
    self.mui(".mui-scroll-wrapper").scroll();
  },
  store
};
</script>

<style lang="less" scoped>
.info {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  h4 {
    font-size: 13px;
    height: 36px;
    line-height: 18px;
    color: #222222;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    padding-right: 80px;
  }
  .box {
    display: flex;
    justify-content: space-between;
    .price {
      color: #ec0004;
      font-size: 15px;
      line-height: 33px;
    }
    .number-box {
      height: 24px !important;
      align-self: flex-end;
    }
  }
}
.ds_hotsale_list {
  padding-bottom: 100px;
}
.ds_main {
  height: 100vh;
  //  overflow-y: scroll;
}
.scroller {
  position: relative;
}

.shopcar {
  .goods-list {
    .ds_itembox {
      display: flex;
      align-items: center;
      padding: 10px;
    }
    .thumb_img {
      background-color: #eee;
    }
    .thumb_img {
      width: 90px;
      height: 90px;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
}
// .ds_pic_header {
//   display: none !important;
//   height: 0 !important;
// }
.ds_main .mui-table-view-chevron .mui-table-view-cell {
  padding-right: 0;
}
.ds_main .mui-table-view-cell {
  padding: 0;
  margin: 0;
  height: 110px;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
}
.ds_main.mui-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  top: 0;
  right: 0;
}
.ds_main .mui-checkbox.mui-left input[type="checkbox"] {
  left: 0;
  &::before {
    font-size: 18px;
  }
}
.ds_main .mui-checkbox.mui-left label {
  padding-left: 21px;
}
.ds_topayall {
  overflow: hidden;
  position: fixed;
  right: 0;
  bottom: 50px;
  z-index: 999;
  background: #fff;
  width: 100%;
}
.ds_payall {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 13px;
  line-height: 18px;
  border-top: 1px solid #e2e2e2;
  .amount {
    // padding: 10px 0;
    .ds_total {
      color: #222;
      margin-bottom: 4px;
    }
    .ds_cut {
      color: #989898;
      margin-bottom: 4px;
    }
  }
  .mui-input-row label {
    padding: 20px 15px;
  }
  .mui-checkbox.mui-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    label {
      padding-left: 0px;
      padding-right: 10px;
      width: 60px;
      line-height: 18px;
      height: 20px;
    }
    input[type="checkbox"] {
      &::before {
        margin-left: 4px;
      }
    }
  }
}
.ds_main .mui-table-view-cell:after {
  background-color: #fff;
}
.ds_btn_r {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gotopayorder {
  .payorder_btn {
    width: 100px;
    height: 50px;
    border: none;
    background-color: #32c0e3;
    color: #fff;
    font-size: 16px;
  }
}
.red {
  color: #ec0004;
}

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

.emptycart_box {
  .cart_title {
    position: relative;
    text-align: center;
    height: 40px;
    width: 100%;
    background-color: #fff8d8;
    color: #f4931f;
    font-size: 13px;
    line-height: 40px;
    a {
      color: #181818;
    }
    img {
      position: absolute;
      top: 50%;
      right: 15px;
      width: 6px;
      height: 11px;
      transform: translateY(-50%);
    }
  }
  .emptycart {
    overflow: hidden;
    width: 100%;
    height: 290px;
    img {
      width: 210px;
      height: 210px;
      margin: 42px auto 10px;
    }
    p {
      text-align: center;
      color: #999;
    }
  }
}
</style>
 