<template>
    <div class="ds_main" v-cloak>
       <div class="mui-content mui-scroll-wrapper">
            <div class="mui-scroll">
             <div class="mui-table-view mui-table-view-chevron">
                 <header class="headerpicbox">
                     <img src="https://tango007.heeyhome.com/upload/15302/memberbg.02f67b5.png" alt="">
                     <a class="toseller" id="toseller"  v-if="isshowSellerEntry" @tap="$router.push('./businessentrance')">
                         <img src="../images/sellerentry.jpg" alt="">
                     </a>

                     <div class="ds_mem_Info">
                            <div class="user_pic"> <img :src="userHeadUrl" alt=""> </div>
                            <div class="mem_Info">
                                <p v-if="isshowloginoutbtn">会员编号</p>
                                <p v-if="isshowloginoutbtn">{{memberid}}</p>
                                <a v-if="!isshowloginoutbtn" style="color:white;line-height:46px" @tap="$router.push('./loginandregist')">
                                    登录/注册
                                </a>
                            </div>
                     </div>
                 </header>
                 <section class="ds_userinfo">
                     <ul class="ds_infolist">
                         <li class="item_info">
                             <p class="fontcolor43">{{orderNumber ||0}}</p>
                             <p class="fontcolorce">订单数</p>
                         </li>
                         <li class="item_info">
                             <p class="fontcolor43">0</p>
                             <p class="fontcolorce">积分</p>
                         </li>
                         <li class="item_info">
                             <p class="fontcolor43">{{(+userMemberBalance).toFixed(2) ||0}}</p>
                             <p class="fontcolorce">余额</p>
                         </li>
                         <li class="item_info"> 
                                <p class="fontred">  
                                    <span v-if="!isPlusMember">V1</span>
                                    <img v-if="isPlusMember" src="../images/plusmember.png" class="plusmember" alt="">
                                </p>
                                <p class="fontcolorce">会员等级</p>
                         </li>
                     </ul>
                 </section>

                 <section class="ds_cardlist">
                     <ul class="mui-table-view">
                        <li class="mui-table-view-cell " @tap="$router.push('/orderhistorylist')">
                            <div class="ds_icon_left"> <img src="../images/member1.png" alt=""></div>
                            <a class="mui-navigate-right">
                                订单历史
                            </a>
                            <div class="ds_line"></div>
                        </li>
                        <li class="mui-table-view-cell " @tap="$router.push('/rechargerecord/'+userOpenId)">
                            <div class="ds_icon_left"><img src="../images/member2.png" alt=""></div>
                            <a class="mui-navigate-right">
                               充值记录
                            </a>
                            <div class="ds_line"></div>
                        </li>
                        <li class="mui-table-view-cell " @tap="$router.push('/setting/'+settingId)">
                            <div class="ds_icon_left"><img src="../images/200022.png" alt=""></div>
                            <a class="mui-navigate-right">
                               设置
                            </a>
                            <div class="ds_line"></div>
                        </li>
                    </ul>
                 </section>

                 <!-- v-if="data.userAppid" -->
                 <section class="loginout" v-if="isshowloginoutbtn" >
                     <div @tap="loginout">退出登录</div>
                 </section>
            </div>
        </div>
       </div>
    </div>
