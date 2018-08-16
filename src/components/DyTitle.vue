<template>
     <div class="ds_pic_header gooddetailtitle">
            <div class="ds_detail_title">
                <div style="padding:0 8px">
                    <span name="is_end">已经到底了</span> 
                </div>
            </div>
        </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
.ds_pic_header{
    font-size: 13px;
     color: #9c9c9c;
    line-height: 36px;
    width: 100%;
    background-color: #f7f7f7;
    text-align: center;
    display: flex;
    justify-content: center;
    .ds_detail_title{
      display: flex;
      align-items: center;
      &::before,&::after{
        display: block;
        content: "";
        width:42px;
        height:1px;
        background-color:#9c9c9c;
      }
    }
  }
</style>

