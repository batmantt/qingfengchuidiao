<template>
    <div class="ds_main" v-cloak>
        <div class="top_chose">
            <p  @tap="$router.push('/businessentrance')">订单</p>
            <p  class="P_ch">会员充值</p>
        </div>
     
        <div class="recharge">
            <div class="list">
                <p>会员编号</p>
                <div class="inp_number">
                    <p>编号</p>
                    <input type="number" placeholder="输入编号" v-model.trim="number">
                </div>
            </div>
             <div class="list">
                <p>充值金额</p>
                <div class="inp_number">
                    <p>&yen;</p>
                    <input type="number" placeholder="输入充值金额" v-model.trim="amount" >
                </div>
            </div>
            <div class="list">
               <div class="cof_btn" @tap="_getuserinfo">点击查询</div>
            </div>
            <div class="vip_info_out">
              <div class="vip_info" v-if="display_uesrinfo">
                    <div>
                        <p>会员编号:</p>
                        <p>{{userInfoList.id}}</p>
                    </div>
                    <div>  
                        <p>账户余额:</p>
                        <p>&yen;{{userInfoList.userMemberBalance}}</p>
                    </div>
                    <div>   
                        <p>充值总额:</p>
                        <p>&yen;{{userInfoList.userMemberTotal}}</p>
                    </div>
               </div>
            </div>
            <div class="btn_conf_rech">
                <div class="button" @tap="_topMember">确认充值</div>
            </div>
            <a class="view_rech_record" @tap="$router.push('/rechargerecord/'+userId)">查看充值记录</a>
        </div>
    </div>
</template>
<script>
import {
  getDetailMember,
  topMember,
  userinfoRefresh
} from "../api/http";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 订单和会员充值切换
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
    };
  },
  methods: {
    //指定用户会员卡详情
    _getuserinfo() {
      let self = this;
      getDetailMember({
        appid: self.appid,
        memberId: self.number
      }).then(res => {
        // console.log("指定用户会员卡详情", res.data.data);
        if (res.data.code == 200) {
          // this.mui.toast("查询成功！");
          self.userInfoList = res.data.data;
          self.display_uesrinfo = true;
          self.userId = res.data.data.userOpenId;
        }
      });
    },
    //商家给指定用户充值
    _topMember() {
      let self = this;
      if (!self.number) {
        self.mui.toast("请输入会员编号");
        return false;
      }
      if (!self.amount) {
        self.mui.toast("请输入充值金额");
        return false;
      }
      topMember({
        appid: self.appid,
        memberId: self.number,
        price: self.amount
      }).then(res => {
        //  console.log("商家给指定用户充值", res);
        if (res.data.code == 200) {
          this.mui.toast("充值成功！");
          this._getuserinfo();
        }
      });
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
  }
  
};
</script>
<style lang="less" scoped>
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
 
</style>