</template>
<script>
import { cancellation , userinfoRefresh ,toBeMember} from "../api/http.js"
import store from "../store"
export default {
    data(){
        return {
             userOpenId:"",
             appid:"wx6a6f27d3495ac929",
             isshowloginoutbtn:false,
             userMemberBalance:0,
             orderNumber:0,
             memberid:"",
             isshowSellerEntry:false,
             settingId:'',
             userHeadUrl:'',
             isPlusMember:false,
             shopId:this.$store.state.shopId
        }
    },
    created(){
        let self = this
         self.userOpenId=localStorage.getItem("userOpenId") ||""
        if( self.isLocalStorageNameSupported() ){
                
            if(self.userOpenId){
                self.isshowloginoutbtn = true
                self.GetUserinfoRefresh()
            }else{
                // self.isshowSellerEntry = true
                self.isshowSellerEntry = false
                //    @click="$router.push('./businessentrance')"
            }
            
        }else{
            self.mui.toast("")
        }

        //  没有shopid     
             //isshowloginoutbtn   false说明未登录   true就是登录
            // 1未登录    显示商家入口，但是不能跳转
            //2登录     不显示商家入口
    },
    methods:{
        loginout(){
            let self = this
            if(self.userOpenId){
                cancellation({"appid":self.appid,"userOpenId":self.userOpenId}).then(res=>{
                    if(res.data.code!==200) self.mui.toast(res.data.message);
                    if(res.data.code ==200) {
                        self.mui.toast("退出登录"+res.data.message);
                        self.isshowloginoutbtn = false;
                        localStorage.removeItem("userOpenId");
                        localStorage.removeItem("cartsinfo");
                        localStorage.removeItem("memberid");
                        localStorage.removeItem("userHeadUrl");
                        self.shopId = null
                        self.userMemberBalance = 0
                        self.orderNumber =0
                        self.isshowSellerEntry = false
                        self.userHeadUrl=""
                        self.$store.commit('setCartNumberShow', false)
                        self.$store.commit('setShopId',null)
                        self.$store.commit('setIsPlusMember', false)   //在vuex中修改会员身份设置
                        self.$router.push('/member');
                    }
                 })
            }
        },
        GetUserinfoRefresh(){
            let self = this
            if(self.userOpenId){
            userinfoRefresh({"userAppid":self.appid,"userOpenId":self.userOpenId})
                .then(res=>{
                   // console.log('wode',res)
                    if(res.data.code ==200) {
                        let {...resData} = res.data.data
                        self.orderNumber =  resData.orderNumber
                        self.userMemberBalance = resData.membershipCard.userMemberBalance
                        self.memberid = resData.membershipCard.id
                        self.settingId =resData.user.id
                        self.shopId = resData.user.shopId
                        self.userHeadUrl = resData.user.userHeadUrl
                        self.isPlusMember = ( resData.membershipCard.userMemberLevel=="普通会员"?
                                             false
                                             :(resData.membershipCard.userMemberLevel=="超级会员"?
                                             true
                                             :false))
                        //console.log( self.isPlusMember  )
                        self.$store.commit('setIsPlusMember', self.isPlusMember)   //在vuex中修改会员身份设置
                        self.$store.commit('setShopId',resData.user.shopId)
                        // userHeadUrl
                        self.userHeadUrl==null?(self.userHeadUrl='https://tango007.heeyhome.com/upload/15302/default_user.f043551.png'):self.userHeadUrl
                        localStorage.setItem('userHeadUrl',self.userHeadUrl)
                        localStorage.setItem('memberid', resData.membershipCard.id)
                          
                           if(self.shopId == null){
                                self.isshowSellerEntry = false
                            }else{
                                self.isshowSellerEntry = true
                            }
                           
                    }
                })
            }
        },
        isLocalStorageNameSupported() {
            let testKey = 'test', storage = window.localStorage;
            try {
                storage.setItem(testKey, '1');
                storage.removeItem(testKey);
                return true;
            } catch (error) {
                return false;
            }
        }
    },
    mounted(){
        let self = this
        if( self.userOpenId){
            // if(self.shopId == null){
            //     console.log(1)
            //     // self.$router.push('./member'); 
            // }else{
                 //console.log(2)
                // self.$nextTick(()=>{
                //     document.querySelector('#toseller').addEventListener('click',function(e){
                //         e.stopPropagation()
                //         self.$router.push('./businessentrance'); 
                //     })
                // })
            // }
        }
    },
    store
};
</script>

<style lang="less" scoped>
     .headerpicbox{
         height: 120px;
         width: 100%;
         position: relative;
         .toseller{
             position: absolute;
             right: 0;
             top: 50%;
             transform: translateY(-50%);
             width: 100px;
             height: 30px;
             border-bottom-left-radius:15px;
             border-top-left-radius: 15px;
             img{
                border-bottom-left-radius:15px;
                border-top-left-radius: 15px; 
             }
         }
         .ds_mem_Info{
             position: absolute;
             left: 14px;
             top: 50%;
             transform: translateY(-50%);
             z-index: 999;
             height:62px;
         }
         .user_pic{
            width: 62px;
            height: 62px;
            border-radius: 50%;
            float: left;
            background:url('https://tango007.heeyhome.com/upload/15302/default_user.f043551.png') center no-repeat;
            background-size: 100%;
                img{
                    width: 62px;
                    height: 62px;
                    border-radius: 50%;
                }
            }
         .mem_Info{
            height: 62px;
            padding:8px 0 8px 14px;
            float: left;
             p{
                 color: #fff;
                 font-size: 15px;
                 text-align: center;
                 line-height: 22px;
             }
          }
     }

    section.ds_userinfo{
        width: 100%;
        text-align: center;
        &::after{
            display: block;
            content:"";
            width: 100%;
            height: 10px;
            background-color: #f7f7f7;
        }
        ul.ds_infolist{
            padding: 18px 0px;
            box-sizing: border-box;
            height: 65px;
            display: flex;
            justify-content: space-between;
        }
        .item_info{
           width: 25%;
           display: flex;
           flex-direction: column;
           justify-content: space-between;
        }
        p{
            font-size: 11px;
            line-height: 11px;
        }
    }

    section.ds_cardlist{
        position: relative;
        ul{
            &::before{
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 1px;
                border-top:1px solid #e5e5e5;
                // -webkit-transform: scaleY(.5);
                // transform:scaleY(.5);
            }
        }
       
        li.mui-table-view-cell{
            position: relative;
            height: 52px;
            .ds_line{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                background-color:#e3e3e3;
                -webkit-transform: scaleY(.5);
                transform:scaleY(.5);
            }
            a{
                line-height: 30px;
                height: 52px;
                margin-left: 15px;
                color: #555;
                font-size: 11px;
            }
            .ds_icon_left{
                position: absolute;
                top: 50%;
                width: 21px;
                transform: translateY(-50%);
            }
        }
       
    }

    .ds_main .mui-table-view-cell:after{
        background-color: #fff;
    }
    .ds_main .mui-table-view.mui-table-view-chevron{
        height: 100%;
        .loginout{
            position: absolute;
            text-align: center;
            width: 100%;
            height: 100%;
            div{
                position: absolute;
                right: 18px;
                bottom: 240px;
                left:18px;
                height: 41px;
                color: #fff;
                font-size: 14px;
                background-color: #32c0e3;
                line-height: 41px;
                border-radius: 4px;
            }
         }
    }
    .plusmember{
        width: 23px;
        height: 21px;
        margin: 0 auto;
    }
</style>
