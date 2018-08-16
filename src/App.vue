<template>
  <div class="ds_container">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <nav class="mui-bar mui-bar-tab ds_footer" v-if="show">
      <a class="mui-tab-item mui-active" @tap="$router.push('/home')">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" @tap="$router.push('/cart')">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" v-if="cartNumberShow != null && cartNumberShow != ''">{{totalCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </a>
       <a class="mui-tab-item" @tap="$router.push('/member')">
        <span class="mui-icon mui-icon-contact">
        </span> 
        <span class="mui-tab-label">我的</span>
      </a>
    </nav>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      title:'',
      show:true,
      userOpenId: "",
      appid: ""
    }
  },
  methods: {
  },
  watch: {
    $route() {
      if(this.$route.path=='/home'){
        document.title = '苏州东山清风垂钓'
        this.show = true
      } else if(this.$route.path=='/cart'){
        document.title = '购物车'
        this.show = true
      } else if (this.$route.path == "/member"){
        document.title = '我的'
        this.show = true
      } else if (this.$route.path == '/goodslist'){
        document.title = '商品列表'
        this.show = true
      } else if (this.$route.path.slice(1,12) == 'goodsdetail'){
        document.title = '商品详情'
        this.show = true
      } else if (this.$route.path == '/orderhistorylist'){
        document.title = '订单历史'
        this.show = true
      }else if (this.$route.path == '/rechargerecord'){
        document.title = '充值记录'
        this.show = true
      }else if (this.$route.path == '/shoppinghistory'){
        document.title = '消费明细'
        this.show = true
      }else if (this.$route.path == '/paysuccess'){
        document.title = '支付成功'
        this.show = true
      }else if (this.$route.path == '/checkpaid'){
        document.title = '订单详情'
        this.show = true
      }else if (this.$route.path == '/loginandregist'){
        document.title = '用户授权'
        this.show = false
      }
    }
  },
  computed: {
    ...mapGetters({
      cartNumberShow: 'cartNumberShow',
      totalCount: 'totalCount'
    })
  },
  created(){
    localStorage.setItem("userAppid","wx6a6f27d3495ac929")
    let self = this
    if(this.$route.path=='/home'){
      document.title = '苏州东山清风垂钓'
      this.show = true
    } else if(this.$route.path=='/cart'){
      document.title = '购物车'
      this.show = true
    } else if (this.$route.path == "/member"){
      document.title = '我的'
      this.show = true
    } else if (this.$route.path == '/goodslist'){
      document.title = '商品列表'
      this.show = true
    } else if (this.$route.path.slice(1,12) == 'goodsdetail'){
      document.title = '商品详情'
      this.show = true
    } else if (this.$route.path == '/orderhistorylist'){
      document.title = '订单历史'
      this.show = true
    }else if (this.$route.path == '/rechargerecord'){
      document.title = '充值记录'
      this.show = true
    }else if (this.$route.path == '/shoppinghistory'){
      document.title = '消费明细'
      this.show = true
    }else if (this.$route.path == '/paysuccess'){
      document.title = '支付成功'
      this.show = true
    }else if (this.$route.path == '/checkpaid'){
      document.title = '订单详情'
      this.show = true
    }else if (this.$route.path == '/loginandregist'){
      document.title = '用户授权'
      this.show = false
    }
  },
  mounted(){
    this.getRem(750, 100)  
  } 
}
</script>


<style lang="less">
 /* 公共样式开始 */
  @colorwhite:#fff;
  @colorlightgray1:#f2f2f2;
  @colorlightgray2:#e3e3e3;
  @colorblue:#32c0e3;
  @fontcolor222:#222;
  @fontcolorgray:#989898;
  @fontcolorred:#ec0004;
  .fontred{
    color: @fontcolorred;
  } 
  .fontcolor222{
    color: @fontcolor222;
  }
   .fontcolorce{
    color: #cecece;
  }
  .fontcolor43{
    color: #434343;
  }
  .lh33{
    line-height: 33px;
  }
  .pd45{
    padding-top: 45px;
  }
  .pdl10{
    padding-left: 10px;
  }
  .pdr10{
    padding-right: 10px;
  }
  .pdb10{
    padding-bottom: 10px;
  }
  .space_between{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
   .border-scale1{
      position:relative;
    }
  .border-scale1::after{
      content: "  ";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      border-top:1px solid @colorlightgray1;
      /* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
      -webkit-transform: scaleY(.5);
      transform:scaleY(.5);
  }
  .border-scale2{
      position:relative;
    }
  .border-scale2::after{
      content: "  ";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
       border-top:1px solid @colorlightgray2;
      /* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
      -webkit-transform: scaleY(.5);
      transform:scaleY(.5);
  }
  html,body{
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: @colorwhite;
    font-family: PingFang-SC-Regular;
  }
  p{
    margin:0;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ds_container  input, .ds_container button{
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }
  a {
    text-decoration:none;
  }
  * { touch-action: none; } 
  header,section{
    border: none;
  }
  header{
    background-color: #fff;
  }
　　.clearfix:before,.clearfix:after {
      content: "";
      display: block;
      clear: both;
    }
    .clearfix {
      zoom: 1;
    }
  .ds_container .mui-bar{
    webkit-box-shadow: none;
    box-shadow: none;
    border-top:1px solid #e2e2e2; 
  }
  .ds_container .mui-bar-tab .mui-tab-item.router-link-active{
      color: @colorblue;  
  }
  .ds_container .mui-bar-tab .mui-tab-item.mui-active{
      color: @colorblue;  
  }

  .ds_container .mui-content{
    background-color: #fff;
  }
  .ds_container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    // padding-top: 45px;
    padding-bottom: 50px;
  }
 .ds_container .mint-header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 45px;
  }
  
  .ds_footer {
    width: 100%;
    height: 50px;
    position: fix;
    bottom: 0;
  }
  .ds_main {
    width: 100%;
    height: 100%;
    background-color: @colorwhite;
    overflow: hidden;
    position: relative;
  }
  .prouct_list{
        padding: 0 10px;
        background: @colorwhite;
    }
 .ds_container .mui-table-view:after,.ds_container .mui-table-view:before{
   background-color: transparent !important;
 }
.ds_container .mui-table-view-cell:after{
   background-color: transparent !important;
}
.ds_container .mui-bar-tab .my-mui-tab-item.router-link-active{
      color: @colorblue;
}
.ds_container .mui-bar-tab .my-mui-tab-item.mui-active{
      color: @colorblue;
}
.ds_hotsale_title{
  font-size: 13px;
  line-height: 33px;
  color: #222;
}
/*toast信息提示*/
// .ds_container .mui-toast-container {bottom: 50% !important;}
// .ds_container .mui-toast-message {
//   opacity: 0.6; 
//   color: #fff; 
//   width: 180px; 
//   padding: 10px 5px 10px 5px;
// }
  
.ds_container img[lazy=loading]{
    width: 40px; 
    height: 40px;
    margin: auto;
}

</style>


