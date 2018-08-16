<template>
    <div class="ds_main">
      <div class="head_img">
         <!-- @click="flag=!flag"  在header_img加控制拍照等显示隐藏 -->
        <div class="left">头像</div>
        <div class="right">
          <div class="h_img">
            <img :src="userImgSrc" class="preview-img">
            <form id="form1" enctype="multipart/form-data"   method="post" action="">
              <div style="height:0px; overflow:hidden; position:absolute;">
                <input type="file" tabIndex="-1" accept="image/jpeg,image/x-png,image/gif" 
                    name="file" id="fileToUpload" @change="fileSelected()"/>
              </div>
              <button  class="btnfile" type="button" onclick="document.getElementById('fileToUpload').click()"></button>
            </form>
          </div>
        <div class="row">
            <img src="../images/200011.png" alt="">
        </div>
        </div>
      </div>
      <div class="vip_num">
         <div class="left">会员编号</div>
         <div class="right">{{memberid}} </div>
      </div>
      <div class="modify_pw" @tap="$router.push('/modifypassword')">
         <div class="left" >修改密码</div>
         <div class="right">
            <div class="row">
              <img src="../images/200011.png" alt="">
            </div>
         </div>
      </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
  import Exif from 'exif-js'
  import  { uploadFile , modifyUserInfo } from "../api/http.js"
export default {
  data() {
    return {
      flag: false,
      memberid:"",
      userImgSrc: localStorage.getItem('userHeadUrl'),
      appid:'wx6a6f27d3495ac929',
      userOpenId:localStorage.getItem('userOpenId'),
    };
  },
  created(){
    let self = this
    self.userOpenId=localStorage.getItem("userOpenId") ||""
    self.memberid = localStorage.getItem("memberid")
    if( self.userOpenId == null || self.userOpenId =='null' ||self.userOpenId =='' ) {
      self.$router.push('/member')
    } 
  },
   
   
    methods: {
      fileSelected() {
          var self = this
          let files = document.getElementById('fileToUpload').files
          if (files && files.length) {
              var fd = new FormData()
              fd.append('file', files[0])
              var reader = new window.FileReader()
              // 图片大小 M
              var fileSize = 1024*1024*60
              reader.readAsDataURL(files[0])
              reader.onload = function (e) {
                  if (e.target.result.length > fileSize) {
                    self.mui.toast('上传失败，请上传低于8M的头像图片');
                    document.getElementById('fileToUpload').value = ''
                  } else {
                        // 调用上传接口
                        uploadFile(fd, {
                          headers:{'Content-Type':false,'charset':'UTF-8'}
                        } ).then(res =>{
                           //console.log(res)

                            if(res.data.code == 200){
                                self.userImgSrc = res.data.data
                                localStorage.setItem('userHeadUrl',self.userImgSrc)
                                self._modifyUserInfo()
                            }else{
                                self.mui.toast('图片太大了，上传失败');
                            }
                        }).catch(res=>{
                          self.mui.toast('图片太大了，请到图片里重新选一张吧');
                        })
                  }
              }
          }
      },
      // 上传成功
      uploadComplete(evt) {
        this.userImgSrc = (evt.target.responseText).replace('\\', '/')
        document.getElementById('fileToUpload').value = ''
      },
      _modifyUserInfo(){
        let self = this
       // console.log( '用户主键',self.$route.params.id)
        modifyUserInfo({
          "id":self.$route.params.id,
          "userOpenId":self.userOpenId,
          "userHeadUrl":self.userImgSrc
        }).then(res=>{
            //console.log( "修改信息的接口返回",res )
            self.mui.toast( res.data.message )
        })
      }
      // 删除图片
      // 'deleteImg': function () {
      //        this.userImgSrc = ''
      // },
    },
};
</script>
<style lang="less" scoped>
.ds_main {
  width: 100%;
  height: 100%;
  .head_img,
  .vip_num,
  .modify_pw {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 0.5px #e5e5e5;
    .left {
      height: 14px;
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      line-height: 14px;
      letter-spacing: 0px;
      color: #222222;
      margin: 11.5px;
    }
    .right {
      display: flex;
      align-items: center;
      border: none;
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      color: #989898;
      margin-right: 12px;
      .h_img {
        width: 24px;
        height: 24px;
        margin-right: 11px;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
      }
    }
    .row {
      border: none;
      width: 5px;
      height: 9px;
    }
  }
   .mui-backdrop {
    display: flex;
    justify-content: center;
    .towser {
      position: absolute;
      width: 95%;
      height: 179px;
      display: flex;
      flex-direction: column;
      font-size: 17px;
      bottom: 0;
      :first-child {
        height: 54px;
        border-radius: 30px 30px 0px 0px;
        color: #32c0e3;
      }
      :nth-child(2) {
        height: 54px;
        color: #32c0e3;
        border-radius: 0px 0px 30px 30px;
      }
      :nth-child(3) {
        height: 54px;
        color: #32c0e3;
        margin-top: 8px;
        border-radius: 30px;
      }
      button {
        border: none;
      }
    }
  }
}

.h_img{ 
   border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
}
  .vip_num .right{
    padding-right: 20px;
  }

  .ds_main .btnfile{
    position: absolute;
    top: 0;
    right:0;
    width: 100%;
    height: 45px;
    // border-radius: 50%;
    // -moz-border-radius: 50%;
    // -webkit-border-radius: 50%;
    opacity: 0;
  }
</style>


