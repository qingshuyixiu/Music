<template>
  <div class="hotsearch">
    <p>热门搜索</p>
    <ul>
      <li v-for="(item,index) in hotsearch" :key="index" @click.prevent.stop="$emit('clksearch',{keywords:item.first})">{{item.first}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotsearch:[]
    }
  },
  created() {
    this.$axios('/search/hot').then(d=>{this.hotsearch=d.data.result.hots})
  },
}
</script>
<style lang="less" scoped>
.hotsearch{
  padding: 0 10px;
  font-size: 12px;
  p{
    margin: 10px 0;
  }
  ul{
    li{
      border:1px solid #d3d4da;
      color: #333;
      line-height: 32px;
      padding: 0px 14px;
      margin: 0 8px 8px 0;
      border-radius: 32px;
      font-size: 14px;
      float: left;
    }
  }
}
</style>