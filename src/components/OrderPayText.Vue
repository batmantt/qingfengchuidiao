<template>
<div>
  <div class="ds_orderpaytext">
      <ul class="ds_titlelist">
        <li>订单编号:</li>
        <li>订单时间:</li>
        <li>支付时间:</li>
        <li>订单金额:</li>
         <li>核销状态:</li>  
      </ul>
      <ul class="ds_listvalue">
        <li>{{ dataList.orderNo }}</li>
        <li>{{dataList.orderPayTime | dateformat("YYYY-MM-DD HH:mm:ss")}}</li>
        <li>{{dataList.orderPayTime | dateformat("YYYY-MM-DD HH:mm:ss")}}</li>
        <li class="fontred">&yen;{{(+dataList.orderPrice).toFixed(2)}}</li>
        <li>{{(dataList.orderStatus==2)?'待核销':( (dataList.orderStatus==8)?'已核销':'')}}</li>  
      </ul>
  </div>
</div>
</template>
<script>
import dateformat from "../filters/dateformat";
export default {
  filters:{
    dateformat
  },
  props:['dataList']
}
</script>
<style lang="less" scoped>
  .ds_orderpaytext{
    padding: 10px;
    display:flex;
    justify-content: flex-start;
    .ds_listvalue{
      margin-left: 10px;
    }
    li{
      font-size: 13px;
      height: 21px;
    }
  }
</style>

