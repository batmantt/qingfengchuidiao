<template>
    <div class="ds_main ">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <p>手机号</p>
                <input type="text" name="userTelephone"  v-model="data.userTelephone"  placeholder="请输入手机号">
            </li>
            <li class="mui-table-view-cell">
                <p>验证码</p>
                <input type="text" class="vcode" name="verification"  v-model="data.verification"  placeholder="请输入验证码">
                <button class="sec_vecode" :disabled="disabled"  @tap="togetVcode" >{{text}}</button>
            </li>
            <li class="mui-table-view-cell" style="border:none">
                <p>新密码</p>
                <input type="text" name="userPassword" v-model="data.userPassword" placeholder="请输入新密码">
            </li>
            <li class="mui-table-view-cell" style="border:none">
                <p>确认密码</p>
                <input type="text" v-model="userRePassword" placeholder="请再次输入新密码">
            </li>
        </ul>
         <div class="ds_btn">
            <button @tap="_modifyPassword">确认</button>
          </div>
    </div>
</template>
<script>
import {modifyPassword,smsSend} from "../api/http.js"
export default {
  data() {
    return {
      data:{
          "userOldPassword":"",
          "userPassword":"",
          "userOpenId":"",
          "appid":"wx6a6f27d3495ac929",
          "userTelephone":"",
          "verification":"",
       },
       userRePassword:"",
       timecount:60,
       text:"获取验证码",
       disabled:false,
    };
  },
  created(){
    let self = this
    self.data.userOpenId=localStorage.getItem("userOpenId") ||""
    
    if(!self.data.userOpenId){
       self.$router.push("/home")
    }
  },
  methods:{
     _modifyPassword(){
        let self = this
        if(!this.data.userTelephone){
          this.mui.toast("请输入手机号");
          return false;
        }
        if(!/^1[34578]\d{9}$/.test(this.data.userTelephone)){
          this.mui.toast("手机号码格式不对");
          return false;
        }
        if(!this.data.verification){
          this.mui.toast("请输入手机验证码");
          return false;
        }
        if(!this.data.userPassword){
          this.mui.toast("请输入新密码");
          return false;
        }
        if(!this.userRePassword){
          this.mui.toast("请再次输入新密码");
          return false;
        }
        if(this.data.userPassword!==this.userRePassword){
          this.mui.toast("请确认两次输入密码一致");
          return false;
        }
          modifyPassword(self.data).then(res=>{
            if(res.data.code!==200) self.mui.toast(res.data.message);
            if(res.data.code ==200) {
              self.mui.toast("恭喜您已成功修改密码");
              self.$router.push('/member');
            }
          })
      },
      togetVcode(e) {
        var self = this
        e.preventDefault();
       // console.log(self.data)
         if(!self.data.userTelephone){
          self.mui.toast("请输入手机号");
          return false;
        }
        if(!/^1[34578]\d{9}$/.test(self.data.userTelephone)){
          self.mui.toast("手机号码格式不对");
          return false;
        }
        self.disabled = true
        smsSend({
              "phoneNumbers":self.data.userTelephone
            }).then(res =>{
               // console.log(res)
                if(res.data.code == 200){
                    // 发送成功后，开启倒计时，限制发送
                    let timer = setInterval(function () {
                        self.timecount--;
                        self.text = self.timecount +"秒后再次发送"
                        //当时间为0
                        if(self.timecount === 0){
                          clearInterval(timer);
                          //让按钮能点
                          self.timecount = 60
                          self.disabled = false
                          self.text="再次发送"
                        }
                     }, 1000);
                }
            })
      }
  }
};
</script>
<style lang="less" scoped>
.ds_main {
  width: 100%;
   .mui-table-view-cell {
    height: 45px;
    border-bottom: solid 0.5px #e5e5e5;
    display: flex;
    p {
      width: 90px;
      font-size: 14px;
      color: #222222;
    }
    input {
      height: 22px;
      font-size: 14px;
      line-height: 14px;
      color: #222222;
      border: none;
    }
    .sec_vecode {
      padding: 0 8px;
      height: 25px;
      border-radius: 15px;
      font-size: 10px;
      letter-spacing: 0px;
      color: #32c0e3;
      line-height: 5px;
      border: solid 0.5px #32c0e3;
    }
  }
}
.ds_btn {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  button {
    width: 100%;
    height: 36px;
    background-color:#32c0e3;
    border-radius: 15px;
    margin-top: 33px;
    color: #fff;
    font-size: 15px;
    border: none;
  }
}
.vcode{
  padding-left: 35px;
}
</style>

