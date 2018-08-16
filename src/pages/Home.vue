<template>
  <div class="ds_main"  v-cloak>
    <!--对于scroller默认高度总是占满父容器，虽然可以使用属性设置高度-->
      <!--scroller组件定位方式用relative 否则会溢出父容器-->
      <!-- :on-infinite="infinite"   -->
       <scroller   
      ref="vueScroller"
      class="my-scroller"
      refreshText="下拉刷新"
      :on-refresh="refresh"
      :on-infinite="infinite"
      style="height: calc(100% - 60px)"
      :no-data-text="dataList.data.length>0?'没有更多数据':'暂无数据'">
                <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in imgs" :key="index"> <img :src="item.src" alt="不小心图破了"> </mt-swipe-item>
                </mt-swipe>
                <div class="ds_title_home">
                    <div class="icon_hot"><img src="../images/hot.png" alt="图片丢了"></div>
                    <span class="ds_titlename">热销商品</span>
                </div>

                <ul class="prouct_list">
                    <ProductItem :dataList="dataList"> </ProductItem>
                </ul>
      </scroller>
  </div>

</template>

<script>
import { listGoods, getCart, listCart } from "../api/http.js";
import ProductItem from "../components/ProductItem.vue";
  export default {
    data() {
      return {
        items: [],
        dataList: {
            isshowcart: true,
            data: []
        },
        imgs: [
        { src: 'https://tango007.heeyhome.com/upload/15302/swiper1.08d0b98.jpg', id: 0 },
        { src: 'https://tango007.heeyhome.com/upload/15302/swiper2.08d0b98.jpg', id: 1 },
        { src: 'https://tango007.heeyhome.com/upload/15302/swiper3.08d0b98.jpg', id: 2 }
        ],
        userOpenId:localStorage.getItem("userOpenId") || "",
        appid: "wx6a6f27d3495ac929",
          pageSize: 6,
          isEnd: false, // 是否加载完毕
          pageIndex:0
      }
    },
    created(){
       let self = this;
      // self.getGoodsList(1)
      if(self.userOpenId){
        self.getAllcartGoods({
          "userOpenId": self.userOpenId,
          "appid": self.appid,
          "pageSize": self.pageSize,
          "pageIndex": self.pageIndex
        })
        self.$store.commit('setCartNumberShow', true)
      }
    },
    methods: {
      getAllcartGoods(params) {
        let self = this;
        listCart( params )
        .then(res => {
          if (res.data.code == 200) {
            let list = res.data.dataList;
            list =  list.map(e => {
              return {id: e.id, count: e.cartNumb}
            })
            self.$store.commit('updateAll', list)
          }
        });
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
    },
  
    components: {
        ProductItem
    }
  }
</script>


<style  lang="less"  scoped >
  .ds_main {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 100px;

  }
  .scroller {
    position: relative;
  }


  .mint-swipe {
  height: 140px;
}
.ds_title_home {
  width: 100%;
  line-height: 33px;
  padding-left: 16px;
  font-size: 13px;
  color: #222222;
}
.ds_main .mui-table-view::before,
.ds_main .mui-table-view::after {
  background-color: #fff;
}
.ds_titlename {
  padding-left: 8px;
}
.icon_hot {
  display: inline-block;
  width: 10px;
  height: 12px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>