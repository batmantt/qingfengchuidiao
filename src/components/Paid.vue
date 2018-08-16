<template>
<div>
 <div class="ds_qrcode">
      <div>
           <p class="qrcode_title1">核销成功</p>
          <p class="qrcode_title2">二维码已核销</p>
      </div>
      <div class="ds_qrcodepicbox">
          <img src="https://tango007.heeyhome.com/upload/15302/paidsuccess.08c4835.png" alt="">
      </div>
  </div>
  <div style="height:10px;background-color:#f7f7f7;"></div>
</div>
 
</template>
<script>
export default {
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
      width: 96px;
      height:96px;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
   }
 }
</style>

