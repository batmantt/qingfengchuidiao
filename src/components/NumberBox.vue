<template>
    <div data-numbox-min="1" class="number-box" style="height: 28px;">
        <button type="button" class="mui-btn numbox-btn numbox-btn-minus" @click="minus">-</button> 
        <input type="number" :value="value" class="numbox-input">
        <button type="button" class="mui-btn numbox-btn numbox-btn-plus" @click="plus">+</button>
    </div>
</template>
<script>
import store from "../store"
import { getCart } from "../api/http.js"
export default {
    data(){
        return {
            number: "",
            userOpenId:"",
            appid:"wx6a6f27d3495ac929"
        }
    },
    created(){
        this.number = this.value || 1;
        this.userOpenId = localStorage.getItem("userOpenId")||""
    },
    methods: {
        minus(){
            if(this.number > (this.min || 1) && (this.number - (this.step || 1)) >= (this.min || 1)){
                this.number -= (this.step || 1);
                this.$emit("input", this.number);
                if(this.number>=1){
                    this.addToCart(-1,this.changeGoodsId)
                }
            }
        },
        plus(){
            if(this.number < (this.max || Infinity) && (this.number + (this.step || 1)) <= (this.max||Infinity)){
                this.number += (this.step || 1);
                this.$emit("input", this.number);
                if(this.number>=1){
                    this.addToCart(1,this.changeGoodsId)           
                }
            }
        },
      
        addToCart(num,changeid){
                
                let self = this;
                //  let cart = {id: self.ChangeGoodsId, count: numbernow};
                // self.$store.commit("addToCarts", cart);
                let cartsinfo = JSON.parse(localStorage.getItem('cartsinfo'))||[]; 

                let newcartsinfo=[]
                for(let i =0 ; i<cartsinfo.length; i++){
                    let newcartitem ={}
                    newcartitem["goodsId"]= cartsinfo[i].id
                    newcartitem["number"]= cartsinfo[i].count
                    if(cartsinfo[i].id === changeid){
                        newcartitem["number"]= cartsinfo[i].count+num
                    }
                    newcartsinfo.push(newcartitem)
                }
                
                getCart({
                    "appid": self.appid,
                    "userOpenId":self.userOpenId,
                    "goodsList": newcartsinfo 
                }).then(res =>{
                   // console.log(res.data.code)
                })
         }
            

    },
    store,
    props: ["max", "min", "step", "value","changeGoodsId"]
};


//如果想要实现组件和数据的双向绑定，例如
//1. 当前组件内有个数据叫count，
//2. 要在当前组件内使用一个子组件， 想实现count和子组件的双向绑定
//3. 直接在子组件的标签中书写  v-model="count"
//4. 要在子组件中 props中 声明一个 value
//5. 当子组件内数据发生变化的时候，需要使用$emit触发input事件来通知外面的父组件数据发生变跟了，那么v-model指令会自动将我们传递出去的内容赋值给绑定的count

</script>

<style scoped>
.number-box{
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 120px;
    height: 35px;
    padding: 0 40px 0 40px;
    vertical-align: top;
    vertical-align: middle;
    border: solid 1px #bbb;
    border-radius: 3px;
    background-color: #efeff4;
}

.numbox-btn{
    position: absolute;
}

.numbox-btn[disabled]{
    color: #c0c0c0;
}


.numbox-btn-minus {
    left: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.numbox-btn-plus {
    right: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

.numbox-btn{
    font-size: 18px;
    font-weight: normal;
    line-height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 40px;
    height: 100%;
    padding: 0;
    color: #555;
    border: none;
    border-radius: 0;
    background-color: #f9f9f9;
}

.numbox-input[type=number]{
    display: inline-block;
    overflow: hidden;
    width: 100%!important;
    height: 100%;
    margin: 0;
    padding: 0 3px!important;
    text-align: center;
    text-overflow: ellipsis;
    word-break: normal;
    border: none!important;
    border-right: solid 1px #ccc!important;
    border-left: solid 1px #ccc!important;
    border-radius: 0!important;
}

</style>
