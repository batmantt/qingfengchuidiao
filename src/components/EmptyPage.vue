<template>
     <div class="cart_nothing">
          <img :src="emptyData.src" alt="">
          <p>{{emptyData.txt}}</p>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:['emptyData']
};
</script>

<style lang="less" scoped>
.cart_nothing {
  width: 100%;
  height: 100%;
  img {
    width: 180px;
    height: 156px;
    margin: auto;
    margin-top: 123px;
  }
  p {
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color: #999999;
    text-align: center;
    margin-top: 13px;
  }
}
</style>
