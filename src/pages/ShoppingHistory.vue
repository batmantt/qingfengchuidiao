<template>
<div class="ds_main" v-cloak>
    <div id="refreshContainer" class="mui-content mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="mui-table-view mui-table-view-chevron">
            <div class="">
              <div class="recode_list" v-for="(item,index) in dataList" :key="index">
                  <div>
                      <span class="span">消费</span>
                      <p style="line-height:16px;">{{item.orderPayTime | dateformat("YYYY-MM-DD HH:mm:ss")}}</p>
                  </div>
                  <div class="right">-{{(+item.orderPrice).toFixed(2)}}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>   
</template>
<script>
import { listConsumptionDetail } from "../api/http.js"
import dateformat from "../filters/dateformat"
export default {
  data() {
    return {
      dataList: [],
      userOpenId:"",
      appid:"wx6a6f27d3495ac929"
    };
  },
  methods:{
    getShoppingHistory(){
        let self = this
        listConsumptionDetail({
                "appid": self.appid,
                "userOpenId":self.userOpenId,
                "pageIndex": 1,
                "pageSize": 50
        }).then(res =>{
            //console.log(res)
            if(res.data.code == 200){
                  self.dataList = res.data.dataList

            }
        })
    }
  },
  created(){
      let self = this
      self.userOpenId=localStorage.getItem("userOpenId")||""
      
      if( self.userOpenId){
        self.getShoppingHistory()
      }else{
        self.$router.push("/loginandregist")
      }
  },
  components: {
  },
  filters: {
    dateformat
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
  color: #222;
}
</style>

