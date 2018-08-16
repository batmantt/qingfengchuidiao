<template>
   <!-- 会员卡充值记录页面 -->
  <div class="ds_main" v-cloak>
     <scroller   
      ref="vueScroller"
      class="my-scroller"
      refreshText="下拉刷新"
      :on-refresh="refresh"
      :on-infinite="infinite"
      style="height: calc(100% - 60px)"
      :no-data-text="dataList.length>0?'没有更多数据':'暂无数据'"
      >
              <div v-if="dataList.length<=0?true:false">
                <EmptyPage :emptyData="emptyData"/>
              </div>
              <div v-else>
                  <div class="recode_list" v-for="(item,index) in dataList" :key="index">
                      <div>
                          <span class="span">充值 - 会员编号{{item.id}}</span> 
                          <p style="line-height:16px;">{{item.orderPayTime | dateformat("YYYY-MM-DD HH:mm:ss")}}</p>
                      </div>
                      <div class="right">
                              +{{(+item.orderPrice).toFixed(2)}}
                      </div>
                  </div>
               </div>
            </scroller>
  </div>   
</template>

<script>
import { listMemberRecord } from "../api/http.js";
import dateformat from "../filters/dateformat";
import EmptyPage from "../components/EmptyPage.vue";

export default {
  data() {
    return {
      dataList: [],
      emptyData: {
        src: 'https://tango007.heeyhome.com/upload/15302/paynolist.d37b2ee.png',
        txt: "您还没有充值记录，快去充值吧"
      },
      
      isEnd: false, // 是否加载完毕
      data:{
        appid: 'wx6a6f27d3495ac929',
        pageSize: 12,
        pageIndex:0,
        orderType: "3"
      }
       
    };
  },
  methods: {
    refresh (done) {
      let self = this
      self.isEnd = false
      self.getRechargeRecord(0, done)
    },
    infinite (done) {
      let self = this
      self.getRechargeRecord(1, done)
    },
    // type 1 加载更多 0 刷新
    getRechargeRecord( type,done ) {
        let self = this
        if (type === 0) {
          self.data.pageIndex = 0
        }
         if (self.isEnd) {
          done(true)
          let contentId = self.$refs.vueScroller.containerId
          document.getElementById(contentId).style.height = 'calc(100% + 50px)'
          self.$refs.vueScroller.resize()
          return
        }
        self.data.pageIndex++
      listMemberRecord(self.data ).then(res => {
          //this.dataList = res.data.dataList;
          //console.log("充值记录", this.dataList)
            let dataList = res.data.dataList || []
          if (type === 0) {
            self.dataList= dataList
          } else {
           
            for (let i = 0; i < dataList.length; i++) {
              self.dataList.push(dataList[i])
            }
            // let arr = Array.from( self.dataList.data ).concat( dataList )
            // self.dataList.data = arr 
            if (dataList.length < self.data.pageSize || (self.dataList.length >= 20 && self.type === 2)) {
              self.isEnd = true
            }
          }
          done()
      }, function (res) {
          done()
          self.isEnd = true
      });
    }
  },
  created() {
    let self = this;
    self.userOpenId = localStorage.getItem("userOpenId");
    if( self.userOpenId == null || self.userOpenId =='null' ||self.userOpenId =='' ) {
      self.$router.push('/member')
    } 
    if (self.$route.params.userId == 0) {  //如果是0就是查找所有的   不传useropenid就是查所有的
      // self.getRechargeRecord();
    } else {
      self.data.userOpenId = self.$route.params.userId;   //否则就是当前用户的所有充值记录
     // self.getRechargeRecord();
    }
  },
  filters: {
    dateformat
  },
  components: {
    EmptyPage
  }
};
</script>

<style scoped>
.recode_list {
  width: 100%;
  height: 65px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 15px;
  color: #222222;
  line-height: 26px;
}
.right {
  height: 14px;
  font-size: 18px;
  line-height: 14px;
  color: #32c0e3;
}
</style>

