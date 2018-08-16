<template>
    <div class="ds_main" v-cloak> 
        <scroller   
        ref="vueScroller"
        class="my-scroller"
        refreshText="下拉刷新"
        :on-refresh="refresh"
        :on-infinite="infinite"
        style="height: calc(100% - 60px)"
        :no-data-text="dataList.length>0?'没有更多数据':'暂无数据'">
            <div v-if="dataList.length>0?false:true">
                <EmptyPage :emptyData="emptyData"/>
            </div>

            <div class="order_history_list" v-else>
                <OrderListItem :dataList="dataList"></OrderListItem>
            </div>
        </scroller>
    </div>
</template>
<script>
import EmptyPage from '../components/EmptyPage.vue';
import OrderListItem from '../components/OrderListItem.vue';
import { listOrder } from "../api/http.js"
export default {
    data(){
        return{
            dataList: [],
            userOpenId:"",
            appid:"wx6a6f27d3495ac929",
            emptyData:{
                src:'https://tango007.heeyhome.com/upload/15302/nolist.ef8dfe8.png',
                txt:"您还没下单过哦，快去下单吧"
            },
            pageSize: 12,
            isEnd: false, // 是否加载完毕
            pageIndex:0,
        }
    },
    components:{
        OrderListItem,
        EmptyPage
    },
    created(){
        let self = this
        self.userOpenId=localStorage.getItem("userOpenId") ||""
        // self.getListOrder()
        if( self.userOpenId == null || self.userOpenId =='null' ||self.userOpenId =='' ) {
            self.$router.push('/member')
        } 
    },
    methods:{
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
        getListOrder( type,done){
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
                "appid": self.appid,
                "userOpenId":self.userOpenId,
                "pageIndex": self.pageIndex,
                "pageSize": self.pageSize,
                "orderType":"2"
            }).then(res =>{
               console.log( res.data.dataList )
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
        }
    }
}
</script>
<style>
 .ds_main{
     overflow-y: scroll;
     height: 100%;
     width: 100%;
 }
</style>
