<template>
    <div class="ds_main" v-cloak>
        <div class="top_chose">
            <p class="P_ch">订单</p>
            <p @tap="$router.push('/memberrecharge')">会员充值</p>

        </div>
        <!-- <div class="underline"></div> -->

          <scroller   
            ref="vueScroller"  
            class="my-scroller"
            refreshText="下拉刷新"
            :on-refresh="refresh"
            :on-infinite="infinite"
            style="height: calc(100% - 60px);padding-top:47px;"
            :no-data-text="dataList.length>0?'没有更多数据':'暂无数据'">
            <div class="order"  v-for="(item,index) in dataList" :key="index">
              <bussinessOrderItem :dataitem="item" :getListOrder="getListOrder" :infinite="infinite" @ievent="ievent"/>
          </div>
          </scroller>
        <div class="mui-backdrop" v-if="isShowToast">
          <div class="toast">
                <div class="or_number">确认核销订单:{{orderNo}}</div>
                <button class="button1" @tap='isShowToast=false'>取消</button>
                <button class="button2" @tap='fnComfirm(orderNo,1)'>确定</button>
          </div>
        </div>


    </div>
</template>
<script>
import {
  listOrder,
  userinfoRefresh
} from "../api/http";
import bussinessOrderItem from "../components/bussinessOrderItem.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userOpenId: "",
      appid: "wx6a6f27d3495ac929",
      display_uesrinfo: false,
      number: "",
      amount: "",
      userInfoList: [],
      // shopId: "",
      isShowToast: false,
      orderNo: "",
      fnComfirm: "", //确认核销的函数
      dataList: [] ,//订单列表数据;
      userId:0 ,//查看充值记录所传id,
      pageSize: 15,
      isEnd: false, // 是否加载完毕
      pageIndex:0,
    };
  },
  methods: {
    refresh (done) {
          let self = this
          self.isEnd = false
          self.getListOrder(0, done)
    },
    infinite (done) {
        let self = this
        self.getListOrder(1, done)
    },
      // type 1 加载更多 0 刷新
    // 获取订单列表数据
    getListOrder( type,done) {
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
      listOrder({
        appid: self.appid,
        pageIndex: self.pageIndex,
        pageSize: self.pageSize
      }).then(res => {
          // this.dataList = res.data.dataList;
            let dataList = res.data.dataList || []
            if (type === 0) {
            self.dataList= dataList
            } else {
            for (let i = 0; i < dataList.length; i++) {
                self.dataList.push(dataList[i])
            }
            if (dataList.length < self.pageSize || (self.dataList.length >= 12 && self.type === 2)) {
                self.isEnd = true
            }
            }
            done()
      },function(res){
          done()
          self.isEnd = true
      });
    },
    ievent(...data) {
      let self = this;
      self.isShowToast = data[0].isShowToast;
      self.orderNo = data[0].orderNo;
      self.fnComfirm = data[0]._verificationCode;
    },
    GetUserinfoRefresh(){
      let self = this
      if(self.userOpenId){
      userinfoRefresh({"userAppid":self.appid,"userOpenId":localStorage.getItem("userOpenId")})
          .then(res=>{
             // console.log('wode',res)
              if(res.data.code ==200) {
                  let {...resData} = res.data.data
                  //self.shopId = resData.user.shopId
                  self.$store.commit('setShopId',resData.user.shopId)
                 // self.shopId ? self.getListOrder()  : self.$router.push("./member")
              }
          })
      }
    }
  },
  created() {
    let self = this;
    self.userOpenId = localStorage.getItem("userOpenId") || "";
    // self.GetUserinfoRefresh()
    if( self.shopId == null || self.shopId =='null' ||self.shopId =='' ) {
            self.$router.push('/member')
    } 
  },
  computed: {
    ...mapState({
      shopId: "shopId"
    })
  },
  components: {
    bussinessOrderItem
  }
};
</script>
<style lang="less" scoped>
// 公共样式
// #refreshContainer {
//   margin-top: 60px;
// }
.recharge {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 999;
  width: 100%;
}
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

.ds_main .mui-table-view-cell {
  padding: 0;
}

.ds_main {
  width: 100%;
  .top_chose {
    width: 100%;
    height: 46px;
    border: solid 1px #e8e8e8;
    display: flex;
    position: fixed;
    z-index: 999;
    opacity: 1;
    background-color: #fff;
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
  // .underline {
  //   width: 100%;
  //   height: 10px;
  //   background-color: #f7f7f7;
  // }
  .order {
    width: 100%;
    overflow: hidden;
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
        border: solid 0.5px #e4e4e4;
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
          margin-right: 32px;
        }
        &:last-child {
          margin-right: 10px;
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
      line-height: 30px;
      font-size: 14px;
      text-align: center;
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
    margin-top: 15px;
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
// 固定充值信息部分
.vip_info_out {
  height: 136px;
}

// 弹窗
.ds_main .mui-backdrop {
  width: 100%;
  .toast {
    width: 85%;
    height: 75px;
    background: #fff;
    margin: auto;
    margin-top: 100px;
    border-radius: 15px;
    .or_number {
      color: #989898;
      text-align: center;
      font-size: 15px;
      padding: 10px;
    }
    .button1 {
      width: 50%;
      float: left;
      border-radius: 0 0 0 15px;
    }
    .button2 {
      width: 50%;
      border-radius: 0 0 15px 0;
    }
  }
}



.no-data-text.active{
  display:none
}
</style>

