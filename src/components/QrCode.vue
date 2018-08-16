<template>
<div>
 <div class="ds_qrcode">
      <div>
           <p class="qrcode_title1">商品购买成功</p>
          <p class="qrcode_title2">向商家出示二维码即可</p>
      </div>
      <div class="ds_qrcodepicbox">
          <!-- <div v-if="orderQr?true:false">
            <img v-lazy ="orderQr" alt="">
          </div>
          <div v-else> 
             <img src="../images/imgQrcode.png" alt="">
          </div> -->
          <div>
            <img :src ="orderQr" alt="">
          </div>
      </div>
  </div>
  <div style="height:10px;background-color:#f7f7f7;"></div>
</div>
 
</template>
<script>
export default {
  data(){
    return{}
  },
  props:['orderQr']

}
</script>
<style lang="less" scoped>
 .ds_qrcode{
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   align-items: center;
   height: 270px;
   width: 100%;
   padding: 25px 0 45px 0;
   text-align: center;
   .qrcode_title1{
    font-size: 22px;
    line-height: 33px;
   color: #32c0e3;
   }
   .qrcode_title2{
    height: 28px;
    font-size: 15px;
    line-height: 33px;
   color: #32c0e3;
   }
   .ds_qrcodepicbox{
      width: 120px;
      height:120px;
      img{
        width: 100%;
        height: 100%;
      }
   }
 }
</style>

