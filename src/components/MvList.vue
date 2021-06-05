<template>
  <div class="mvlist">
    <router-link tag="ul" :to="`/MvPlay/${item.id}`" class="describe">
      <li>
        <img :src="item.picUrl||item.cover">
      </li>
      <li>{{item.name}}</li>
    </router-link>
  </div>
</template>
<script>
export default {
  props:['item'],
}
</script>
<style lang="less" scoped>
.mvlist{
  width: 90%;
  height: 50vw;
  margin: 0 auto;
  margin-top: 10px;
  .describe{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
     &>:nth-child(1){
       img{
         display: block;
         width: 100%;
         height: auto;
       }
     }
    &>:nth-child(2){
      width: 100%;
      height: 20%;
      background-color: rgba(0, 0, 0, 0.473);
      font-size: 14px;
      color: #fff;
      text-indent: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>