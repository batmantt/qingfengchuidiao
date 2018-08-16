<template>
  <div class="ds_productitem clearfix">
    <div class="product_item" v-for="(item,index) in dataList.data" :key="index" >
        <a @click="$router.push('/goodsdetail/' + item.id)">
            <div  class="ds_productimgbox">
                <img v-lazy="item.goodsImage" alt="">
            </div>
        </a>
         <p class="mui-ellipsis ds_ellipsis mui-text-left">{{item.goodsName}}</p>
            <div class="price_cart">
                <span>&yen;{{ isPlusMember? (+item.goodsRealPrice).toFixed(2) : (+item.goodsPrice).toFixed(2)}}</span>
                <div  v-if="dataList.isshowcart" class="ds_addshopcart" @click="addToCart(item.id)">
                    <img src="../images/redcar.png" alt=""> 
                </div>
            </div>
    </div>
  </div>
</template>

<script>
import {getCart} from "../api/http.js"
import tools from "../tools/tools.js"
import {mapGetters} from 'vuex'
import { Toast } from 'mint-ui';
export default {
  props:['dataList'],
  data() {
    return {
      userOpenId:"",
      appid:"wx6a6f27d3495ac929",
      count:1
    };
  },
  created() {
    let self = this
    self.userOpenId = localStorage.getItem("userOpenId")
  },
  computed: {
    ...mapGetters({
      carts: 'carts',
      isPlusMember:'isPlusMember'
    })
  },
  methods:{
    addToCart(goodId){
      //显示小球
     // this.isShowBall = true;
     
      let self = this;
     // console.log( self.userOpenId )
      self.userOpenId = localStorage.getItem("userOpenId")
      if(self.userOpenId){  
        let cart = {id: goodId, count: self.count};
        // 复制vuex中的store
        let cartsinfo = self.carts.map((e) => {
          return {id: e.id, count: e.count}
        })
        // 添加cart 并去重
        cartsinfo = tools.sortRepeat([...cartsinfo, cart])
        // 获取新的数组 发请请求
        let newcartsinfo = cartsinfo.map((v, i) => {
          return {"goodsId": v.id, "number": v.count}
        })         
        getCart({
          "appid": self.appid,
          "userOpenId":self.userOpenId,
          "goodsList":newcartsinfo
        }).then(res =>{
          if(res.data.code == 200){
            // 请求成功之后将数据保存到store
            self.$store.commit("updateAll",cartsinfo)
            // self.mui.toast("添加购物车成功")
            Toast({
              message: '添加购物车成功'
            });
           
          }
        })
      }else{
        self.mui.toast("请点击'我的'登录")
      }
    }
  }
};
</script>

<style scoped lang="less">
   /*商品*/
    .prouct_list{
        .product_item{
            width: 48%;
            float: left;
            text-align: center;
            &:nth-child(even){
                margin-left: 4%;
            }
            img{
                width: 100%;
                display: block;
                margin-bottom:5px;
                border-radius: 3px;
            }
            p.ds_ellipsis{
                font-size: 13px;
                line-height: 33px;
                margin-bottom: 0;
                letter-spacing: 0px;
                color: #222222;
                text-overflow:ellipsis;
                overflow:hidden;
                white-space:nowrap; 
            }
            .price_cart{
                display:flex;
                justify-content: space-between;
                align-items: center;
                line-height: 33px;
                span{
                    font-size: 15px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ec0004;
                }
            }
        }
    }
    .ds_addshopcart{
        display: inline-block;
        width:16px;
        height:14px;

        img{
            width: 100%;
            height: 100%;
        }
    }
    .ds_productimgbox{
        height: 180px;
        background-color: #eee;
        border-radius: 2px;
        img{
            border-radius: 2px;
        }
    }
</style>
