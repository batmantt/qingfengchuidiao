<template>
<div class="ds_OrderDetailItem pdl10 pdb10">
    <div>
      <div class="ds_ordertitle">订单详情</div>  
      <div class="orderitem" v-for="(item,index) in dataListitem" :key="index">
          <div class="order_imgbox">
            <!-- <img src="../images/test.png" alt=""> -->
            <img v-lazy="item.goodsImage" alt="没有图片了">
          </div>
          <div class="detail_info pdl10">
              <p class="mui-ellipsis-2 mui-text-left"> {{item.goodsName}}</p>
              <p class="fontred">&yen;{{ isPlusMember? (+item.goodsRealPrice).toFixed(2) : (+item.goodsPrice).toFixed(2)}}</p>
          </div>
          <div class="num">×{{item.cartNumb}}</div>
      </div>
    </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
      ...mapGetters({
      isPlusMember:'isPlusMember'
      })
  },
  props:['dataListitem']
}
</script>
<style lang="less" scoped>
  .ds_OrderDetailItem{
    border-bottom: 1px solid #e5e5e5;
  }
  .ds_ordertitle{
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color:#222;
    background-color: #fff;
  }
  .orderitem{
    display: flex;
    height: 110px;
    padding: 10px 10px 10px 0;
    .order_imgbox{
      width: 90px;
      height: 90px;
      img{
        width:90px;
        height: 90px;
      border-radius: 2px;

      }
    }
    .detail_info{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      font-size: 18px;
      width: 100%;
      p.fontred{
        font-size: 15px;
      }
      p.mui-ellipsis-2{
        color: #222;
      }
    }
    .num{
      margin-left: 70px;
        align-self: flex-end;
        font-size: 14px;
        color: #222;
    }
  }
</style>

