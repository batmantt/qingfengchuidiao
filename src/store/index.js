import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);


function readDataFromLocalStorage(){
    var result = localStorage.getItem("cartsinfo");
    result =  result ? JSON.parse(result) : [];
    return result;
}
 
export default new Vuex.Store({
    state: {
        //存储的就是所有的购物车信息
        carts: readDataFromLocalStorage(),
        cartNumberShow: false,
        isPlusMember:false,
        shopId:null
    },
    mutations: {
        //向外界提供一个 加入购物车的方法
        addToCarts(state, cart){
            //1. 将数据存储到carts数组中

            //1.1. 需要判断数组中是否已经有了当前商品的信息
            var temp = state.carts.filter(v => v.id == cart.id)
            //如果没找到
            if(temp.length == 0){
                //直接将信息添加进购物车
                state.carts.push(cart);                
            }else{
                //将之前的元素的count进行累加！
                temp[0].count += cart.count;
            }

            //2. 将数据存储到localstorage中
            localStorage.setItem("cartsinfo", JSON.stringify(state.carts));
        },
        //向外界提供一个方法，外界传进来一个数组，我们将所有的数据更新到carts中
        updateAll(state, goodsList){
            //1. 将goodslist中id和count全部取出来之后，重新存入到carts中
            state.carts = goodsList.map(v => {
                return {id: v.id, count: v.count};
            })

            //2. 将数据存储到localstorage中
            localStorage.setItem("cartsinfo", JSON.stringify(state.carts));
        },
        deleteAll(state){
          state.carts = []
          localStorage.setItem("cartsinfo", JSON.stringify(state.carts));
        },
        setCartNumberShow(state, flag) {
          state.cartNumberShow = flag
        },
        setIsPlusMember(state,flag){
            state.isPlusMember = flag
        },
        setShopId(state,shopid){
            state.shopId = shopid
        }
    },
    getters: {
        carts: state => state.carts,
        cartNumberShow: state => state.cartNumberShow,
        isPlusMember: state => state.isPlusMember,
        shopId: state => state.shopId,
        //向外界提供一个获取总数的属性（getter）
        totalCount(state){
            var result = 0;
            state.carts.forEach(v => result += v.count);
            return result;
        },
        ids(state){
            return state.carts.map(v => v.id).join(",");
        },
        getCountById: function(state){
            return function(id){
                var temp = state.carts.filter(v => v.id ==id)
                return temp.length == 0 ? 0 : temp[0].count
            }
        }
    }
})