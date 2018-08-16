import Vue from "vue"

import App from "./App.vue"

import VueRouter from "vue-router"
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)

// import $ from 'jquery'

//使用Vue.use安装 VueRouter插件
Vue.use(VueRouter);

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
//引入mint-ui并进行安装
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(MintUI);

//引入mui
import "../assets/mui/css/mui.css"
import "../assets/mui/css/icons-extra.css"

//引入并安装图片预览插件
import VuePreview from "vue-preview"
Vue.use(VuePreview)

// import vconsole from "../assets/vconsole"
// 开发时候使用，上线需要注释掉在打包
import router from "./routes/router.js"
import getRem from "./tools/getRem"


import mui from "../assets/mui/js/mui"    

Vue.prototype.getRem = getRem
Vue.prototype.mui = mui

// 图片上传

import Exif from "exif-js"
Vue.use(Exif)

var vm = new Vue({
    el: "#app",
    store,
    render(createElement){
        return createElement(App);
    },
    router
})