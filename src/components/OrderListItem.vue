<template>
    <div class="ds_orderListItem" >
        <div v-for="(item ,index) in  dataList" :key="index">
            <div v-if="item.orderStatus==3?false:true">
                <div class="ds_ordertitle space_between border-scale1 fontcolor222">
                <span>{{item.orderPayTime | dateformat("YYYY-MM-DD HH:mm:ss")}} </span>
                <span class="fontred">{{item.orderStatus==8?"已核销":(item.orderStatus==2?"未核销":"")}}</span>
                </div>
                <div class="ds_ordercontent  border-scale2">
                    <ul class="">

                        <li class="space_between" v-for="(v,i) in item.goodsModels" :key="i">
                            <p class="good_name" @tap="$router.push('./paysuccess/' + item.orderNo)">{{v.goodsName}}</p>
                            <div class="space_between ">
                                <!-- <p >&yen;{{ isPlusMember? (+item.goodsRealPrice).toFixed(2) : (+item.goodsPrice).toFixed(2)}}</p> -->
                                <p >&yen;{{(+item.orderPrice).toFixed(2)}} </p>
                                <p class="ml30">×{{v.cartNumb}}</p>
                            </div>
                        
                        </li>
                        
                    </ul>
                    <div class="allprice">
                        <div class="space_between">
                            <p>共{{gettotalproducts(index)}}件商品</p>
                            <p class="fontred">&yen;{{(+item.orderPrice).toFixed(2)}}</p>
                        </div>
                        <!-- <div class="mui-ellipsis ds_ellipsis mui-text-right lh14">(已优惠&yen;1.00)</div> -->
                    </div>
                </div>    
            </div>
          
        </div>
    </div>
</template>
<script>
import dateformat from "../filters/dateformat";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    gettotalproducts(index) {
      let data = this.dataList[index].goodsModels;
      let res = 0;
      data.forEach(el => {
        res += el.cartNumb;
        return res;
      });
      return res;
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
  props: ["dataList"]
};
</script>
<style lang="less" scoped>
.ds_ordertitle {
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  font-size: 13px;
}
.ds_ordercontent {
  font-size: 13px;
  color: #989898;
  padding: 5px 10px 5px 20px;
  line-height: 22px;
  .good_name {
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 15px;
    line-height: 15px;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
  }
}
.allprice {
  padding: 5px 0;
}
.lh14 {
  line-height: 14px;
}
.ml30 {
  margin-left: 30px;
}
</style>
