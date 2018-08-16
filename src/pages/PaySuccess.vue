<template>
  <div class="ds_main shopcar" v-cloak>
    <div id="refreshContainer" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <div class="mui-table-view mui-table-view-chevron">
            <!-- 未核销显示二维码-->
            <QrCode v-if="OrderStatus==2?true:false"  :orderQr="orderQr"/>
            <!-- 核销成功显示成功 -->
            <Paid v-if="OrderStatus==8?true:false"/>

            <OrderDetailItem :dataListitem="dataListitem"></OrderDetailItem>
            <div class="ds_check_info">
                <OrderPayText :dataList="dataList"></OrderPayText>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QrCode from "../components/QrCode.vue"
import Paid from "../components/Paid.vue"

import OrderDetailItem from "../components/OrderDetailItem.vue"
import OrderPayText from "../components/OrderPayText.vue"
import { listOrder  } from "../api/http.js"
// 当前是付款成功页面
// 核销完成后跳转到 checkpaid页面  核销成功
export default {
    data(){
      return{
        userOpenId:"",
        appid:"wx6a6f27d3495ac929",
        dataList:[], //订单列表数据
        dataListitem:[],
        OrderStatus:"",
        orderQr:''
      }
    },
    components:{
        QrCode,
        Paid,
        OrderDetailItem,
        OrderPayText
    },
    created(){
       let self = this
         self.userOpenId=localStorage.getItem("userOpenId")||""
         
         self.userOpenId?self.getListOrder():self.$router.push('/home')
    },
    methods:{
       // 获取订单列表数据
        getListOrder(){
            let self = this
            listOrder({
                    "appid": self.appid,
                    "userOpenId":self.userOpenId,
                    "orderNo":self.$route.params.orderId
            }).then(res =>{
                if(res.data.code == 200){
                    // console.log("订单数据",res.data.dataList[0])
                    self.dataList = res.data.dataList[0]
                    self.dataListitem = self.dataList.goodsModels
                    self.OrderStatus = self.dataList.orderStatus
                    self.orderQr = self.dataList.orderQr

                    // 2是待核销   8已核销
                }
            })
        }
    },
     mounted(){
      this.mui(".mui-scroll-wrapper").scroll();
    },
}
</script>
<style lang="less" scoped>
</style>
