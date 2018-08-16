import VueRouter from "vue-router"
//引入mui
import mui from "../../assets/mui/js/mui" 

//引入相关的组件
import Home from "../pages/Home.vue"
import Member from "../pages/Member.vue"
import Cart from "../pages/Cart.vue"
import GoodDetail from "../pages/GoodDetail.vue"
// import Category from "../pages/Category.vue"
// import GoodList from "../pages/GoodList.vue"
import OrderHistoryList from "../pages/OrderHistoryList.vue"
import RechargeRecord from "../pages/RechargeRecord.vue"
import ShoppingHistory from "../pages/ShoppingHistory.vue"
import PaySuccess from "../pages/PaySuccess.vue"
// import CheckPaid from "../pages/CheckPaid.vue"
 
// import Login from "../pages/Login.vue" 
// import Register from "../pages/Register.vue" 

import LoginAndRegist from "../pages/LoginAndRegist.vue"
import Setting from "../pages/Setting.vue"
import ModifyPassword from "../pages/ModifyPassword.vue"
import BusinessEntrance from "../pages/BusinessEntrance.vue"

import MemberRecharge from "../pages/MemberRecharge.vue"


const router =  new VueRouter({
    routes: [
        // <tab栏相关的路由>
 
        // {path: "/register",component: Register},
        { path: "/", redirect: "/home" },
        { path: "/home", component: Home, meta: {keepAlive: false} },
        { path: "/cart", component: Cart, meta: {keepAlive: false} },
        { path: "/member", component: Member, meta: {keepAlive: false}},
        // { path: "/login", component: Login },
        // { path: "/category", component: Category },
        // { path: "/goodslist", component: GoodList },
        { path: "/goodsdetail/:id", component: GoodDetail, meta: {keepAlive: false} },
        { path: "/orderhistorylist", component: OrderHistoryList, meta: {keepAlive: false} },
        { path: "/rechargerecord/:userId", component: RechargeRecord, meta: {keepAlive: false} },
        { path: "/shoppinghistory", component: ShoppingHistory, meta: {keepAlive: false} },
        { path: "/paysuccess/:orderId", component: PaySuccess, meta: {keepAlive: false} },
        // { path: "/checkpaid", component: CheckPaid },
        { path: "/loginandregist", component: LoginAndRegist, meta: {keepAlive: false} },
        { path: "/setting/:id", component: Setting, meta: {keepAlive: false} },
        { path: "/modifypassword", component: ModifyPassword, meta: {keepAlive: false} },
        { path: "/businessentrance", component: BusinessEntrance, meta: {keepAlive: false} },
        { path: "/memberrecharge", component: MemberRecharge, meta: {keepAlive: false} },

    ],
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
})
router.beforeEach((to, from, next) => {
  let self = this
  if (to.path === '/orderhistorylist' || to.path === '/rechargerecord/' || to.path === '/setting/') {
    const userOpenId=localStorage.getItem("userOpenId") ||""
    if (userOpenId == '' || userOpenId == null) {
      mui.toast("请登录再查看")
      return false
    }
  }
  next()
  
})
router.afterEach((to,from,next) => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
})
  

export default router


