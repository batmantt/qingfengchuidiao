<template>
    <div class="ds_main j_center">
      <div class="top_ch">
          <div @tap="login" >
            <div class="login_ch" v-show="flag_login"> 登录</div>
            <div v-show="flag_regist">登录</div>
            </div>
          <div @tap="regist" >
             <div class="regist_ch" v-show="flag_regist">注册</div>
            <div v-show="flag_login">注册</div>
          </div>
      </div>

      <!-- 注册模块 -->
    <div class="regist" v-show="flag_regist">
      <div class="input_num"> 
          <div class="icon">
            <img src="../images/20004.png" alt="">
          </div>
          <input type="number" name="userTelephone" autocomplete="on" v-model.trim="data.userTelephone" placeholder="请输入手机号" maxlength="11">
      </div>
      <div class="input_pw">
        <div class="input_pw_left">
          <div class="icon">
            <img src="../images/20003.png" alt="">
          </div>
          <input :type="inputType"  name="userPassword" autocomplete="on" v-model.trim="data.userPassword" class="mui-input-password"  placeholder="请输入密码" >
        </div>
        <div class="eye_img">
          <img v-show="visible_pw" src="../images/20001.png" alt="" @tap="v_pword">
          <img v-show="!visible_pw" src="../images/20000.png" alt="" @tap="v_pword_hide">
        </div>
      </div>
      <div class="input_vecode">
        <div class="input_vecode_left">
          <div class="icon">
            <img src="../images/20002.png" alt="">
          </div>
          <input type="number"  name="verification" autocomplete="on" v-model="data.verification"  placeholder="请输入验证码">
        </div>
          <button class="sec_ve_code" :disabled="disabled"  @tap.stop.prevent="togetVcode(data)" >{{text}}</button>
      </div>
      <div class="btn">
       <button @tap.stop.prevent="handleRegister(data)">注册</button>
      </div>
    </div>

      <!-- 登陆模块 -->
    <div class="login" v-show="flag_login">
      <div class="input_num"> 
          <div class="icon">
            <img src="../images/20004.png" alt="">
          </div>
          <input type="number" placeholder="请输入手机号"  v-model.trim="data.userTelephone" name="userTelephone"  maxlength="11">
      </div>
      <div class="input_pw">
        <div class="input_pw_left">
          <div class="icon">
            <img src="../images/20003.png" alt="">
          </div>
          <input :type="inputType"   v-model.trim="data.userPassword" name="userPassword" placeholder="请输入密码">
        </div>
        <div class="eye_img">
          <img v-show="visible_pw" src="../images/20001.png" alt="" @tap="v_pword">
          <img v-show="!visible_pw" src="../images/20000.png" alt="" @tap="v_pword_hide">
        </div>
      </div>
      <div class="input_vecode_login">
      </div>
      <div class="btn">
       <button @tap="touserlogin">登录</button>
      </div>
      </div>
    </div>
</template>
<script>
import {
  tokenLogin,
  checkTelephone,
  registered,
  smsSend,
  toBeMember
} from "../api/http";
import { Toast } from "mint-ui";
import store from "../store";

