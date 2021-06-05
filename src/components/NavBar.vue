<template>
  <ul v-if="show" class="navbar">
    <li><router-link to="/Recomment">推荐音乐</router-link></li>
    <li><router-link to="/Hot">热歌榜</router-link></li>
    <li><router-link to="/Mv">MV</router-link></li>
    <li><router-link to="/SongList">更多榜单</router-link></li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      show:true
    }
  },
}
</script>
<style lang="less" scoped>
.navbar{
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  
  li{
    flex: 1;
    text-align: center;
    line-height: 40px;
    a{
      display: inline-block;
      height: 100%;
      color: black;
      font-size: 15px;
      &.router-link-exact-active{
        color: #FF85AC;
        position: relative;
        &::after{
        content: "";
        display: block;
        width: calc(~"100% + 20px");
        margin-left: -10px;
        position: absolute;
        bottom: 1px;
        border-bottom: 2px solid #FF85AC;
      }
        
      }
    }
  }
}
</style>