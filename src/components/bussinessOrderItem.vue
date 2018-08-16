<template>
  <div class="order orderitem" v-if="dataitem.orderStatus==3?false:true">
            <div class="left">
                <ul class="mui-table-view">
                  <li class="mui-table-view-cell ord_num">订单编号:{{dataitem.orderNo}}</li>
                  <li class="mui-table-view-cell  ord_time">{{dataitem.orderPayTime | dateformat("YYYY-MM-DD HH:mm:ss")}}</li>
                  <!-- 循环渲染 -->

                  <li class="mui-table-view-cell goods_name" v-for="(v,i) in dataitem.goodsModels" :key="i">{{v.goodsName}}</li>
                 
                  <li class="mui-table-view-cell ord_hxtime" 
                      v-if="dataitem.orderUseTime?true:false">核销时间:{{dataitem.orderUseTime| dateformat("YYYY-MM-DD HH:mm:ss")}}
                  </li>
                  <li class="mui-table-view-cell ord_state">
                      {{dataitem.orderStatus==8?"已核销":(dataitem.orderStatus==2?"未核销":"")}}
                  </li>
                </ul>
            </div>
            <div class="right">
                <ul class="">
                     <li class="mui-table-view-cell_btn">
                         <p></p>
                        <button :class="dataitem.orderStatus==8?'no_sta active':'no_sta'" @tap="handlerCheckPay(dataitem.orderStatus,dataitem.orderNo)">{{dataitem.orderStatus==8?"已核销":(dataitem.orderStatus==2?"点击核销":"")}}</button>
                     </li>
                     <li class="mui-table-view-cell goods_name"  v-for="(v,i) in dataitem.goodsModels" :key="i">
                         <p>&yen;{{ isPlusMember? (+dataitem.goodsModels[0].goodsRealPrice).toFixed(2) : (+dataitem.goodsModels[0].goodsPrice).toFixed(2)}}</p>
                         <p>x{{v.cartNumb}}</p>
                     </li>
                     
                  
                     <li class="mui-table-view-cell_btn ord_state ">
                         <p></p>
                         <p>总价 &yen;{{(+dataitem.orderPrice).toFixed(2)}}</p>
                     </li>
                </ul>
            </div>
     
  </div>
</template>
<script>
import dateformat from "../filters/dateformat";
import { verificationCode } from "../api/http";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    handlerCheckPay(status, orderNo) {
      //status==8  //已经核销
      //  status ==2 //去核销详情页面
      //orderStatus =3属于会员充值
      let self = this;
      if (status == 8) {
        return false;
      }
      if (status == 2) {
        //  弹出蒙层
        let dataforFar = {
          isShowToast: true,
          orderNo: orderNo,
          _verificationCode: self._verificationCode
        };
        self.$emit("ievent", dataforFar);
        // 商家用户调用核销

        //this.$router.push('/paysuccess/'+orderId);
      }
    },
    _verificationCode(orderNo, shopId) {
      let self = this;
      verificationCode({
        orderNo: orderNo,
        shopId: shopId
      }).then(res => {
        //console.log(res)
        if (res.data.code == 200) {
          self.$emit("ievent", { isShowToast: false });
          self.mui.toast("核销成功！");
          self.dataitem.orderStatus = 8
        }
      });
    }
  },
  filters: {
    dateformat
  },
  computed: {
    ...mapGetters({
      isPlusMember: "isPlusMember"
    })
  },
  props: ["dataitem"]
};
</script>
<style lang="less" scoped>
// 公共样式
.padding {
  padding: 0 0 0 12.5px;
}
.margin-top(@num) {
  margin-top: @num;
}
.height(@h) {
  height: @h;
  line-height: @h;
}

.order mui-table-view-cell {
  padding: 0;
}
//-----------vv添加
.orderitem {
  border-bottom: 1px solid #e5e5e5;
}
.ds_main .order .right button.active {
  background-color: #f8f8f8;
  border: solid 1px #e5e5e5;
  color: #989898;
}
//---------
.ds_main {
  width: 100%;
  .top_chose {
    width: 100%;
    height: 46px;
    border: solid 1px #e8e8e8;
    display: flex;
    .P_ch {
      color: #32c0e3;
      text-decoration: underline;
    }
    p {
      width: 50%;
      text-align: center;
      line-height: 45px;
    }
  }
  .underline {
    width: 100%;
    height: 10px;
    background-color: #f7f7f7;
  }
  .order {
    padding-top: 10px;
    width: 100%;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
      justify-content: space-between;
      button {
        padding: 0;
        margin: 0;
        width: 75px;
        height: 24.5px;
        border-radius: 12px;
        border: solid 0.5px #e5e5e5;
        font-size: 13px;
        color: #989898;
        margin-bottom: 10px;
      }
      .no_sta {
        color: #32c0e3;
        border: solid 1px #85e7ff;
      }
      li {
        display: flex;
        justify-content: space-between;
        &:first-child {
          margin-right: 32.5px;
        }
        &:last-child {
          margin-right: 0px;
        }
      }
      .mui-table-view-cell_btn {
        display: flex;
        justify-content: space-between;
        margin-right: -11.5px;
      }
    }
    .ord_num {
      font-size: 13px;
      letter-spacing: 0px;
      color: #222222;
      .height(12.5px);
      .padding;
    }
    .ord_time {
      .height(16px);
      font-size: 10px;
      color: #989898;
      padding: 0 0 8.5px 12.5px;
      .margin-top(6px);
    }
    .goods_name {
      .height(13.5px);
      font-size: 13px;
      color: #989898;
      .padding;
      .margin-top(12px);
      overflow: hidden;
      max-width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ord_state {
      .height(12.5px);
      font-size: 12px;
      color: #222222;
      padding: 0 0 22.5px 12.5px;
      .margin-top(20px);
    }
  }
  .list {
    width: 100%;
    margin-left: 28px;
    border-bottom: 1px solid #f2f2f2;
    .inp_number {
      display: flex;
      margin-top: 18px;
      p {
        width: 35px;
        font-size: 15px;
        color: #222222;
        font-weight: 600;
      }
      input {
        font-size: 15px;
        color: #989898;
        padding: 0;
        height: 20px;
        border: none;
      }
    }
    .cof_btn {
      width: 83px;
      height: 30px;
      border-radius: 2px;
      border: solid 0.5px #d9d9d9;
      margin-top: 15px;
      margin-left: 30px;
      margin-bottom: 15px;
    }
  }
  .vip_info {
    width: 93.6%;
    background-color: #f6f6f6;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    div {
      padding: 12px;
      display: flex;
      :last-child {
        margin-left: 20px;
      }
      p {
        font-size: 14px;
        color: #222222;
      }
    }
  }
  .btn_conf_rech {
    width: 100%;
    height: 40px;
    padding: 10px;
    margin: auto;
    margin-top: 146px;
    .button {
      width: 100%;
      background-color: #32c0e3;
      border-radius: 2px;
      color: #ffffff;
      font-size: 14px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }
  .view_rech_record {
    display: block;
    text-decoration: underline;
    font-size: 11px;
    color: #989898;
    margin: auto;
    text-align: center;
    margin-top: 15px;
  }
}
</style>