export default {
  data() {
    return {
      flag_login: true,
      flag_regist: false,
      visible_pw: true,
      data: {
        userOpenId: "",
        userAppid: "wx6a6f27d3495ac929",
        userTelephone: "",
        verification: ""
      },
      timecount: 60,
      text: "获取验证码",
      disabled: false,
      vcode: "",
      inputType: "password"
    };
  },
  create() {
    var self = this;
    self.data.userOpenId = localStorage.getItem("userOpenId") || "";
    if (self.data.userOpenId) {
      self.$router.push("./member");
    }
  },
  methods: {
    // 显示登陆模块
    login() {
      this.flag_login = true;
      this.flag_regist = false;
    },
    // 显示注册模块
    regist() {
      this.flag_regist = true;
      this.flag_login = false;
    },
    // 切换密码可见
    v_pword() {
      this.visible_pw = !this.visible_pw;
      this.inputType = "text";
    },
    v_pword_hide() {
      this.visible_pw = !this.visible_pw;
      this.inputType = "password";
    },
    touserlogin() {
      let self = this;
      if (self.data.userOpenId) {
        // 已登录 就去“我的”
        self.$router.push("/member");
      } else {
        if (!self.data.userTelephone) {
          self.mui.toast("请输入手机号");
          return false;
        }
        if (!self.data.userPassword) {
          self.toast("请输入密码");
          return false;
        }
        //存储token到本地
        tokenLogin(self.data).then(res => {
          // console.log("登录信息",res)
          if (res.data.code == 200) {
            let { ...resData } = res.data.data;
            localStorage.setItem("userOpenId", resData.user.userOpenId);
            localStorage.setItem("userAppid", resData.user.userAppid);
            localStorage.setItem("userName", resData.user.userName);
            self.$store.commit("setCartNumberShow", true);
            self.$store.commit("setShopId", resData.user.shopId);
            if (res.data.data.membershipCard == null) {
              self._toBeMember(res.data.data.user.userOpenId);
            } //注册即成为会员
            self.$router.push("./member");
          } else {
            self.mui.toast(res.data.message);
          }
        });
      }
    },
    handleRegister(data) {
      if (!data.userPassword) {
        this.mui.toast("请输入密码");
        return false;
      }
      if (!data.userTelephone) {
        this.mui.toast("请输入手机号");
        return false;
      }
      if (!/^1[34578]\d{9}$/.test(data.userTelephone)) {
        this.mui.toast("手机号码格式不对");
        return false;
      }
      if (!data.verification) {
        this.mui.toast("请输入手机验证码");
        return false;
      }

      //订阅号用户注册验证手机号

      // 订阅号用户注册
      registered(data).then(res => {
        // console.log(res)
        let self = this;
        // e.preventDefault();
        if (res.data.code == 200) {
          self.mui.toast("恭喜你，注册成功了，一秒后跳转到登录页");
          setTimeout(function() {
            self.flag_login = true;
            self.flag_regist = false;
            self.$router.push("/loginandregist");
          }, 1000);
        } else {
          self.mui.toast(res.data.message);
        }
      });
    },
    async _toBeMember(userOpenId) {
      let self = this;
      let res = await toBeMember({
        userOpenId,
        appid: self.data.userAppid
      });
      // console.log("点击成为会员", res);
      if (res.data.code == 200) {
        self.mui.toast("您已成为渔具商城的尊贵会员！");
      }
    },
    togetVcode(data) {
      var self = this;
      // console.log(self.data)
      if (!data.userTelephone) {
        self.mui.toast("请输入手机号");
        return false;
      }
      if (!/^1[34578]\d{9}$/.test(data.userTelephone)) {
        self.mui.toast("手机号码格式不对");
        return false;
      }
      // 发送验证码前先验证手机号是否已经注册过
      // checkTelephone({"userAppid":data.userAppid,"phoneNumbers":data.userTelephone})
      // .then(res=>{
      //      console.log('手机哈验证',res)
      // })

      self.disabled = true;
      smsSend({
        phoneNumbers: data.userTelephone
      }).then(res => {
        // console.log(res)
        if (res.data.code == 200) {
          self.data.verification = res.verification;
          //验证码发送成功了，应该开启倒计时功能。60秒可以重新发送
        }

        let timer = setInterval(function() {
          self.timecount--;
          self.text = self.timecount + "秒后再次发送";
          //当时间为0
          if (self.timecount === 0) {
            clearInterval(timer);
            //让按钮能点
            self.timecount = 60;
            self.disabled = false;
            self.text = "再次发送";
          }
        }, 1000);
      });
    }
  },
  store
};
</script>
<style lang="less" scoped>
// 公共样式
@fontcolorgray: #989898;
@bnt-color: #bae1fa;
@colorwhite: #fff;
@colorchose: #32c0e3;

.j_center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ds_main {
  width: 100%;
  position: absolute;
  .top_ch {
    display: flex;
    text-align: center;
    align-items: center;
    width: 75%;
    height: 54px;
    font-size: 15px;
    color: @fontcolorgray;
    font-family: PingFang-SC-Regular;
    border-bottom: 1px solid #d0f6ff;
    margin-top: 44px;
    div {
      width: 100%;
      height: 54px;
      line-height: 54px;
    }
    .login_ch,
    .regist_ch {
      border-bottom: 1px solid #32c0e3;
      color: @colorchose;
    }
  }
  .regist,
  .login {
    width: 75%;
    justify-content: center;
  }
  .input_num,
  .input_pw,
  .input_vecode {
    width: 100%;
    height: 54px;
    border-bottom: 1px solid #d0f6ff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      border: none;
      font-size: 15px;
      font-family: PingFang-SC-Regular;
      margin: 0;
      padding-left: 13px;
    }
    .icon {
      width: 20px;
      height: 22px;
      margin-left: 9px;
    }
    .input_pw_left,
    .input_vecode_left {
      display: flex;
      align-items: center;
    }
    .eye_img {
      width: 16px;
      height: 8px;
      margin-right: 30px;
    }
    .sec_ve_code {
      border-radius: 8px;
      border: 1px solid #32c0e3;
      text-align: center;
      font-family: PingFang-SC-Regular;
      font-size: 10px;
      color: #32c0e3;
      margin-right: 10px;
    }
  }
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 100%;
    height: 35.5px;
    background: @colorchose;
    border-radius: 15px;
    margin-top: 33px;
    color: @colorwhite;
    font-family: PingFang-SC-Regular;
    font-size: 15px;
    border: none;
  }
}
.input_vecode_login {
  height: 54px;
  border: none;
}
</style>


