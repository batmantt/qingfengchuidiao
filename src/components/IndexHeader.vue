<template>
    <mt-header :title="pageHeaderTitle">
      <mt-button icon="back" slot="left" @click="$router.go(-1)" >返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
</template>
<script>
export default {
    props:["pageHeaderTitle"]
}
</script>
<style>

</style>

